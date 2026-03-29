import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MpesaBadge } from '../components/MpesaBadge'
import { Money } from '../components/Money'
import { useApp } from '../context/AppProvider'
import { PortalCard, PortalPageTitle } from './PortalChrome'

export function PortalWallet() {
  const {
    t,
    pendingFarmerDisbursements,
    creditLedgerLines,
    farmerCreditScore,
    acceptFarmerDisbursement,
  } = useApp()
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const pending = pendingFarmerDisbursements.find((p) => p.id === confirmId)

  return (
    <div>
      <PortalPageTitle
        title={t('Wallet · M-Pesa & score', 'Wallet · M-Pesa na alama')}
        subtitle={t(
          'Accept money here. Records feed your FlowCredit score.',
          'Thibitisha pesa hapa. Rekodi huboresha alama ya FlowCredit.',
        )}
      />

      <PortalCard accent="gold" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FlowCredit score
            </div>
            <div className="mono" style={{ fontSize: 36, fontWeight: 900, marginTop: 4, color: 'var(--forest)' }}>
              {farmerCreditScore}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
              {t('Goes up when you confirm M-Pesa / co-op inflows in this app.', 'Huongezeka utakapothibitisha malipo ndani ya programu.')}
            </div>
          </div>
          <Link className="btn btn-ghost" to="/portal/loans" style={{ flexShrink: 0 }}>
            {t('Loans', 'Mikopo')} →
          </Link>
        </div>
      </PortalCard>

      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, marginBottom: 8 }}>
        {t('Accept disbursements', 'Kubali malipo')}
      </div>
      {pendingFarmerDisbursements.length === 0 ? (
        <PortalCard>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>
            {t(
              'No money waiting. When the factory or FlowCredit sends B2C, it will show here for you to confirm.',
              'Hakuna pesa inayosubiri. M-Pesa itapoingia, itaonekana hapa.',
            )}
          </p>
        </PortalCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pendingFarmerDisbursements.map((p) => (
            <PortalCard key={p.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <MpesaBadge />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{p.label}</div>
                    <div className="mono" style={{ fontSize: 20, fontWeight: 900, marginTop: 6 }}>
                      <Money amount={p.amount} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                      {t('Ref', 'Rejea')}: {p.ref} ·{' '}
                      {p.source === 'flowcredit_b2c' ? 'FlowCredit B2C' : t('Cooperative', 'Msingi')}
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-gold" onClick={() => setConfirmId(p.id)}>
                  {t('Accept in app', 'Thibitisha')}
                </button>
              </div>
            </PortalCard>
          ))}
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, margin: '20px 0 8px' }}>
        {t('Records used for credit scoring', 'Rekodi za alama ya mkopo')}
      </div>
      <PortalCard style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-zebra" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'var(--zebra-a)' }}>
                <th style={{ padding: '10px 12px', fontFamily: 'var(--font-display)', fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t('Date', 'Tarehe')}
                </th>
                <th style={{ padding: '10px 12px', fontFamily: 'var(--font-display)', fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t('Detail', 'Maelezo')}
                </th>
                <th style={{ padding: '10px 12px', fontFamily: 'var(--font-display)', fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t('Amount', 'Kiasi')}
                </th>
                <th style={{ padding: '10px 12px', fontFamily: 'var(--font-display)', fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {t('Scoring', 'Alama')}
                </th>
              </tr>
            </thead>
            <tbody>
              {creditLedgerLines.map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{row.date}</td>
                  <td style={{ padding: '10px 12px' }}>{row.description}</td>
                  <td className="mono" style={{ padding: '10px 12px', color: row.direction === 'in' ? 'var(--fresh)' : 'var(--soil)' }}>
                    {row.direction === 'in' ? '+' : '−'}
                    <Money amount={row.amount} />
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 12, color: 'var(--muted)', maxWidth: 180 }}>
                    {row.scoringSignal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PortalCard>

      {confirmId && pending && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
          onMouseDown={() => setConfirmId(null)}
        >
          <div className="card-surface" style={{ width: 'min(400px,100%)', padding: 20 }} onMouseDown={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17 }}>
              {t('Confirm receipt', 'Thibitisha malipo')}
            </div>
            <p style={{ margin: '12px 0', fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
              {t(
                'You confirm this amount hit your M-Pesa. We will add it to your ledger and refresh your FlowCredit score.',
                'Unathibitisha kuwa kiasi kimeingia M-Pesa. Tutaihifadhi kwenye historia ya alama.',
              )}
            </p>
            <div className="mono" style={{ fontSize: 26, fontWeight: 900 }}>
              <Money amount={pending.amount} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirmId(null)}>
                {t('Cancel', 'Ghairi')}
              </button>
              <button
                type="button"
                className="btn btn-gold"
                style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}
                onClick={() => {
                  acceptFarmerDisbursement(pending.id)
                  setConfirmId(null)
                }}
              >
                <MpesaBadge />
                {t('Yes, received', 'Ndio, nimepokea')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
