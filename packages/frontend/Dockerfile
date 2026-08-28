FROM oven/bun:canary-slim AS development
WORKDIR /app
COPY package.json bun.lock* tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend
WORKDIR /app/packages/frontend
RUN bun install
EXPOSE 5173
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]
