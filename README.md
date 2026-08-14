# Lilify

A simple URL shortener. Give it a long URL, get back a short one that redirects to it.

Built mainly as a learning project; this is a project to learn and practice Docker, GitHub Actions, and a proper git workflow (PRs, CI checks, squash merges, linear history).

## Features
- Shorten a URL and redirect from the short link
- Basic validation on frontend and backend
- REST API with a simple controller/service structure
- Dockerfile for building the API image
- Docker Compose for local development
- CI checks via GitHub Actions

## Tech Stack

**Frontend:** React, Vite, TypeScript, TailwindCSS, Zod

**Backend:** Bun, Express, MongoDB, Zod, Docker

**Tooling:** Bun, GitHub Actions, Biome, Docker Compose

## Running locally

Clone the repo:
```bash
git clone https://github.com/yuriongit/lilify.git
cd lilify
```

Install dependencies:
```bash
cd api && bun install --frozen-lockfile
cd ../frontend && bun install --frozen-lockfile
```

Run it:
```bash
# API
cd api
docker compose up --build

# Frontend
cd frontend
bun run dev
```

## Docs
More on architecture and design decisions: [docs/architecture.md](./docs/architecture.md)

## Status
Work in progress.