# Step 2 — Plan

## Goal

Workspace-based multi-tenancy foundation: users belong to one or more workspaces; all future resources scope by `workspaceId`.

## Current workspace

Stored on `User.currentWorkspaceId`, validated against `WorkspaceMember` on every resolve/select.

## Out of scope

Websites, pages, media, domains, billing, invitations, advanced RBAC.

## Backend module

`backend/src/modules/workspaces/`

## Reusable isolation

`assertWorkspaceMember` + `requireWorkspaceParamAccess` middleware for future modules.
