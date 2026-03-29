import { Link } from 'react-router-dom'
import { useApp } from '../context/AppProvider'
import { Money } from '../components/Money'

export function PortalHome() {
  const { t, auth } = useApp()
  const name = auth?.name?.split(' ')[0] ?? 'Mkulima'
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px, 8vw, 32px)', lineHeight: 1.1 }}>
        {t('Hello', 'Habari')}, {name}
      </div>
      <div
        className="card-surface"
        style={{
          marginTop: 16,
          padding: 18,
          textAlign: 'center',
          borderTop: '4px solid var(--gold)',
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 800 }}>{t('What you are owed', 'Inayodaiwa')}</div>
        <div className="money" style={{ fontSize: 36, fontWeight: 900, color: 'var(--gold)', marginTop: 8 }}>
          <Money amount={3200} gold />
        </div>
      </div>
      <div className="card-surface" style={{ marginTop: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)' }}>{t('Last paid', 'Ilipwa mara ya mwisho')}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, gap: 10, flexWrap: 'wrap' }}>
          <Money amount={18500} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>28 Mar 2025</span>
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
          M-Pesa SLQ1ABCDEF
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip chip-pending">
          <span className="dot" />
          {t('Pending deliveries', 'Mizigo inayosubiri')}
        </span>
      </div>
      <Link className="btn btn-gold" to="/portal/loans" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}>
        {t('Apply for loan', 'Omba mkopo')}
      </Link>
    </div>
  )
}
