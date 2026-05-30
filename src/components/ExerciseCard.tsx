import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Check, Dumbbell } from 'lucide-react'
import { motion } from 'framer-motion'
import { Exercise } from '../types'
import { cn } from '@/lib/utils'

interface Props {
  exercise: Exercise
  added: boolean
  onAdd: () => void
}

const muscleColors: Record<string, string> = {
  Chest: 'bg-rose-500/15 text-rose-300',
  Back: 'bg-blue-500/15 text-blue-300',
  Shoulders: 'bg-amber-500/15 text-amber-300',
  Biceps: 'bg-violet-500/15 text-violet-300',
  Triceps: 'bg-fuchsia-500/15 text-fuchsia-300',
  Legs: 'bg-emerald-500/15 text-emerald-300',
  Glutes: 'bg-pink-500/15 text-pink-300',
  Core: 'bg-cyan-500/15 text-cyan-300'
}

export default function ExerciseCard({ exercise, added, onAdd }: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="bg-[#0e1413] border-[#1c2522] p-4 hover:border-[#22c55e]/40 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#141a18] flex items-center justify-center shrink-0">
            <Dumbbell size={18} strokeWidth={1.5} className="text-[#22c55e]" />
          </div>
          <Badge variant="secondary" className={cn('border-0 text-[10px]', muscleColors[exercise.muscle] || 'bg-[#141a18] text-[#8a9994]')}>
            {exercise.muscle}
          </Badge>
        </div>
        <h4 className="font-display font-semibold text-base leading-tight mb-1">{exercise.name}</h4>
        <div className="text-xs text-[#5a6b66] mb-4">{exercise.equipment} · {exercise.category}</div>
        <Button
          onClick={onAdd}
          disabled={added}
          size="sm"
          className={cn(
            'mt-auto w-full gap-1.5 font-medium transition-all duration-200',
            added
              ? 'bg-[#141a18] text-[#22c55e] hover:bg-[#141a18] cursor-default'
              : 'bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d]'
          )}
        >
          {added ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add to Workout</>}
        </Button>
      </Card>
    </motion.div>
  )
}