import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CountUpNumber } from '../components/CountUp'
import { MpesaBadge } from '../components/MpesaBadge'
import { Money } from '../components/Money'
import { PaymentStatusPill } from '../components/PaymentStatusPill'
import { fetchChartActivity, fetchRecentPayments, fetchStats } from '../lib/api'
import { FARMERS } from '../data/seed'

export function DashboardPage() {
  const [stats, setStats] = useState({ farmers: 342, kgMonth: 48230, disbursedMonth: 2400000, pendingPayments: 2 })
  const [payments, setPayments] = useState<Awaited<ReturnType<typeof fetchRecentPayments>>>([])
  const [chart, setChart] = useState<{ day: number; kg: number; payments: number }[]>([])

  useEffect(() => {
    void (async () => {
      const [s, p, c] = await Promise.all([fetchStats(), fetchRecentPayments(), fetchChartActivity()])
      setStats(s)
      setPayments(p)
      setChart(c)
    })()
  }, [])

  const pending = stats.pendingPayments

  return (
    <div>
      <h2 style={{ marginBottom: 6 }}>Operations overview</h2>
      <p style={{ color: 'var(--muted)', marginTop: 0 }}>Live cooperative intake, quality and M-Pesa settlements.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
          gap: 14,
          marginTop: 18,
        }}
      >
        <StatCard label="Registered farmers" value={stats.farmers} />
        <StatCard label="Kg delivered (month)" value={stats.kgMonth} format={(n) => `${Math.round(n).toLocaleString()} kg`} />
        <StatCard
          label="Disbursed (month)"
          value={stats.disbursedMonth}
          format={(n) => {
            const m = n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}k`
            return `KSh ${m}`
          }}
          gold
        />
        <div
          className="card-surface"
          style={{
            padding: 16,
            border: pending > 0 ? '2px solid rgba(217,119,6,0.55)' : undefined,
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            Pending payments
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, marginTop: 6 }}>
            <CountUpNumber value={pending} formatter={(x) => String(Math.round(x))} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Awaiting B2C confirmation</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginTop: 18 }}>
        <div className="card-surface" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)' }}>Delivery & payment activity</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Last 30 days · Kiambu corridor</div>
            </div>
            <MpesaBadge />
          </div>
          <div style={{ height: 260, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="kg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--fresh)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--fresh)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="kg" stroke="var(--leaf)" fill="url(#kg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface" style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Payment queue</div>
          <button className="btn btn-gold" style={{ width: '100%', marginBottom: 10, justifyContent: 'center' }}>
            <MpesaBadge /> Disburse all
          </button>
          {FARMERS.filter((f) => f.loanFlow === 'eligible').slice(0, 4).map((f) => (
            <div
              key={f.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: 'rgba(82,183,136,0.18)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {f.name
                  .split(' ')
                  .map((x) => x[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.memberNo}</div>
              </div>
              <Money amount={15000 + f.creditScore * 120} />
              <button className="btn btn-primary" style={{ padding: '8px 10px' }}>
                <MpesaBadge />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
        <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)' }}>Recent payments</div>
          </div>
          <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: 12, color: 'var(--muted)' }}>
                <th style={{ padding: 12 }}>Farmer</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Deductions</th>
                <th>Net</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: 12, fontWeight: 700 }}>{p.farmer}</td>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {p.phone}
                  </td>
                  <td className="mono">
                    <Money amount={p.amount} />
                  </td>
                  <td className="mono">
                    <Money amount={p.deductions} />
                  </td>
                  <td className="mono">
                    <Money amount={p.net} />
                  </td>
                  <td>
                    <PaymentStatusPill status={p.status} />
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card-surface" style={{ padding: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Factory leaderboard</div>
            {['Kiambu Tea Factory', 'Meru Coffee Factory', 'Kisumu Dairy Cooperative'].map((name, i) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontWeight: 600 }}>
                  {i + 1}. {name}
                </span>
                <span className="mono">{`${(48.2 - i * 4.1).toFixed(1)}t`}</span>
              </div>
            ))}
          </div>
          <div className="card-surface" style={{ padding: 14, borderColor: 'rgba(185,28,28,0.35)' }}>
            <div style={{ fontWeight: 900, color: '#991b1b', marginBottom: 8 }}>Alerts</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 13 }}>
              <li>Overdue repayment — Peter Mwangi (FlowCredit)</li>
              <li>B2C timeout retry queued — batch 14-B</li>
              <li>3 farmers with zero intake this fortnight</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  format,
  gold,
}: {
  label: string
  value: number
  format?: (n: number) => string
  gold?: boolean
}) {
  return (
    <div className="card-surface" style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{label}</div>
      <div
        className={gold ? 'money' : ''}
        style={{
          fontFamily: gold ? 'var(--font-mono)' : 'var(--font-display)',
          fontWeight: 800,
          fontSize: 28,
          marginTop: 6,
          color: gold ? 'var(--gold)' : undefined,
        }}
      >
        <CountUpNumber value={value} formatter={format ?? ((n) => Math.round(n).toLocaleString())} />
      </div>
    </div>
  )
}
