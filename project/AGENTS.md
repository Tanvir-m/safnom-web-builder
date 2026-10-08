# Agent onboarding — Safnom V1

## Token-efficient workflow

1. Read this file + `.cursor/rules/safnom-core.mdc` (single always-on rule).
2. Use `project/plan/README.md` to pick **one** step doc; do not scan all of `project/plan/`.
3. Search with grep/glob before opening large directories.
4. Respect `.cursorignore` (no `node_modules`, media uploads, build output).

## Task prompt template (paste into chat)

`Task: <one sentence> | Area: frontend/… or backend/src/modules/… | Plan: step-N or none | Verify: typecheck / build / test name`

## Repository layout

| Path | Role |
|------|------|
| `frontend/` | Next.js App Router, Tailwind, `services/*.api.ts` |
| `backend/` | Express modules under `src/modules/<name>/` |
| `project/plan/` | Step plans + IMPLEMENTATION_REPORT |
| `.cursor/rules/` | Cursor agent rules (mirrored in `project/cursor-rules/`) |

## Plans (status)

Index: [plan/README.md](plan/README.md). Steps **1–8** (through website preview) are implemented. **Publishing / domains product** — out of scope unless the user asks.

Foundation reference: [plan/setup/](plan/setup/).

## Conventions

- API prefix: `/api/v1`
- Module layout: controller, service, model, routes, types, `index.ts`
- Config via env; update `.env.example` without real keys
- Workspace-scoped resources use `workspaceId` + existing auth middleware

## Verification

```bash
cd backend && npm run typecheck && npm test
cd frontend && npm run build
```

Health: `GET /api/v1/health`

## Cursor vs Safnom AI

- **Cursor Pro** — IDE assistance (this repo’s development).
- **Safnom AI** — `backend/.env`: `AI_PROVIDER=mock|openai`, `AI_API_KEY` for in-app website/section generation.
