// Centralized asset URL resolver using Vite's glob imports
// Accepts absolute '/src/assets/...' paths and returns a built URL

type AssetModule = { default: string }

// Eagerly import common assets under src/assets so we can resolve by path
const imageModules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp,gif}', { eager: true }) as Record<string, AssetModule>
const iconModules = import.meta.glob('/src/assets/Icons/**/*.{svg,png}', { eager: true }) as Record<string, AssetModule>
const assetModules = { ...imageModules, ...iconModules }

export function resolveAssetUrl(input: string): string {
  if (!input) return input
  const key = input.startsWith('/src/') ? input : `/src/${input.replace(/^\/?/, '')}`
  const mod = assetModules[key]
  if (mod && typeof mod.default === 'string') return mod.default
  // Fallback: return input unchanged
  return input
}

export function resolveAssetUrls(inputs: string[]): string[] {
  return inputs.map(resolveAssetUrl)
}
