import { useMemo } from 'react'
import { Session } from '../types'
import { calcVolume, weekKey, estimate1RM } from '../lib/fitnessMath'

export function useProgressData(sessions: Session[], exerciseId?: string) {
  return useMemo(() => {
    const weekMap = new Map<string, number>()
    sessions.forEach(s => {
      const k = weekKey(s.date)
      const v = s.exercises.reduce((acc, e) => acc + calcVolume(e.sets), 0)
      weekMap.set(k, (weekMap.get(k) || 0) + v)
    })
    const weeklyVolume = Array.from(weekMap.entries())
      .sort((a, b) => +new Date(a[0]) - +new Date(b[0]))
      .map(([week, volume]) => ({ week, volume }))

    const progression: { date: string; weight: number; e1rm: number; volume: number }[] = []
    if (exerciseId) {
      sessions.forEach(s => {
        const e = s.exercises.find(x => x.exerciseId === exerciseId)
        if (!e) return
        const maxW = Math.max(...e.sets.map(st => st.weight))
        const best1rm = Math.max(...e.sets.map(st => estimate1RM(st.weight, st.reps)))
        progression.push({ date: s.date, weight: maxW, e1rm: Math.round(best1rm), volume: calcVolume(e.sets) })
      })
      progression.sort((a, b) => +new Date(a.date) - +new Date(b.date))
    }

    const freqMap = new Map<string, number>()
    sessions.forEach(s => {
      const k = weekKey(s.date)
      freqMap.set(k, (freqMap.get(k) || 0) + 1)
    })
    const frequency = Array.from(freqMap.entries())
      .sort((a, b) => +new Date(a[0]) - +new Date(b[0]))
      .map(([week, count]) => ({ week, count }))

    return { weeklyVolume, progression, frequency }
  }, [sessions, exerciseId])
}