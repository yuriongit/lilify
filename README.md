# Lilify

A simple URL shortener. Shorten any link... about as simple as that.

Built mainly as a learning project. It's a project to learn and practice Docker, GitHub Actions.

## Features

- Shorten a URL and redirect from the short link
- Basic validation on frontend and backend
- REST API with a simple controller/service structure
- Dockerfile for building the API image
- Docker Compose for local development
- CI checks via GitHub Actions

## Tech Stack

**Frontend:** React, TypeScript, TailwindCSS, Zod, Vite, Tanstack Query

**Backend:** Bun, Express, MongoDB, Zod, Docker

**Tooling:** Bun, GitHub Actions, Biome, Docker Compose

## Running locally

Clone the repo:

```bash
git clone https://github.com/yuriongit/lilify.git
cd lilify
```

Install (optional to run via Docker):

```bash
bun install --frozen-lockfile
```

Run it:

```bash
# Docker
docker compose watch # Development build with watch mode
# or
docker compose up --build # Production-based build
```

Restarting:

```bash
docker compose down && docker compose ... # Your choice
# or
docker compose down -v && docker compose ... # '-v' to start with clean volumes
```

## Docs

More on architecture and design decisions: [docs/architecture.md](./docs/architecture.md)

## Status

Work in progress.
