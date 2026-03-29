import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MpesaBadge } from '../components/MpesaBadge'
import { FARMERS, RATES } from '../data/seed'

export function FarmersPage() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const list = useMemo(
    () => FARMERS.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ marginBottom: 6 }}>Farmer registry</h2>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Card view · credit tiers · M-Pesa readiness</p>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Register new farmer
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
        <input className="input" style={{ maxWidth: 320 }} placeholder="Search name, member no, phone" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" style={{ width: 180 }}>
          <option>All factories</option>
          {['Kiambu Tea Factory', 'Meru Coffee Factory', 'Kisumu Dairy Cooperative'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 14,
          marginTop: 18,
        }}
      >
        {list.map((f) => (
          <div
            key={f.id}
            className="card-surface"
            style={{
              padding: 16,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  background:
                    f.creditTier === 'A'
                      ? 'rgba(82,183,136,0.25)'
                      : f.creditTier === 'B'
                        ? 'rgba(217,119,6,0.18)'
                        : 'rgba(185,28,28,0.18)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                }}
              >
                {f.name
                  .split(' ')
                  .map((x) => x[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 900, fontFamily: 'var(--font-display)' }}>{f.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {f.memberNo} · {f.phone}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              {f.cooperative} · {f.zone}
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
                <span>Credit score</span>
                <span className="mono">{f.creditScore}</span>
              </div>
              <div style={{ height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
                <div
                  style={{
                    width: `${f.creditScore}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #b91c1c, #f59e0b, var(--fresh))',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span className="chip" style={{ background: 'rgba(82,183,136,0.18)' }}>
                Grade {f.gradeTrend} deliveries
              </span>
              <span className="chip" style={{ background: 'rgba(212,160,23,0.18)', color: '#6a4b00' }}>
                {f.loanFlow.replace('_', ' ')}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Link className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }} to={`/app/farmers/${f.id}`}>
                View profile
              </Link>
              {f.loanFlow === 'eligible' && (
                <button className="btn btn-gold" type="button" style={{ flex: 1, justifyContent: 'center' }}>
                  <MpesaBadge /> Disburse
                </button>
              )}
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: 'var(--muted)',
                padding: '8px 10px',
                background: 'var(--parchment)',
                borderRadius: 10,
                display: 'none',
              }}
              className="quickstats"
            >
              Tier {f.creditTier} · rate A {RATES.A} / B {RATES.B} / C {RATES.C} KSh/kg
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 120,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="card-surface"
            style={{ width: 'min(520px, 100%)', height: '100%', borderRadius: 0, padding: 22, overflow: 'auto' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Register farmer</strong>
              <button className="btn btn-ghost" type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 999,
                    background: i <= step ? 'var(--fresh)' : 'rgba(0,0,0,0.08)',
                  }}
                />
              ))}
            </div>

            {step === 0 && (
              <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                <Field label="Full name" />
                <Field label="National ID" />
                <Field label="Phone (M-Pesa)" />
              </div>
            )}
            {step === 1 && (
              <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                <Field label="Factory" />
                <Field label="Zone" />
                <Field label="Land size (ha)" />
                <Field label="Crop" />
              </div>
            )}
            {step === 2 && (
              <div style={{ marginTop: 16 }}>
                <p style={{ color: 'var(--muted)' }}>OTP sent (simulated) to farmer phone. Enter 4829 to verify.</p>
                <Field label="OTP" />
              </div>
            )}
            {step === 3 && (
              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 600 }}>
                  <input type="checkbox" style={{ marginTop: 4 }} />
                  <span>
                    I consent to cooperative data use and M-Pesa transaction scoring for FlowCredit — English / Ninakubali
                    matumizi ya data na uchambuzi wa M-Pesa — Kiswahili.
                  </span>
                </label>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="btn btn-ghost" type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                Back
              </button>
              <button
                className="btn btn-primary"
                type="button"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  if (step < 3) setStep((s) => s + 1)
                  else {
                    setOpen(false)
                    setStep(0)
                  }
                }}
              >
                {step < 3 ? 'Next' : 'Submit registration'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label }: { label: string }) {
  return (
    <label>
      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>{label}</span>
      <input className="input" style={{ marginTop: 6 }} />
    </label>
  )
}
