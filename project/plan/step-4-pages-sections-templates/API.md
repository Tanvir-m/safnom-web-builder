# Step 4 — API

All page routes require auth and workspace membership (nested under websites).

## Pages

| Method | Path |
|--------|------|
| POST | `/api/v1/workspaces/:workspaceId/websites/:websiteId/pages` |
| GET | `/api/v1/workspaces/:workspaceId/websites/:websiteId/pages` |
| GET | `/api/v1/workspaces/:workspaceId/websites/:websiteId/pages/:pageId` |
| PATCH | `/api/v1/workspaces/:workspaceId/websites/:websiteId/pages/:pageId` |
| DELETE | `/api/v1/workspaces/:workspaceId/websites/:websiteId/pages/:pageId` |

## Sections

| Method | Path |
|--------|------|
| POST | `.../pages/:pageId/sections` |
| PATCH | `.../pages/:pageId/sections/reorder` body `{ sectionIds: [] }` |
| POST | `.../pages/:pageId/sections/:sectionId/duplicate` |
| PATCH | `.../pages/:pageId/sections/:sectionId` |
| DELETE | `.../pages/:pageId/sections/:sectionId` |

## Templates

| Method | Path |
|--------|------|
| GET | `/api/v1/templates` |
| GET | `/api/v1/templates/:templateId` |

Apply: optional `templateId` on `POST .../workspaces/:workspaceId/websites`.

## Website fields

Responses include `theme` and `settings` on websites.
