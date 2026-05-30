import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { PersonalRecord } from '../types'
import { fmtDate } from '../lib/format'

interface Props {
  records: PersonalRecord[]
}

export default function PRTimeline({ records }: Props) {
  const sorted = [...records].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-[#1c2522]" />
      <div className="space-y-5">
        {sorted.map((pr, i) => (
          <motion.div
            key={pr.exerciseId}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="relative"
          >
            <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-[#22c55e] ring-4 ring-[#0a0e0d]" />
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span className="truncate">{pr.name}</span>
                  {pr.isNew && <Trophy size={13} className="text-[#22c55e] shrink-0" />}
                </div>
                <div className="text-xs text-[#5a6b66]">{fmtDate(pr.date)}</div>
              </div>
              <Badge className="bg-[#22c55e]/15 text-[#22c55e] border-0 shrink-0">{pr.best1RM} lbs 1RM</Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}