import { useState } from 'react'
import type { Stamp } from '../types'
import { InkStamp } from './InkStamp'
import { formatDate } from '../utils'

export function StampCard({ stamp, onDelete, onConvert }: { stamp: Stamp; onDelete:(id:string)=>void; onConvert:(id:string)=>void }) {
  const [armed, setArmed] = useState(false)
  const dream = stamp.status==='dream'
  return (
    <li
      data-testid="stamp-card"
      className={`relative flex flex-col rounded-xl bg-white p-5 shadow-sm break-words ${dream ? 'border-2 border-dashed border-stone-300 opacity-85' : 'border border-stone-200'} animate-stamp-in`}
      style={{ ['--tilt' as string]: `${stamp.tiltDeg}deg` } as React.CSSProperties}
    >
      <div className="absolute right-3 top-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${dream ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
          {dream ? 'Dream Destination' : 'Stamped'}
        </span>
      </div>
      <div className="pt-6">
        <InkStamp initials={stamp.initials} color={stamp.color} tiltDeg={stamp.tiltDeg} faded={dream} />
      </div>
      <h3 className="font-display mt-4 text-lg leading-tight break-words">{stamp.placeName}</h3>
      <p className="text-sm text-muted">{formatDate(stamp.dateVisited)}</p>
      {stamp.memory && <p className="mt-2 text-sm leading-relaxed text-stone-700 break-words">{stamp.memory}</p>}

      <div className="mt-4 flex gap-2">
        {dream && (
          <button onClick={()=>onConvert(stamp.id)} className="rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-black focus-visible:ring-2 focus-visible:ring-offset-2" style={{minHeight:44}}>
            Mark as visited
          </button>
        )}
        {!armed ? (
          <button onClick={()=>setArmed(true)} aria-label={`Delete ${stamp.placeName}`} className="rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50 focus-visible:ring-2" style={{minHeight:44}}>
            Delete
          </button>
        ) : (
          <span className="flex gap-2" aria-live="polite">
            <button onClick={()=>onDelete(stamp.id)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus-visible:ring-2" style={{minHeight:44}}>
              Confirm delete?
            </button>
            <button onClick={()=>setArmed(false)} className="rounded-lg border px-3 py-2 text-sm hover:bg-stone-50" style={{minHeight:44}}>Cancel</button>
          </span>
        )}
      </div>
    </li>
  )
}
