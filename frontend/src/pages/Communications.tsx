import { useState } from 'react'
import { COMPLAINTS } from '../data/seed'

export function CommunicationsPage() {
  const [thread, setThread] = useState<string | null>(null)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
      <div className="card-surface" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <strong>Complaints (farmer-raised)</strong>
        </div>
        <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', fontSize: 12, color: 'var(--muted)' }}>
              <th style={{ padding: 12 }}>Farmer</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {COMPLAINTS.map((c) => (
              <tr key={c.id} onClick={() => setThread(c.id)} style={{ cursor: 'pointer' }}>
                <td style={{ padding: 12, fontWeight: 800 }}>{c.farmer}</td>
                <td>{c.issue}</td>
                <td>{c.status}</td>
                <td style={{ fontSize: 12, color: 'var(--muted)' }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-surface" style={{ padding: 16 }}>
        <strong>Admin alerts</strong>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>Compose SMS + dashboard notice. Preview shows both channels.</p>
        <label style={{ display: 'block', marginTop: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>Targets</span>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {['Farmers', 'Clerks', 'Officers'].map((x) => (
              <label key={x} style={{ display: 'flex', gap: 6, alignItems: 'center', fontWeight: 700 }}>
                <input type="checkbox" />
                {x}
              </label>
            ))}
          </div>
        </label>
        <label style={{ display: 'block', marginTop: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>Message</span>
          <textarea className="input" style={{ marginTop: 6, minHeight: 90 }} defaultValue="Factory weighbridge opens 6am–4pm tomorrow for catchment B farmers." />
        </label>
        <div className="card-surface" style={{ padding: 12, marginTop: 12, background: 'var(--parchment)' }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--muted)' }}>Preview</div>
          <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 13 }}>SMS: short text · Dashboard banner mirrored in-app</div>
        </div>
        <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
          Send now
        </button>
      </div>

      {thread && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 120, display: 'flex', justifyContent: 'flex-end' }} onMouseDown={() => setThread(null)}>
          <div className="card-surface" style={{ width: 420, height: '100%', borderRadius: 0, padding: 16 }} onMouseDown={(e) => e.stopPropagation()}>
            <strong>Thread</strong>
            <p style={{ color: 'var(--muted)' }}>{COMPLAINTS.find((c) => c.id === thread)?.issue}</p>
            <textarea className="input" style={{ minHeight: 120 }} placeholder="Official response…" />
            <button className="btn btn-primary" type="button" style={{ marginTop: 10 }} onClick={() => setThread(null)}>
              Save response
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
