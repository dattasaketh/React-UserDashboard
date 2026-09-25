export default function Toolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddUser,
  isLoading,
  error,
  onRetry,
}) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <div className="search-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email, role…"
            aria-label="Search users"
          />
          {search && (
            <button type="button" className="search-clear" aria-label="Clear search" onClick={() => onSearchChange('')}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>

        <div className="filter-group" role="group" aria-label="Filter by status">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`filter-chip${statusFilter === filter.value ? ' is-active' : ''}`}
              aria-pressed={statusFilter === filter.value}
              onClick={() => onStatusFilterChange(filter.value)}
            >
              {filter.value !== 'all' && <span className={`filter-dot is-${filter.value}`} aria-hidden="true" />}
              {filter.label}
            </button>
          ))}
        </div>

        {error ? (
          <button type="button" className="btn btn-outline" onClick={onRetry}>
            Retry
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onAddUser}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add user
          </button>
        )}
      </div>

      {isLoading && <span className="toolbar-note">Loading users…</span>}
    </div>
  )
}
