import { useState } from 'react'
import { PaymentStatusPill } from '../components/PaymentStatusPill'
import type { PaymentStatus } from '../types'

const items: { dt: string; status: PaymentStatus; amt: number; id: string }[] = [
  { dt: '2025-03-28', status: 'Paid', amt: 18500, id: 'SLQ1ABCDEF' },
  { dt: '2025-03-10', status: 'Pending', amt: 3200, id: 'PEND-303' },
]

export function PortalPayments() {
  const [f, setF] = useState<'All' | 'Paid' | 'Pending' | 'Deductions'>('All')
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>Payments</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {(['All', 'Paid', 'Pending', 'Deductions'] as const).map((x) => (
          <button
            key={x}
            className="btn"
            type="button"
            style={{ borderRadius: 999, background: f === x ? 'rgba(82,183,136,0.18)' : '#fff' }}
            onClick={() => setF(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {items
          .filter((i) => f === 'All' || i.status === f || (f === 'Deductions' && i.status === 'Paid'))
          .map((i) => (
            <div key={i.id} className="card-surface" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{i.dt}</div>
                <PaymentStatusPill status={i.status} />
              </div>
              <div className="mono" style={{ fontWeight: 900, marginTop: 8 }}>
                KSh {i.amt.toLocaleString()}
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                {i.id}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
