import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session, WorkoutExercise, SetEntry } from '../types'
import { getExercise } from '../lib/exercises'
import { buildSampleSessions } from '../lib/sampleSessions'

let counter = 0
const uid = () => Date.now().toString(36) + (counter++).toString(36)

interface WorkoutState {
  sessions: Session[]
  current: WorkoutExercise[]
  seeded: boolean
  seed: () => void
  addExercise: (id: string) => void
  removeExercise: (exerciseId: string) => void
  addSet: (exerciseId: string) => void
  removeSet: (exerciseId: string, setId: string) => void
  updateSet: (exerciseId: string, setId: string, patch: Partial<SetEntry>) => void
  clearCurrent: () => void
  logSession: () => string | null
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      sessions: [],
      current: [],
      seeded: false,
      seed: () => {
        if (!get().seeded) {
          set({ sessions: buildSampleSessions(), seeded: true })
        }
      },
      addExercise: (id) => {
        if (get().current.some(e => e.exerciseId === id)) return
        const e = getExercise(id)
        if (!e) return
        const we: WorkoutExercise = {
          exerciseId: id,
          name: e.name,
          muscle: e.muscle,
          sets: [
            { id: uid(), reps: 10, weight: 45, done: false },
            { id: uid(), reps: 10, weight: 45, done: false },
            { id: uid(), reps: 10, weight: 45, done: false }
          ]
        }
        set({ current: [...get().current, we] })
      },
      removeExercise: (exerciseId) =>
        set({ current: get().current.filter(e => e.exerciseId !== exerciseId) }),
      addSet: (exerciseId) =>
        set({
          current: get().current.map(e => {
            if (e.exerciseId !== exerciseId) return e
            const last = e.sets[e.sets.length - 1]
            return { ...e, sets: [...e.sets, { id: uid(), reps: last?.reps ?? 10, weight: last?.weight ?? 45, done: false }] }
          })
        }),
      removeSet: (exerciseId, setId) =>
        set({
          current: get().current.map(e =>
            e.exerciseId === exerciseId ? { ...e, sets: e.sets.filter(s => s.id !== setId) } : e
          )
        }),
      updateSet: (exerciseId, setId, patch) =>
        set({
          current: get().current.map(e =>
            e.exerciseId === exerciseId
              ? { ...e, sets: e.sets.map(s => (s.id === setId ? { ...s, ...patch } : s)) }
              : e
          )
        }),
      clearCurrent: () => set({ current: [] }),
      logSession: () => {
        const cur = get().current
        if (cur.length === 0) return null
        const session: Session = {
          id: 'log' + uid(),
          date: new Date().toISOString(),
          exercises: cur.map(e => ({
            ...e,
            sets: e.sets.map(s => ({ ...s, done: true }))
          }))
        }
        set({ sessions: [...get().sessions, session], current: [] })
        return session.id
      }
    }),
    { name: 'ironlog-store' }
  )
)