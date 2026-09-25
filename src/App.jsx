import { useEffect, useMemo, useState } from 'react'
import { useUsers } from './hooks/useUsers'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useToasts } from './hooks/useToasts'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import UserTable from './components/UserTable'
import UserCards from './components/UserCards'
import UserModal from './components/UserModal'
import ConfirmDialog from './components/ConfirmDialog'
import Toasts from './components/Toasts'
import {
  DashboardSkeleton,
  ErrorState,
  EmptyState,
  NoResultsState,
} from './components/StateViews'
import { UserSchema, userFromForm, validate } from './utils/validation'
import { fullName } from './utils/format'
import './styles/dashboard.css'

export default function App() {
  const { users, isLoading, error, reload, addUser, updateUser, deleteUser } = useUsers()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const debouncedSearch = useDebouncedValue(search, 250)
  const [currentPage, setCurrentPage] = useState(1)
const usersPerPage = 5

const [sortConfig, setSortConfig] = useState({
  key: 'name',
  direction: 'asc',
})

  const [modalState, setModalState] = useState(null) // null | { mode: 'create' } | { mode: 'edit', user }
  const [pendingDelete, setPendingDelete] = useState(null) // user | null

  const { toasts, pushToast, dismissToast } = useToasts()

  const visibleUsers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    return users.filter((user) => {
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      if (!matchesStatus) return false
      if (!query) return true
      const haystack = [user.name, user.username, user.email, user.role, user.department]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [users, debouncedSearch, statusFilter])

  const isFiltering = Boolean(debouncedSearch.trim()) || statusFilter !== 'all'

const totalPages = Math.ceil(visibleUsers.length / usersPerPage)

const sortedUsers = useMemo(() => {
  return [...visibleUsers].sort((a, b) => {
    const first = String(a[sortConfig.key] ?? '').toLowerCase()
    const second = String(b[sortConfig.key] ?? '').toLowerCase()

    if (first < second) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }

    if (first > second) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }

    return 0
  })
}, [visibleUsers, sortConfig])

const paginatedUsers = useMemo(() => {
  const startIndex = (currentPage - 1) * usersPerPage

  return sortedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  )
}, [sortedUsers, currentPage])
  useEffect(() => {
  setCurrentPage(1)
  }, [debouncedSearch, statusFilter])

  const handleSort = (key) => {
  setSortConfig((current) => ({
    key,
    direction:
      current.key === key && current.direction === 'asc'
        ? 'desc'
        : 'asc',
  }))

  setCurrentPage(1)
}

  const handleSubmit = async (formValues) => {
    const { values, errors } = validate(UserSchema, userFromForm(formValues))
    if (Object.keys(errors).length > 0) {
      return Object.entries(errors).map(([field, message]) => ({ field, message }))
    }

    const isEdit = modalState?.mode === 'edit'
    const result = isEdit ? await updateUser(modalState.user.id, values) : await addUser(values)

    if (result.ok) {
      pushToast(isEdit ? 'User updated successfully.' : 'User added successfully.', 'success')
      setModalState(null)
      return true
    }
    pushToast(result.error || `Could not ${isEdit ? 'update' : 'add'} the user.`, 'error')
    return true // keep the modal open so the user can retry
  }

  const handleDelete = async () => {
    if (!pendingDelete) return
    const result = await deleteUser(pendingDelete.id)
    if (result.ok) {
      pushToast(`"${fullName(pendingDelete)}" was deleted.`, 'success')
    } else {
      pushToast(result.error || 'Could not delete the user.', 'error')
    }
    setPendingDelete(null)
  }

  const hasUsers = users.length > 0

  return (
    <div className="app">
     <Header totalCount={users.length} />

      <main className="page">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddUser={() => setModalState({ mode: 'create' })}
          onRetry={reload}
          isLoading={isLoading}
          error={error}
        />

        <section className="panel" aria-label="User list">
          {isLoading && <DashboardSkeleton />}

          {!isLoading && error && (
            <ErrorState message={error} onRetry={reload} />
          )}

          {!isLoading && !error && hasUsers && visibleUsers.length === 0 && (
            isFiltering ? <NoResultsState onReset={() => { setSearch(''); setStatusFilter('all') }} />
              : <EmptyState onAddUser={() => setModalState({ mode: 'create' })} />
          )}

          {!isLoading && !error && visibleUsers.length > 0 && (
            <>
   <UserTable
  users={paginatedUsers}
  onEdit={(user) => setModalState({ mode: 'edit', user })}
  onDelete={setPendingDelete}
  onSort={handleSort}
  sortConfig={sortConfig}
/>

<UserCards
  users={paginatedUsers}
  onEdit={(user) => setModalState({ mode: 'edit', user })}
  onDelete={setPendingDelete}
              />
              {totalPages > 1 && (
  <div className="pagination" aria-label="User pagination">
    <div className="pagination-info">
      Showing{' '}
      <strong>
        {(currentPage - 1) * usersPerPage + 1}
      </strong>
      {'–'}
      <strong>
        {Math.min(currentPage * usersPerPage, visibleUsers.length)}
      </strong>
      {' '}of{' '}
      <strong>{visibleUsers.length}</strong>
      {' '}users
    </div>

    <div className="pagination-controls">
      <button
        type="button"
        className="pagination-button"
        onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            type="button"
            className={`pagination-button ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        className="pagination-button"
        onClick={() =>
          setCurrentPage((page) => Math.min(page + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        →
      </button>
    </div>
                </div>
              )}
            </>
          )}
        </section>

        <footer className="page-footer">
          <p>Built with React + Vite · Data served from a simulated JSON API</p>
        </footer>
      </main>

      {modalState && (
        <UserModal
          mode={modalState.mode}
          user={modalState.mode === 'edit' ? modalState.user : null}
          onSubmit={handleSubmit}
          onClose={() => setModalState(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete user?"
          message={
            <>
              Are you sure you want to delete{' '}
              <strong>{fullName(pendingDelete)}</strong>? This action cannot be undone.
            </>
          }
          confirmLabel="Delete user"
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
