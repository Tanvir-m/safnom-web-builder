# Safnom delivery plans

Plans are grouped **one folder per step or feature** so you can share only what a teammate needs.

## Steps

| Folder | Purpose |
|--------|---------|
| [setup/](setup/) | Repository foundation, architecture, env, health API, module scaffolds |
| [step-1-authentication/](step-1-authentication/) | User accounts, email/password + Google (Firebase), password reset, profile |
| [step-2-workspaces/](step-2-workspaces/) | Workspace multi-tenancy, membership, current workspace |
| [step-3-dashboard-websites/](step-3-dashboard-websites/) | Dashboard UI, workspace-scoped websites |
| [step-4-pages-sections-templates/](step-4-pages-sections-templates/) | Pages, sections, templates, website theme |
| [step-5-visual-builder/](step-5-visual-builder/) | Visual page builder, theme save from editor |
| [step-6-media-management/](step-6-media-management/) | Workspace media upload, library, editor images |
| [step-7-ai/](step-7-ai/) | AI website generation and editor assistant |
| [step-8-preview/](step-8-preview/) | Shared renderer and authenticated website preview |

## Adding a new step

1. Create `plan/step-<name>/` (e.g. `step-2-workspaces/`).
2. Add **README.md**, optional **PLAN.md**, **API.md**, **IMPLEMENTATION_REPORT.md**.
3. Add a row to this table and [../README.md](../README.md).

## Shared conventions

- [setup/API_CONVENTIONS.md](setup/API_CONVENTIONS.md)
- [setup/ARCHITECTURE.md](setup/ARCHITECTURE.md)
