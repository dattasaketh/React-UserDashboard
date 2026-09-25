import { useEffect, useId, useRef } from 'react'

/**
 * Accessible modal dialog: portal-free fixed overlay, Escape to close,
 * focus moved into the dialog on open and restored on close.
 */
export default function Modal({ title, onClose, children, footer }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement
    const panel = panelRef.current
    const focusable = panel?.querySelector(
      'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const elements = [
        ...panel.querySelectorAll(
          'input, select, textarea, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null)
      if (elements.length === 0) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocusedRef.current?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef}>
        <header className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-btn" aria-label="Close dialog" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  )
}
