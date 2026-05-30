import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  value: number
  suffix?: string
  prefix?: string
  delta?: number
  icon: LucideIcon
  decimals?: number
  index?: number
}

export default function StatCard({ label, value, suffix = '', prefix = '', delta, icon: Icon, decimals = 0, index = 0 }: Props) {
  const animated = useCountUp(value)
  const display = decimals > 0 ? animated.toFixed(decimals) : Math.round(animated).toLocaleString()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="bg-[#0e1413] border-[#1c2522] p-5 relative overflow-hidden group transition-all duration-200 hover:border-[#22c55e]/40">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#22c55e]/5 group-hover:bg-[#22c55e]/10 transition-colors duration-200" />
        <div className="flex items-start justify-between">
          <div className="text-xs uppercase tracking-wider text-[#5a6b66] font-medium">{label}</div>
          <Icon size={18} strokeWidth={1.5} className="text-[#22c55e]" />
        </div>
        <div className="mt-3 font-display font-bold text-3xl tabular-nums">
          {prefix}{display}<span className="text-lg text-[#5a6b66] ml-0.5">{suffix}</span>
        </div>
        {delta !== undefined && (
          <Badge
            variant="secondary"
            className={cn(
              'mt-2 gap-1 border-0',
              delta >= 0 ? 'bg-[#22c55e]/15 text-[#22c55e]' : 'bg-red-500/15 text-red-400'
            )}
          >
            {delta >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta).toFixed(1)}% vs last week
          </Badge>
        )}
      </Card>
    </motion.div>
  )
}