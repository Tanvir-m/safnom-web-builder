# Step 1 — Plan

## Backend modules

- `backend/src/modules/auth/` — signup, login, logout, forgot/reset password, **Firebase token exchange**
- `backend/src/modules/users/` — User model, GET/PATCH `/me`
- `backend/src/services/email/` — provider-agnostic email (console + SMTP via Nodemailer)
- `backend/src/services/firebase/` — Firebase Admin SDK (verify ID tokens)

## Email + password

- bcrypt password hashing (cost 12)
- `passwordHash` optional on User (OAuth-only accounts have no password until reset-password sets one)
- Login with password when `passwordHash` is missing → 401 `PASSWORD_LOGIN_UNAVAILABLE` (use Google or forgot-password to add a password)

## Google sign-in (Firebase hybrid)

Firebase handles OAuth UI on the client; Safnom keeps MongoDB users, workspaces, and the existing JWT cookie for all API routes.

```text
Browser → Firebase (Google popup) → Firebase ID token
       → POST /api/v1/auth/firebase { idToken }
       → Admin SDK verifyIdToken
       → find/create User (firebaseUid, email, name, emailVerified)
       → create workspace on first sign-up (same as email signup)
       → signAccessToken + HttpOnly cookie
       → frontend AuthContext refreshUser / set user from response
```

### Account linking

| Case | Behavior |
|------|----------|
| New Google user | Create user + default workspace |
| Existing email/password user, first Google login (same email) | Attach `firebaseUid`; sync `emailVerified` / name if empty |
| Email linked to a different `firebaseUid` | 409 `ACCOUNT_CONFLICT` |
| Invalid/expired ID token | 401 `INVALID_FIREBASE_TOKEN` |
| Firebase Admin not configured | 503 `FIREBASE_NOT_CONFIGURED` |

### Frontend

- `frontend/lib/firebase/client.ts` — Firebase web app init (env-gated)
- `frontend/components/auth/GoogleSignInButton.tsx` — popup + token handoff
- Login/signup pages: Google button + “or continue with email” when client env is set
- `AuthContext.completeFirebaseLogin(idToken)` → `POST /auth/firebase`
- Logout: clear Safnom cookie + optional `firebase.auth().signOut()`

### Environment

**Backend** (`backend/.env.example`):

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (service account; use `\n` for newlines in `.env`)

**Frontend** (`frontend/.env.example`):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Firebase Console:** enable Google provider; add authorized domains (`localhost`, production host).

Google button is hidden until all four `NEXT_PUBLIC_FIREBASE_*` vars are set.

## Security (shared)

- JWT in HttpOnly cookie (`SameSite=Lax`, `Secure` in production)
- Reset tokens: random bytes, SHA-256 stored, 1h expiry, single-use
- Forgot password: generic response (no email enumeration)
- Login: same error for invalid email or password (when password login applies)
- Never commit service account JSON or put Admin credentials in `NEXT_PUBLIC_*`

## Out of scope

Apple/GitHub/other OAuth providers (same `/auth/firebase` pattern when added in Firebase), MFA, mandatory email verification flow beyond syncing Firebase `email_verified`, workspaces product beyond auto-create on signup.
