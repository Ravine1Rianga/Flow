import { DELIVERIES, FARMERS } from '../data/seed'
import { MpesaBadge } from '../components/MpesaBadge'
import { PortalDeliveryRow, PortalPageTitle } from './PortalChrome'

const me = FARMERS[0]

export function PortalDeliveries() {
  const rows = DELIVERIES.filter((d) => d.farmerId === me.id).slice(0, 12)
  const total = rows.reduce((a, b) => a + b.kg, 0)

  return (
    <div>
      <PortalPageTitle title="Deliveries" subtitle="Chronological intake · expected net in KSh (M-Pesa)" />
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map((r) => (
          <PortalDeliveryRow key={r.id} grade={r.grade}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontFamily: 'var(--font-display)' }}>{r.date}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="mono">{r.kg} kg</span>
                <span className="chip chip-paid" style={{ fontSize: 10 }}>
                  Grade {r.grade}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
                <MpesaBadge />
                <span className="mono" style={{ fontWeight: 800 }}>
                  KSh {r.net.toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Expected pay</div>
            </div>
          </PortalDeliveryRow>
        ))}
      </div>
      <div
        className="card-surface"
        style={{
          marginTop: 14,
          padding: 14,
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          borderTop: '4px solid var(--forest)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span>Jumla ya kilo</span>
        <span className="mono">{total.toLocaleString()} kg</span>
      </div>
    </div>
  )
}
