# Lilify

A simple URL shortener.

Built mainly as a learning project. It's a project to learn and practice
Docker, and GitHub Actions.

## Features

- Shorten a URL and redirect from the short link
- Basic client-side validation and full-validation on backend
- Express.js REST API with a simple controller/service/repo structure
- Dockerfile for building the API image
- Containerized application with Docker Compose for local
development with watch mode
- CI/CD pipeline via GitHub Actions

## Tech Stack

**Frontend:** React, TypeScript, TailwindCSS, TanStack Query, Vite

**Backend:** TypeScript, Express, MongoDB, Redis, Bun

**CI/CD & Infrastructure:** GitHub Actions, Docker, Railway

## Running locally

Clone the repo:

```bash
git clone https://github.com/yuriongit/lilify.git
cd lilify
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
docker compose down
# or
docker compose down -v # '-v' to start with clean volumes
# Then use your command of choice, development or production-based build
docker compose ...
```

## Docs

More on architecture: [docs/architecture.md](./docs/architecture.md)

## Status

Complete.
