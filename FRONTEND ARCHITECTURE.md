# PermitIQ — System Architecture

## Overview

PermitIQ is a single-page React application for smart permit monitoring. Users upload permits and licenses, track expiry dates, and receive reminders. Admin users manage all users and documents. The UI combines retro-flat design with Blade Runner 2049 cyberpunk aesthetic effects.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| Routing | React Router v6 (AnimatePresence) |
| State | Zustand (4 stores) |
| HTTP | Axios (interceptors for JWT + 401) |
| Animation | Framer Motion (page slides, stagger, spring) |
| Styling | Tailwind CSS (custom Blade Runner design tokens) |
| Notifications | react-hot-toast |
| Dates | date-fns |
| Deployment | Vercel (server-side proxy via vercel.json) |

---

## Directory Structure

```
src/
├── main.tsx                  # ReactDOM entry
├── App.tsx                   # BrowserRouter + AnimatePresence + route definitions
├── index.css                 # Tailwind directives + component classes
├── types/
│   └── index.ts              # All TypeScript interfaces (User, Document, etc.)
├── api/
│   ├── client.ts             # Axios instance (baseURL: /api, JWT interceptor, 401 handler)
│   ├── auth.api.ts           # POST /auth/login, /auth/signup
│   ├── user.api.ts           # GET/PUT /users/me
│   ├── document.api.ts       # CRUD /documents, upload, search
│   ├── mail.api.ts           # POST /mail/send-reminders
│   └── admin.api.ts          # GET /admin/users, /admin/documents, delete
├── store/
│   ├── auth.store.ts         # token, user, login, signup, logout, loadProfile, updateUser
│   ├── dashboard.store.ts    # documents, stats, search, pagination
│   ├── upload.store.ts       # upload queue, progress, cancel
│   └── admin.store.ts        # admin users list, stats, selected user
├── hooks/
│   ├── useCountdown.ts       # Live countdown timer (1s interval, date-fns)
│   ├── useDebounce.ts        # Debounced value for search input
│   └── useDocumentTitle.ts   # Sets document.title on mount
├── components/
│   ├── patterns/
│   │   ├── Scanlines.tsx     # CRT scanline overlay + moving beam (CSS animation)
│   │   ├── RainEffect.tsx    # Canvas-based falling rain (splash + login)
│   │   ├── DotGrid.tsx       # Dot grid background pattern
│   │   └── DiagonalStripes.tsx # Diagonal stripe overlay
│   ├── ui/
│   │   ├── RetroCard.tsx     # Base card container
│   │   ├── RetroButton.tsx   # Variants: retro, blade, outline, danger + loading state
│   │   ├── RetroInput.tsx    # Styled input with label
│   │   ├── RetroSelect.tsx   # Styled select
│   │   ├── RetroBadge.tsx    # Status badges: ACTIVE (teal), EXPIRING_SOON (mustard), EXPIRED (red)
│   │   ├── RetroModal.tsx    # Modal with backdrop + animation
│   │   ├── RetroCountdown.tsx # Live countdown display
│   │   ├── RetroSearchBar.tsx # Search input with icon
│   │   ├── RetroAlert.tsx    # Alert banner (success, error, warning, info)
│   │   ├── RetroSpinner.tsx  # Loading spinner
│   │   ├── ShimmerCard.tsx   # Skeleton loading placeholder
│   │   ├── EmptyState.tsx    # Empty state with icon + message
│   │   ├── StatsCard.tsx     # Stat with count-up animation + label
│   │   ├── WavyDivider.tsx   # SVG wave divider
│   │   └── AvatarCircle.tsx  # User avatar initials circle
│   └── layout/
│       ├── AppNavbar.tsx     # Desktop sidebar (hidden < md) + mobile top bar
│       ├── BottomNav.tsx     # Mobile bottom nav (4 tabs, expiring badge count)
│       ├── RetroLayout.tsx   # Auth pages wrapper (centered card + optional rain)
│       ├── RetroFAB.tsx      # Fixed bottom-right button (spring scale animation)
│       ├── RetroFABSheet.tsx # Bottom sheet with Upload / Reminders / Refresh
│       ├── ProtectedRoute.tsx # Redirects to /login if unauthenticated
│       └── AdminRoute.tsx    # Redirects to /dashboard if not admin
└── pages/
    ├── SplashPage.tsx        # Animated 2.5s splash with rain + auto-redirect
    ├── LoginPage.tsx         # Cyberpunk login form + DotGrid
    ├── SignupPage.tsx        # Registration with password strength meter
    ├── DashboardPage.tsx     # Stats cards + search + staggered doc cards + delete modal
    ├── UploadPage.tsx        # Drop zone + 3 source buttons (Gallery/Camera/PDF) + progress bar
    ├── ExpiringPage.tsx      # Animated expiring document rows + send reminders
    ├── ProfilePage.tsx       # User profile display
    ├── EditProfilePage.tsx   # Edit name, phone, company, age, gender
    ├── EditDocumentPage.tsx  # Edit document metadata
    ├── AdminDashboardPage.tsx # Users table + stats overview
    ├── AdminUserDetailPage.tsx # Single user details + their documents
    ├── AdminDocumentsPage.tsx # All documents admin view
    └── NotFoundPage.tsx      # 404 page
```

