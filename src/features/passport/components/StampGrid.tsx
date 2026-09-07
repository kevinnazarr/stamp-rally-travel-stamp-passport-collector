import type { Stamp } from '../types'
import { StampCard } from './StampCard'
export function StampGrid({ stamps, onDelete, onConvert }: { stamps: Stamp[]; onDelete:(id:string)=>void; onConvert:(id:string)=>void }) {
  if (stamps.length===0) return (
    <div data-testid="empty-state" className="rounded-xl border-2 border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center">
      <p className="font-display text-xl">Your passport is empty</p>
      <p className="mt-1 text-sm text-muted">Add your first stamp — a place you've been or a dream destination awaits.</p>
    </div>
  )
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" data-testid="stamp-grid">
      {stamps.map(s => <StampCard key={s.id} stamp={s} onDelete={onDelete} onConvert={onConvert} />)}
    </ul>
  )
}
