import { useState } from 'react'

export function useDropdownPosition() {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 300 })
  const compute = (triggerRect: DOMRect, containerBottom?: number) => {
    const baseWidth = 300
    const centeredLeftRaw = triggerRect.left + triggerRect.width / 2 - baseWidth / 2
    const centeredLeft = Math.max(16, Math.min(centeredLeftRaw, window.innerWidth - baseWidth - 16))
    setPosition({
      top: (containerBottom || triggerRect.bottom) - 2,
      left: Math.max(centeredLeft, 16),
      width: baseWidth,
    })
  }
  return { position, compute }
}
