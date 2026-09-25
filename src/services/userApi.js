import usersData from '../data/users.json'

/**
 * Simulated async API backed by a local JSON file.
 * Mirrors the shape of a real REST service (fetch + status codes + latency)
 * so swapping in a real backend later is a drop-in change.
 */

const STORAGE_KEY = 'reactpro_users'
const LATENCY_MS = 450
const FAILURE_RATE = 0 // bump to e.g. 0.25 to demo the error state

function loadUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('Failed to load users from localStorage', e)
  }
  return usersData.map((user) => ({ ...user }))
}

function saveUsers(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save users to localStorage', e)
  }
}

let users = loadUsers()
let nextId = users.length > 0 ? Math.max(...users.map((user) => user.id), 0) + 1 : 1

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function maybeFail() {
  if (Math.random() < FAILURE_RATE) {
    throw new Error('The server is unreachable. Please try again.')
  }
}

export async function fetchUsers() {
  await wait(LATENCY_MS)
  maybeFail()
  return users.map((user) => ({ ...user }))
}

export async function createUser(data) {
  await wait(LATENCY_MS)
  maybeFail()
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('A user with this email already exists.')
  }
  const user = {
    ...data,
    id: nextId++,
    lastActive: new Date().toISOString(),
  }
  users.push(user)
  saveUsers(users)
  return { ...user }
}

export async function updateUser(id, data) {
  await wait(LATENCY_MS)
  maybeFail()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('This user no longer exists. Refresh and try again.')
  if (users.some((u) => u.id !== id && u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Another user already uses this email.')
  }
  users[index] = { ...users[index], ...data }
  saveUsers(users)
  return { ...users[index] }
}

export async function deleteUser(id) {
  await wait(LATENCY_MS)
  maybeFail()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('This user no longer exists. Refresh and try again.')
  users.splice(index, 1)
  saveUsers(users)
  return { id }
}
