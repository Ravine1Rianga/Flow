import { useState } from 'react'
import { MpesaBadge } from '../../components/MpesaBadge'
import { postSimulateB2C } from '../../lib/api'
import { FARMERS } from '../../data/seed'

export function FlowCreditDisbursePage() {
  const farmer = FARMERS.find((f) => f.loanFlow === 'eligible') ?? FARMERS[0]
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const payload = {
    CommandID: 'BusinessPayment',
    Amount: 25000,
    PartyA: '600984',
    PartyB: `254${farmer.phone.replace(/\D/g, '').slice(-9)}`,
    Remarks: `FlowCredit loan — ${farmer.name}`,
    ResultURL: 'https://chaiconnect.co.ke/api/b2c/result',
  }

  async function confirm() {
    setOpen(true)
    setStep(0)
    const plan = await postSimulateB2C(payload)
    const delays = (plan?.steps ?? [
      { label: 'OAuth', ms: 400 },
      { label: 'B2C', ms: 1200 },
      { label: 'Webhook', ms: 800 },
      { label: 'Ledger', ms: 400 },
    ]).map((s) => s.ms)
    let acc = 0
    delays.forEach((ms, idx) => {
      acc += ms
      window.setTimeout(() => setStep(idx + 1), acc)
    })
  }

  return (
    <div>
      <h2 style={{ color: 'var(--gold)' }}>Disbursement</h2>
      <div
        className="page-enter"
        style={{
          marginTop: 16,
          borderRadius: 22,
          padding: 22,
          background: 'linear-gradient(135deg, var(--fresh) 0%, var(--forest) 100%)',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.9 }}>Loan offer — {farmer.name}</div>
        <div className="mono" style={{ fontSize: 42, fontWeight: 900, marginTop: 8 }}>KSh 25,000</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.95 }}>
          <span>8% flat</span>
          <span>3 repayments</span>
          <span>Score {farmer.creditScore}</span>
          <span>0{farmer.phone}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <button className="btn btn-gold" type="button" onClick={() => void confirm()}>
            <MpesaBadge /> Send via M-Pesa B2C
          </button>
          <button className="btn btn-ghost" type="button" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
            Review terms
          </button>
        </div>
      </div>

      <div className="card-surface" style={{ padding: 16, marginTop: 16 }}>
        <strong>B2C API payload</strong>
        <pre style={{ marginTop: 12, padding: 14, background: '#0b1220', color: '#baf7cf', borderRadius: 12, overflow: 'auto', fontSize: 12, lineHeight: 1.6 }}>
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 160, display: 'grid', placeItems: 'center', padding: 16 }} onMouseDown={() => setOpen(false)}>
          <div className="card-surface" style={{ width: 'min(560px,100%)', padding: 18 }} onMouseDown={(e) => e.stopPropagation()}>
            <strong>Confirm B2C</strong>
            <div style={{ marginTop: 12, padding: 14, borderRadius: 14, background: 'var(--forest)', color: '#fff' }}>
              <div className="mono" style={{ fontSize: 30, fontWeight: 900 }}>KSh 25,000</div>
              <div style={{ opacity: 0.85, marginTop: 6 }}>via M-Pesa Business Payment</div>
              <div className="mono" style={{ marginTop: 8 }}>254{farmer.phone.replace(/\D/g, '').slice(-9)}</div>
            </div>
            <ol style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>
              <li style={{ fontWeight: step >= 1 ? 800 : 500, color: step >= 1 ? 'var(--text)' : undefined }}>OAuth token</li>
              <li style={{ fontWeight: step >= 2 ? 800 : 500, color: step >= 2 ? 'var(--text)' : undefined }}>B2C request</li>
              <li style={{ fontWeight: step >= 3 ? 800 : 500, color: step >= 3 ? 'var(--text)' : undefined }}>Webhook</li>
              <li style={{ fontWeight: step >= 4 ? 800 : 500, color: step >= 4 ? 'var(--text)' : undefined }}>Ledger update</li>
            </ol>
            <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }} onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
