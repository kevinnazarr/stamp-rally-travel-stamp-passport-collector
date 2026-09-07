import { useState } from 'react'
import type { StampColor, StampStatus } from '../types'
import { COLOR_OPTIONS, COLORS } from '../constants'

type Props = { onAdd: (input:{placeName:string; status:StampStatus; dateVisited:string|null; color:StampColor; memory:string})=>{ok:boolean; error?:string}; onClose?:()=>void }

export function AddStampForm({ onAdd, onClose }: Props) {
  const [placeName,setPlaceName]=useState('')
  const [status,setStatus]=useState<StampStatus>('stamped')
  const [date,setDate]=useState('')
  const [color,setColor]=useState<StampColor>('red')
  const [memory,setMemory]=useState('')
  const [error,setError]=useState<string|null>(null)

  const submit = (e:React.FormEvent) => {
    e.preventDefault()
    const res = onAdd({ placeName, status, dateVisited: date || null, color, memory })
    if (!res.ok) setError(res.error ?? 'Invalid input')
    else { setPlaceName(''); setDate(''); setMemory(''); setError(null); onClose?.() }
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-xl bg-white border border-stone-200 p-5 shadow-sm space-y-4" aria-label="Add stamp form">
      <h2 className="font-display text-lg">Add a stamp</h2>

      <div>
        <label htmlFor="placeName" className="block text-sm font-medium">Place name *</label>
        <input id="placeName" value={placeName} onChange={e=>setPlaceName(e.target.value)} maxLength={60} required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900" placeholder="Kyoto, Patagonia..." />
      </div>

      <div>
        <span className="block text-sm font-medium">Status</span>
        <div className="mt-1 flex gap-2" role="radiogroup" aria-label="Stamp status">
          {(['stamped','dream'] as const).map(s=>(
            <button key={s} type="button" role="radio" aria-checked={status===s} onClick={()=>setStatus(s)}
              className={`rounded-full px-4 py-2 text-sm border ${status===s ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300'}`} style={{minHeight:44}}>
              {s==='stamped' ? 'Stamped' : 'Dream Destination'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="stampDate" className="block text-sm font-medium">{status==='stamped' ? 'Date visited' : 'Target date (optional)'}</label>
        <input id="stampDate" type="date" value={date} onChange={e=>setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2" />
      </div>

      <div>
        <span className="block text-sm font-medium">Stamp color</span>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Stamp color">
          {COLOR_OPTIONS.map(c=>(
            <button key={c} type="button" role="radio" aria-checked={color===c} aria-label={COLORS[c].label}
              onClick={()=>setColor(c)}
              className={`h-11 w-11 rounded-full border-2 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 ${color===c ? 'border-stone-900 scale-110' : 'border-white shadow'}`}
              style={{ background: COLORS[c].bg, minWidth:44, minHeight:44 }}>
              {color===c && <span className="text-white text-xs">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="memory" className="block text-sm font-medium">Memory <span className="text-muted font-normal">(optional, {memory.length}/200)</span></label>
        <textarea id="memory" value={memory} onChange={e=>setMemory(e.target.value.slice(0,200))} rows={3} maxLength={200}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2" placeholder="A short memory — 1–2 sentences" />
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-stone-900 px-5 py-2.5 text-white font-medium hover:bg-black focus-visible:ring-2" style={{minHeight:44}}>Add stamp</button>
        {onClose && <button type="button" onClick={onClose} className="rounded-lg border px-5 py-2.5 hover:bg-stone-50" style={{minHeight:44}}>Cancel</button>}
      </div>
    </form>
  )
}
