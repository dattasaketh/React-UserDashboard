
# User Management Dashboard

A clean, responsive User Management Dashboard built with **React 18 and Vite**.

The application provides a complete user management experience including user listing, search, filtering, sorting, pagination, add/edit/delete operations, form validation, loading and error handling, and a responsive interface for desktop and mobile devices.

---

## 📌 Project Overview

The User Management Dashboard is designed to provide an easy-to-use interface for managing users in an organization.

Users can:

- View all users
- Search users
- Filter users by Active/Inactive status
- Sort users by different columns
- Navigate users using pagination
- Add new users
- Edit existing users
- Delete users with confirmation
- Receive validation feedback while filling forms
- Handle loading, error, and empty states

The project uses a simulated asynchronous API layer over a local JSON data source. The API structure is designed so that it can later be replaced with a real backend API without requiring major changes to the UI components.

---

## ✨ Features

### 👥 User Directory

- Displays users from a local JSON data source.
- Data is accessed through a simulated asynchronous API layer.
- Supports loading and error states.
- Supports empty and no-results states.
- Displays user information including:
  - Name
  - Username
  - Email
  - Role
  - Department
  - Status
  - Last Active

---

### 🔎 Search

The dashboard provides a debounced search feature.

Search is performed across:

- Name
- Username
- Email
- Role
- Department

The search is:

- Case-insensitive
- Debounced by 250 ms
- Combined with the status filter
- Automatically resets pagination when the search changes

---

### 🔘 Status Filtering

Users can be filtered using:

- All
- Active
- Inactive

The status filter works together with the search functionality.

For example, users can search for a department or role while displaying only Active users.

---

### 📄 Pagination

The dashboard supports client-side pagination.

Features include:

- 5 users displayed per page
- Previous page button
- Next page button
- Individual page navigation
- Current page indication
- Display of the current user range
- Automatic page reset when search or filters change

Example:

```text
Showing 1–5 of 12 users
````

---

### ↕️ Sorting

Users can be sorted using the following columns:

* User
* Role
* Status
* Last Active

Each sortable column supports:

* Ascending order
* Descending order

The active sorting direction is displayed using an arrow indicator.

---

### ➕ Add User

Users can be added through a reusable modal form.

The form validates user information before submission.

Validated fields include:

* Name
* Username
* Email
* Role
* Department
* Status

---

### ✏️ Edit User

Existing users can be edited using the same reusable user form.

The form is pre-populated with the selected user's information.

Changes are validated before being saved.

---

### 🗑️ Delete User

Users can be deleted from the dashboard.

Before deletion, an explicit confirmation dialog is displayed to prevent accidental deletion.

---

### ✅ Form Validation

The application includes client-side form validation.

Validation includes:

* Required field validation
* Email format validation
* Username validation
* Valid role selection
* Valid department selection
* Valid status selection

Validation feedback is also triggered when a user leaves a form field.

---

### ⏳ Loading State

While user data is being loaded, the application displays a skeleton/shimmer loading interface.

This provides visual feedback instead of leaving the page blank.

---

### ❌ Error State

The application provides an error state when user data cannot be loaded.

The error interface includes a retry option so users can attempt the operation again.

The simulated API also supports configurable request failures for testing.

---

### 📭 Empty State

The application handles two different empty situations:

#### No users

Displayed when there are no users available.

#### No matching users

Displayed when users exist but the current search/filter combination produces no results.

A filter reset option is provided for the no-results state.

---

### 📱 Responsive Design

The dashboard is responsive across different screen sizes.

#### Desktop

Users are displayed in a structured data table.

#### Mobile

The table automatically switches to a card-based user list.

Responsive behavior also applies to:

* Search and filters
* Pagination
* Modals
* Toast notifications
* Forms
* Toolbar controls

---

### ♿ Accessibility

The application includes several accessibility improvements:

* Labelled form controls
* Accessible buttons
* `role="dialog"` for modal dialogs
* Escape-to-close support
* Focus management
* Focus restoration
* `aria-live` notifications
* Visible keyboard focus indicators
* Reduced-motion support using `prefers-reduced-motion`

---

## 🛠️ Technology Stack

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| React 18   | Frontend UI development               |
| Vite 5     | Development server and build tool     |
| JavaScript | Application logic                     |
| HTML       | Application structure                 |
| CSS        | Styling and responsive design         |
| JSON       | Initial user data                     |
| Git        | Version control                       |
| GitHub     | Source code hosting and collaboration |

---

## 📁 Project Structure

```text
src/
│
├── App.jsx
├── main.jsx
│
├── components/
│   ├── Header.jsx
│   ├── Toolbar.jsx
│   ├── UserTable.jsx
│   ├── UserRow.jsx
│   ├── UserCards.jsx
│   ├── UserModal.jsx
│   ├── ConfirmDialog.jsx
│   ├── Modal.jsx
│   ├── Avatar.jsx
│   ├── StatusPill.jsx
│   ├── Toasts.jsx
│   └── StateViews.jsx
│
├── hooks/
│   ├── useUsers.js
│   ├── useDebouncedValue.js
│   └── useToasts.js
│
├── services/
│   └── userApi.js
│
├── utils/
│   ├── validation.js
│   └── format.js
│
├── data/
│   └── users.json
│
└── styles/
    ├── global.css
    └── dashboard.css
