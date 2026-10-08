# Step 1 — API

Base: `/api/v1`. Responses follow [setup/API_CONVENTIONS.md](../setup/API_CONVENTIONS.md).

Auth cookie: set on signup, login, and Firebase exchange; send with `credentials: include` from the frontend.

## Auth

### POST `/auth/signup`

Body: `{ "email": string, "password": string, "name"?: string }`

Success: user object in `data`, auth cookie set.

### POST `/auth/login`

Body: `{ "email": string, "password": string }`

Errors: `INVALID_CREDENTIALS`; `PASSWORD_LOGIN_UNAVAILABLE` when the account has no password (Google-only — use Google or reset password to set one).

### POST `/auth/firebase`

Exchange a Firebase Authentication ID token (e.g. after Google sign-in) for a Safnom session.

Body: `{ "idToken": string }`

Success: user object in `data`, auth cookie set (same as login).

Errors:

| Code | HTTP | When |
|------|------|------|
| `FIREBASE_NOT_CONFIGURED` | 503 | Admin env vars missing |
| `INVALID_FIREBASE_TOKEN` | 401 | Token invalid or expired |
| `FIREBASE_EMAIL_REQUIRED` | 400 | Token has no email |
| `ACCOUNT_CONFLICT` | 409 | Email linked to another Google account |

### POST `/auth/logout`

Clears auth cookie.

### POST `/auth/forgot-password`

Body: `{ "email": string }`

Always returns success message (whether email exists).

### POST `/auth/reset-password`

Body: `{ "token": string, "newPassword": string }`

## Users (authenticated)

### GET `/users/me`

Returns current user profile (no password fields).

### PATCH `/users/me`

Body: `{ "name"?: string }`
