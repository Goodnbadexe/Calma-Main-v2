import { useEffect, useMemo, useState } from 'react'

export function useVirtualGrid(params: {
  itemCount: number
  estimateItemHeight: number
  overscanRows?: number
}) {
  const { itemCount, estimateItemHeight, overscanRows = 2 } = params
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(itemCount)

  const columns = useMemo(() => {
    if (typeof window === 'undefined') return 2
    const w = window.innerWidth
    if (w >= 1280) return 4
    if (w >= 768) return 3
    return 2
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const viewport = window.innerHeight
      const scrollY = window.scrollY
      const startRow = Math.max(0, Math.floor(scrollY / estimateItemHeight) - overscanRows)
      const visibleRows = Math.ceil(viewport / estimateItemHeight) + overscanRows * 2
      const start = startRow * columns
      const end = Math.min(itemCount, start + visibleRows * columns)
      setStartIndex(start)
      setEndIndex(end)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [itemCount, estimateItemHeight, overscanRows, columns])

  return { startIndex, endIndex }
}