```

---

## 📂 Component Overview

### `App.jsx`

The main composition component responsible for:

* Application state
* User operations
* Search
* Filtering
* Sorting
* Pagination
* Modal state
* Delete confirmation
* Layout composition

---

### `Header.jsx`

Displays:

* Application branding
* Dashboard title
* Dashboard subtitle
* Total user count

---

### `Toolbar.jsx`

Provides:

* Search input
* Active/Inactive filter
* Add User button

---

### `UserTable.jsx`

Displays users in a desktop table.

It also provides sortable table columns.

---

### `UserRow.jsx`

Represents an individual user row and provides:

* User information
* Edit action
* Delete action

---

### `UserCards.jsx`

Displays users in a mobile-friendly card layout.

---

### `UserModal.jsx`

Reusable modal for:

* Adding users
* Editing users
* Validating user information

---

### `ConfirmDialog.jsx`

Reusable confirmation dialog used before deleting a user.

---

### `Modal.jsx`

Reusable accessible modal component used by other dialogs.

---

### `Avatar.jsx`

Generates a visual avatar using user initials.

---

### `StatusPill.jsx`

Displays the current user status:

* Active
* Inactive

---

### `Toasts.jsx`

Displays temporary notification messages for user actions and API operations.

---

### `StateViews.jsx`

Contains reusable UI states for:

* Loading
* Error
* Empty
* No search results

---

## 🧩 Custom Hooks

### `useUsers.js`

Provides the application's user data operations.

It handles:

* Fetching users
* Adding users
* Updating users
* Deleting users
* Loading state
* Error state
* Mutation state

---

### `useDebouncedValue.js`

Provides the debounce functionality used by the search field.

This prevents filtering from running on every individual keystroke.

---

### `useToasts.js`

Manages temporary notification messages.

---

## 🔌 API Layer

The application uses a simulated API layer:

```text
src/services/userApi.js
```

The API provides functions such as:

```text
fetchUsers()
createUser()
updateUser()
deleteUser()
```

The API simulates asynchronous network requests with realistic latency.

This keeps the UI architecture similar to an application that communicates with a real backend.

---

## 🌐 Using a Real API

The application separates data access from UI components.

All user operations flow through:

```text
src/services/userApi.js
```

This makes it possible to replace the simulated API with a real REST API later.

For example:

```javascript
fetch('/api/users')
```

The UI components can continue using the same user operations without requiring major changes.

---

## 🧪 Error State Testing

The simulated API contains a configurable failure rate.

Inside:

```text
src/services/userApi.js
```

The failure rate can be configured for testing.

Example:

```javascript
FAILURE_RATE = 0.25
```

This represents a 25% simulated request failure rate.

To make every request fail:

```javascript
FAILURE_RATE = 1
```

This can be used to verify the application's error and retry states.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

You can verify the installations using:

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/dattasaketh/React-UserDashboard.git
```

Navigate into the project:

```bash
cd React-UserDashboard
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run the Development Server

Start the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

The production files are generated inside:

```text
dist/
```

---

## 👀 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm install`     | Install project dependencies |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |

---

## 🔀 Git Workflow

The project was developed using a feature-branch workflow.

