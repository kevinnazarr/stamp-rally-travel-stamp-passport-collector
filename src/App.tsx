import { useState, useMemo } from 'react'
import { useStamps } from './features/passport/hooks/useStamps'
import { SummaryBar } from './features/passport/components/SummaryBar'
import { StampGrid } from './features/passport/components/StampGrid'
import { AddStampForm } from './features/passport/components/AddStampForm'

export default function App() {
  const { stamps, addStamp, deleteStamp, convertToStamped, saveError } = useStamps()
  const [showForm,setShowForm]=useState(false)
  const [filter,setFilter]=useState<'all'|'stamped'|'dream'>('all')

  const filtered = useMemo(()=>{
    if(filter==='all') return stamps
    return stamps.filter(s=>s.status===filter)
  },[stamps,filter])

  const counts = { stamped: stamps.filter(s=>s.status==='stamped').length, dream: stamps.filter(s=>s.status==='dream').length }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight">Stamp Rally</h1>
          <p className="text-muted text-sm mt-1">Your personal travel passport — stamped memories & dream destinations.</p>
        </header>

        <div className="mb-4"><SummaryBar stamped={counts.stamped} dream={counts.dream} /></div>

        {saveError && <p role="alert" className="mb-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900">Changes may not be saved — storage is unavailable.</p>}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button onClick={()=>setShowForm(v=>!v)} className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black focus-visible:ring-2" style={{minHeight:44}}>
            {showForm ? 'Close form' : '+ Add stamp'}
          </button>
          <div className="ml-auto flex gap-1 rounded-full bg-white border border-stone-200 p-1">
            {(['all','stamped','dream'] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${filter===f?'bg-stone-900 text-white':'hover:bg-stone-100'}`}>{f}</button>
            ))}
          </div>
        </div>

        {showForm && <div className="mb-6 max-w-xl"><AddStampForm onAdd={addStamp} onClose={()=>setShowForm(false)} /></div>}

        <StampGrid stamps={filtered} onDelete={deleteStamp} onConvert={convertToStamped} />
      </div>
    </div>
  )
}
