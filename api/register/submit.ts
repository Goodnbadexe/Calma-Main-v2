import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getServerEnv } from '../../src/config/env'
import { rateLimit } from '../../src/utils/rateLimit'

function clientIp(req: VercelRequest): string {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.length) return xf.split(',')[0].trim()
  return (req.socket as any)?.remoteAddress || ''
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function verifyCaptcha(secret: string | undefined, token: string | undefined): Promise<boolean> {
  if (!secret) return true
  if (!token) return false
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  })
  if (!res.ok) return false
  const json = await res.json()
  return !!json?.success
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const env = getServerEnv()
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const ip = clientIp(req)
  const rl = rateLimit(ip, env.RATE_LIMIT_MAX_REQUESTS, env.RATE_LIMIT_WINDOW_MS)
  if (!rl.allowed) {
    res.setHeader('Retry-After', Math.ceil((rl.resetAt - Date.now()) / 1000))
    res.status(429).json({ error: 'Rate limit exceeded' })
    return
  }
  const body = req.body || {}
  const firstName = String(body.firstName || '').trim()
  const lastName = String(body.lastName || '').trim()
  const email = String(body.email || '').trim()
  const privacy = !!body.privacy
  const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken : undefined
  const okCaptcha = await verifyCaptcha(env.CAPTCHA_SECRET_KEY, captchaToken)
  if (!okCaptcha) {
    res.status(400).json({ error: 'Captcha verification failed' })
    return
  }
  const errors: Record<string, string> = {}
  if (!firstName) errors.firstName = 'First name is required'
  if (!lastName) errors.lastName = 'Last name is required'
  if (!email) errors.email = 'Email is required'
  else if (!validateEmail(email)) errors.email = 'Invalid email'
  if (!privacy) errors.privacy = 'Privacy consent required'
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors })
    return
  }
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  res.status(202).json({ accepted: true, id: requestId })
}
