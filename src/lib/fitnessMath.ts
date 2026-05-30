import { Session, SetEntry } from '../types'

export function calcVolume(sets: SetEntry[]): number {
  return sets.reduce((acc, s) => acc + s.reps * s.weight, 0)
}

export function sessionVolume(s: Session): number {
  return s.exercises.reduce((acc, e) => acc + calcVolume(e.sets), 0)
}

export function estimate1RM(weight: number, reps: number): number {
  if (reps <= 1) return weight
  return weight * (1 + reps / 30)
}

export function weekKey(dateStr: string): string {
  const d = new Date(dateStr)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString()
}