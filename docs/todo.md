# To-Do

## Remaining Tasks

- [ ] Add API integration tests for URL shortening flow

- [ ] Add API integration tests for URL redirection flow

- [ ] Set up frontend testing environment

- [ ] Write component tests

- [ ] Project maintenance

- [ ] Audit and clean up overall project file structure

## Completed Milestones

### 1. Shared

- [x] ~~Set up Biome formatting/linting and npm scripts~~

- [x] ~~Centralize TypeScript settings with tsconfig-base and fix strict indexing~~

- [x] ~~Establish shared TypeScript types and schemas~~

### 2. API

- [x] ~~Architecture & Layers: Controller, service, and repository layer separation~~

- [x] ~~Middleware & Security: Centralized error handling, request validation,
and CORS~~

- [x] ~~Features: Cryptographically secure alias generation (node:crypto), redirection
endpoint, and duplicate URL handling~~

- [x] ~~Performance: Dual-layer caching (GET/POST routes and Redis for alias mappings)~~

- [x] ~~Testing & Docs: Initial unit test suite and system architecture documentation~~

### 3. Frontend Application

- [x] ~~Improve frontend components structure and organization~~

- [x] ~~Refactor UI code into structured components~~

- [x] ~~Migration: Ported application from SvelteKit to React and purged legacy
 files~~

- [x] ~~Integration: Connected API endpoints, added loading/error states, and client
 validation via Zod~~

### 4. DevOps & CI/CD

- [x] ~~Docker: Containerized services and configured Compose for development and
 production~~

- [x] ~~GitHub Actions: Built reusable composite actions (Bun setup, dependencies
, TypeScript checks)~~

- [x] ~~CI/CD Pipelines: Automated linting, API tests (with MongoDB service),
 Frontend checks, Docker image builds, and continuous deployment~~

### 5. Project Chores

- [x] ~~Resolved lint warnings using Biome~~

- [x] ~~Configured Bun test runner~~

- [x] ~~Added .env.example template~~
