# Lilify

A simple URL shortener. A project focused on learning and utilizing
Docker alongside GitHub Actions.

## Features

- Shorten a URL and redirect from the short link
- Basic client-side validation and full-validation on backend
- Express.js REST API with a simple controller/service/repo structure
- Containerized application with Docker for development and deployment
- CI/CD pipeline via GitHub Actions

## Technologies

| Layer | Tool |
| ----- | ---- |
| API | TypeScript, Express, MongoDB, Redis, Bun |
| Frontend | TypeScript, React, Vite |
| Infrastructure | Docker, Railway |
| CI/CD | GitHub Actions |

## Running locally

**Requirements**:

Docker

---

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
