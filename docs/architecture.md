# Architecture

## Overview

A URL shortener built to practice **GitHub Actions CI/CD** and
**Docker containerization**. The app validates, shortens, and redirects URLs
with dual-layer validation and caching.

---

## Tech Stack

| Layer               | Technology                                     |
| ------------------- | ---------------------------------------------- |
| **Language**        | TypeScript (end-to-end)                        |
| **Frontend**        | React, Vite, TanStack Query, Tailwind CSS, Zod |
| **Backend**         | Bun, Express, MongoDB, Redis                   |
| **Testing**         | Bun's built-in testing                         |
| **Linting**         | Biome                                          |
| **Version Control** | Git & GitHub                                   |
| **Deployment**      | Docker, Railway (API), Vercel (frontend)       |

---

## Core Flow

**Shorten a URL:**

1. Client validates URL (protocol, length) with Zod
2. Server validates and checks if alias exists in DB using original URL
3. If there's no existing alias under that original URL, the API generates a unique
6-character alias with retry logic (max 5 attempts)
4. Store mapping in MongoDB with alias as a unique index
5. Return shortened URL

**Redirect:**

1. Look up alias in MongoDB
2. Redirect to original URL via HTTP redirect

---

## GitHub Actions CI/CD Pipeline

Runs on every push to `main` and pull requests.

1. **Lint**: Biome lints entire codebase
2. **API Tests**: Bun tests
3. **Build Docker Image**: Multi-stage build for backend (depends on tests passing)
4. **Frontend Build**: Vite build for React app

CD deploys to Railway and Vercel.

---

## Docker Setup

- **Backend**: Multi-stage Dockerfile, non-root user, environment configuration
- **Frontend**: Built with Vite, deployed to Vercel
- **Local Development**: Docker Compose with watch mode for consistent environment

---

## Database

**MongoDB**: Stores URL mappings:

- `alias` (unique index, 6 characters)
- `original_url`
- `created_at`

**Redis**: Cache frequently accessed aliases to reduce database load.

---

## Key Implementation Details

- **Collision handling**: Retry up to 5 times if alias exists (6-character space
is large enough to avoid collisions in practice)
- **Validation layers**: Client (Zod) + Server (Zod)
- **Unique constraint**: MongoDB unique index on `alias` field prevents duplicates
