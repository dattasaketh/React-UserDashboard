import { initials, avatarClass } from '../utils/format'

export default function Avatar({ user, size = 'md' }) {
  return (
    <span className={`avatar avatar-${size} ${avatarClass(user.id)}`} aria-hidden="true">
      {initials(user.name)}
    </span>
  )
}
