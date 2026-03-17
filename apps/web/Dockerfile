FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm --filter @localxplore/shared build
RUN pnpm --filter @localxplore/web build

FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY --from=builder /app /app
EXPOSE 3000
CMD ["pnpm", "--filter", "@localxplore/web", "start"]