### Main branch

```text
master
```

### Feature branch

```text
feature/dashboard-enhancements
```

The enhancement work was developed separately and submitted through a Pull Request before being merged into `master`.

---

## 🚀 Dashboard Enhancements

The enhancement phase introduced several improvements to the original dashboard.

### 1. Enhanced Form Validation

Added on-blur validation to provide earlier feedback while entering user information.

### 2. Pagination

Added client-side pagination with:

* Page navigation
* Previous/Next controls
* User range information
* Automatic page reset after filtering/searching

### 3. Sorting

Added ascending and descending sorting for:

* User
* Role
* Status
* Last Active

### 4. Total User Count

Added a dynamic total-user count to the dashboard header.

---

## 🧠 React Concepts Used

This project demonstrates several important React concepts:

### Components

The UI is divided into reusable components rather than keeping everything inside a single component.

### Props

Components receive data and callback functions through props.

### State

`useState` is used to manage:

* Users
* Search state
* Filters
* Pagination
* Sorting
* Modal state
* Form state
* Loading and mutation states

### Effects

`useEffect` is used for:

* Loading user data
* Responding to search/filter changes
* Resetting pagination

### Memoization

`useMemo` is used for derived data such as:

* Filtered users
* Sorted users
* Paginated users

### Callbacks

`useCallback` is used where appropriate to maintain stable function references.

---

## 🔄 Application Flow

The basic application flow is:

```text
User Interface
      ↓
React Components
      ↓
Custom Hooks
      ↓
API Service Layer
      ↓
Local JSON Data
```

For example, loading users follows:

```text
App.jsx
   ↓
useUsers()
   ↓
userApi.fetchUsers()
   ↓
users.json
   ↓
Users displayed in the dashboard
```

---

## 🛡️ Validation Flow

When adding or editing a user:

```text
User enters information
        ↓
Form field validation
        ↓
Validation errors displayed
        ↓
User corrects information
        ↓
Form submission
        ↓
API operation
        ↓
Dashboard updated
        ↓
Success notification
```

---

## 📊 User Management Flow

```text
View Users
    │
    ├── Search
    │
    ├── Filter
    │
    ├── Sort
    │
    ├── Pagination
    │
    ├── Add User
    │
    ├── Edit User
    │
    └── Delete User
```

---

## 🧪 Testing

The following functionality was tested during development:

* User loading
* Search
* Active/Inactive filtering
* Combined search and filtering
* Add user
* Edit user
* Delete user
* Delete confirmation
* Form validation
* On-blur validation
* Pagination
* Sorting
* Loading state
* Error state
* Empty state
* No-results state
* Responsive layout
* Desktop layout
* Mobile layout
* Production build

Production build verification:

```bash
npm run build
```

---

## 📱 Responsive Behavior

The dashboard adapts to different screen sizes.

### Desktop

```text
Header
   ↓
Toolbar
   ↓
User Table
   ↓
Pagination
```

### Mobile

```text
Header
   ↓
Toolbar
   ↓
User Cards
   ↓
Pagination
```

The application switches from the desktop table layout to a mobile card layout at smaller screen sizes.

---

## 🎯 Project Goals

The main goals of this project are to demonstrate:

* React fundamentals
* Component-based architecture
* State management
* Props
* Hooks
* CRUD operations
* Search and filtering
* Sorting
* Pagination
* Form validation
* Error handling
* Loading states
* Responsive UI development
* Accessibility considerations
* Git and GitHub workflow
* Feature branch development
* Pull Request workflow

---

## 📌 Future Improvements

The application can be extended further with:

* Real backend API integration
* Database persistence
* Authentication and authorization
* Role-based access control
* Server-side pagination
* Server-side sorting and filtering
* User profile pages
* Advanced filtering
* Export users to CSV
* Bulk user operations
* Automated unit and integration tests
* End-to-end testing

---

## 👨‍💻 Author

**G. Datta Saketh Ram**

B. V. Raju Institute of Technology

IT / Software Development

---

## 📄 License

This project was created as a development assignment and learning project.

````

### One small thing before you paste

Your current README has some formatting corruption such as:

```text
**# User Management Dashboard**
````

and:

```text
![Stack]\([https://...])
```

The version above fixes those Markdown issues too.