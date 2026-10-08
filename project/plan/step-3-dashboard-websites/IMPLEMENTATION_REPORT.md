# Step 3 — Implementation report

## Repository inspection

| Item | Found |
|------|--------|
| Auth & workspaces | Step 1–2 complete: `requireAuth`, `requireWorkspaceParamAccess`, `WorkspaceContext` |
| Websites scaffold | Flat `/websites` 501 replaced with workspace-nested CRUD |
| Frontend marketing | Public `/` unchanged; new `(dashboard)/` route group without `SiteHeader` |

## Implemented

### Backend

- `Website` model: `workspaceId`, `name`, `description`, `slug`, `status` (`DRAFT` \| `PUBLISHED` \| `UNPUBLISHED`), timestamps
- Indexes: unique `{ workspaceId, slug }`, list `{ workspaceId, updatedAt }`
- `websites.service.ts`: CRUD, slug generation, `assertWebsiteInWorkspace` → 404 `WEBSITE_NOT_FOUND`
- Nested routes: `/api/v1/workspaces/:workspaceId/websites` (+ `:websiteId` for item ops)
- Middleware: `requireAuth` + `requireWorkspaceParamAccess` on website router mount
- Integration tests: create (DRAFT), list isolation, cross-workspace 404, PATCH status, DELETE

### Frontend

- `frontend/types/website.ts`, `frontend/services/websites.api.ts`
- `DashboardShell`, `WebsiteStatusBadge`, `WorkspaceRequired`
- Routes: `/dashboard` → `/dashboard/websites`, list/create/detail, editor & domains placeholders
- Middleware protects `/dashboard/*`
- `SiteHeaderActions`: Dashboard link; login/signup default redirect to `/dashboard`

## API endpoints

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/:workspaceId/websites` |
| GET | `/api/v1/workspaces/:workspaceId/websites` |
| GET | `/api/v1/workspaces/:workspaceId/websites/:websiteId` |
| PATCH | `/api/v1/workspaces/:workspaceId/websites/:websiteId` |
| DELETE | `/api/v1/workspaces/:workspaceId/websites/:websiteId` |

See [API.md](./API.md).

## Security

- Workspace membership enforced before any website handler runs.
- Website IDs outside the workspace path return **404** (no cross-tenant leak).
- Create always sets server-side `DRAFT` status.

## Verification

| Check | Result |
|-------|--------|
| Website CRUD (integration) | **PASS** |
| Cross-workspace isolation | **PASS** |
| Workspace regression tests | **PASS** |
| Backend typecheck | **PASS** |
| Backend build | **PASS** |
| Backend tests (11/11) | **PASS** |
| Frontend build | **PASS** |
| Manual browser QA | **NOT RUN** — verify login → Dashboard → CRUD + workspace switch |
| Marketing `/` regression | **NOT RUN** — no intentional marketing layout changes |

## Out of scope (Step 3)

- Pages module, visual editor, AI, real publishing pipeline, workspace domain provisioning.

## Notes

- Public marketing `/domains` remains separate from in-app `/dashboard/domains` placeholder.
- Top-level `/api/v1/websites` mount removed; consumers must use workspace-nested paths.
