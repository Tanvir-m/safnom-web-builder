# Step 1 — Authentication & user account

**Status:** Complete (see [IMPLEMENTATION_REPORT.md](IMPLEMENTATION_REPORT.md))

## Scope

- Sign up, login, logout (email + password)
- **Google sign-in / sign-up** via Firebase Authentication (hybrid session — see [PLAN.md](PLAN.md))
- Forgot password, reset password (pluggable email service)
- User profile: get/update current user (`/users/me`)
- HttpOnly JWT cookie sessions (same cookie for email and Google flows)

## Prerequisites

- [Foundation setup](../setup/SETUP.md) — MongoDB, env, `/api/v1` conventions

## Documents

| File | Description |
|------|-------------|
| [PLAN.md](PLAN.md) | Implementation tasks, security, env |
| [API.md](API.md) | Endpoint contracts |
| [IMPLEMENTATION_REPORT.md](IMPLEMENTATION_REPORT.md) | Verification results |

## Share with teammates

Send this folder plus links to [../setup/API_CONVENTIONS.md](../setup/API_CONVENTIONS.md) for response format.
