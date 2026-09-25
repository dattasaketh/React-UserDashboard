import Modal from './Modal'
import { emptyUserFrom, DEPARTMENTS, ROLES, STATUSES } from '../utils/validation'
import { useState } from 'react'

const BLANK = emptyUserFrom()

function userToForm(user) {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    department: user.department,
    status: user.status,
  }
}

export default function UserModal({ mode, user, onSubmit, onClose }) {
  const isEdit = mode === 'edit'
  const [values, setValues] = useState(() => (isEdit ? userToForm(user) : { ...BLANK }))
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field) => (event) => {
    const value = event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => current.filter((issue) => issue.field !== field))
  }

  const errorFor = (field) => errors.find((issue) => issue.field === field)?.message

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    const result = await onSubmit(values)
    setIsSubmitting(false)
    if (result === true) return
    if (Array.isArray(result) && result.length > 0) setErrors(result)
  }

  const fieldClass = (field) => `field-input${errorFor(field) ? ' has-error' : ''}`

  return (
    <Modal title={isEdit ? 'Edit user' : 'Add new user'} onClose={onClose}>
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-field span-2">
            <label htmlFor="uf-name">Full name</label>
            <input
              id="uf-name"
              className={fieldClass('name')}
              type="text"
              value={values.name}
              onChange={setField('name')}
              placeholder="e.g. Maria Garcia"
              autoComplete="off"
              aria-invalid={Boolean(errorFor('name'))}
            />
            {errorFor('name') && <p className="field-error">{errorFor('name')}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="uf-username">Username</label>
            <input
              id="uf-username"
              className={fieldClass('username')}
              type="text"
              value={values.username}
              onChange={setField('username')}
              placeholder="e.g. maria.garcia"
              autoComplete="off"
              aria-invalid={Boolean(errorFor('username'))}
            />
            {errorFor('username') && <p className="field-error">{errorFor('username')}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="uf-email">Email</label>
            <input
              id="uf-email"
              className={fieldClass('email')}
              type="email"
              value={values.email}
              onChange={setField('email')}
              placeholder="e.g. maria@company.com"
              autoComplete="off"
              aria-invalid={Boolean(errorFor('email'))}
            />
            {errorFor('email') && <p className="field-error">{errorFor('email')}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="uf-role">Role</label>
            <select
              id="uf-role"
              className={fieldClass('role')}
              value={values.role}
              onChange={setField('role')}
              aria-invalid={Boolean(errorFor('role'))}
            >
              <option value="" disabled>
                Select a role…
              </option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errorFor('role') && <p className="field-error">{errorFor('role')}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="uf-department">Department</label>
            <select
              id="uf-department"
              className={fieldClass('department')}
              value={values.department}
              onChange={setField('department')}
              aria-invalid={Boolean(errorFor('department'))}
            >
              <option value="" disabled>
                Select a department…
              </option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errorFor('department') && <p className="field-error">{errorFor('department')}</p>}
          </div>

          <div className="form-field span-2">
            <span className="field-label" id="uf-status-label">
              Status
            </span>
            <div className="status-toggle" role="radiogroup" aria-labelledby="uf-status-label">
              {STATUSES.map((status) => (
                <label key={status.value} className={`status-option is-${status.value}${values.status === status.value ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={values.status === status.value}
                    onChange={setField('status')}
                  />
                  <span className="status-dot" aria-hidden="true" />
                  {status.label}
                </label>
              ))}
            </div>
            {errorFor('status') && <p className="field-error">{errorFor('status')}</p>}
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add user'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
