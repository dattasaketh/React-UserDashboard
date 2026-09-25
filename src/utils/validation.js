/**
 * Small validation helper: schemas are objects mapping
 * field -> array of { test, message } rules; validate() returns
 * { values, errors } where errors is a { field: message } map.
 */

export function validate(schema, values) {
  const errors = {}
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      if (!rule.test(values[field], values)) {
        errors[field] = rule.message
        break
      }
    }
  }
  return { values, errors }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const required = (message) => ({
  test: (value) => value.trim().length > 0,
  message,
})

export const UserSchema = {
  name: [
    required('Name is required.'),
    { test: (v) => v.trim().length >= 2, message: 'Name must be at least 2 characters.' },
    { test: (v) => v.trim().length <= 80, message: 'Name must be under 80 characters.' },
  ],
  username: [
    required('Username is required.'),
    {
      test: (v) => /^[a-zA-Z0-9._-]{3,30}$/.test(v.trim()),
      message: 'Use 3–30 characters: letters, numbers, dots, dashes or underscores.',
    },
  ],
  email: [
    required('Email is required.'),
    { test: (v) => EMAIL_RE.test(v.trim()), message: 'Enter a valid email address.' },
  ],
  role: [required('Role is required.')],
  department: [required('Department is required.')],
  status: [
    {
      test: (v) => v === 'active' || v === 'inactive',
      message: 'Status must be active or inactive.',
    },
  ],
}

export const DEPARTMENTS = [
  'Design',
  'Engineering',
  'Analytics',
  'Finance',
  'Marketing',
  'People',
  'Product',
  'Sales',
  'Support',
]

export const ROLES = [
  'Backend Developer',
  'Frontend Developer',
  'QA Engineer',
  'DevOps Engineer',
  'Security Specialist',
  'Product Manager',
  'Product Designer',
  'UX Designer',
  'Data Analyst',
  'Marketing Lead',
  'Content Strategist',
  'Sales Representative',
  'Customer Success Lead',
  'Account Manager',
  'HR Generalist',
]

export const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

/** Normalize raw form values before validation. */
export function userFromForm(values) {
  return {
    name: values.name.trim().replace(/\s+/g, ' '),
    username: values.username.trim().toLowerCase(),
    email: values.email.trim().toLowerCase(),
    role: values.role,
    department: values.department,
    status: values.status,
  }
}

/** Initial values for a blank create-user form. */
export function emptyUserFrom() {
  return {
    name: '',
    username: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
  }
}
