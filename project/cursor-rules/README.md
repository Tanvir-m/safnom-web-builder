# Cursor rules (shareable copies)

These files mirror [`.cursor/rules/`](../../.cursor/rules/) at the repo root so you can share coding conventions with teammates without sending the whole repo.

When you change a rule, update **both** `.cursor/rules/*.mdc` and this folder so they stay in sync.

| Rule | Purpose |
|------|---------|
| `safnom-core.mdc` | Stack, scope, reads, verification (always on) |
| `backend-modules.mdc` | Express module layout (`backend/**/*.ts`) |
| `frontend-next.mdc` | Next.js / API client patterns (`frontend/**/*.{ts,tsx}`) |
| `project-plan.mdc` | Step plan discipline (`project/plan/**/*.md`) |

Repo root also has `.cursorignore` (indexing ignore list) and `.cursorrules` (short pointer).
