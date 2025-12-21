export function seededRandom(seed: number) {
  let t = seed % 2147483647
  if (t <= 0) t += 2147483646
  return () => (t = (t * 48271) % 2147483647) / 2147483647
}

export function shuffle<T>(arr: T[], seed = Date.now()): T[] {
  const rand = seededRandom(seed)
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
