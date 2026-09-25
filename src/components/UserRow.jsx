import Avatar from './Avatar'
import StatusPill from './StatusPill'
import { formatDateTime, relativeTime } from '../utils/format'

export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td data-label="User">
        <div className="user-cell">
          <Avatar user={user} />
          <div className="user-cell-text">
            <span className="user-name">{user.name}</span>
            <span className="user-sub">{user.email}</span>
          </div>
        </div>
      </td>
      <td data-label="Role">
        <div className="role-cell">
          <span className="user-role">{user.role}</span>
          <span className="user-sub">{user.department}</span>
        </div>
      </td>
      <td data-label="Status">
        <StatusPill status={user.status} />
      </td>
      <td data-label="Last active" className="cell-muted">
        <span title={formatDateTime(user.lastActive)}>{relativeTime(user.lastActive)}</span>
      </td>
      <td data-label="Actions" className="cell-actions">
        <button type="button" className="icon-btn" aria-label={`Edit ${user.name}`} onClick={() => onEdit(user)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </button>
        <button type="button" className="icon-btn is-danger" aria-label={`Delete ${user.name}`} onClick={() => onDelete(user)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </td>
    </tr>
  )
}
