# Authentication & Route Protection Architecture

This document describes the foundational authentication infrastructure for the Mess Track SaaS platform.

## Auth Flow Diagram

```text
App Load
  ↓
[SSR Render] → Middleware checks refresh token (from cookies)
  ├─ Token valid & role OK → Allow
  ├─ Token missing/invalid → Redirect to /login
  └─ Role insufficient → Redirect to /403-forbidden
  ↓
[Hydration] → AuthProvider initializes on client
  ├─ Check localStorage/Cookie for refresh token
  ├─ If found, attempt silent refresh via /auth/token/refresh/
  └─ Set authInitialized = true, update access token in memory
  ↓
[Layout Renders] → DashboardLayout waits for authInitialized
  ├─ Show AuthLoadingPlaceholder while initializing
  ├─ If auth confirmed → Show content
  └─ If auth failed → Redirect to /login
  ↓
[App Ready] → Axios interceptors handle automatic Bearer injection and 401 retries
```

## Route Protection Decision Tree

```text
Request to route?
  ├─ Is it public? → Allow
  ├─ Is it auth-restricted? (Login/Register)
  │  ├─ User authenticated? → Redirect to /dashboard
  │  └─ User not authenticated? → Allow
  ├─ Is it protected? (Dashboard/*, Profile)
  │  ├─ User authenticated? → Check role requirements
  │  └─ User not authenticated? → Redirect to /login
  └─ Is it role-restricted?
     ├─ User role matches? → Allow
     ├─ User role mismatch? → Redirect to /403-forbidden
     └─ No role/token? → Redirect to /login
```

## Route Configuration

Defined in `src/lib/auth/route-guards.ts`:

- **Public**: `/`, `/login`, `/register`, etc.
- **Auth-Restricted**: `/login`, `/register`.
- **Protected**: `/dashboard/*`.
- **Role-Restricted**:
  - `/dashboard/settings`: `SUPER_ADMIN` only.
  - `/dashboard/members`: `SUPER_ADMIN`, `MESS_ADMIN`.
  - `/dashboard/billing`: `SUPER_ADMIN`.

## Token Management

- **Access Token**: Short-lived (15 min), stored in **memory** (Zustand) and attached to requests via Axios interceptors.
- **Refresh Token**: Long-lived (7 days), stored in **localStorage** (for client persistence) and **Cookies** (for SSR/Middleware access).
- **Silent Refresh**: Triggered by `AuthProvider` on mount or by Axios interceptor upon receiving a 401 response.
- **Token Rotation**: Supported; new refresh tokens provided by the backend are automatically persisted.

## Security Considerations

- **Middleware Enforcement**: Blocks unauthorized requests at the Edge before rendering.
- **Client-side Verification**: Secondary check in `DashboardLayout` for robust protection after hydration.
- **JWT Decoding**: Performed via `jose` in middleware for Edge compatibility.
- **Saferedirection**: All redirects include a `from` parameter to return users to their original destination after login.
