# Safnom V1 Architecture

## Pattern

**Modular monolith** — one deployable backend with isolated feature modules, not microservices.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB via Mongoose |
| API | REST, version prefix `/api/v1` |

## Backend structure

```
backend/src/
├── config/       # Environment and app config
├── database/     # MongoDB connection
├── middleware/   # Error handling, etc.
├── modules/      # Feature modules
├── routes/       # API route aggregation
├── services/     # Shared services (if any)
├── utils/        # Response helpers, etc.
├── app.ts        # Express application
└── server.ts     # HTTP server lifecycle
```

Each module under `modules/` follows:

- `*.controller.ts` — HTTP handlers
- `*.service.ts` — business logic
- `*.model.ts` — Mongoose models
- `*.routes.ts` — Express router
- `*.types.ts` — TypeScript types
- `index.ts` — public exports

## Multi-tenancy (foundation)

**Workspace-based tenancy:** users will belong to one or more workspaces. Future domain resources (websites, pages, media, etc.) should associate with a `workspaceId` for isolation.

Foundation includes a `workspaces` module scaffold and documented types only — no invitations, billing, or enforcement middleware yet.

## API versioning

All routes mount under `API_PREFIX` (default `/api/v1`):

- `/api/v1/health`
- `/api/v1/auth` (scaffold)
- `/api/v1/users`, `/workspaces`, `/websites`, `/pages`, `/media`, `/ai`, `/domains`, `/publishing` (scaffold)

## Frontend

Separate Next.js app in `frontend/`. API access via `frontend/services/api.ts` using `NEXT_PUBLIC_API_URL`.
