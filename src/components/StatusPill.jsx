export default function StatusPill({ status }) {
  return (
    <span className={`status-pill is-${status}`}>
      <span className="status-dot" aria-hidden="true" />
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}
