import { useWorkoutStore } from '../hooks/useWorkoutStore'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { History, Dumbbell } from 'lucide-react'
import { sessionVolume, calcVolume } from '../lib/fitnessMath'
import { fmtDate } from '../lib/format'

export default function WorkoutHistoryList() {
  const sessions = useWorkoutStore(s => s.sessions)
  const sorted = [...sessions].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 12)

  return (
    <Card className="bg-[#0e1413] border-[#1c2522] p-6">
      <div className="flex items-center gap-2 mb-4">
        <History size={18} className="text-[#22c55e]" />
        <h3 className="font-display font-bold text-lg">Workout History</h3>
      </div>
      {sorted.length === 0 ? (
        <div className="text-sm text-[#5a6b66] py-8 text-center">No workouts logged yet.</div>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          {sorted.map(s => (
            <AccordionItem key={s.id} value={s.id} className="border border-[#1c2522] rounded-lg px-4 bg-[#0a0e0d] transition-all duration-200">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center justify-between w-full pr-3">
                  <div className="text-left">
                    <div className="text-sm font-semibold">{fmtDate(s.date)}</div>
                    <div className="text-xs text-[#5a6b66]">{s.exercises.length} exercises</div>
                  </div>
                  <Badge className="bg-[#22c55e]/15 text-[#22c55e] border-0">{sessionVolume(s).toLocaleString()} lbs</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <div className="space-y-2">
                  {s.exercises.map(e => (
                    <div key={e.exerciseId} className="flex items-center justify-between p-2 rounded-lg bg-[#0e1413]">
                      <div className="flex items-center gap-2 min-w-0">
                        <Dumbbell size={14} className="text-[#5a6b66] shrink-0" />
                        <span className="text-sm truncate">{e.name}</span>
                      </div>
                      <div className="text-xs text-[#8a9994] shrink-0 ml-2">
                        {e.sets.length} sets · {calcVolume(e.sets).toLocaleString()} lbs
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Card>
  )
}