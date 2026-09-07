import type { StampColor } from './types'
export const STORAGE_KEY = 'stamp-rally:v1'
export const COLORS: Record<StampColor, { bg: string; border: string; text: string; label: string }> = {
  red:    { bg:'#c1272d', border:'#8b1a1f', text:'#fff', label:'Red stamp' },
  blue:   { bg:'#1e3a8a', border:'#14265c', text:'#fff', label:'Blue stamp' },
  green:  { bg:'#166534', border:'#0f4623', text:'#fff', label:'Green stamp' },
  purple: { bg:'#6b21a8', border:'#4a1775', text:'#fff', label:'Purple stamp' },
  gold:   { bg:'#a16207', border:'#713f08', text:'#fff', label:'Gold stamp' },
}
export const COLOR_OPTIONS: StampColor[] = ['red','blue','green','purple','gold']
