FROM oven/bun:canary-slim

WORKDIR /app

ENV NODE_ENV=development

COPY package.json bun.lock* ./

RUN bun install

COPY . .

EXPOSE 3000

CMD [ "bun", "src/index.ts" ]
