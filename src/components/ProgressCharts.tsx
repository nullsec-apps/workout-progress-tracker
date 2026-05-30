import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWorkoutStore } from '../hooks/useWorkoutStore'
import { useProgressData } from '../hooks/useProgressData'
import VolumeAreaChart from './VolumeAreaChart'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { fmtShortDate } from '../lib/format'

export default function ProgressCharts() {
  const sessions = useWorkoutStore(s => s.sessions)
  const seed = useWorkoutStore(s => s.seed)
  useEffect(() => { seed() }, [seed])

  const exerciseOptions = useMemo(() => {
    const map = new Map<string, string>()
    sessions.forEach(s => s.exercises.forEach(e => map.set(e.exerciseId, e.name)))
    return Array.from(map.entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
  }, [sessions])

  const [selected, setSelected] = useState('')
  useEffect(() => {
    if (!selected && exerciseOptions.length) setSelected(exerciseOptions[0].id)
  }, [exerciseOptions, selected])

  const { weeklyVolume, progression, frequency } = useProgressData(sessions, selected)

  const progData = progression.map(p => ({ ...p, label: fmtShortDate(p.date) }))
  const freqData = frequency.map(f => ({ ...f, label: fmtShortDate(f.week) }))

  return (
    <div className="p-5 md:p-8 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="text-xs uppercase tracking-widest text-[#22c55e] font-semibold mb-1">Analytics</div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">Progress</h1>
      </motion.div>

      <Tabs defaultValue="volume" className="space-y-6">
        <TabsList className="bg-[#0e1413] border border-[#1c2522]">
          <TabsTrigger value="volume" className="data-[state=active]:bg-[#22c55e] data-[state=active]:text-[#0a0e0d] transition-all duration-200">Volume</TabsTrigger>
          <TabsTrigger value="strength" className="data-[state=active]:bg-[#22c55e] data-[state=active]:text-[#0a0e0d] transition-all duration-200">Strength</TabsTrigger>
          <TabsTrigger value="frequency" className="data-[state=active]:bg-[#22c55e] data-[state=active]:text-[#0a0e0d] transition-all duration-200">Frequency</TabsTrigger>
        </TabsList>

        <TabsContent value="volume">
          <VolumeAreaChart data={weeklyVolume} />
        </TabsContent>

        <TabsContent value="strength">
          <Card className="bg-[#0e1413] border-[#1c2522] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#22c55e]" />
                <h3 className="font-display font-bold text-lg">Weight Progression</h3>
              </div>
              <Select value={selected} onValueChange={setSelected}>
                <SelectTrigger className="w-full sm:w-56 bg-[#0a0e0d] border-[#1c2522]">
                  <SelectValue placeholder="Pick exercise" />
                </SelectTrigger>
                <SelectContent className="bg-[#0e1413] border-[#1c2522] text-[#e8f0ed]">
                  {exerciseOptions.map(o => (
                    <SelectItem key={o.id} value={o.id} className="focus:bg-[#141a18] focus:text-[#22c55e]">{o.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {progData.length === 0 ? (
              <div className="h-72 flex items-center justify-center text-sm text-[#5a6b66]">No progression data for this exercise.</div>
            ) : (
              <>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c2522" vertical={false} />
                      <XAxis dataKey="label" stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: '#141a18', border: '1px solid #1c2522', borderRadius: 8, color: '#e8f0ed' }} />
                      <Line type="monotone" dataKey="weight" name="Top Weight" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3, fill: '#22c55e' }} animationDuration={1200} />
                      <Line type="monotone" dataKey="e1rm" name="Est. 1RM" stroke="#a3e635" strokeWidth={2} strokeDasharray="4 4" dot={false} animationDuration={1200} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#22c55e]" /> Top Weight</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-0.5" style={{ borderTop: '2px dashed #a3e635' }} /> Est. 1RM</div>
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="frequency">
          <Card className="bg-[#0e1413] border-[#1c2522] p-6">
            <h3 className="font-display font-bold text-lg mb-4">Workouts per Week</h3>
            {freqData.length === 0 ? (
              <div className="h-72 flex items-center justify-center text-sm text-[#5a6b66]">No frequency data yet.</div>
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={freqData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1c2522" vertical={false} />
                    <XAxis dataKey="label" stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip cursor={{ fill: '#141a18' }} contentStyle={{ background: '#141a18', border: '1px solid #1c2522', borderRadius: 8, color: '#e8f0ed' }} formatter={(v: number) => [v + ' workouts', 'Sessions']} />
                    <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} animationDuration={1000} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}