# Step 6 — Media API

Base: `/api/v1/workspaces/:workspaceId/media`  
Auth: session cookie + workspace membership (same as websites).

| Method | Path | Body | Notes |
|--------|------|------|--------|
| POST | `/` | `multipart/form-data` field `file` | 201, image only |
| GET | `/` | query `limit` (1–100) | List workspace media |
| GET | `/:mediaId` | — | Metadata + `url` |
| GET | `/:mediaId/content` | — | Binary stream (for `<img src>`) |
| PATCH | `/:mediaId` | `multipart` field `file` | Replace file |
| DELETE | `/:mediaId` | — | Remove file + metadata |

Response `url` is a relative path, e.g. `/api/v1/workspaces/{id}/media/{mediaId}/content`.

Env: `MEDIA_MAX_FILE_SIZE_BYTES`, `MEDIA_LOCAL_ROOT`, `MEDIA_STORAGE_DRIVER=local`.

Spec flat `/api/v1/media` maps to this workspace-scoped surface.
