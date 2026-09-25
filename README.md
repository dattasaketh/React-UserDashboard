# User Management Dashboard

A clean, responsive user management dashboard built with **React 18 + Vite**. View, search, filter, add, edit, and delete users — with loading, error, and empty states handled throughout.

![Stack](https://img.shields.io/badge/React-18-blue) ![Bundler](https://img.shields.io/badge/Vite-5-purple)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Features

- **User directory** — users are fetched asynchronously from a JSON file via a simulated API layer (`src/services/userApi.js`) with realistic latency, server-side style errors (duplicate email, missing user), and a `FAILURE_RATE` knob for demoing the error state.
- **Search** — debounced (250 ms) case-insensitive matching across name, username, email, role, and department.
- **Status filtering** — All / Active / Inactive segmented filter, combined with search.
- **Full CRUD** — add and edit users through a validated modal form (required fields, email format, username rules); delete requires an explicit confirmation dialog.
- **State handling** — shimmer skeleton while loading, error view with retry, "no users yet" empty state, and "no matching users" state with a one-click filter reset.
- **Responsive UI** — data table on desktop that automatically switches to a card list on mobile (≤ 720 px); modals, toasts, and toolbar adapt to small screens.
- **Accessible** — labelled controls, `role="dialog"` modals with Escape-to-close and focus trap/restore, `aria-live` toasts, visible focus rings, and `prefers-reduced-motion` support.

## Project structure

```
src/
├── App.jsx                  # Composition root: state wiring + layout
├── main.jsx                 # Entry point
├── components/
│   ├── Header.jsx           # Brand + active-user stat
│   ├── Toolbar.jsx          # Search input, status filter, Add button
│   ├── UserTable.jsx        # Desktop table (rows → UserRow)
│   ├── UserRow.jsx          # One user row with edit/delete actions
│   ├── UserCards.jsx        # Mobile card list
│   ├── UserModal.jsx        # Add/Edit form with validation
│   ├── ConfirmDialog.jsx    # Delete confirmation (built on Modal)
│   ├── Modal.jsx            # Reusable accessible dialog
│   ├── Avatar.jsx           # Colored initials avatar
│   ├── StatusPill.jsx       # Active/Inactive badge
│   ├── Toasts.jsx           # Notification stack
│   └── StateViews.jsx       # Skeleton, error, empty, no-results views
├── hooks/
│   ├── useUsers.js          # Async user store: load + CRUD
│   ├── useDebouncedValue.js # Search debounce
│   └── useToasts.js         # Auto-dismissing notifications
├── services/
│   └── userApi.js           # Simulated async API over the JSON data
├── utils/
│   ├── validation.js        # Schema-based form validation + option lists
│   └── format.js            # Date/name/avatar formatting helpers
├── data/
│   └── users.json           # Seed data source
└── styles/
    ├── global.css           # Tokens, buttons, forms, modals, toasts
    └── dashboard.css        # Header, toolbar, table/cards, responsive rules
```

## Using a real API

All data access flows through `src/services/userApi.js`, whose functions (`fetchUsers`, `createUser`, `updateUser`, `deleteUser`) already model a REST service. To swap in a real backend, replace their bodies with `fetch` calls — no component changes required.

To demo the error state, set `FAILURE_RATE` in `src/services/userApi.js` to `0.25` (25 % of requests fail) or `1` (always fails).

## Tech notes

- **No runtime dependencies beyond React** — validation, modals, toasts, and icons are hand-rolled to keep the bundle small (~53 kB gzipped total).
- State management uses built-in React hooks (`useState`, `useMemo`, `useCallback`); the filtered view is memoized so typing stays fast.
