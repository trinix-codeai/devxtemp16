# Deployment Notes

## Recommended AWS Layout
- `apps/web` deployed as container behind ALB + CloudFront
- `apps/api` deployed as ECS service behind ALB
- RDS PostgreSQL with backups + PITR
- ElastiCache Redis for queues/cache
- S3 for tenant media with tenant-prefixed keys

## Environment Variables
Set all keys from root `.env.example` for API and equivalent `NEXT_PUBLIC_*` vars for web.

## Build Commands
- API: `pnpm --filter @localxplore/api build`
- Web: `pnpm --filter @localxplore/web build`

## Runtime Notes
- Ensure wildcard DNS for `*.your-domain.com` and custom domain verification flow.
- Use TLS termination at ALB/CloudFront with ACM certificates.
- Run queue worker as separate process: `pnpm --filter @localxplore/api exec tsx src/worker.ts`