---

## Routing & Component Tree

```
<BrowserRouter>
  <Toaster />
  <AnimatedRoutes>
    ├── /                         → SplashPage (2.5s → redirect)
    ├── /login                    → RetroLayout > LoginPage
    ├── /signup                   → RetroLayout > SignupPage
    │
    ├── <ProtectedRoute>          (checks token exists)
    │   ├── /dashboard            → AppNavbar + DashboardPage + BottomNav + FAB
    │   ├── /upload               → AppNavbar + UploadPage + BottomNav
    │   ├── /expiring             → AppNavbar + ExpiringPage + BottomNav
    │   ├── /profile              → AppNavbar + ProfilePage
    │   ├── /profile/edit         → EditProfilePage
    │   └── /documents/:id/edit   → EditDocumentPage
    │
    ├── <AdminRoute>              (checks role === ROLE_ADMIN)
    │   ├── /admin                → AppNavbar + AdminDashboardPage
    │   ├── /admin/users/:id      → AppNavbar + AdminUserDetailPage
    │   └── /admin/documents      → AppNavbar + AdminDocumentsPage
    │
    └── *                         → NotFoundPage
```

Each route transition uses Framer Motion `AnimatePresence` with slide (x-axis ±40px, 0.2s) or fade effects.

---

## Data Flow

### Authentication
```
LoginPage → authApi.login() → backend returns { accessToken, userId, name, email, role }
    → auth.store: save token + user to localStorage + Zustand
    → Axios interceptor reads token from store for all subsequent requests
    → 401 response → interceptor calls auth.logout() → redirect /login
```

### Documents (Dashboard)
```
DashboardPage mount → dashboard.store.fetchDocuments()
    → documentApi.getAll({ search, page, size })
    → store documents[], stats, pagination

Search → debounced 300ms → fetchDocuments with search param
Delete → RetroModal confirm → documentApi.delete(id) → refetch
Status color: RetroBadge checks expiryDate → ACTIVE / EXPIRING_SOON (30d) / EXPIRED
```

### Upload
```
UploadPage → 3 source buttons (hidden file inputs):
    Gallery → accept="image/*"
    Camera → capture="environment"
    PDF    → accept="application/pdf"

File selected → upload.store.uploadDocument(file, onProgress)
    → documentApi.upload (FormData, onUploadProgress)
    → progress bar updates in real-time
    → success → toast + reset
```

### Expiring & Reminders
```
ExpiringPage mount → dashboard.store.fetchExpiring()
    → documentApi.getExpiring() → filtered by backend

Send Reminders → mailApi.sendReminders(documentIds)
    → toast success/failure
```

### Profile
```
ProfilePage → reads user from auth.store (populated from localStorage)
EditProfilePage → form pre-filled → userApi.updateProfile(data)
    → response → auth.store.updateUser(response) → localStorage updated
```

---

## State Management (Zustand)

