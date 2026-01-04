// Centralized asset URL resolver using require.context (Webpack/Next.js compatible)
// Accepts absolute '/src/assets/...' paths and returns a built URL

export const assetModules: Record<string, string> = {}

try {
  // Use require.context to load all assets
  const r = require.context('../assets', true, /\.(png|jpg|jpeg|webp|gif|svg)$/)
  
  r.keys().forEach((key: string) => {
    // key is like './Images/About/Hero-1.JPG'
    // We map it to '/src/assets/Images/About/Hero-1.JPG'
    const absoluteKey = '/src/assets/' + key.replace(/^\.\//, '')
    const mod = r(key)
    assetModules[absoluteKey] = typeof mod === 'string' ? mod : mod.default
  })
} catch (e) {
  // Fallback for environments where require.context is not available (e.g. Jest)
  console.warn('require.context not available')
}

export function resolveAssetUrl(input: string): string {
  if (!input) return input
  const key = input.startsWith('/src/') ? input : `/src/${input.replace(/^\/?/, '')}`
  
  if (assetModules[key]) return assetModules[key]
  
  // Fallback: return input unchanged
  return input
}

export function getProjectAssets(): Record<string, string> {
  const result: Record<string, string> = {}
  Object.keys(assetModules).forEach(key => {
    if (key.includes('/src/assets/Images/Projects/')) {
      result[key] = assetModules[key]
    }
  })
  return result
}

export function resolveAssetUrls(inputs: string[]): string[] {
  return inputs.map(resolveAssetUrl)
}

export function pickPreviewImage(glob: string): string {
  // This function was trying to match glob patterns to files.
  // We can try to match against our loaded modules.
  // glob e.g.: "/src/assets/Images/Projects/..."
  
  const folderPart = glob.split('/src/assets/Images/Projects/')[1]?.split('*')[0]
  if (!folderPart) return ''

  const match = Object.keys(assetModules).find((k) => k.includes(folderPart))
  return match ? assetModules[match] : ''
}
