import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis } from 'recharts'

const donut = [
  { name: 'SACCO', value: 45 },
  { name: 'Loan', value: 35 },
  { name: 'Levy', value: 20 },
]
const cols = ['var(--fresh)', 'var(--gold)', '#8b5cf6']

export function PortalDeductions() {
  const bars = [
    { m: 'Jan', v: 4200 },
    { m: 'Feb', v: 5100 },
    { m: 'Mar', v: 4800 },
  ]
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>Deductions</h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={donut} dataKey="value" innerRadius={55} outerRadius={80}>
              {donut.map((_, i) => (
                <Cell key={i} fill={cols[i % cols.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height: 220, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bars}>
            <XAxis dataKey="m" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="v" fill="var(--leaf)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card-surface" style={{ padding: 12, marginTop: 12, fontWeight: 900 }}>
        Total deducted this year: <span className="mono">KSh 141,000</span>
      </div>
    </div>
  )
}
