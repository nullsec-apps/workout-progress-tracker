import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Minus, Plus, X } from 'lucide-react'
import { SetEntry } from '../types'
import { cn } from '@/lib/utils'

interface Props {
  set: SetEntry
  index: number
  onUpdate: (patch: Partial<SetEntry>) => void
  onRemove: () => void
}

function Stepper({ value, onChange, step = 5, min = 0, unit }: { value: number; onChange: (v: number) => void; step?: number; min?: number; unit?: string }) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8a9994] hover:text-[#22c55e] hover:bg-[#141a18] transition-all duration-200" onClick={() => onChange(Math.max(min, value - step))}>
        <Minus size={14} />
      </Button>
      <div className="w-14 text-center tabular-nums font-semibold text-sm">{value}{unit}</div>
      <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8a9994] hover:text-[#22c55e] hover:bg-[#141a18] transition-all duration-200" onClick={() => onChange(value + step)}>
        <Plus size={14} />
      </Button>
    </div>
  )
}

export default function SetRepEditor({ set, index, onUpdate, onRemove }: Props) {
  return (
    <div className={cn('flex items-center gap-2 sm:gap-4 p-2 rounded-lg transition-all duration-200', set.done ? 'bg-[#22c55e]/5' : 'bg-[#0a0e0d]')}>
      <div className="w-6 text-center text-xs font-bold text-[#5a6b66]">{index + 1}</div>
      <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#5a6b66] w-10">Weight</span>
          <Stepper value={set.weight} onChange={v => onUpdate({ weight: v })} step={5} unit="" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[#5a6b66] w-10">Reps</span>
          <Stepper value={set.reps} onChange={v => onUpdate({ reps: v })} step={1} min={1} />
        </div>
      </div>
      <Checkbox
        checked={set.done}
        onCheckedChange={c => onUpdate({ done: !!c })}
        className="border-[#2a3633] data-[state=checked]:bg-[#22c55e] data-[state=checked]:border-[#22c55e]"
      />
      <Button variant="ghost" size="icon" className="h-7 w-7 text-[#5a6b66] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200" onClick={onRemove}>
        <X size={14} />
      </Button>
    </div>
  )
}