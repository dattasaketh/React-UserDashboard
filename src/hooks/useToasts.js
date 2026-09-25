import { useCallback, useEffect, useRef, useState } from 'react'

const TOAST_DURATION_MS = 4000

/** Manages transient notifications with auto-dismiss and manual close. */
export function useToasts() {
  const [toasts, setToasts] = useState([])
  const nextIdRef = useRef(1)

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((message, type = 'info') => {
    const id = nextIdRef.current++
    setToasts((current) => [...current, { id, message, type }])
    return id
  }, [])

  useEffect(() => {
    if (toasts.length === 0) return undefined
    const timers = toasts.map((toast) =>
      setTimeout(() => dismissToast(toast.id), TOAST_DURATION_MS),
    )
    return () => timers.forEach(clearTimeout)
  }, [toasts, dismissToast])

  return { toasts, pushToast, dismissToast }
}
