# URL Shortener

A full-stack URL shortening application that generates unique short links and redirects users to their original URLs.

## Features

- Generate shortened URLs with unique aliases
- Validate requests on both client and server
- REST API backend with structured controllers and services
- Containerized development environment
- Automated CI checks with GitHub Actions

## Tech Stack

### Frontend

- SvelteKit -> React (planned)
- Vite
- TypeScript
- TailwindCSS
- Zod

### Backend

- Bun
- Express
- MongoDB
- Zod
- Docker

### Tooling

- Bun (package manager and development tooling)
- GitHub Actions
- Biome
- Docker Compose

## Development

Clone the repository:

```bash
git clone https://github.com/yuriongit/lilify.git
cd lilify
```

Install dependencies:

```bash
# API
cd api
bun install
```
```bash
# Frontend
cd frontend
bun install
```

Start the development environment:

```bash
# API
cd api
docker compose up --build
```
```bash
# Frontend
cd frontend
bun run dev
o # to open server in browser
```

## Documentation

For detailed architecture decisions and system flow, see:

- [Architecture](./docs/architecture.md)

## Status

Currently under active development.
