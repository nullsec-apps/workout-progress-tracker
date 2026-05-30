import { Exercise } from '../types'

function mk(name: string, muscle: string, equipment: string, category: string): Exercise {
  return { id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, muscle, equipment, category }
}

export const EXERCISES: Exercise[] = [
  mk('Barbell Bench Press', 'Chest', 'Barbell', 'Push'),
  mk('Incline Dumbbell Press', 'Chest', 'Dumbbell', 'Push'),
  mk('Dumbbell Flye', 'Chest', 'Dumbbell', 'Push'),
  mk('Cable Crossover', 'Chest', 'Cable', 'Push'),
  mk('Push Up', 'Chest', 'Bodyweight', 'Push'),
  mk('Dips', 'Chest', 'Bodyweight', 'Push'),
  mk('Overhead Press', 'Shoulders', 'Barbell', 'Push'),
  mk('Dumbbell Shoulder Press', 'Shoulders', 'Dumbbell', 'Push'),
  mk('Lateral Raise', 'Shoulders', 'Dumbbell', 'Push'),
  mk('Front Raise', 'Shoulders', 'Dumbbell', 'Push'),
  mk('Face Pull', 'Shoulders', 'Cable', 'Pull'),
  mk('Arnold Press', 'Shoulders', 'Dumbbell', 'Push'),
  mk('Deadlift', 'Back', 'Barbell', 'Pull'),
  mk('Barbell Row', 'Back', 'Barbell', 'Pull'),
  mk('Pull Up', 'Back', 'Bodyweight', 'Pull'),
  mk('Lat Pulldown', 'Back', 'Cable', 'Pull'),
  mk('Seated Cable Row', 'Back', 'Cable', 'Pull'),
  mk('Dumbbell Row', 'Back', 'Dumbbell', 'Pull'),
  mk('T-Bar Row', 'Back', 'Barbell', 'Pull'),
  mk('Barbell Curl', 'Biceps', 'Barbell', 'Pull'),
  mk('Dumbbell Curl', 'Biceps', 'Dumbbell', 'Pull'),
  mk('Hammer Curl', 'Biceps', 'Dumbbell', 'Pull'),
  mk('Preacher Curl', 'Biceps', 'Barbell', 'Pull'),
  mk('Cable Curl', 'Biceps', 'Cable', 'Pull'),
  mk('Tricep Pushdown', 'Triceps', 'Cable', 'Push'),
  mk('Skull Crusher', 'Triceps', 'Barbell', 'Push'),
  mk('Overhead Tricep Extension', 'Triceps', 'Dumbbell', 'Push'),
  mk('Close Grip Bench Press', 'Triceps', 'Barbell', 'Push'),
  mk('Back Squat', 'Legs', 'Barbell', 'Legs'),
  mk('Front Squat', 'Legs', 'Barbell', 'Legs'),
  mk('Leg Press', 'Legs', 'Machine', 'Legs'),
  mk('Romanian Deadlift', 'Legs', 'Barbell', 'Legs'),
  mk('Leg Extension', 'Legs', 'Machine', 'Legs'),
  mk('Leg Curl', 'Legs', 'Machine', 'Legs'),
  mk('Walking Lunge', 'Legs', 'Dumbbell', 'Legs'),
  mk('Bulgarian Split Squat', 'Legs', 'Dumbbell', 'Legs'),
  mk('Calf Raise', 'Legs', 'Machine', 'Legs'),
  mk('Goblet Squat', 'Legs', 'Dumbbell', 'Legs'),
  mk('Hip Thrust', 'Glutes', 'Barbell', 'Legs'),
  mk('Cable Kickback', 'Glutes', 'Cable', 'Legs'),
  mk('Plank', 'Core', 'Bodyweight', 'Core'),
  mk('Hanging Leg Raise', 'Core', 'Bodyweight', 'Core'),
  mk('Cable Crunch', 'Core', 'Cable', 'Core'),
  mk('Russian Twist', 'Core', 'Bodyweight', 'Core'),
  mk('Ab Wheel Rollout', 'Core', 'Bodyweight', 'Core'),
  mk('Decline Bench Press', 'Chest', 'Barbell', 'Push'),
  mk('Machine Chest Press', 'Chest', 'Machine', 'Push'),
  mk('Pendlay Row', 'Back', 'Barbell', 'Pull'),
  mk('Chin Up', 'Biceps', 'Bodyweight', 'Pull'),
  mk('Concentration Curl', 'Biceps', 'Dumbbell', 'Pull'),
  mk('Rope Pushdown', 'Triceps', 'Cable', 'Push'),
  mk('Dumbbell Lunge', 'Legs', 'Dumbbell', 'Legs'),
  mk('Hack Squat', 'Legs', 'Machine', 'Legs'),
  mk('Seated Calf Raise', 'Legs', 'Machine', 'Legs'),
  mk('Shrug', 'Back', 'Dumbbell', 'Pull'),
  mk('Reverse Flye', 'Shoulders', 'Dumbbell', 'Pull'),
  mk('Upright Row', 'Shoulders', 'Barbell', 'Pull'),
  mk('Sumo Deadlift', 'Legs', 'Barbell', 'Legs'),
  mk('Pec Deck', 'Chest', 'Machine', 'Push'),
  mk('Cable Lateral Raise', 'Shoulders', 'Cable', 'Push')
]

export const MUSCLE_GROUPS = Array.from(new Set(EXERCISES.map(e => e.muscle))).sort()
export const EQUIPMENT = Array.from(new Set(EXERCISES.map(e => e.equipment))).sort()

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find(e => e.id === id)
}