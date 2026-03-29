import { useState } from 'react'
import { useApp } from '../context/AppProvider'
import { MpesaBadge } from '../components/MpesaBadge'
import { PortalCard, PortalPageTitle } from './PortalChrome'

export function PortalLoans() {
  const { t } = useApp()
  const [step, setStep] = useState(0)

  return (
    <div>
      <PortalPageTitle
        title="FlowCredit"
        subtitle="Gold actions · score ring · B2C flow (simulated)"
      />
      <PortalCard accent="gold">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <svg viewBox="0 0 36 36" style={{ width: 150, height: 150 }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="3"
              strokeDasharray={`${82}, 100`}
              strokeLinecap="round"
            />
            <text x="18" y="20.35" textAnchor="middle" fontSize="9" fontWeight="900" fill="var(--text)" fontFamily="var(--font-display)">
              82
            </text>
          </svg>
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>Credit score / 100</div>
      </PortalCard>

      <PortalCard style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 900, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <MpesaBadge />
          {t('Active loan', 'Mkopo hai')}
        </div>
        <div className="mono" style={{ marginTop: 10, fontSize: 15, fontWeight: 700 }}>
          KSh 25,000 · remaining KSh 8,333
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Next deduction: Tue 1 Apr 2025</div>
      </PortalCard>

      {step === 0 && (
        <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 14, justifyContent: 'center' }} onClick={() => setStep(1)}>
          <MpesaBadge /> {t('Start application', 'Anza maombi')}
        </button>
      )}
      {step === 1 && (
        <PortalCard style={{ marginTop: 14 }} accent="fresh">
          <strong style={{ fontFamily: 'var(--font-display)' }}>{t('Offer', 'Toleo')}</strong>
          <div className="mono" style={{ fontSize: 28, fontWeight: 900, color: 'var(--gold)', marginTop: 10 }}>
            KSh 30,000
          </div>
          <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 14 }} onClick={() => setStep(2)}>
            {t('Continue', 'Endelea')}
          </button>
        </PortalCard>
      )}
      {step === 2 && (
        <PortalCard style={{ marginTop: 14 }}>
          <strong style={{ fontFamily: 'var(--font-display)' }}>{t('Terms', 'Vigezo')}</strong>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
            8% flat · 3 payroll deductions · consent on record.
          </div>
          <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 14 }} onClick={() => setStep(3)}>
            {t('I agree', 'Ninakubali')}
          </button>
        </PortalCard>
      )}
      {step === 3 && (
        <PortalCard style={{ marginTop: 14 }} accent="forest">
          <strong style={{ fontFamily: 'var(--font-display)' }}>{t('Confirm', 'Thibitisha')}</strong>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10 }}>B2C payload queued (sandbox).</div>
          <pre
            className="mono"
            style={{
              marginTop: 12,
              padding: 12,
              background: '#0b1220',
              color: '#baf7cf',
              borderRadius: 10,
              fontSize: 11,
              overflow: 'auto',
            }}
          >
            {`{\n  "CommandID": "BusinessPayment",\n  "Amount": 30000\n}`}
          </pre>
          <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 14 }} onClick={() => setStep(0)}>
            {t('Done', 'Imekamilika')}
          </button>
        </PortalCard>
      )}
    </div>
  )
}
