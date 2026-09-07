export function SummaryBar({ stamped, dream }: { stamped:number; dream:number }) {
  return (
    <div className="flex flex-wrap gap-3 rounded-xl bg-white border border-stone-200 px-4 py-3 shadow-sm" data-testid="summary-bar">
      <span className="inline-flex items-baseline gap-1.5"><strong className="text-xl font-display">{stamped}</strong><span className="text-sm text-muted">Stamped</span></span>
      <span className="text-stone-300">·</span>
      <span className="inline-flex items-baseline gap-1.5"><strong className="text-xl font-display">{dream}</strong><span className="text-sm text-muted">Dreaming</span></span>
      <span className="ml-auto text-xs text-muted self-center">{stamped+dream} total</span>
    </div>
  )
}
