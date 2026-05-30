import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWorkoutStore } from '../hooks/useWorkoutStore'
import { usePersonalRecords } from '../hooks/usePersonalRecords'
import PRTimeline from './PRTimeline'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Trophy, Dumbbell } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PersonalRecords() {
  const sessions = useWorkoutStore(s => s.sessions)
  const seed = useWorkoutStore(s => s.seed)
  const prs = usePersonalRecords(sessions)

  useEffect(() => { seed() }, [seed])

  return (
    <div className="p-5 md:p-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="text-xs uppercase tracking-widest text-[#22c55e] font-semibold mb-1">Achievements</div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">Personal Records</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#0e1413] border-[#1c2522] p-0 overflow-hidden">
            <div className="p-5 border-b border-[#1c2522] flex items-center gap-2">
              <Trophy size={18} className="text-[#22c55e]" />
              <h3 className="font-display font-bold text-lg">All Records</h3>
            </div>
            {prs.length === 0 ? (
              <div className="p-12 text-center text-sm text-[#5a6b66]">No records yet. Log a workout to start tracking.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#1c2522] hover:bg-transparent">
                      <TableHead className="text-[#5a6b66]">Exercise</TableHead>
                      <TableHead className="text-[#5a6b66] text-right">Max Weight</TableHead>
                      <TableHead className="text-[#5a6b66] text-right">Max Reps</TableHead>
                      <TableHead className="text-[#5a6b66] text-right">Est. 1RM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prs.map(pr => (
                      <TableRow key={pr.exerciseId} className={cn('border-[#1c2522] hover:bg-[#141a18] transition-all duration-200', pr.isNew && 'pr-glow')}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#141a18] flex items-center justify-center shrink-0">
                              <Dumbbell size={14} className="text-[#22c55e]" />
                            </div>
                            <span>{pr.name}</span>
                            {pr.isNew && <Badge className="bg-[#22c55e]/15 text-[#22c55e] border-0 text-[10px] gap-1"><Trophy size={10} /> New</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-semibold">{pr.maxWeight} lbs</TableCell>
                        <TableCell className="text-right tabular-nums text-[#8a9994]">{pr.maxReps}</TableCell>
                        <TableCell className="text-right tabular-nums font-bold text-[#22c55e]">{pr.best1RM} lbs</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-[#0e1413] border-[#1c2522] p-5 h-full">
            <h3 className="font-display font-bold text-lg mb-5">PR Timeline</h3>
            {prs.length === 0 ? (
              <div className="text-sm text-[#5a6b66] py-8 text-center">No records yet.</div>
            ) : (
              <PRTimeline records={prs} />
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}