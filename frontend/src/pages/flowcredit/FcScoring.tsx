import { useMemo, useState } from 'react'
import { FARMERS, MPESA_FEED, SCORE_FACTORS } from '../../data/seed'

export function FlowCreditScoringPage() {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(FARMERS[0])

  const filtered = useMemo(
    () => FARMERS.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  )

  const grade = sel.creditTier
  const ring = sel.creditScore

  return (
    <div>
      <h2 style={{ color: 'var(--gold)' }}>Credit scoring</h2>
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <input className="input" style={{ maxWidth: 380 }} placeholder="Farmer autocomplete…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="card-surface" style={{ padding: 8, maxHeight: 200, overflow: 'auto', minWidth: 260 }}>
          {filtered.map((f) => (
            <button key={f.id} className="btn btn-ghost" type="button" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setSel(f)}>
              {f.name} · {f.memberNo}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14, marginTop: 16 }}>
        <div className="card-surface page-enter" style={{ padding: 16 }}>
          <svg viewBox="0 0 36 36" style={{ width: 160, height: 160, margin: '0 auto', display: 'block' }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={grade === 'A' ? 'var(--fresh)' : grade === 'B' ? '#f59e0b' : '#ef4444'}
              strokeWidth="3"
              strokeDasharray={`${ring}, 100`}
              strokeLinecap="round"
            />
            <text x="18" y="20.35" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="900">
              {ring}
            </text>
          </svg>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <div style={{ fontWeight: 900 }}>Grade {grade} — {grade === 'A' ? 'Low risk' : grade === 'B' ? 'Moderate' : 'Elevated'}</div>
            <button className="btn btn-gold" type="button" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
              Generate loan offer
            </button>
          </div>
        </div>
        <div className="card-surface page-enter" style={{ padding: 16 }}>
          <strong>Factor breakdown</strong>
          <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
            {SCORE_FACTORS.map((f) => (
              <div key={f.key}>
                <div style={{ fontWeight: 800 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{f.desc}</div>
                <div style={{ height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ width: `${60 + f.label.length}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-surface" style={{ padding: 0, overflow: 'hidden', marginTop: 16 }}>
        <div style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <strong>M-Pesa transaction basis</strong>
        </div>
        <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', fontSize: 12, color: 'var(--muted)' }}>
              <th style={{ padding: 12 }}>Date</th>
              <th>Source</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Credit signal</th>
            </tr>
          </thead>
          <tbody>
            {MPESA_FEED.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: 12 }}>{t.ts}</td>
                <td>{t.farmer ?? '—'}</td>
                <td>{t.type}</td>
                <td className="mono">{t.amount.toLocaleString()}</td>
                <td>
                  <span className="chip chip-paid">{t.direction === 'in' ? '+ Inflow' : 'Outflow'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: 14, background: 'rgba(212,160,23,0.12)', fontSize: 13 }}>
          Score is derived from M-Pesa transaction history via Daraja Transaction Status API. Farmers consent to share data on registration. / Alibainishwa
          kwa historia ya M-Pesa kupitia Daraja.
        </div>
      </div>
    </div>
  )
}
