# Step 8 — Preview API

Base: `/api/v1/workspaces/:workspaceId/websites/:websiteId`  
Auth: session + workspace membership.

| Method | Path | Query | Purpose |
|--------|------|-------|---------|
| GET | `/preview` | `slug?` (optional; default HOME / home / first) | Website theme + page nav summaries + full page with sections |

Response `data`:

```json
{
  "website": { "...theme..." },
  "pages": [{ "id", "name", "slug", "pageType", "seo" }],
  "page": { "...sections, seo, slug..." }
}
```

Frontend route: `/dashboard/websites/[websiteId]/preview?slug=`
