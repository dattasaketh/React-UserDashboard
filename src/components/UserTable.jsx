import UserRow from './UserRow'

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onSort,
  sortConfig,
}) {
  return (
    <div className="table-scroll">
      <table className="user-table">
        <thead>
          <tr>
            <th scope="col">
              <button
                type="button"
                className="table-sort-button"
                onClick={() => onSort('name')}
              >
                User
                {sortConfig.key === 'name' && (
                  <span aria-hidden="true">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </button>
            </th>

            <th scope="col">
              <button
                type="button"
                className="table-sort-button"
                onClick={() => onSort('role')}
              >
                Role
                {sortConfig.key === 'role' && (
                  <span aria-hidden="true">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </button>
            </th>

            <th scope="col">
              <button
                type="button"
                className="table-sort-button"
                onClick={() => onSort('status')}
              >
                Status
                {sortConfig.key === 'status' && (
                  <span aria-hidden="true">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </button>
            </th>

            <th scope="col">
              <button
                type="button"
                className="table-sort-button"
                onClick={() => onSort('lastActive')}
              >
                Last active
                {sortConfig.key === 'lastActive' && (
                  <span aria-hidden="true">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </button>
            </th>

            <th scope="col">
              <span className="visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
