# Step 7 — AI API

Base: `/api/v1/workspaces/:workspaceId/ai`  
Auth: session + workspace membership.

| Method | Path | Body |
|--------|------|------|
| POST | `/website/generate` | Business fields (name, type, description, location, services[], websiteStyle) |
| POST | `/section/action` | `action`, `websiteId`, `pageId`, optional `sectionId`, `sectionType`, `content`, `businessContext` |

Actions: `generate`, `rewrite`, `shorten`, `professional`, `generate_about`, `generate_services`, `generate_faqs`, `seo_title`, `seo_description`.

Env: `AI_PROVIDER` (`mock` \| `openai`), `AI_API_KEY`, `AI_MODEL`, `AI_TIMEOUT_MS`, `AI_BASE_URL`.
