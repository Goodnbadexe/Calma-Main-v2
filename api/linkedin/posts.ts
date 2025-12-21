import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getServerEnv } from '../../src/config/env'

type Metrics = {
  likes: number
  comments: number
  shares: number
}

type LinkedInPost = {
  id: string
  text: string
  createdAt: number
  mediaType?: 'image' | 'video' | 'none'
  mediaUrl?: string
  thumbnailUrl?: string
  metrics: Metrics
  link: string
}

const cache: { data: LinkedInPost[] | null; ts: number } = { data: null, ts: 0 }
const env = getServerEnv()
const ttlMs = env.LINKEDIN_CACHE_TTL
const versionHeader = env.LINKEDIN_API_VERSION

async function fetchJSON(url: string, token: string, extraHeaders?: Record<string, string>) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Linkedin-Version': versionHeader,
      'X-Restli-Protocol-Version': '2.0.0',
      Accept: 'application/json',
      ...extraHeaders,
    },
  })
  if (!res.ok) {
    throw new Error(`LinkedIn API error: ${res.status}`)
  }
  return res.json()
}

async function fetchSocialMetrics(urn: string, token: string): Promise<Metrics> {
  try {
    const encodedUrn = encodeURIComponent(urn)
    const data = await fetchJSON(`https://api.linkedin.com/rest/socialActions/${encodedUrn}`, token)
    const likes = data?.likesSummary?.totalCount ?? 0
    const comments = data?.commentsSummary?.totalCount ?? 0
    const shares = data?.sharesSummary?.totalCount ?? 0
    return { likes, comments, shares }
  } catch {
    return { likes: 0, comments: 0, shares: 0 }
  }
}

function mapPostElement(el: any, orgId: string): LinkedInPost {
  const id = el?.id ?? el?.ugcPostUrn ?? el?.shareUrn ?? ''
  const text =
    el?.commentary ??
    el?.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text ??
    ''
  const createdAt =
    el?.createdAt ??
    el?.firstPublishedAt ??
    el?.created?.time ??
    Date.now()

  let mediaType: 'image' | 'video' | 'none' = 'none'
  let mediaUrl: string | undefined
  let thumbnailUrl: string | undefined

  const content = el?.content ?? el?.specificContent?.['com.linkedin.ugc.ShareContent']
  const mediaArr = content?.media
  if (Array.isArray(mediaArr) && mediaArr.length > 0) {
    const m = mediaArr[0]
    const mediaTypeRaw =
      m?.['media~']?.mediaType ??
      m?.actionableContent?.content?.value?.['com.linkedin.content.MediaContent']?.mediaType
    if (typeof mediaTypeRaw === 'string') {
      const mt = mediaTypeRaw.toLowerCase()
      if (mt.includes('video')) mediaType = 'video'
      else if (mt.includes('image') || mt.includes('stillimage')) mediaType = 'image'
    }
    const originalUrl =
      m?.['media~']?.originalUrl ??
      m?.actionableContent?.content?.value?.['com.linkedin.content.MediaContent']?.['media~']?.originalUrl
    if (originalUrl) {
      mediaUrl = originalUrl
      thumbnailUrl = originalUrl
    }
  }

  const link = `https://www.linkedin.com/company/${orgId}/posts/`

  return {
    id,
    text,
    createdAt,
    mediaType,
    mediaUrl,
    thumbnailUrl,
    metrics: { likes: 0, comments: 0, shares: 0 },
    link,
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const token = env.LINKEDIN_ACCESS_TOKEN
    const orgId = env.LINKEDIN_ORG_ID

    const now = Date.now()
    if (cache.data && now - cache.ts < ttlMs) {
      res.setHeader('Cache-Control', `max-age=60, s-maxage=${Math.floor(ttlMs / 1000)}`)
      res.status(200).json(cache.data)
      return
    }

    const authorUrn = `urn:li:organization:${orgId}`
    const postsUrl = new URL('https://api.linkedin.com/rest/posts')
    postsUrl.searchParams.set('q', 'authors')
    postsUrl.searchParams.set('authors', `List(${encodeURIComponent(authorUrn)})`)
    postsUrl.searchParams.set('sortBy', 'LAST_MODIFIED')
    postsUrl.searchParams.set('count', '12')

    let elements: any[] = []
    try {
      const data = await fetchJSON(postsUrl.toString(), token)
      elements = Array.isArray(data?.elements) ? data.elements : []
    } catch {
      const ugcUrl = new URL('https://api.linkedin.com/v2/ugcPosts')
      ugcUrl.searchParams.set('q', 'authors')
      ugcUrl.searchParams.set('authors', `List(${encodeURIComponent(authorUrn)})`)
      ugcUrl.searchParams.set('sortBy', 'LAST_MODIFIED')
      ugcUrl.searchParams.set('count', '12')
      const data = await fetchJSON(ugcUrl.toString(), token)
      elements = Array.isArray(data?.elements) ? data.elements : []
    }

    const mapped = await Promise.all(
      elements.map(async (el) => {
        const p = mapPostElement(el, orgId)
        p.metrics = await fetchSocialMetrics(p.id, token)
        return p
      })
    )

    cache.data = mapped
    cache.ts = now
    res.setHeader('Cache-Control', `max-age=60, s-maxage=${Math.floor(ttlMs / 1000)}`)
    res.status(200).json(mapped)
  } catch (e: any) {
    try {
      if (env.TELEMETRY_ENABLED && env.TELEMETRY_ENDPOINT) {
        await fetch(env.TELEMETRY_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(env.TELEMETRY_AUTH_TOKEN ? { Authorization: `Bearer ${env.TELEMETRY_AUTH_TOKEN}` } : {}),
          },
          body: JSON.stringify({
            events: [
              {
                event_type: 'error',
                timestamp: new Date().toISOString(),
                session_id: 'server',
                page_id: 'api_linkedin_posts',
                viewport: { w: 0, h: 0 },
                error_type: 'api_error',
                error_message: String(e?.message || 'Unknown error'),
                component_name: 'api/linkedin/posts',
              },
            ],
          }),
        })
      }
    } catch {}
    res.status(503).json({ error: 'LinkedIn feed unavailable' })
  }
}
