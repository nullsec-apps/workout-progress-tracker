import { useMemo } from 'react'
import { Session, PersonalRecord } from '../types'
import { estimate1RM, calcVolume } from '../lib/fitnessMath'

export function usePersonalRecords(sessions: Session[]): PersonalRecord[] {
  return useMemo(() => {
    const map = new Map<string, PersonalRecord>()
    const sorted = [...sessions].sort((a, b) => +new Date(a.date) - +new Date(b.date))
    const recentCutoff = Date.now() - 1000 * 60 * 60 * 24 * 10

    sorted.forEach(s => {
      s.exercises.forEach(e => {
        const maxWeight = Math.max(...e.sets.map(st => st.weight))
        const maxReps = Math.max(...e.sets.map(st => st.reps))
        const best1RM = Math.round(Math.max(...e.sets.map(st => estimate1RM(st.weight, st.reps))))
        const maxVolume = calcVolume(e.sets)
        const existing = map.get(e.exerciseId)
        if (!existing) {
          map.set(e.exerciseId, {
            exerciseId: e.exerciseId,
            name: e.name,
            maxWeight,
            maxReps,
            best1RM,
            maxVolume,
            date: s.date
          })
        } else {
          let improved = false
          const next = { ...existing }
          if (best1RM > existing.best1RM) { next.best1RM = best1RM; improved = true }
          if (maxWeight > existing.maxWeight) { next.maxWeight = maxWeight; improved = true }
          if (maxReps > existing.maxReps) next.maxReps = maxReps
          if (maxVolume > existing.maxVolume) next.maxVolume = maxVolume
          if (improved) next.date = s.date
          map.set(e.exerciseId, next)
        }
      })
    })

    return Array.from(map.values())
      .map(pr => ({ ...pr, isNew: +new Date(pr.date) > recentCutoff }))
      .sort((a, b) => b.best1RM - a.best1RM)
  }, [sessions])
}