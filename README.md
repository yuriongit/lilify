# Lilify

Built a RESTful URL shortener using TypeScript, React, and Node.js, containerized
with Docker and deployed in a cloud environment on Railway with automated CI/CD
via GitHub.

_This is a project focused on learning and utilizing
Docker alongside GitHub Actions._

## Features

- Shorten a URL and redirect from the short link
- Basic client-side validation and full-validation on backend
- Express REST API with a simple controller/service/repo structure
- Containerized application with Docker for development and deployment
- CI/CD pipeline via GitHub Actions

## Infrastructure

| Layer          | Tool                                     |
| -------------- | ---------------------------------------- |
| API            | TypeScript, Express, MongoDB, Redis, Bun |
| Frontend       | TypeScript, React, Vite                  |
| Infrastructure | Docker, Railway                          |
| CI/CD          | GitHub Actions                           |

## Requirements

- Docker

## Quick Start

Clone the repository:

```bash
git clone https://github.com/yuriongit/lilify.git
cd lilify
```

Start the container:

- Firstly, rename .env.example to .env

```bash
# Docker
docker compose watch # Development build
# or
docker compose up --build # Production build
```

Stop the container:

```bash
docker compose down
# or
docker compose down -v # '-v' to wipe volumes clean
```

## Docs

More on architecture: [docs/architecture.md](./docs/architecture.md)

## Status

Complete.
