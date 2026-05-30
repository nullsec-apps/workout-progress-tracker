import { Card } from '@/components/ui/card'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { fmtShortDate } from '../lib/format'

interface Props {
  data: { week: string; volume: number }[]
}

export default function VolumeAreaChart({ data }: Props) {
  const chartData = data.map(d => ({ ...d, label: fmtShortDate(d.week) }))
  return (
    <Card className="bg-[#0e1413] border-[#1c2522] p-6">
      <h3 className="font-display font-bold text-lg mb-4">Training Volume by Week</h3>
      {chartData.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-sm text-[#5a6b66]">No volume data yet.</div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2522" vertical={false} />
              <XAxis dataKey="label" stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#3a4642" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + 'k'} />
              <Tooltip
                contentStyle={{ background: '#141a18', border: '1px solid #1c2522', borderRadius: 8, color: '#e8f0ed' }}
                formatter={(v: number) => [v.toLocaleString() + ' lbs', 'Volume']}
              />
              <Area type="monotone" dataKey="volume" stroke="#22c55e" strokeWidth={2.5} fill="url(#volGrad)" animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}