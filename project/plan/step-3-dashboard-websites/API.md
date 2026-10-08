# Step 3 — API

Requires auth + workspace membership (`404 WORKSPACE_NOT_FOUND` if not a member).

Base: `/api/v1/workspaces/:workspaceId/websites`

## POST `/`

Body: `{ "name": string, "description"?: string }`

Creates website with status `DRAFT`.

## GET `/`

Lists websites in the workspace (newest first).

## GET `/:websiteId`

Returns one website; `404 WEBSITE_NOT_FOUND` if wrong workspace or missing.

## PATCH `/:websiteId`

Body: `{ "name"?: string, "description"?: string, "status"?: "DRAFT"|"PUBLISHED"|"UNPUBLISHED" }`

## DELETE `/:websiteId`

Hard-deletes website.
