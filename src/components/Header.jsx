export default function Header({ activeCount }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3.25" />
              <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
              <circle cx="17" cy="9.5" r="2.5" />
              <path d="M15.5 15.6a4.5 4.5 0 0 1 5 4.4" />
            </svg>
          </span>
          <div className="brand-text">
            <h1>User Management</h1>
            <p>Team directory dashboard</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">active {activeCount === 1 ? 'user' : 'users'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
