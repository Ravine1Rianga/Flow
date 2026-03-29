import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { MpesaBadge } from '../components/MpesaBadge'
import { Money } from '../components/Money'
import { PaymentStatusPill } from '../components/PaymentStatusPill'
import { DELIVERIES, FARMERS, MPESA_FEED, SCORE_FACTORS } from '../data/seed'
import { fetchFarmer } from '../lib/api'

const TABS = ['Deliveries', 'Payment ledger', 'Credit profile', 'M-Pesa activity'] as const

export function FarmerProfilePage() {
  const { id } = useParams()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Deliveries')
  const [farmer, setFarmer] = useState<(typeof FARMERS)[0] | null>(null)

  useEffect(() => {
    void (async () => {
      if (!id) return
      setFarmer(await fetchFarmer(id))
    })()
  }, [id])

  const rows = useMemo(() => DELIVERIES.filter((d) => d.farmerId === id), [id])

  if (!farmer) {
    return (
      <div>
        <div className="skeleton" style={{ height: 120 }} />
        <div className="skeleton" style={{ height: 220, marginTop: 12 }} />
      </div>
    )
  }

  const monthly = [1, 2, 3, 4, 5, 6].map((m) => ({ m: `M${m}`, kg: 800 + ((farmer.creditScore + m * 37) % 500) }))

  return (
    <div>
      <div
        style={{
          borderRadius: 18,
          padding: 22,
          background: 'var(--forest)',
          color: '#fff',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.15)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 900,
              fontSize: 26,
            }}
          >
            {farmer.name
              .split(' ')
              .map((x) => x[0])
              .join('')}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26 }}>{farmer.name}</div>
            <div style={{ opacity: 0.8, marginTop: 4 }}>
              {farmer.memberNo} · {farmer.factory} · {farmer.zone}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <Chip>{Math.round(farmer.totalKg).toLocaleString()} kg total</Chip>
              <Chip>
                <Money amount={farmer.totalEarned} /> earned
              </Chip>
              <Chip>Active since {farmer.activeSince}</Chip>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Donut score={farmer.creditScore} tier={farmer.creditTier} />
          <div style={{ marginTop: 10 }}>
            <Link className="btn btn-gold" to="/flowcredit/disburse">
              <MpesaBadge /> Disburse
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className="btn"
            style={{
              borderRadius: 999,
              background: tab === t ? 'rgba(82,183,136,0.18)' : '#fff',
              borderColor: tab === t ? 'var(--fresh)' : 'rgba(0,0,0,0.08)',
            }}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Deliveries' && (
        <div className="card-surface page-enter" style={{ padding: 16, marginTop: 16 }}>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="kg" fill="var(--leaf)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--muted)', fontSize: 12 }}>
                <th style={{ padding: 10 }}>Date</th>
                <th>Kg</th>
                <th>Grade</th>
                <th>Rate</th>
                <th>Gross</th>
                <th>Deductions</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 10).map((r) => (
                <tr key={r.id}>
                  <td style={{ padding: 10 }}>{r.date}</td>
                  <td className="mono">{r.kg}</td>
                  <td>{r.grade}</td>
                  <td className="mono">{r.rate}</td>
                  <td className="mono">
                    <Money amount={r.gross} />
                  </td>
                  <td className="mono" title="SACCO · loan · levy">
                    <Money amount={r.deductions} />
                  </td>
                  <td className="mono">
                    <Money amount={r.net} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Payment ledger' && (
        <div className="card-surface page-enter" style={{ padding: 16, marginTop: 16 }}>
          <Timeline />
        </div>
      )}

      {tab === 'Credit profile' && (
        <div className="card-surface page-enter" style={{ padding: 16, marginTop: 16 }}>
          <Speedometer value={farmer.creditScore} />
          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            {SCORE_FACTORS.map((f) => (
              <div key={f.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>{f.label}</span>
                  <span className="mono">{(farmer.creditScore + f.label.length * 3) % 100}</span>
                </div>
                <div style={{ height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
                  <div
                    style={{
                      width: `${(farmer.creditScore + f.label.length * 3) % 100}%`,
                      height: '100%',
                      background: 'var(--fresh)',
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="chip" style={{ background: 'rgba(212,160,23,0.18)', color: '#6a4b00' }}>
              Max KSh 30k · 8% flat · 3 deductions
            </div>
            <Link className="btn btn-gold" to="/flowcredit">
              Apply for loan
            </Link>
          </div>
        </div>
      )}

      {tab === 'M-Pesa activity' && (
        <div className="card-surface page-enter" style={{ padding: 0, marginTop: 16, overflow: 'hidden' }}>
          <div style={{ padding: 12, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['All', 'Inflow', 'Outflow', 'Repayment', 'Disbursement'].map((x) => (
              <button key={x} className="btn btn-ghost" type="button" style={{ padding: '6px 10px' }}>
                {x}
              </button>
            ))}
          </div>
          <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: 12, color: 'var(--muted)' }}>
                <th style={{ padding: 10 }}>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MPESA_FEED.map((t) => (
                <tr key={t.id}>
                  <td style={{ padding: 10 }} className="mono">
                    {t.id}
                  </td>
                  <td>{t.type}</td>
                  <td className="mono">
                    <Money amount={t.amount} gold={t.direction === 'out'} />
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{t.ts}</td>
                  <td>
                    <PaymentStatusPill
                      status={t.pending ? 'Pending' : t.code === '0' ? 'Paid' : 'Failed'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 12, fontWeight: 700 }}>
      {children}
    </span>
  )
}

function Donut({ score, tier }: { score: number; tier: string }) {
  const pct = score
  return (
    <div style={{ width: 110, marginLeft: 'auto' }}>
      <svg viewBox="0 0 36 36" style={{ width: 110, height: 110 }}>
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={tier === 'A' ? 'var(--fresh)' : tier === 'B' ? '#f59e0b' : '#fca5a5'}
          strokeWidth="3"
          strokeDasharray={`${pct}, 100`}
          strokeLinecap="round"
        />
        <text x="18" y="20.35" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="900">
          {score}
        </text>
      </svg>
      <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.85 }}>Grade {tier}</div>
    </div>
  )
}

function Timeline() {
  const items = [
    { dt: '2025-03-28 14:22', status: 'Paid' as const, amt: 18500, id: 'SLQCOOP01' },
    { dt: '2025-03-10 09:05', status: 'Pending' as const, amt: 3200, id: 'PEND-303' },
    { dt: '2025-02-26 18:51', status: 'Failed' as const, amt: 9800, id: 'ERR-991' },
  ]
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((it) => (
        <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '160px 10px 1fr', gap: 12, alignItems: 'start' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{it.dt}</div>
          <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 999, background: it.status === 'Paid' ? 'var(--fresh)' : it.status === 'Pending' ? '#f59e0b' : '#ef4444' }} />
          <div className="card-surface" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <div className="mono" style={{ fontWeight: 800 }}>
                  <Money amount={it.amt} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>M-Pesa {it.id}</div>
              </div>
              <PaymentStatusPill status={it.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Speedometer({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg width="220" height="120" viewBox="0 0 220 120">
        <path d="M20 100 A90 90 0 0 1 200 100" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M20 100 A90 90 0 0 1 200 100"
          fill="none"
          stroke="url(#g)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 283} 283`}
        />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="var(--fresh)" />
          </linearGradient>
        </defs>
        <text x="110" y="88" textAnchor="middle" fontWeight="900" fontSize="18" fill="var(--text)">
          {value}
        </text>
      </svg>
      <div style={{ color: 'var(--muted)', maxWidth: 420 }}>
        Animated needle on load — score drives FlowCredit limits. M-Pesa history verified through Daraja Transaction Status API (simulated).
      </div>
    </div>
  )
}
