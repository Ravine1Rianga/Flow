import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CountUpNumber } from '../../components/CountUp'
import { Money } from '../../components/Money'

const days = Array.from({ length: 14 }, (_, i) => ({
  d: `D${i + 1}`,
  disb: 120 + (i % 5) * 18,
  rep: 80 + (i % 4) * 16,
}))

export function FlowCreditDashboardPage() {
  return (
    <div>
      <h2 style={{ color: 'var(--gold)' }}>FlowCredit dashboard</h2>
      <p style={{ color: 'var(--muted)', marginTop: 0 }}>Gold actions · same cooperative shell</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginTop: 16 }}>
        <div className="card-surface" style={{ padding: 14, borderTop: '4px solid var(--gold)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800 }}>Total loans disbursed</div>
          <div className="money" style={{ fontWeight: 900, fontSize: 26, color: 'var(--gold)', marginTop: 6 }}>
            <CountUpNumber value={3_200_000} formatter={(n) => `KSh ${Math.round(n).toLocaleString()}`} />
          </div>
        </div>
        <div className="card-surface" style={{ padding: 14, borderTop: '4px solid var(--gold)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800 }}>Active loans</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, marginTop: 6 }}>
            <CountUpNumber value={3} />
          </div>
        </div>
        <div className="card-surface" style={{ padding: 14, borderTop: '4px solid var(--gold)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800 }}>Repayment rate</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, marginTop: 6 }}>
            <CountUpNumber value={84} formatter={(n) => `${Math.round(n)}%`} />
          </div>
        </div>
        <div className="card-surface" style={{ padding: 14, borderTop: '4px solid var(--gold)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 800 }}>Farmers eligible (first loan)</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, marginTop: 6 }}>
            <CountUpNumber value={1} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginTop: 16 }}>
        <div className="card-surface" style={{ padding: 16 }}>
          <strong>Loan activity</strong>
          <div style={{ height: 260, marginTop: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={days}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="d" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="disb" name="Disbursements" fill="var(--gold)" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="rep" name="Repayments" stroke="var(--fresh)" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-surface" style={{ padding: 16 }}>
          <strong>Repayment timeline</strong>
          <div style={{ marginTop: 12, maxHeight: 320, overflow: 'auto', display: 'grid', gap: 10 }}>
            {[
              { name: 'Samuel Kipchoge', due: '2025-04-04', amt: 11000, dot: 'gold' as const },
              { name: 'Peter Mwangi', due: '2025-03-20', amt: 5000, dot: 'red' as const },
              { name: 'Wanjiku Kamau', due: '2025-04-01', amt: 8333, dot: 'gold' as const },
            ].map((r) => (
              <div key={r.name} className="card-surface" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: r.dot === 'gold' ? 'var(--gold)' : '#ef4444' }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Due {r.due}</div>
                  </div>
                </div>
                <Money amount={r.amt} gold />
              </div>
            ))}
          </div>
          <div className="card-surface" style={{ marginTop: 12, padding: 12, borderColor: 'rgba(185,28,28,0.4)' }}>
            <strong style={{ color: '#991b1b' }}>Alert</strong>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Peter Mwangi repayment overdue — notify extension officer.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
