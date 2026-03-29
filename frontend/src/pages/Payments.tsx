import { useState } from 'react'
import { MpesaBadge } from '../components/MpesaBadge'
import { Money } from '../components/Money'

type Card = { id: string; farmer: string; gross: number; deductions: number; payload: string }

const COL1: Card[] = [
  { id: 'c1', farmer: 'James Mutua', gross: 9200, deductions: 1400, payload: '{}' },
  { id: 'c2', farmer: 'James Mutua', gross: 7200, deductions: 900, payload: '{}' },
]

const COL2: Card[] = [
  { id: 'q1', farmer: 'Grace Njeri', gross: 15000, deductions: 1850, payload: '{"CommandID":"BusinessPayment","Amount":15000}' },
]

const COL3: Card[] = [
  { id: 'd1', farmer: 'Wanjiku Kamau', gross: 18500, deductions: 4200, payload: '{"ResultCode":"0"}' },
]

export function PaymentsPage() {
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState<string | null>(null)

  return (
    <div>
      <h2>Payment management</h2>
      <p style={{ color: 'var(--muted)', marginTop: 0 }}>Three-column flow · Daraja JSON visible before send</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 16 }}>
        <KanCol title="Pending approval" tone="#1d4ed8">
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button className="btn btn-ghost" type="button">
              Approve selected
            </button>
          </div>
          {COL1.map((c) => (
            <PayCard key={c.id} c={c}>
              <button className="btn btn-primary" type="button" style={{ width: '100%', justifyContent: 'center' }}>
                Approve
              </button>
            </PayCard>
          ))}
        </KanCol>
        <KanCol title="Approved — queued" tone="#b45309">
          <button className="btn btn-gold" type="button" style={{ width: '100%', marginBottom: 8, justifyContent: 'center' }} onClick={() => setOpen(true)}>
            <MpesaBadge /> Disburse all
          </button>
          {COL2.map((c) => (
            <PayCard key={c.id} c={c}>
              <button className="btn btn-ghost" type="button" style={{ width: '100%' }} onClick={() => setExpand((e) => (e === c.id ? null : c.id))}>
                {expand === c.id ? 'Hide' : 'Show'} B2C payload
              </button>
              {expand === c.id && (
                <pre style={{ marginTop: 10, padding: 12, background: '#0b1220', color: '#baf7cf', borderRadius: 10, overflow: 'auto', fontSize: 12 }}>
                  {c.payload}
                </pre>
              )}
            </PayCard>
          ))}
        </KanCol>
        <KanCol title="Completed" tone="#166534">
          {COL3.map((c) => (
            <PayCard key={c.id} c={c}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
                M-Pesa SLQ1ABCDEF
              </div>
            </PayCard>
          ))}
        </KanCol>
      </div>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 140, display: 'grid', placeItems: 'center', padding: 16 }} onMouseDown={() => setOpen(false)}>
          <div className="card-surface" style={{ width: 'min(720px,100%)', padding: 18 }} onMouseDown={(e) => e.stopPropagation()}>
            <strong>Disburse all — confirmation</strong>
            <p style={{ color: 'var(--muted)' }}>Step tracker: OAuth → B2C → Webhook → Ledger</p>
            <ol style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              <li>OAuth token (sandbox)</li>
              <li>POST /mpesa/b2c/v3/paymentrequest</li>
              <li>Callback URL</li>
              <li>Ledger update</li>
            </ol>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button className="btn btn-ghost" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-gold" type="button" onClick={() => setOpen(false)}>
                <MpesaBadge /> Confirm &amp; send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KanCol({ title, tone, children }: { title: string; tone: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 16, padding: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tone }} />
        <strong>{title}</strong>
      </div>
      {children}
    </div>
  )
}

function PayCard({ c, children }: { c: Card; children: React.ReactNode }) {
  return (
    <div className="card-surface" style={{ padding: 12, marginBottom: 10 }}>
      <div style={{ fontWeight: 900 }}>{c.farmer}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ color: 'var(--muted)' }}>Gross</span>
        <Money amount={c.gross} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ color: 'var(--muted)' }}>Deductions</span>
        <Money amount={c.deductions} />
      </div>
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  )
}
