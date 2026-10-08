# Step 5 — API (delta)

Reuses Step 4 page/section routes. **New for editor:**

| Method | Path | Body |
|--------|------|------|
| PATCH | `/api/v1/workspaces/:workspaceId/websites/:websiteId` | optional `theme: { colors?, typography?, buttons? }` |

Section content/style: existing `PATCH .../pages/:pageId/sections/:sectionId` with `data` and `settings`.
