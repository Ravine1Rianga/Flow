import { Link } from 'react-router-dom'
import { MpesaBadge } from '../components/MpesaBadge'
import { Money } from '../components/Money'
import { useApp } from '../context/AppProvider'
import { PortalCard, PortalPageTitle } from './PortalChrome'

export function PortalHome() {
  const { t, auth, pendingFarmerDisbursements, farmerCreditScore } = useApp()
  const name = auth?.name?.split(' ')[0] ?? 'Mkulima'
  const pendingTotal = pendingFarmerDisbursements.reduce((a, p) => a + p.amount, 0)

  return (
    <div>
      <div
        style={{
          borderRadius: 18,
          padding: '20px 18px',
          background: 'linear-gradient(135deg, var(--forest) 0%, var(--leaf) 55%, var(--fresh) 120%)',
          color: '#fff',
          marginBottom: 16,
          boxShadow: '0 10px 28px rgba(27, 67, 50, 0.25)',
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.88, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Kiambu Tea · Member</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 6vw, 2rem)', lineHeight: 1.15, marginTop: 8 }}>
          {t('Hello', 'Habari')}, {name}
        </div>
        <div style={{ fontSize: 13, opacity: 0.82, marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="chip" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
            {t('Account active', 'Akaunti hai')}
          </span>
          <span className="chip" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            FlowCredit {farmerCreditScore}
          </span>
        </div>
        {pendingFarmerDisbursements.length > 0 && (
          <Link
            to="/portal/wallet"
            style={{
              display: 'block',
              marginTop: 14,
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(0,0,0,0.2)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 14,
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            {t(
              `${pendingFarmerDisbursements.length} disbursement(s) to accept in Wallet →`,
              `${pendingFarmerDisbursements.length} malipo ya kuidhinisha Wallet →`,
            )}
          </Link>
        )}
      </div>

      <PortalPageTitle
        title={t('Overview', 'Muhtasari')}
        subtitle={t('Amounts in KSh · M-Pesa backed', 'Kiasi kwa KSh · M-Pesa')}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <PortalCard>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>This month</div>
          <div className="mono" style={{ fontWeight: 900, fontSize: 18, marginTop: 6 }}>
            158 kg
          </div>
        </PortalCard>
        <PortalCard accent="fresh">
          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Grade focus</div>
          <div style={{ fontWeight: 900, fontSize: 18, marginTop: 6, fontFamily: 'var(--font-display)' }}>A</div>
        </PortalCard>
      </div>

      <PortalCard accent="gold">
        <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 800, textAlign: 'center' }}>
          {t('What you are owed', 'Inayodaiwa')}
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span className="money" style={{ fontSize: 'clamp(2rem, 8vw, 2.35rem)', fontWeight: 900, color: 'var(--gold)' }}>
            <Money amount={pendingTotal > 0 ? pendingTotal : 3200} gold />
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
          <MpesaBadge />
          {t('Next factory cycle', 'Mzunguko unaofuata')}
        </div>
      </PortalCard>

      <PortalCard style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)' }}>{t('Last paid', 'Ilipwa mara ya mwisho')}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MpesaBadge />
            <Money amount={18500} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>28 Mar 2025</span>
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
          Conf. SLQ1ABCDEF
        </div>
      </PortalCard>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip chip-pending">
          <span className="dot" />
          {t('Pending deliveries', 'Mizigo inayosubiri')}
        </span>
      </div>

      <Link className="btn btn-primary" to="/portal/wallet" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
        <MpesaBadge />
        {t('Wallet · accept & credit history', 'Wallet · pokea na historia')}
      </Link>
      <Link className="btn btn-gold" to="/portal/loans" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}>
        <MpesaBadge />
        {t('Apply for loan', 'Omba mkopo')}
      </Link>
    </div>
  )
}
