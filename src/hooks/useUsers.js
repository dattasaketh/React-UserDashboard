import { useCallback, useEffect, useState } from 'react'
import * as api from '../services/userApi'

function toResult(error) {
  return { ok: false, error: error?.message || 'Something went wrong. Please try again.' }
}

/**
 * Owns the user collection and CRUD flow: initial fetch with
 * loading/error state, plus add/update/delete returning { ok } results
 * so callers decide how to surface success or failure.
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMutating, setIsMutating] = useState(false)

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api.fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(toResult(err).error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const addUser = useCallback(async (data) => {
    setIsMutating(true)
    try {
      const created = await api.createUser(data)
      setUsers((current) => [...current, created])
      return { ok: true, user: created }
    } catch (err) {
      return toResult(err)
    } finally {
      setIsMutating(false)
    }
  }, [])

  const updateUser = useCallback(async (id, data) => {
    setIsMutating(true)
    try {
      const updated = await api.updateUser(id, data)
      setUsers((current) => current.map((u) => (u.id === id ? updated : u)))
      return { ok: true, user: updated }
    } catch (err) {
      return toResult(err)
    } finally {
      setIsMutating(false)
    }
  }, [])

  const deleteUser = useCallback(async (id) => {
    setIsMutating(true)
    try {
      await api.deleteUser(id)
      setUsers((current) => current.filter((u) => u.id !== id))
      return { ok: true }
    } catch (err) {
      return toResult(err)
    } finally {
      setIsMutating(false)
    }
  }, [])

  return { users, isLoading, error, isMutating, reload, addUser, updateUser, deleteUser }
}
