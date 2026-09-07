import { COLORS } from '../constants'
import type { StampColor } from '../types'
export function InkStamp({ initials, color, tiltDeg, faded }: { initials:string; color:StampColor; tiltDeg:number; faded?:boolean }) {
  const c = COLORS[color]
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex items-center justify-center rounded-full border-[3px] font-display font-bold text-lg tracking-widest select-none ${faded ? 'opacity-50' : ''}`}
      style={{
        width: 96, height: 96,
        background: c.bg,
        borderColor: c.border,
        color: c.text,
        transform: `rotate(${tiltDeg}deg)`,
        // ink texture via layered shadow
        boxShadow: `inset 0 0 0 2px rgba(255,255,255,0.18), 0 2px 6px rgba(0,0,0,0.15), inset 0 0 12px rgba(0,0,0,0.12)`,
        textShadow: '0 1px 0 rgba(0,0,0,0.25)',
      }}
    >
      <span style={{ transform: 'rotate(0.5deg)', letterSpacing: '0.12em' }}>{initials}</span>
    </div>
  )
}
