export interface Exercise {
  id: string
  name: string
  muscle: string
  equipment: string
  category: string
}

export interface SetEntry {
  id: string
  reps: number
  weight: number
  done: boolean
}

export interface WorkoutExercise {
  exerciseId: string
  name: string
  muscle: string
  sets: SetEntry[]
}

export interface Session {
  id: string
  date: string
  exercises: WorkoutExercise[]
}

export interface PersonalRecord {
  exerciseId: string
  name: string
  maxWeight: number
  maxReps: number
  best1RM: number
  maxVolume: number
  date: string
  isNew?: boolean
}