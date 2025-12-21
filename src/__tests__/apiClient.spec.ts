import { describe, it, expect, vi } from 'vitest'
import { apiClient } from '@/utils/apiClient'

describe('apiClient', () => {
  it('retries on failure then succeeds', async () => {
    let calls = 0
    const m = vi.fn(async (url: string, init: any) => {
      calls++
      if (calls === 1) {
        return new Response('fail', { status: 500 })
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    })
    ;(global as any).fetch = m
    const res = await apiClient.get<{ ok: boolean }>('/api/test', { retries: 1 })
    expect(res.ok).toBe(true)
    expect(m).toHaveBeenCalledTimes(2)
  })

  it('times out and throws', async () => {
    const m = vi.fn(async (_url: string, init: any) => {
      return await new Promise((_resolve, reject) => {
        const signal: AbortSignal | undefined = init?.signal
        if (signal) {
          signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'))
          })
        }
      })
    })
    ;(global as any).fetch = m
    try {
      await apiClient.get('/api/test', { timeoutMs: 50, retries: 0 })
      expect(true).toBe(false)
    } catch (e: any) {
      expect(e.status).toBe(0)
    }
  })
})
