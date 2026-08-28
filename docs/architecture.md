## High-Level Flow

**Part A: Data collection, validation, persistence, and response**

1. The client collects a URL from the user and sends it to the server for shortening.

2. The server checks whether the original URL has already been persisted. If it exists, the shortened URL is returned.

3. Otherwise, the server generates a unique 6-character alias and persists both the original URL and its alias.

4. The newly generated shortened URL is returned to the client.

**Part B: URL retrieval and redirection**

1. When a shortened URL is requested, the server looks up the corresponding alias in the database.
2. If found, the server responds with an HTTP redirect to the original URL.

## Architecture

**Shared**

- TypeScript
  - Type safety across the codebase

**Tooling:**

- Git & GitHub
- GitHub Actions
- Biome
- Bun's built-in testing
  - (similar to Vitest)

**Frontend:**

- SvelteKit
  - Simple & lightweight
- Vite
  - Frontend development server and build tooling
- Zod
  - Basic client pre-validation (dual-layer validation)
- TailwindCSS
  - For clean, easy, and rapid development

**Backend:**

- Docker
  - Containerize backend services for consistent local development and deployment
- Bun
  - Fast JavaScript runtime and built-in package management, testing, and bundling
- Express
  - Battle-tested, industry-standard, lightweight
- MongoDB
  - Document-oriented database, well suited for storing URL mappings
- Redis (Planned)
  - Cache frequently accessed alias mappings to reduce database reads and improve response times
- Zod
  - Full request validation (dual-layer validation)
- node:crypto
  - Cryptographically secure random alias generation

**Deployment:**

- Backend
  - Railway
- Frontend
  - Vercel
