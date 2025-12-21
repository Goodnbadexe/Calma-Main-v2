export type SourceSet = {
  type: 'image/webp' | 'image/avif' | 'image/jpeg' | 'image/png'
  srcset: string
}

export function resolveResponsiveSources(baseUrl: string, alternatives: string[] = []): SourceSet[] {
  const sources: SourceSet[] = []
  const byExt = (u: string) => u.split('.').pop()?.toLowerCase() || ''
  const add = (u: string) => {
    const ext = byExt(u)
    const type =
      ext === 'webp' ? 'image/webp' :
      ext === 'avif' ? 'image/avif' :
      ext === 'png' ? 'image/png' : 'image/jpeg'
    sources.push({ type, srcset: u })
  }
  const baseExt = byExt(baseUrl)
  // Prefer modern formats first
  const modern = alternatives.filter((u) => ['webp', 'avif'].includes(byExt(u)))
  modern.forEach(add)
  // Fallback to provided alternatives (png/jpg)
  alternatives.filter((u) => !modern.includes(u)).forEach(add)
  // Always include base as last fallback
  add(baseUrl)
  return sources
}

export function buildSizes(defaultSize: string = '100vw'): string {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${defaultSize}`
}
