import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const { email } = req.body || {}
  if (typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'Invalid email' })
    return
  }
  res.status(200).json({ ok: true })
}
