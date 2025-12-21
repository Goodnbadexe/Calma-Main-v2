export async function submitLead(payload: Record<string, unknown>) {
  const url = import.meta.env.VITE_LEADS_API_URL
  if (!url) {
    throw new Error('LEADS_API_URL_MISSING')
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Lead submit failed: ${res.status}`)
  }
  try {
    return await res.json()
  } catch {
    return {}
  }
}
