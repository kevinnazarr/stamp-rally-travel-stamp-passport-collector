const STOPWORDS = new Set(['the','of','and','a','an','in','on','at','de','la','le','del','da','von','van'])
export function deriveInitials(placeName: string): string {
  const words = placeName.trim().split(/\s+/).filter(w => !STOPWORDS.has(w.toLowerCase()))
  if (words.length === 0) return placeName.trim().slice(0,2).toUpperCase() || '??'
  if (words.length === 1) return words[0].slice(0, Math.min(2, words[0].length)).toUpperCase()
  const letters = words.slice(0,3).map(w => w[0].toUpperCase())
  return letters.join('')
}
export function generateTilt(): number { return Math.round((Math.random()*12 - 6)*10)/10 }
export function generateId(): string {
  try { return crypto.randomUUID() } catch { return Math.random().toString(36).slice(2,10) + Date.now().toString(36) }
}
export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  try { return new Date(iso + 'T00:00:00').toLocaleDateString('en-US',{ year:'numeric', month:'short', day:'numeric'}) } catch { return iso }
}
export function counts(stamps: {status:string}[]) {
  return { stamped: stamps.filter(s=>s.status==='stamped').length, dream: stamps.filter(s=>s.status==='dream').length }
}
