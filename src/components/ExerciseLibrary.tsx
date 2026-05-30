import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { EXERCISES, MUSCLE_GROUPS, EQUIPMENT } from '../lib/exercises'
import { useWorkoutStore } from '../hooks/useWorkoutStore'
import ExerciseCard from './ExerciseCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ClipboardList, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ExerciseLibrary() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState<string | null>(null)
  const [equip, setEquip] = useState<string | null>(null)
  const current = useWorkoutStore(s => s.current)
  const addExercise = useWorkoutStore(s => s.addExercise)

  const addedIds = new Set(current.map(c => c.exerciseId))

  const filtered = useMemo(() => {
    return EXERCISES.filter(e => {
      if (query && !e.name.toLowerCase().includes(query.toLowerCase())) return false
      if (muscle && e.muscle !== muscle) return false
      if (equip && e.equipment !== equip) return false
      return true
    })
  }, [query, muscle, equip])

  return (
    <div className="p-5 md:p-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-[#22c55e] font-semibold mb-1">Library</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">Exercises</h1>
        </div>
        {current.length > 0 && (
          <Button onClick={() => navigate('/plan')} className="bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 self-start transition-all duration-200">
            <ClipboardList size={18} /> {current.length} in workout
          </Button>
        )}
      </motion.div>

      <div className="sticky top-0 z-10 -mx-5 md:-mx-8 px-5 md:px-8 py-4 bg-[#0a0e0d]/90 backdrop-blur border-b border-[#1c2522] mb-6">
        <div className="relative mb-3">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6b66]" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exercises..."
            className="pl-10 bg-[#0e1413] border-[#1c2522] focus-visible:ring-[#22c55e]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-[#5a6b66] mr-1"><Filter size={13} /> Muscle:</span>
          {MUSCLE_GROUPS.map(m => (
            <Badge
              key={m}
              onClick={() => setMuscle(muscle === m ? null : m)}
              className={cn(
                'cursor-pointer border-0 transition-all duration-200',
                muscle === m ? 'bg-[#22c55e] text-[#0a0e0d]' : 'bg-[#141a18] text-[#8a9994] hover:bg-[#1c2522]'
              )}
            >{m}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-xs text-[#5a6b66] mr-1"><Filter size={13} /> Equipment:</span>
          {EQUIPMENT.map(eq => (
            <Badge
              key={eq}
              onClick={() => setEquip(equip === eq ? null : eq)}
              className={cn(
                'cursor-pointer border-0 transition-all duration-200',
                equip === eq ? 'bg-[#22c55e] text-[#0a0e0d]' : 'bg-[#141a18] text-[#8a9994] hover:bg-[#1c2522]'
              )}
            >{eq}</Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-xl bg-[#141a18] flex items-center justify-center mx-auto mb-4">
            <SearchX size={26} className="text-[#5a6b66]" />
          </div>
          <div className="text-[#8a9994] font-medium">No exercises match your filters.</div>
          <div className="text-sm text-[#5a6b66] mt-1">Try clearing your search or filters.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
            >
              <ExerciseCard exercise={e} added={addedIds.has(e.id)} onAdd={() => addExercise(e.id)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}