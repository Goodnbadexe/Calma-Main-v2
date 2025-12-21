export type ServerEnv = {
  LINKEDIN_ACCESS_TOKEN: string
  LINKEDIN_ORG_ID: string
  LINKEDIN_CACHE_TTL: number
  LINKEDIN_API_VERSION: string
  TELEMETRY_ENABLED: boolean
  TELEMETRY_ENDPOINT: string
  TELEMETRY_AUTH_TOKEN?: string
  PLACEHOLDER_USE_CDN: boolean
  PLACEHOLDER_CDN_BASE: string
  REGISTER_RATE_LIMIT_SECRET?: string
  RATE_LIMIT_MAX_REQUESTS: number
  RATE_LIMIT_WINDOW_MS: number
  CAPTCHA_SITE_KEY?: string
  CAPTCHA_SECRET_KEY?: string
}

export type ClientEnv = {
  VITE_API_BASE_URL?: string
  VITE_TELEMETRY_ENABLED?: boolean
}

function toBool(v: any, def = false): boolean {
  if (v === undefined || v === null || v === '') return def
  if (typeof v === 'boolean') return v
  const s = String(v).trim().toLowerCase()
  return s === '1' || s === 'true' || s === 'yes' || s === 'on'
}

function toNum(v: any, def: number): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}

export function getServerEnv(): ServerEnv {
  const required = ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_ORG_ID'] as const
  for (const key of required) {
    if (!process.env[key] || String(process.env[key]).trim() === '') {
      throw new Error(`Missing required env: ${key}`)
    }
  }
  return {
    LINKEDIN_ACCESS_TOKEN: String(process.env.LINKEDIN_ACCESS_TOKEN),
    LINKEDIN_ORG_ID: String(process.env.LINKEDIN_ORG_ID),
    LINKEDIN_CACHE_TTL: toNum(process.env.LINKEDIN_CACHE_TTL, 900_000),
    LINKEDIN_API_VERSION: String(process.env.LINKEDIN_API_VERSION || '202504'),
    TELEMETRY_ENABLED: toBool(process.env.TELEMETRY_ENABLED, false),
    TELEMETRY_ENDPOINT: String(process.env.TELEMETRY_ENDPOINT || '/api/telemetry/ingest'),
    TELEMETRY_AUTH_TOKEN: process.env.TELEMETRY_AUTH_TOKEN,
    PLACEHOLDER_USE_CDN: toBool(process.env.PLACEHOLDER_USE_CDN, false),
    PLACEHOLDER_CDN_BASE: String(process.env.PLACEHOLDER_CDN_BASE || 'https://placehold.co'),
    REGISTER_RATE_LIMIT_SECRET: process.env.REGISTER_RATE_LIMIT_SECRET,
    RATE_LIMIT_MAX_REQUESTS: toNum(process.env.RATE_LIMIT_MAX_REQUESTS, 60),
    RATE_LIMIT_WINDOW_MS: toNum(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
  }
}

export function getClientEnv(): ClientEnv {
  return {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_TELEMETRY_ENABLED: toBool(import.meta.env.VITE_TELEMETRY_ENABLED, false),
  }
}

export function requireEnv(name: keyof ServerEnv): string {
  const v = process.env[name as string]
  if (!v || String(v).trim() === '') throw new Error(`Missing required env: ${name as string}`)
  return String(v)
}
