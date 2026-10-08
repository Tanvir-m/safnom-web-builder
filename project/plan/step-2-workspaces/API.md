# Step 2 — API

Base: `/api/v1`. All routes require auth cookie unless noted.

## Workspaces

### POST `/workspaces`

Body: `{ "name": string, "slug"?: string }`

Creates workspace, OWNER membership, sets current workspace.

### GET `/workspaces`

Lists workspaces where the user is a member.

### GET `/workspaces/current`

Returns selected workspace or `data: null` if none / stale.

### GET `/workspaces/:workspaceId`

Member only; else `404 WORKSPACE_NOT_FOUND`.

### PATCH `/workspaces/:workspaceId`

Body: `{ "name": string }`. Member only.

### POST `/workspaces/:workspaceId/select`

Sets user's current workspace. Member only.
