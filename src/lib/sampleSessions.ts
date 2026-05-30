import { Session, WorkoutExercise } from '../types'
import { getExercise } from './exercises'

let sid = 0
const nid = () => 's' + (sid++).toString(36)

function ex(id: string, sets: { reps: number; weight: number }[]): WorkoutExercise {
  const e = getExercise(id)!
  return {
    exerciseId: id,
    name: e.name,
    muscle: e.muscle,
    sets: sets.map(s => ({ id: nid(), reps: s.reps, weight: s.weight, done: true }))
  }
}

export function buildSampleSessions(): Session[] {
  const sessions: Session[] = []
  const now = Date.now()
  const day = 86400000
  const benchBase = 135, squatBase = 185, dlBase = 225, ohpBase = 95, rowBase = 115, curlBase = 30
  let id = 0
  for (let w = 11; w >= 0; w--) {
    const prog = (11 - w)
    const pushDate = new Date(now - (w * 7 + 5) * day).toISOString()
    sessions.push({
      id: 'sess' + id++,
      date: pushDate,
      exercises: [
        ex('barbell-bench-press', [
          { reps: 8, weight: benchBase + prog * 5 },
          { reps: 8, weight: benchBase + prog * 5 },
          { reps: 6, weight: benchBase + prog * 5 + 10 }
        ]),
        ex('overhead-press', [
          { reps: 10, weight: ohpBase + prog * 2.5 },
          { reps: 8, weight: ohpBase + prog * 2.5 },
          { reps: 8, weight: ohpBase + prog * 2.5 }
        ]),
        ex('tricep-pushdown', [
          { reps: 12, weight: 50 + prog * 2 },
          { reps: 12, weight: 50 + prog * 2 },
          { reps: 10, weight: 55 + prog * 2 }
        ]),
        ex('lateral-raise', [
          { reps: 15, weight: 15 + Math.floor(prog / 3) * 5 },
          { reps: 15, weight: 15 + Math.floor(prog / 3) * 5 }
        ])
      ]
    })
    const pullDate = new Date(now - (w * 7 + 3) * day).toISOString()
    sessions.push({
      id: 'sess' + id++,
      date: pullDate,
      exercises: [
        ex('deadlift', [
          { reps: 5, weight: dlBase + prog * 10 },
          { reps: 5, weight: dlBase + prog * 10 },
          { reps: 3, weight: dlBase + prog * 10 + 20 }
        ]),
        ex('barbell-row', [
          { reps: 8, weight: rowBase + prog * 5 },
          { reps: 8, weight: rowBase + prog * 5 },
          { reps: 8, weight: rowBase + prog * 5 }
        ]),
        ex('lat-pulldown', [
          { reps: 12, weight: 120 + prog * 3 },
          { reps: 10, weight: 130 + prog * 3 }
        ]),
        ex('barbell-curl', [
          { reps: 10, weight: curlBase + prog * 2.5 },
          { reps: 10, weight: curlBase + prog * 2.5 },
          { reps: 8, weight: curlBase + prog * 2.5 }
        ])
      ]
    })
    const legDate = new Date(now - (w * 7 + 1) * day).toISOString()
    sessions.push({
      id: 'sess' + id++,
      date: legDate,
      exercises: [
        ex('back-squat', [
          { reps: 6, weight: squatBase + prog * 7.5 },
          { reps: 6, weight: squatBase + prog * 7.5 },
          { reps: 5, weight: squatBase + prog * 7.5 + 10 }
        ]),
        ex('romanian-deadlift', [
          { reps: 10, weight: 155 + prog * 5 },
          { reps: 10, weight: 155 + prog * 5 }
        ]),
        ex('leg-press', [
          { reps: 12, weight: 270 + prog * 10 },
          { reps: 12, weight: 270 + prog * 10 }
        ]),
        ex('calf-raise', [
          { reps: 15, weight: 100 + prog * 5 },
          { reps: 15, weight: 100 + prog * 5 }
        ])
      ]
    })
  }
  return sessions.sort((a, b) => +new Date(a.date) - +new Date(b.date))
}