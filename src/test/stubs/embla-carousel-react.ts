export default function useEmblaCarousel() {
  const api = {
    canScrollPrev: () => false,
    canScrollNext: () => false,
    selectedScrollSnap: () => 0,
    on: () => {},
    off: () => {},
    scrollPrev: () => {},
    scrollNext: () => {},
    scrollTo: (_i: number) => {}
  }
  return [null, api] as any
}
