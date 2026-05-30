import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWorkoutStore } from '../hooks/useWorkoutStore'
import { useProgressData } from '../hooks/useProgressData'
import { usePersonalRecords } from '../hooks/usePersonalRecords'
import StatCard from './StatCard'
import WorkoutHistoryList from './WorkoutHistoryList'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Flame, TrendingUp, Trophy, ArrowRight, Activity } from 'lucide-react'
import { sessionVolume, weekKey } from '../lib/fitnessMath'
import { fmtShortDate } from '../lib/format'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function Dashboard() {
  const navigate = useNavigate()
  const sessions = useWorkoutStore(s => s.sessions)
  const seed = useWorkoutStore(s => s.seed)
  const { weeklyVolume } = useProgressData(sessions)
  const prs = usePersonalRecords(sessions)

  useEffect(() => { seed() }, [seed])

  const stats = useMemo(() => {
    const totalWorkouts = sessions.length
    const thisWeek = weekKey(new Date().toISOString())
    const thisWeekVol = sessions.filter(s => weekKey(s.date) === thisWeek).reduce((a, s) => a + sessionVolume(s), 0)
    const lastVols = weeklyVolume.slice(-2)
    let delta = 0
    if (lastVols.length === 2 && lastVols[0].volume > 0) {
      delta = ((lastVols[1].volume - lastVols[0].volume) / lastVols[0].volume) * 100
    }
    const weeks = new Set(sessions.map(s => weekKey(s.date))).size
    return { totalWorkouts, thisWeekVol, delta, weeks }
  }, [sessions, weeklyVolume])

  const chartData = weeklyVolume.slice(-10).map(w => ({ ...w, label: fmtShortDate(w.week) }))
  const newPRs = prs.filter(p => p.isNew)

  return (
    <div className="p-5 md:p-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div>
          <div className="text-xs uppercase tracking-widest text-[#22c55e] font-semibold mb-1">Welcome back</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">Your Training</h1>
        </div>
        <Button onClick={() => navigate('/plan')} className="bg-[#22c55e] hover:bg-[#1ea84f] text-[#0a0e0d] font-semibold gap-2 self-start transition-all duration-200">
          Plan a Workout <ArrowRight size={18} />
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Workouts" value={stats.totalWorkouts} icon={Dumbbell} index={0} />
        <StatCard label="This Week Volume" value={stats.thisWeekVol} suffix=" lbs" delta={stats.delta} icon={TrendingUp} index={1} />
        <StatCard label="Active Weeks" value={stats.weeks} icon={Flame} index={2} />
        <StatCard label="Tracked PRs" value={prs.length} icon={Trophy} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#0e1413] border-[#1c2522] p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#22c55e]" />
                <h3 className="font-display font-bold text-lg">Weekly Volume</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-[#8a9994] hover:text-[#22c55e] transition-all duration-200" onClick={() => navigate('/progress')}>
                View all <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#141a18', border: '1px solid #1c2522', borderRadius: 8, color: '#e8f0ed' }}
                    formatter={(v: number) => [v.toLocaleString() + ' lbs', 'Volume']}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#22c55e" strokeWidth={2.5} fill="url(#dashGrad)" animationDuration={1200} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="bg-[#0e1413] border-[#1c2522] p-6 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-[#22c55e]" />
              <h3 className="font-display font-bold text-lg">Recent PRs</h3>
            </div>
            {newPRs.length === 0 ? (
              <div className="text-sm text-[#5a6b66] py-8 text-center">Keep training to set new records.</div>
            ) : (
              <div className="space-y-3">
                {newPRs.slice(0, 5).map(pr => (
                  <div key={pr.exerciseId} className="flex items-center justify-between p-3 rounded-lg bg-[#141a18] pr-glow transition-all duration-200 hover:bg-[#1a221f]">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{pr.name}</div>
                      <div className="text-xs text-[#5a6b66]">{fmtShortDate(pr.date)}</div>
                    </div>
                    <Badge className="bg-[#22c55e]/15 text-[#22c55e] border-0 shrink-0 ml-2">{pr.best1RM} 1RM</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <WorkoutHistoryList />
      </motion.div>
    </div>
  )
}