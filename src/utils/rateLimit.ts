type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export function rateLimit(ip: string, max: number, windowMs: number): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const key = ip || 'unknown'
  const bucket = buckets.get(key)
  if (!bucket || now > bucket.resetAt) {
    const b: Bucket = { count: 1, resetAt: now + windowMs }
    buckets.set(key, b)
    return { allowed: true, remaining: max - 1, resetAt: b.resetAt }
  }
  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt }
  }
  bucket.count++
  return { allowed: true, remaining: Math.max(0, max - bucket.count), resetAt: bucket.resetAt }
}
