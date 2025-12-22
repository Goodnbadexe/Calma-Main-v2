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

export function pickPreviewImage(glob: string): string {
  try {
    const mods = import.meta.glob('/src/assets/Images/Projects/**/*.{png,jpg,jpeg,webp}', { eager: true }) as Record<string, any>
    // Remove the wildcard part to match against actual file paths
    // e.g. "Folder/Subfolder/*.{png...}" -> "Folder/Subfolder/"
    const folderPart = glob.split('/src/assets/Images/Projects/')[1]?.split('*')[0]
    if (!folderPart) return ''

    const match = Object.entries(mods).find(([k]) => k.includes(folderPart))
    const url = match ? (typeof match[1] === 'string' ? match[1] : match[1]?.default) : undefined
    return url || ''
  } catch {
    return ''
  }
}
