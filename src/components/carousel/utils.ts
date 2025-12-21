export function clamp(pos: number, min: number, max: number) {
  return Math.min(Math.max(pos, min), max)
}

export function nextByViewport(current: number, vw: number, moveByVW: number, max: number, dir: 1 | -1) {
  const by = Math.floor(vw * moveByVW)
  return clamp(current + dir * by, 0, max)
}

