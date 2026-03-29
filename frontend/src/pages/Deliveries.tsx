import { useMemo, useState } from 'react'
import { FARMERS, RATES } from '../data/seed'

type FeedItem = { id: string; farmer: string; kg: number; grade: 'A' | 'B' | 'C'; est: number }

export function DeliveriesPage() {
  const [q, setQ] = useState('')
  const [kg, setKg] = useState('42')
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('A')
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 'f1', farmer: 'Wanjiku Kamau', kg: 38, grade: 'A', est: 38 * RATES.A },
    { id: 'f2', farmer: 'Grace Njeri', kg: 44, grade: 'A', est: 44 * RATES.A },
  ])

  const matches = useMemo(
    () => FARMERS.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()) || f.memberNo.toLowerCase().includes(q.toLowerCase())),
    [q],
  )

  function logDelivery() {
    const f = matches[0] ?? FARMERS[0]
    const w = Number(kg || '0')
    const item: FeedItem = {
      id: `n-${Date.now()}`,
      farmer: f.name,
      kg: w,
      grade,
      est: w * RATES[grade],
    }
    setFeed((prev) => [item, ...prev])
  }

  const totalKg = feed.reduce((a, b) => a + b.kg, 0)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 16 }}>
      <div className="card-surface page-enter" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Log delivery</h3>
        <label style={{ display: 'block', marginTop: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>Farmer search</span>
          <input className="input" style={{ marginTop: 6 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or member number" />
          {!!q && (
            <div className="card-surface" style={{ marginTop: 8, padding: 8, maxHeight: 160, overflow: 'auto' }}>
              {matches.slice(0, 6).map((m) => (
                <div key={m.id} style={{ padding: 6, fontSize: 13 }}>
                  {m.name} · {m.memberNo}
                </div>
              ))}
            </div>
          )}
        </label>
        <label style={{ display: 'block', marginTop: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>Weight (kg)</span>
          <input className="input" style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }} inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
        </label>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', marginBottom: 6 }}>Grade</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['A', 'B', 'C'] as const).map((g) => (
              <button
                key={g}
                type="button"
                className="btn"
                style={{
                  borderRadius: 999,
                  background: grade === g ? (g === 'A' ? 'rgba(82,183,136,0.2)' : g === 'B' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.18)') : '#fff',
                }}
                onClick={() => setGrade(g)}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }} onClick={logDelivery}>
          Log + notify farmer (SMS simulated)
        </button>
      </div>
      <div className="card-surface page-enter" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ margin: 0 }}>Today&apos;s feed</h3>
          <div className="mono" style={{ fontWeight: 800 }}>
            Today: {totalKg.toLocaleString()} kg · {feed.length} farmers
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
          {feed.map((r, idx) => (
            <div
              key={r.id}
              className="card-surface"
              style={{
                padding: 12,
                borderLeft: `4px solid ${r.grade === 'A' ? 'var(--fresh)' : r.grade === 'B' ? '#f59e0b' : '#ef4444'}`,
                animation: idx === 0 ? 'pageIn 0.35s ease-out both' : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 900 }}>{r.farmer}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {r.kg} kg · Grade {r.grade}
                  </div>
                </div>
                <div className="mono" style={{ fontWeight: 800 }}>
                  est KSh {r.est.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
