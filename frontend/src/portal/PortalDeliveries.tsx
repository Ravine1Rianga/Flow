import { DELIVERIES, FARMERS } from '../data/seed'

const me = FARMERS[0]

export function PortalDeliveries() {
  const rows = DELIVERIES.filter((d) => d.farmerId === me.id).slice(0, 12)
  const total = rows.reduce((a, b) => a + b.kg, 0)
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>Deliveries</h3>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map((r) => (
          <div key={r.id} className="card-surface" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontWeight: 800 }}>{r.date}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                {r.kg} kg - Grade {r.grade}
              </div>
            </div>
            <div className="mono" style={{ fontWeight: 800 }}>
              KSh {r.net.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="card-surface" style={{ marginTop: 12, padding: 12, fontWeight: 900 }}>
        Jumla ya kilo: {total.toLocaleString()} kg
      </div>
    </div>
  )
}
