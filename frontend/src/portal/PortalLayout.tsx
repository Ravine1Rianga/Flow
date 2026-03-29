import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppProvider'

const tabs: { to: string; label: [string, string]; icon: string }[] = [
  { to: '/portal', label: ['Home', 'Nyumbani'], icon: '🏠' },
  { to: '/portal/deliveries', label: ['Deliveries', 'Mizigo'], icon: '📦' },
  { to: '/portal/payments', label: ['Payments', 'Malipo'], icon: '💳' },
  { to: '/portal/deductions', label: ['Deductions', 'Makato'], icon: '📊' },
  { to: '/portal/loans', label: ['FlowCredit', 'Mkopo'], icon: '✨' },
]

export function PortalLayout() {
  const { lang, setLang, logout, t } = useApp()
  const nav = useNavigate()
  return (
    <div className="portal-body" style={{ minHeight: '100vh', paddingBottom: 72, background: 'var(--parchment)' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'rgba(248,245,240,0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '12px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>ChaiConnect</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-ghost" type="button" style={{ padding: '6px 10px', fontSize: 13 }} onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}>
            {lang === 'en' ? 'Kiswahili' : 'English'}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            style={{ padding: '6px 10px', fontSize: 13 }}
            onClick={() => {
              logout()
              nav('/')
            }}
          >
            {t('Exit', 'Toka')}
          </button>
        </div>
      </header>
      <main style={{ padding: 16, maxWidth: 520, margin: '0 auto' }} className="page-enter">
        <Outlet />
      </main>
      <nav className="portal-nav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/portal'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <span aria-hidden style={{ fontSize: 16 }}>
              {tab.icon}
            </span>
            <span style={{ fontFamily: 'var(--font-display)' }}>{lang === 'sw' ? tab.label[1] : tab.label[0]}</span>
          </NavLink>
        ))}
      </nav>
      <div style={{ textAlign: 'center', marginTop: -48, paddingBottom: 8 }}>
        <NavLink to="/portal/ussd" style={{ fontSize: 13, fontWeight: 800, color: 'var(--leaf)' }}>
          {t('Open USSD simulator', 'Fungua USSD')}
        </NavLink>
      </div>
    </div>
  )
}
