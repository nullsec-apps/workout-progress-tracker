import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Dumbbell, ClipboardList, TrendingUp, Trophy, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/plan', label: 'Plan Workout', icon: ClipboardList },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/records', label: 'Records', icon: Trophy }
]

export default function AppSidebar() {
  const navigate = useNavigate()
  return (
    <aside className="w-16 md:w-60 shrink-0 border-r border-[#1c2522] bg-[#0c1110] flex flex-col h-screen sticky top-0">
      <div className="px-4 md:px-6 py-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#22c55e] flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105">
          <Dumbbell size={20} strokeWidth={2.5} className="text-[#0a0e0d]" />
        </div>
        <div className="hidden md:block">
          <div className="font-display font-extrabold text-lg leading-none tracking-tight">IRONLOG</div>
          <div className="text-[10px] uppercase tracking-widest text-[#5a6b66] mt-0.5">Strength Journal</div>
        </div>
      </div>
      <Separator className="bg-[#1c2522]" />
      <nav className="flex-1 px-2 md:px-3 py-4 space-y-1">
        {links.map(l => {
          const Icon = l.icon
          return (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#22c55e]/10 text-[#22c55e]'
                    : 'text-[#8a9994] hover:text-[#e8f0ed] hover:bg-[#141a18]'
                )
              }
            >
              <Icon size={20} strokeWidth={1.5} className="shrink-0" />
              <span className="hidden md:inline">{l.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="p-2 md:p-4">
        <Button
          onClick={() => navigate('/plan')}
          className="w-full bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 transition-all duration-200"
        >
          <Zap size={18} strokeWidth={2.5} />
          <span className="hidden md:inline">Start Workout</span>
        </Button>
      </div>
    </aside>
  )
}