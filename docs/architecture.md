# Architecture

## Overview

A URL shortener built to practice **GitHub Actions CI/CD** and **Docker containerization**. The app validates, shortens, and redirects URLs with dual-layer validation and caching.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | TypeScript (shared) |
| **Frontend** | React, Vite, TailwindCSS, Zod |
| **Backend** | Bun, Express, MongoDB, Redis (planned) |
| **Testing** | Bun's built-in testing |
| **Linting** | Biome |
| **Version Control** | Git & GitHub |
| **Deployment** | Docker, Railway (backend), Vercel (frontend) |

---

## Core Flow

**Shorten a URL:**
1. Client validates URL (protocol, length) with Zod
2. Server validates and checks if alias exists in DB
3. If not, generate a unique 6-character alias with retry logic (max 5 attempts)
4. Store mapping in MongoDB with unique index
5. Return shortened URL

**Redirect:**
1. Look up alias in MongoDB
2. Redirect to original URL via HTTP redirect

---

## GitHub Actions CI Pipeline

Runs on every push to `main` and pull requests.

1. **Lint**: Biome checks on all code
2. **API Tests**: Bun tests (depends on lint passing, uses `MONGO_URI` secret)
3. **Build Docker Image**: Multi-stage build for backend (depends on tests passing)
4. **Frontend Build**: Vite build for React app

CD will add deployments to Railway and Vercel.

---

## Docker Setup

- **Backend**: Multi-stage Dockerfile, non-root user, environment configuration
- **Frontend**: Built with Vite, deployed to Vercel
- **Local Development**: Docker Compose for consistent environment

---

## Database

**MongoDB**: Stores URL mappings with fields:
- `alias` (unique index, 6 characters)
- `originalUrl`
- `createdAt`

**Redis** (planned): Cache frequently accessed aliases to reduce DB reads.

---

## Key Implementation Details

- **Collision handling**: Retry up to 5 times if alias exists (6-character space is large enough to avoid collisions in practice)
- **Validation layers**: Client (Zod) + Server (Zod)
- **Unique constraint**: MongoDB unique index on `alias` field prevents duplicates
