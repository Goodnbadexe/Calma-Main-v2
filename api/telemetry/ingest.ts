import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getServerEnv } from '../../src/config/env'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const env = getServerEnv()
  if (!env.TELEMETRY_ENABLED) {
    res.status(404).json({ error: 'Telemetry disabled' })
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (env.TELEMETRY_AUTH_TOKEN) {
    const auth = req.headers.authorization || ''
    const ok = auth.startsWith('Bearer ') && auth.slice(7) === env.TELEMETRY_AUTH_TOKEN
    if (!ok) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
  }
  const body = req.body
  if (!body || typeof body !== 'object' || !Array.isArray((body as any).events)) {
    res.status(400).json({ error: 'Invalid payload' })
    return
  }
  const events = (body as any).events
  if (!Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: 'No events' })
    return
  }
  res.status(202).json({ accepted: events.length })
}
