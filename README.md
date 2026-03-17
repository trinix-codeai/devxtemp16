# LocalXplore Monorepo

Production-oriented foundation for a multi-tenant, white-label travel SaaS.

## Stack
- Frontend: Next.js 15, TypeScript, Tailwind, Redux Toolkit, React Hook Form + Zod
- Backend: Node.js + Express + TypeScript, Prisma, PostgreSQL, Redis, BullMQ
- Multi-tenancy: schema-per-tenant (platform schema + tenant schemas)

## Quick Start
1. Copy `.env.example` to `.env`.
2. Start infra: `docker compose up -d`.
3. Install deps: `pnpm install`.
4. Generate prisma client: `pnpm --filter @localxplore/api prisma:generate`.
5. Push schema: `pnpm --filter @localxplore/api prisma:push`.
6. Seed data: `pnpm --filter @localxplore/api seed`.
7. Run apps: `pnpm dev`.

## Apps
- `apps/api`: REST API with tenant-aware routing and RBAC
- `apps/web`: Marketing site + tenant portal + admin portal shell
- `packages/shared`: shared types, constants and validation schemas

## Docs
- `docs/architecture.md`
- `docs/api.md`
- `docs/deployment.md`
