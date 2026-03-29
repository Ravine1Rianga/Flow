import { useState } from 'react'

export function PortalUssd() {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>USSD simulator</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className="card-surface"
          style={{
            width: 280,
            borderRadius: 26,
            padding: 14,
            background: '#101010',
            color: '#e7e7e7',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            minHeight: 420,
          }}
        >
          <div style={{ opacity: 0.6, fontSize: 11 }}>Safaricom</div>
          <div style={{ marginTop: 10, fontWeight: 900 }}>*483#</div>
          <div style={{ marginTop: 14, lineHeight: 1.5 }}>
            <div>ChaiConnect</div>
            <div style={{ marginTop: 10 }}>1. Deliveries</div>
            <div>2. Payments</div>
            <div>3. Quality</div>
            <div>4. Loans</div>
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
            {[
              ['1', 'Deliveries summary SMS sent.'],
              ['2', 'Last payment: KSh 18,500 on 28 Mar.'],
              ['3', 'Latest grade: A (Kiambu).'],
              ['4', 'FlowCredit: pre-approved limit KSh 30,000.'],
            ].map(([k, msg]) => (
              <button
                key={k}
                type="button"
                onClick={() => setSel(msg)}
                style={{
                  padding: '10px 10px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: sel?.includes(k) ? 'rgba(0,165,80,0.2)' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Press {k}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ marginTop: 14, padding: 10, borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 11, opacity: 0.65 }}>SMS</div>
              <div style={{ marginTop: 6 }}>{sel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
