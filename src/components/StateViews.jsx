/** Dedicated views for loading, error, empty and no-results states. */

export function DashboardSkeleton() {
  return (
    <div className="skeleton-wrap" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="skeleton-row">
          <span className="skeleton skeleton-avatar" />
          <span className="skeleton skeleton-line w-30" />
          <span className="skeleton skeleton-line w-20 hide-sm" />
          <span className="skeleton skeleton-pill hide-sm" />
          <span className="skeleton skeleton-line w-12 hide-sm" />
        </div>
      ))}
      <span className="visually-hidden">Loading users…</span>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-view">
      <div className="state-icon is-error" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </div>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

export function EmptyState({ onAddUser }) {
  return (
    <div className="state-view">
      <div className="state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3.25" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M18 8v6M15 11h6" />
        </svg>
      </div>
      <h2>No users yet</h2>
      <p>Your directory is empty. Add your first team member to get started.</p>
      <button type="button" className="btn btn-primary" onClick={onAddUser}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add user
      </button>
    </div>
  )
}

export function NoResultsState({ onReset }) {
  return (
    <div className="state-view is-compact">
      <div className="state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M8.5 11h5" />
        </svg>
      </div>
      <h2>No matching users</h2>
      <p>No users match your current search or filters.</p>
      <button type="button" className="btn btn-outline" onClick={onReset}>
        Clear search &amp; filters
      </button>
    </div>
  )
}
