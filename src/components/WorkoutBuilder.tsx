import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useWorkoutStore } from '../hooks/useWorkoutStore'
import { EXERCISES } from '../lib/exercises'
import SetRepEditor from './SetRepEditor'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2, Search, ClipboardList, CheckCircle2, Dumbbell } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { calcVolume } from '../lib/fitnessMath'
import { cn } from '@/lib/utils'

export default function WorkoutBuilder() {
  const navigate = useNavigate()
  const current = useWorkoutStore(s => s.current)
  const addExercise = useWorkoutStore(s => s.addExercise)
  const removeExercise = useWorkoutStore(s => s.removeExercise)
  const addSet = useWorkoutStore(s => s.addSet)
  const removeSet = useWorkoutStore(s => s.removeSet)
  const updateSet = useWorkoutStore(s => s.updateSet)
  const clearCurrent = useWorkoutStore(s => s.clearCurrent)
  const logSession = useWorkoutStore(s => s.logSession)

  const [pickerQuery, setPickerQuery] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)

  const addedIds = new Set(current.map(c => c.exerciseId))
  const totalVolume = useMemo(() => current.reduce((a, e) => a + calcVolume(e.sets), 0), [current])
  const totalSets = current.reduce((a, e) => a + e.sets.length, 0)

  const pickerList = EXERCISES.filter(e =>
    !pickerQuery || e.name.toLowerCase().includes(pickerQuery.toLowerCase())
  )

  const handleLog = () => {
    const id = logSession()
    if (id) {
      toast.success('Workout logged!', { style: { background: '#141a18', color: '#e8f0ed', border: '1px solid #1c2522' } })
      navigate('/progress')
    }
  }

  return (
    <div className="p-5 md:p-8 max-w-[1100px] mx-auto">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-[#22c55e] font-semibold mb-1">Builder</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">Plan Workout</h1>
        </div>
        <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 self-start transition-all duration-200">
              <Plus size={18} /> Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0e1413] border-[#1c2522] text-[#e8f0ed] max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Add Exercise</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6b66]" />
              <Input value={pickerQuery} onChange={e => setPickerQuery(e.target.value)} placeholder="Search..." className="pl-10 bg-[#0a0e0d] border-[#1c2522]" />
            </div>
            <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
              {pickerList.length === 0 ? (
                <div className="text-sm text-[#5a6b66] py-8 text-center">No exercises found.</div>
              ) : pickerList.map(e => (
                <button
                  key={e.id}
                  onClick={() => { addExercise(e.id) }}
                  disabled={addedIds.has(e.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200',
                    addedIds.has(e.id) ? 'bg-[#141a18] opacity-50 cursor-default' : 'hover:bg-[#141a18]'
                  )}
                >
                  <div>
                    <div className="text-sm font-medium">{e.name}</div>
                    <div className="text-xs text-[#5a6b66]">{e.muscle} · {e.equipment}</div>
                  </div>
                  {addedIds.has(e.id) ? <CheckCircle2 size={18} className="text-[#22c55e]" /> : <Plus size={18} className="text-[#8a9994]" />}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {current.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#0e1413] border-[#1c2522] p-4">
            <div className="text-xs uppercase tracking-wider text-[#5a6b66]">Exercises</div>
            <div className="font-display font-bold text-2xl mt-1">{current.length}</div>
          </Card>
          <Card className="bg-[#0e1413] border-[#1c2522] p-4">
            <div className="text-xs uppercase tracking-wider text-[#5a6b66]">Total Sets</div>
            <div className="font-display font-bold text-2xl mt-1">{totalSets}</div>
          </Card>
          <Card className="bg-[#0e1413] border-[#1c2522] p-4">
            <div className="text-xs uppercase tracking-wider text-[#5a6b66]">Volume</div>
            <div className="font-display font-bold text-2xl mt-1 text-[#22c55e]">{totalVolume.toLocaleString()}</div>
          </Card>
        </div>
      )}

      {current.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="bg-[#0e1413] border-[#1c2522] border-dashed p-12 text-center">
            <div className="w-14 h-14 rounded-xl bg-[#141a18] flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={26} className="text-[#5a6b66]" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">No exercises yet</h3>
            <p className="text-sm text-[#5a6b66] mb-5">Add exercises to build your workout and track your sets.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button onClick={() => setPickerOpen(true)} className="bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 transition-all duration-200">
                <Plus size={18} /> Add Exercise
              </Button>
              <Button variant="outline" onClick={() => navigate('/exercises')} className="border-[#1c2522] bg-transparent hover:bg-[#141a18] text-[#e8f0ed] transition-all duration-200">
                Browse Library
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {current.map(e => (
              <motion.div
                key={e.exerciseId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-[#0e1413] border-[#1c2522] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#141a18] flex items-center justify-center">
                        <Dumbbell size={16} className="text-[#22c55e]" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold">{e.name}</h4>
                        <Badge variant="secondary" className="bg-[#141a18] text-[#8a9994] border-0 text-[10px] mt-0.5">{e.muscle}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-[#5a6b66] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200" onClick={() => removeExercise(e.exerciseId)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Separator className="bg-[#1c2522] mb-3" />
                  <div className="space-y-1">
                    {e.sets.map((s, i) => (
                      <SetRepEditor
                        key={s.id}
                        set={s}
                        index={i}
                        onUpdate={patch => updateSet(e.exerciseId, s.id, patch)}
                        onRemove={() => removeSet(e.exerciseId, s.id)}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 text-[#22c55e] hover:bg-[#22c55e]/10 gap-1.5 transition-all duration-200" onClick={() => addSet(e.exerciseId)}>
                    <Plus size={14} /> Add Set
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handleLog} className="flex-1 bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 h-12 transition-all duration-200">
              <CheckCircle2 size={18} /> Log Workout
            </Button>
            <Button variant="outline" onClick={clearCurrent} className="border-[#1c2522] bg-transparent hover:bg-[#141a18] text-[#e8f0ed] h-12 gap-2 transition-all duration-200">
              <Trash2 size={16} /> Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}