# To-Do

## Backend API

### Completed
- [x] Create initial REST API structure
    - Controller and service layer separation
    - Request validation middleware
    - Centralized error handling middleware
- [x] Implement cryptographically secure URL alias generation
    - Collision-safe short ID generation using `node:crypto`
- [x] Add API architecture foundation
    - Documented application flow, backend design, and technology decisions

### Features
- [ ] Handle duplicate original URLs
    - Return existing short URL alias when original URL already exists
- [ ] Implement URL redirection endpoint
    - Resolve short alias and redirect users to the original URL
- [ ] Add CORS configuration
- [ ] Add Redis caching for frequently accessed alias mappings

### Testing
- [ ] Create API unit tests
- [ ] Create integration tests for URL shortening flow
- [ ] Create integration tests for URL redirection flow

### Cleanup
- [ ] Refactor API directory structure
- [ ] Review controller/service separation
- [ ] Improve error handling consistency
- [ ] Add API documentation


## Frontend

### Completed
- [x] Create initial SvelteKit frontend
- [x] Add client-side validation with Zod
- [x] Establish shared TypeScript types across the application

### Features
- [ ] Connect frontend forms to API endpoints
- [ ] Add frontend loading/error states
- [ ] Improve component structure and organization
- [ ] Replace generated UI code with manually structured components

### Testing
- [ ] Set up frontend testing environment
- [ ] Create component tests


## Docker

### Completed
- [x] Add Docker configuration
    - Containerize backend services
    - Configure Docker Compose for local development

### Cleanup
- [ ] Review production Docker configuration


## GitHub Actions

### Completed
- [x] Add initial CI workflow
    - Run automated checks on pull requests and pushes
    - Validate project builds

### Remaining
- [ ] Add frontend CI workflow
    - Install dependencies
    - Run linting
    - Run tests
    - Build application
- [ ] Add backend CI workflow
    - Install dependencies
    - Run linting
    - Run tests
    - Build application


## Tooling / Chores

### Completed
- [x] Configure Biome for formatting and linting
- [x] Configure Bun tooling
    - Package management
    - Testing setup

### Remaining
- [ ] Create test coverage requirements
- [ ] Add environment variable documentation
- [ ] Review and clean up project file structure
- [ ] Add production deployment configuration
