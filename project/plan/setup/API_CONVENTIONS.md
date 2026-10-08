# API Conventions

Base path: `/api/v1` (configurable via `API_PREFIX`).

## Success response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Error response

```json
{
  "success": false,
  "message": "Request failed",
  "error": {
    "code": "ERROR_CODE"
  }
}
```

In development, optional `error.details` may include the message. Stack traces are never sent in production.

## HTTP status codes

| Code | Usage |
|------|--------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request / validation |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 501 | Not implemented (scaffold endpoints) |
| 500 | Internal server error |

## Module routes

Mount module routers under the v1 aggregator:

- `/auth`, `/users`, `/workspaces`, `/websites`, `/pages`, `/media`, `/ai`, `/domains`, `/publishing`

Implement handlers in `*.controller.ts`; keep routers thin in `*.routes.ts`.
