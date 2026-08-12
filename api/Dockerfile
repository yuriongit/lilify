# Base
FROM oven/bun:canary-slim AS base
WORKDIR /app
COPY package.json bun.lock* ./

# Production Dependencies
FROM base AS prod-dependencies
RUN bun install --production --frozen-lockfile

# Development Dependencies
FROM base AS dev-dependencies
RUN bun install --frozen-lockfile

# Development
FROM dev-dependencies AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD [ "bun", "run", "--watch", "src/index.ts" ]

# Build
FROM prod-dependencies AS build
COPY . .
RUN bun run build
# RUN bun run build src/index.ts --outdir ./dist --target bun

# Production
FROM prod-dependencies AS production
ENV NODE_ENV=production
RUN useradd -m -u 1001 app
USER app
COPY --chown=app:app --from=build /app/dist ./dist
EXPOSE 3000
CMD [ "bun", "dist/index.js" ]
