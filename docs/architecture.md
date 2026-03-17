# Architecture

## Monorepo Layout
- `apps/web`: Next.js 15 frontend (marketing + tenant + admin shell)
- `apps/api`: Express API with Prisma + PostgreSQL + Redis + BullMQ
- `packages/shared`: shared schemas/types/constants
- `infra`: infrastructure helpers and container assets

## Multi-Tenant Model
- Platform metadata lives in `platform` schema via Prisma (`tenants`, `plans`, `subscriptions`, `tenant_users`).
- Each tenant has its own PostgreSQL schema (`tenant_<subdomain>`).
- API resolves tenant from host/subdomain/custom domain and switches SQL `search_path` transactionally.

## Core Runtime Flow
1. Tenant is created from `/api/platform/tenants`.
2. API creates a dedicated tenant schema and applies `tenant-template.sql` table structure.
3. Tenant and public endpoints execute SQL inside the tenant schema transaction scope.
4. JWT + permission middleware enforce role access.

## Security Baseline
- Helmet + CORS + JSON size limits.
- Strict schema name sanitization before `search_path` assignment.
- Password hashing with bcrypt.
- Role permission checks for platform and tenant APIs.

## Scalability Baseline
- Stateless app services for ECS horizontal scaling.
- Redis-backed queue for async notifications.
- CDN-capable Next.js frontend deployment.
