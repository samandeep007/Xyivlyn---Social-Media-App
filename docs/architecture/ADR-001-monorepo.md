# ADR-001: Use a monorepo

## Status
Accepted for Phase 06 foundation.

## Decision
Keep the mobile client, backend API, shared types, shared design tokens, and engineering documentation in one pnpm workspace managed by Turborepo.

## Why
This reduces duplicate code, keeps frontend/backend contracts together, and makes the project easier to manage while the team is small.
