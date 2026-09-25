import { useMemo, useState } from 'react'
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
      <Header activeCount={users.filter((user) => user.status === 'active').length} />

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
                users={visibleUsers}
                onEdit={(user) => setModalState({ mode: 'edit', user })}
                onDelete={setPendingDelete}
              />
              <UserCards
                users={visibleUsers}
                onEdit={(user) => setModalState({ mode: 'edit', user })}
                onDelete={setPendingDelete}
              />
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
