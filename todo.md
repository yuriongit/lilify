# To-Do

## Shared

#### Completed

- [x] ~~Implement and configure Biome for formatting and linting~~
    - [x] ~~Include corresponding Biome scripts~~
- [x] ~~Add a tsconfig-base and refactor sub tsconfig files to follow the base~~
    - [x] ~~Update bracket indexing to satisfy stricter tsconfig-base~~

#### Remaining

- [ ] Establish shared TypeScript types

## Backend API

#### Completed

- [x] ~~Create initial REST API structure~~
    - [x] ~~Controller and service layer separation~~
    - [x] ~~Request validation middleware~~
    - [x] ~~Centralize error handling middleware~~
- [x] ~~Implement cryptographically secure URL alias generation via `node:crypto`~~
- [x] ~~Add API architecture foundation~~
    - [x] ~~Document application flow, backend design, and technology decisions~~
- [x] Implement URL redirection endpoint
    - [x] Resolve short alias and redirect users to the original URL
- [x] Add CORS configuration

#### Features

- [ ] Handle duplicate original URLs
    - [ ] Return existing short URL alias when original URL already exists
- [ ] Add Redis caching for frequently accessed alias mappings

#### Testing

- [x] Create API unit tests
- [ ] Create integration tests for URL shortening flow
- [ ] Create integration tests for URL redirection flow

#### Cleanup

- [ ] Reorganize API directory structure
- [ ] Review controller/service separation
    - [ ] Additionally, separate data from service layer into repo layer
- [ ] Review error handling consistency and improve if needed

## Frontend

#### Completed

- [x] ~~Create initial SvelteKit frontend~~
- [x] ~~Add client-side validation with Zod~~
- [x] ~~Connect frontend to API endpoints~~
- [x] ~~Add frontend loading/error states~~
- [x] ~~Scaffold new React frontend~~
- [x] ~~Port existing functionality~~
- [x] ~~Remove SvelteKit project files once migration is verified~~


#### Features

- [ ] Improve component structure and organization
- [ ] Replace generated UI code with manually structured components

#### Testing

- [ ] Set up frontend testing environment
- [ ] Create component tests

## Docker

#### Completed

- [x] ~~Add Docker configuration~~
    - [x] ~~Containerize backend services~~
    - [x] ~~Configure Docker Compose for local development~~

#### Remaining

- [ ] Create production Dockerfile
- [ ] Update current Dockerfile to Dockerfile.dev for development

## GitHub Actions

#### Completed

- [x] ~~Add initial CI workflow~~
- [x] ~~Actions~~
    - [x] ~~Composite Action: Setup Bun~~
    - [x] ~~Composite Action: Install Deps~~
    - [x] ~~Composite Action: TypeScript Check~~

#### Remaining

- [ ] Complete CI Workflow
    - [x] ~~Job: Run global linting~~
    - [x] Remove 'frontend' from 'build-api/needs' field
    - [ ] Workflow: API
        - [ ] Job: 'test-and-verify'
            - [x] ~~Service: MongoDB~~
            - [x] ~~Step: Checkout code~~
            - [x] ~~Step: Setup environment~~
            - [x] ~~Step: Install dependencies~~
            - [x] ~~Step: TypeScript checks~~
            - [ ] Step: Run tests
    - [x] ~~Workflow: Build API~~
        - [x] ~~Job: 'build-api'~~
            - [x] ~~Step: Build Docker image~~
    - [ ] Workflow: Frontend
        - [ ] Job: 'test-and-verify'
            - [x] ~~Step: Checkout code~~
            - [x] ~~Step: Setup environment~~
            - [x] ~~Step: Install dependencies~~
            - [ ] Step: TypeScript checks
            - [ ] Step: Run tests

## Chores

#### Completed

...

#### Remaining

- [x] ~~Implement lint fixes to satisfy Biome ruleset~~
- [x] ~~Set up Bun test runner~~
- [ ] Create test coverage requirements
- [ ] Add environment variable documentation
- [ ] Review and clean up overall project file structure
- [ ] Add production deployment configuration
