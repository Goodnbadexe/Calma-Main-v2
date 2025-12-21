import { describe, it, expect, beforeAll } from 'vitest'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import placeholderHandler from '@/../api/placeholder/[width]/[height]'
import telemetryIngest from '@/../api/telemetry/ingest'
import registerSubmit from '@/../api/register/submit'

function mockRes(): VercelResponse {
  const out: any = {
    statusCode: 200,
    headers: {},
    body: undefined as any,
  }
  return {
    status(code: number) {
      out.statusCode = code
      return this as any
    },
    json(obj: any) {
      out.body = obj
      return this as any
    },
    send(body: any) {
      out.body = body
      return this as any
    },
    setHeader(name: string, value: any) {
      out.headers[name.toLowerCase()] = value
      return
    },
  } as any
}

beforeAll(() => {
  process.env.LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN || 'test'
  process.env.LINKEDIN_ORG_ID = process.env.LINKEDIN_ORG_ID || '123'
})

describe('API routes', () => {
  it('placeholder returns SVG', async () => {
    const req = { query: { width: '200', height: '100' } } as any as VercelRequest
    const res = mockRes()
    await placeholderHandler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect(String((res as any).body)).toContain('<svg')
  })

  it('telemetry ingest validates payload', async () => {
    process.env.TELEMETRY_ENABLED = 'true'
    const req = { method: 'POST', body: { events: [{ event_type: 'error', timestamp: new Date().toISOString(), session_id: 't', page_id: 'p', viewport: { w: 0, h: 0 }, error_type: 'x', error_message: 'y' }] } } as any as VercelRequest
    const res = mockRes()
    await telemetryIngest(req, res)
    expect((res as any).statusCode).toBe(202)
  })

  it('register submit validates fields', async () => {
    const req = {
      method: 'POST',
      headers: {},
      socket: {} as any,
      body: {
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        privacy: true,
      },
    } as any as VercelRequest
    const res = mockRes()
    await registerSubmit(req, res)
    expect((res as any).statusCode).toBe(202)
    expect((res as any).body?.accepted).toBe(true)
  })

  it('linkedin posts handles missing config', async () => {
    const token = process.env.LINKEDIN_ACCESS_TOKEN
    process.env.LINKEDIN_ACCESS_TOKEN = ''
    const req = {} as any as VercelRequest
    const res = mockRes()
    let code = 200
    try {
      const linkedinPosts = (await import('@/../api/linkedin/posts')).default
      await linkedinPosts(req, res)
      code = (res as any).statusCode
    } catch {
      code = 500
    } finally {
      process.env.LINKEDIN_ACCESS_TOKEN = token
    }
    expect([500, 503].includes(code)).toBe(true)
  })
})
