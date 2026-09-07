import { useState, useEffect, useCallback } from 'react'
import type { Stamp, StampColor, StampStatus } from '../types'
import { STORAGE_KEY } from '../constants'
import { load, save, isValidStamps } from '../../../lib/storage'
import { deriveInitials, generateTilt, generateId } from '../utils'

export function useStamps() {
  const [stamps, setStamps] = useState<Stamp[]>(() => {
    const data = load<unknown>(STORAGE_KEY, [])
    if (isValidStamps(data)) return data as Stamp[]
    return []
  })
  const [saveError, setSaveError] = useState(false)

  const persist = useCallback((next: Stamp[]) => {
    const ok = save(STORAGE_KEY, next)
    setSaveError(!ok)
  }, [])

  useEffect(() => { persist(stamps) }, [stamps, persist])

  const addStamp = useCallback((input: { placeName:string; status:StampStatus; dateVisited:string|null; color:StampColor; memory:string }) => {
    const trimmed = input.placeName.trim()
    if (!trimmed) return { ok:false as const, error:'Place name is required' }
    if (trimmed.length > 60) return { ok:false as const, error:'Place name must be 60 characters or less' }
    if (input.memory.length > 200) return { ok:false as const, error:'Memory must be 200 characters or less' }
    const stamp: Stamp = {
      id: generateId(),
      placeName: trimmed,
      status: input.status,
      dateVisited: input.dateVisited,
      color: input.color,
      memory: input.memory.trim(),
      initials: deriveInitials(trimmed),
      tiltDeg: generateTilt(),
      createdAt: new Date().toISOString(),
    }
    setStamps(s => [stamp, ...s])
    return { ok:true as const, stamp }
  }, [])

  const deleteStamp = useCallback((id:string) => setStamps(s => s.filter(x=>x.id!==id)), [])
  const convertToStamped = useCallback((id:string) => {
    setStamps(s => s.map(x => x.id===id ? { ...x, status:'stamped' as const, dateVisited: x.dateVisited ?? new Date().toISOString().slice(0,10) } : x))
  }, [])

  return { stamps, addStamp, deleteStamp, convertToStamped, saveError }
}
