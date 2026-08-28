# Base
FROM oven/bun:canary-slim AS base
WORKDIR /app
COPY package.json bun.lock* ./
COPY packages/shared ./packages/shared
COPY packages/api ./packages/api

# Production Dependencies
FROM base AS production-dependencies
RUN bun install --production --frozen-lockfile

# Development Dependencies
FROM base AS development-dependencies
RUN bun install --frozen-lockfile

# Development
FROM development-dependencies AS development
ENV NODE_ENV=development
WORKDIR /app/packages/api
EXPOSE 3000
CMD [ "bun", "run", "--watch", "src/index.ts" ]

# Build
FROM production-dependencies AS build
WORKDIR /app/packages/api
RUN bun run build

# Production
FROM production-dependencies AS production
ENV NODE_ENV=production
RUN useradd -m -u 1001 app
USER app
WORKDIR /app/packages/api
COPY --chown=app:app --from=build /app/packages/api/dist ./dist
EXPOSE 3000
CMD [ "bun", "dist/index.js" ]
