import { getClientEnv } from '@/config/env'

export type ApiError = {
  status: number
  code?: string
  message: string
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  timeoutMs?: number
  retries?: number
  retryDelayMs?: number
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { VITE_API_BASE_URL } = getClientEnv()
  const base = VITE_API_BASE_URL || ''
  const url = path.startsWith('http') ? path : `${base}${path}`
  const method = opts.method || 'GET'
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  const timeoutMs = opts.timeoutMs ?? 8000
  const retries = opts.retries ?? 2
  const retryDelayMs = opts.retryDelayMs ?? 300

  let attempt = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        signal: controller.signal,
      })
      clearTimeout(t)
      if (!res.ok) {
        const message = await safeText(res)
        const err: ApiError = { status: res.status, message }
        throw err
      }
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        return (await res.json()) as T
      }
      return (await res.text()) as unknown as T
    } catch (e: unknown) {
      clearTimeout(t)
      attempt++
      const isAbort = e instanceof Error && e.name === 'AbortError'
      if (attempt > retries || isAbort) {
        if (e && typeof (e as ApiError).status === 'number') throw e as ApiError
        const msg = e instanceof Error ? e.message : 'Network error'
        const err: ApiError = { status: 0, message: msg }
        throw err
      }
      await sleep(retryDelayMs * attempt)
    }
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    const t = await res.text()
    return t || `${res.status}`
  } catch {
    return `${res.status}`
  }
}

export const apiClient = {
  get<T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return request<T>(path, { ...(opts || {}), method: 'GET' })
  },
  post<T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) {
    return request<T>(path, { ...(opts || {}), method: 'POST', body })
  },
}

export default apiClient
