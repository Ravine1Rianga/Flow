import { useState } from 'react'
import { useApp } from '../context/AppProvider'
import { MpesaBadge } from '../components/MpesaBadge'

export function PortalLoans() {
  const { t } = useApp()
  const [step, setStep] = useState(0)
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>FlowCredit</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <svg viewBox="0 0 36 36" style={{ width: 140, height: 140 }}>
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
          <text x="18" y="20.35" textAnchor="middle" fontSize="9" fontWeight="900" fill="var(--text)">
            82
          </text>
        </svg>
      </div>
      <div className="card-surface" style={{ padding: 14, marginTop: 12 }}>
        <div style={{ fontWeight: 900 }}>{t('Active loan', 'Mkopo hai')}</div>
        <div className="mono" style={{ marginTop: 8 }}>KSh 25,000 · remaining KSh 8,333</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Next deduction: Tue 1 Apr 2025</div>
      </div>

      {step === 0 && (
        <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }} onClick={() => setStep(1)}>
          <MpesaBadge /> {t('Start application', 'Anza maombi')}
        </button>
      )}
      {step === 1 && (
        <div className="card-surface" style={{ padding: 14, marginTop: 12 }}>
          <strong>{t('Offer', 'Toleo')}</strong>
          <div className="mono" style={{ fontSize: 26, fontWeight: 900, color: 'var(--gold)', marginTop: 8 }}>KSh 30,000</div>
          <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 12 }} onClick={() => setStep(2)}>
            {t('Continue', 'Endelea')}
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="card-surface" style={{ padding: 14, marginTop: 12 }}>
          <strong>{t('Terms', 'Vigezo')}</strong>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>8% flat · 3 payroll deductions · consent on record.</div>
          <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: 12 }} onClick={() => setStep(3)}>
            {t('I agree', 'Ninakubali')}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="card-surface" style={{ padding: 14, marginTop: 12 }}>
          <strong>{t('Confirm', 'Thibitisha')}</strong>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>B2C payload queued (simulated).</div>
          <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 12 }} onClick={() => setStep(0)}>
            {t('Done', 'Imekamilika')}
          </button>
        </div>
      )}
    </div>
  )
}
