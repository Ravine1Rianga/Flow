import { useMemo, useState } from 'react'
import { MPESA_FEED } from '../../data/seed'

export function FlowCreditTransactionsPage() {
  const [sel, setSel] = useState<string | null>(null)
  const [filter, setFilter] = useState<'All' | 'B2C' | 'C2B' | 'Validation' | 'Callbacks' | 'Failed'>('All')

  const rows = useMemo(() => {
    if (filter === 'All') return MPESA_FEED
    if (filter === 'Failed') return MPESA_FEED.filter((t) => t.code !== '0')
    if (filter === 'Callbacks') return MPESA_FEED.filter((t) => t.type === 'Callback')
    return MPESA_FEED.filter((t) => t.type === filter)
  }, [filter])

  const active = rows.find((r) => r.id === sel)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12 }}>
      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 12, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['All', 'B2C', 'C2B', 'Validation', 'Callbacks', 'Failed'] as const).map((f) => (
            <button key={f} className="btn btn-ghost" type="button" style={{ padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 12 }} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          {rows.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSel(t.id)}
              className="btn btn-ghost"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                borderRadius: 0,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'grid',
                gridTemplateColumns: '80px 80px 1fr 120px',
                gap: 10,
                textAlign: 'left',
              }}
            >
              <span>{t.id}</span>
              <span className="chip" style={{ justifySelf: 'start' }}>
                {t.type}
              </span>
              <span>{t.farmer ?? '—'}</span>
              <span style={{ color: t.direction === 'in' ? 'var(--fresh)' : '#ef4444' }}>KSh {t.amount.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <div className="card-surface" style={{ padding: 14, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <strong>Detail</strong>
          {!active ? (
            <div style={{ color: 'var(--muted)', marginTop: 8 }}>Select a row</div>
          ) : (
            <>
              <pre style={{ marginTop: 10, padding: 12, background: '#0b1220', color: '#baf7cf', borderRadius: 12, overflow: 'auto' }}>
                {JSON.stringify(active.raw, null, 2)}
              </pre>
              {active.code !== '0' && (
                <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 10 }}>
                  Retry
                </button>
              )}
            </>
          )}
        </div>
        <div className="card-surface" style={{ padding: 14 }}>
          <strong>API health (24h)</strong>
          <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', display: 'grid', gap: 6 }}>
            <div>B2C success: 97%</div>
            <div>Webhook p95: 420ms</div>
            <div>Daraja uptime: OK</div>
          </div>
        </div>
      </div>
    </div>
  )
}
