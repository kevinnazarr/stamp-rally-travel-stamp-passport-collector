export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    const parsed = JSON.parse(raw)
    return parsed as T
  } catch { return fallback }
}
export function save(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false }
}
export function isValidStamps(data: unknown): boolean {
  if (!Array.isArray(data)) return false
  return data.every(s => typeof s === 'object' && s !== null && 'id' in s && 'placeName' in s && 'status' in s && 'color' in s)
}