| Store | Key State | Key Actions |
|-------|-----------|-------------|
| `auth.store` | `token`, `user`, `isAuthenticated`, `isAdmin`, `loading` | `login()`, `signup()`, `logout()`, `loadProfile()`, `updateUser()` |
| `dashboard.store` | `documents[]`, `stats`, `search`, `page`, `totalPages`, `loading` | `fetchDocuments()`, `fetchStats()`, `fetchExpiring()` |
| `upload.store` | `queue[]`, `progress`, `uploading` | `uploadDocument()`, `cancelUpload()` |
| `admin.store` | `users[]`, `adminStats`, `selectedUser`, `loading` | `fetchUsers()`, `fetchStats()`, `fetchUserDetail()` |

All stores persist JWT token and user object to `localStorage` for session continuity across page reloads. On 401, `auth.store.logout()` clears both.

---

## API Layer (Axios)

```
client.ts
  baseURL: '/api'
  request interceptor: attach Bearer token from auth.store
  response interceptor: on 401 → auth.store.logout()
```

All API modules (`auth.api.ts`, `user.api.ts`, etc.) use this shared client instance. In development, Vite proxy forwards `/api` → `http://13.234.78.55:8080`. In production (Vercel), `vercel.json` rewrites `/api/(.*)` → `http://13.234.78.55:8080/api/$1`.

---

## Design System

### Blade Runner Theme Tokens (index.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--br-dark` | `#0A0E1A` | Page background |
| `--br-dark-card` | `#121828` | Card/section background |
| `--br-cyan` | `#00E5FF` | Primary accent (borders, glows, buttons) |
| `--br-amber` | `#FFB000` | Secondary accent (FAB, countdown) |
| `--br-text` | `#B0BEC5` | Body text |
| `--br-muted` | `#546E7A` | Muted/secondary text |
| `--br-border` | `rgba(0,229,255,0.2)` | Card borders |

### Component Class Names (index.css)

- `.retro-card` — Flat cream card with olive border (foundation)
- `.blade-card` — Dark card with neon cyan border + subtle glow
- `.blade-input` — Dark input with cyan focus ring + neon border
- `.blade-btn-primary` — Cyan gradient button
- `.blade-btn-amber` — Amber gradient button
- `.blade-label` — Uppercase Space Mono tracking-wider label
- `.scanlines` — CRT scanline overlay pseudo-element
- `.scanline-beam` — Moving horizontal beam animation

### Framer Motion Presets

- **Page transitions**: `{ opacity: 0/1, x: ±40 }` over 0.2s
- **List stagger**: `staggerChildren: 0.08` with `y: 20 → 0`
- **Button spring**: `{ scale: 0.93 }` with `{ type: "spring", stiffness: 400, damping: 17 }`
- **Splash screen**: 2.5s auto-advance with loading bar + fade

---

## Deployment (Vercel)

```vercel.json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "http://13.234.78.55:8080/api/$1" },
    { "source": "/admin/(.*)", "destination": "http://13.234.78.55:8080/admin/$1" },
    { "source": "/uploads/(.*)", "destination": "http://13.234.78.55:8080/uploads/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Vercel proxies API requests server-side (no CORS), and rewrites all routes to `index.html` for React Router SPA navigation. Build command: `npm run build`, output dir: `dist`.

---

## Key Design Decisions

1. **Vite proxy (dev) + vercel.json rewrites (prod)** — avoids CORS configuration on backend; both dev and prod use `/api` relative URLs.
2. **Zustand over Redux** — simpler boilerplate, built-in `getState()` for Axios interceptor access, sufficient for this app's state complexity.
3. **localStorage persistence** — token + user survive page refresh; `permitiq_token` and `permitiq_user` keys.
4. **Auto-logout on 401** — Axios response interceptor catches expired/invalid tokens globally.
5. **Blade Runner on top of retro flat** — keeps the card/button component structure from the retro foundation but swaps color tokens and layers pattern effects (scanlines, rain, dot grid) for the cyberpunk aesthetic.
6. **Mobile-first layout** — bottom nav + FAB on mobile; sidebar replaces nav on `md+`.
7. **Three upload sources** — Gallery, Camera (mobile capture), and PDF picker, all via hidden `<input>` elements triggered by styled buttons.
