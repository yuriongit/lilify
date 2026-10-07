# Architecture

## Infrastructure

| Layer          | Technology               |
| -------------- | ------------------------ |
| API            | TypeScript, Express, Bun |
| Frontend       | TypeScript, React, Vite  |
| Database       | MongoDB                  |
| Cache          | Redis                    |
| Testing        | Bun                      |
| Linting        | Biome                    |
| Infrastructure | Docker, Railway, Vercel  |
| CI/CD          | GitHub Actions           |

## Request Flow

### Shortening a URL

1. Client validates the URL with Zod.
2. API validates the request and checks MongoDB for an existing URL.
3. If needed, the API generates a unique 6-character alias.
4. The mapping is stored in MongoDB.
5. The shortened URL is returned.

### Redirecting

1. API looks up the alias in Redis.
2. If not cached, it queries MongoDB.
3. The original URL is returned through an HTTP redirect.
4. Frequently accessed URLs are cached in Redis.

## CI/CD

GitHub Actions runs on pushes to `main` and pull requests.

- Lint with Biome
- Run API tests
- Build the Docker image
- Build the frontend

Successful builds are deployed to Railway and Vercel.

## Docker

The backend uses a multi-stage Docker build with a non-root user.

Docker Compose provides the local development environment and watch mode.

## Database

MongoDB stores URL mappings:

- `alias` — unique 6-character identifier
- `original_url` — destination URL
- `created_at` — creation timestamp

MongoDB enforces alias uniqueness with a unique index. Alias generation retries
up to 5 times if a collision occurs.
