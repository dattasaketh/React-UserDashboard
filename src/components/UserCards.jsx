import Avatar from './Avatar'
import StatusPill from './StatusPill'
import { relativeTime } from '../utils/format'

export default function UserCards({ users, onEdit, onDelete }) {
  return (
    <div className="card-list">
      {users.map((user) => (
        <article key={user.id} className="user-card">
          <div className="card-head">
            <Avatar user={user} />
            <div className="card-id">
              <span className="user-name">{user.name}</span>
              <span className="user-sub">{user.email}</span>
            </div>
            <StatusPill status={user.status} />
          </div>

          <dl className="card-meta">
            <div>
              <dt>Role</dt>
              <dd>
                {user.role}
                <span className="user-sub"> · {user.department}</span>
              </dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>@{user.username}</dd>
            </div>
            <div>
              <dt>Last active</dt>
              <dd>{relativeTime(user.lastActive)}</dd>
            </div>
          </dl>

          <div className="card-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => onEdit(user)}>
              Edit
            </button>
            <button type="button" className="btn btn-danger-outline btn-sm" onClick={() => onDelete(user)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
