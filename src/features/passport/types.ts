export type StampColor = 'red'|'blue'|'green'|'purple'|'gold'
export type StampStatus = 'stamped'|'dream'
export interface Stamp {
  id: string
  placeName: string
  status: StampStatus
  dateVisited: string | null
  color: StampColor
  memory: string
  initials: string
  tiltDeg: number
  createdAt: string
}
