export type Status = 'inprogress' | 'success' | 'warning' | 'error'

export type Type = 'circle' | 'dashboard'

export interface Sector {
  id: number
  name: string
  value: number
  color: string
}
