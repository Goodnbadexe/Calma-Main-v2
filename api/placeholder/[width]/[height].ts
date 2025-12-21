import type { VercelRequest, VercelResponse } from '@vercel/node'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { width, height } = req.query
  const w = clamp(Number(width), 1, 4000)
  const h = clamp(Number(height), 1, 4000)
  const text = typeof req.query.text === 'string' ? req.query.text : `${w}×${h}`
  const bg = typeof req.query.bg === 'string' ? `#${req.query.bg.replace('#', '')}` : '#e5e7eb'
  const fg = typeof req.query.fg === 'string' ? `#${req.query.fg.replace('#', '')}` : '#374151'

  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    res.status(400).json({ error: 'Invalid width/height' })
    return
  }

  const fontSize = Math.floor(Math.min(w, h) / 6)
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text x="50%" y="50%" fill="${fg}" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" dominant-baseline="middle" text-anchor="middle">${text}</text>
</svg>`.trim()

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, immutable')
  res.status(200).send(svg)
}
