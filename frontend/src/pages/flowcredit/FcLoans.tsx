import { Link } from 'react-router-dom'
import { FARMERS, LOANS } from '../../data/seed'

export function FlowCreditLoansPage() {
  const eligibleFarmers = FARMERS.filter((f) => f.loanFlow === 'eligible')
  const activeLoans = LOANS.filter((l) => l.status === 'Active' || l.status === 'Overdue')
  const doneLoans = LOANS.filter((l) => l.status === 'Completed')

  return (
    <div>
      <h2 style={{ color: 'var(--gold)' }}>Loan management</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, marginTop: 16 }}>
        <Kan title="Eligible farmers" tone="var(--fresh)">
          {eligibleFarmers.map((f) => (
            <LCard key={f.id}>
              <div style={{ fontWeight: 900 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Score {f.creditScore}</div>
              <div className="mono" style={{ fontWeight: 800, marginTop: 8 }}>
                Limit KSh {Math.min(30000, f.creditScore * 400).toLocaleString()}
              </div>
              <Link className="btn btn-gold" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }} to="/flowcredit/disburse">
                Offer loan
              </Link>
            </LCard>
          ))}
        </Kan>
        <Kan title="Active loans" tone="var(--gold)">
          {activeLoans.map((l) => (
            <LCard key={l.id}>
              <div style={{ fontWeight: 900 }}>{l.farmerName}</div>
              <div className="mono" style={{ marginTop: 6 }}>
                KSh {l.amount.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Next {l.nextDue}</div>
              <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 999, marginTop: 8 }}>
                <div style={{ width: `${Math.round(l.repaidFraction * 100)}%`, height: '100%', background: 'var(--fresh)', borderRadius: 999 }} />
              </div>
            </LCard>
          ))}
        </Kan>
        <Kan title="Completed / closed" tone="#166534">
          {doneLoans.map((l) => (
            <LCard key={l.id}>
              <div style={{ fontWeight: 900 }}>{l.farmerName}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Fully repaid</div>
              <span className="chip chip-paid" style={{ marginTop: 8 }}>
                Closed
              </span>
            </LCard>
          ))}
        </Kan>
      </div>
    </div>
  )
}

function Kan({ title, tone, children }: { title: string; tone: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 16, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: tone }} />
        <strong>{title}</strong>
      </div>
      {children}
    </div>
  )
}

function LCard({ children }: { children: React.ReactNode }) {
  return <div className="card-surface" style={{ padding: 12, marginBottom: 10 }}>{children}</div>
}
