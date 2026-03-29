import { useState } from 'react'
import { MpesaBadge } from '../components/MpesaBadge'
import { PaymentStatusPill } from '../components/PaymentStatusPill'
import type { PaymentStatus } from '../types'
import { PortalCard, PortalPageTitle } from './PortalChrome'

const items: { dt: string; status: PaymentStatus; amt: number; id: string }[] = [
  { dt: '2025-03-28', status: 'Paid', amt: 18500, id: 'SLQ1ABCDEF' },
  { dt: '2025-03-10', status: 'Pending', amt: 3200, id: 'PEND-303' },
]

export function PortalPayments() {
  const [f, setF] = useState<'All' | 'Paid' | 'Pending' | 'Deductions'>('All')

  return (
    <div>
      <PortalPageTitle title="Payments" subtitle="Timeline · filter by status (same cues as cooperative ledger)" />
      <PortalCard noPadding style={{ marginBottom: 12 }}>
        <div style={{ padding: 12, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['All', 'Paid', 'Pending', 'Deductions'] as const).map((x) => (
            <button
              key={x}
              className="btn"
              type="button"
              style={{
                borderRadius: 999,
                padding: '8px 12px',
                fontSize: 13,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                background: f === x ? 'rgba(82,183,136,0.2)' : 'transparent',
                borderColor: f === x ? 'var(--fresh)' : 'rgba(0,0,0,0.08)',
              }}
              onClick={() => setF(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div style={{ padding: 12, display: 'grid', gap: 10 }}>
          {items
            .filter((i) => f === 'All' || i.status === f || (f === 'Deductions' && i.status === 'Paid'))
            .map((i) => (
              <div key={i.id} className="card-surface" style={{ padding: 14, background: 'var(--zebra-a)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{i.dt}</div>
                  <PaymentStatusPill status={i.status} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <MpesaBadge />
                  <span className="mono" style={{ fontWeight: 900, fontSize: 18 }}>
                    KSh {i.amt.toLocaleString()}
                  </span>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  {i.id}
                </div>
              </div>
            ))}
        </div>
      </PortalCard>
    </div>
  )
}
