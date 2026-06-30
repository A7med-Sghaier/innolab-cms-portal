# InnoLab CMS Portal

InnoLab CMS Portal is a university content-management website built with an Angular frontend and a Strapi/Node.js backend. It demonstrates a full-stack CMS architecture with structured content models, REST-driven page rendering, reusable Angular components, and MongoDB-backed administration.

This repository is a portfolio-ready cleanup of the original university project. The cleanup focuses on safe publishing, clearer setup, maintainable repository structure, and documentation that makes the engineering decisions easy to review.

## Portfolio Value

- Full-stack JavaScript application with a separated frontend and backend.
- Angular component architecture for rendering content sections, cards, tables, news, and carousel views.
- Strapi-based CMS backend with custom content types for articles, projects, studies, students, team members, and page views.
- MongoDB configuration moved to environment variables for safer public repository publishing.
- Docker Compose workflow added for repeatable local startup across machines.
- Database dumps and generated artifacts excluded from version control.
- GitHub Actions workflow added for repeatable frontend build validation.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | Angular 7, TypeScript, SCSS, Angular Material, Bootstrap |
| Backend | Node.js, Strapi, Koa, REST APIs |
| Database | MongoDB via `strapi-hook-mongoose` |
| Local Runtime | Docker Compose, Node.js 10, MongoDB 4.2 |
| Tooling | npm scripts, GitHub Actions |

## Repository Structure

```text
.
├── docker-compose.yml  # Runs frontend, backend, and MongoDB together
├── innolab-front/      # Angular public website
├── innolab-server/     # Strapi CMS and REST API
├── scripts/            # Local development helper scripts
├── db_dumps/           # Kept empty; database dumps are intentionally excluded
├── docs/               # Architecture and publishing notes
└── .github/workflows/  # CI workflow
```

## Getting Started With Docker

Docker is the recommended local setup because the project uses older Angular, Strapi, Node.js, and MongoDB versions.

### Prerequisites

- Docker Desktop, or Docker Engine with the Docker Compose plugin

### Run All Apps

From the repository root:

```bash
npm run docker:up
```

Or run the helper script directly:

```bash
bash scripts/start-docker.sh
```

The first run builds the frontend and backend images, installs dependencies inside Docker, starts MongoDB, and then starts both apps.

### Local URLs

```text
Frontend:          http://localhost:4200
Backend:           http://localhost:12220
MongoDB from host: localhost:27018
MongoDB in Docker: mongo:27017
```

The Docker MongoDB host port is `27018` on purpose so it does not conflict with a MongoDB service already running on your Mac at `27017`.

### Docker Commands

```bash
npm run docker:up      # Build and start all services
npm run docker:logs    # Follow service logs
npm run docker:down    # Stop services, keep MongoDB data volume
npm run docker:clean   # Stop services and remove MongoDB/node_modules volumes
```

If Docker Desktop on Apple Silicon has trouble with old `node-sass` binaries, keep the Compose `platform: linux/amd64` settings. They are intentional for this legacy Node 10 stack.

## Manual Local Setup

Use this only if you want to run the apps without Docker.

### Prerequisites

This project was originally built with older Angular and Strapi versions. Use the repository `.nvmrc`:

- Node.js 10.x
- npm 6.x
- MongoDB running locally on `127.0.0.1:27017`, or a MongoDB instance configured through environment variables

With `nvm`:

```bash
nvm install
nvm use
```

If you previously installed dependencies with another Node/npm version, remove them before reinstalling:

```bash
rm -rf innolab-server/node_modules innolab-front/node_modules
rm -f innolab-server/package-lock.json innolab-front/package-lock.json
```

The backend entrypoint includes a small Node 10 compatibility shim for modern transitive dependencies that import built-in modules with the newer `node:` prefix or load optional `undici` helpers during startup.

### Configure Environment

Copy the sample backend environment file:

```bash
cp innolab-server/.env.example innolab-server/.env
```

For local development, the backend defaults to:

```text
DATABASE_HOST=127.0.0.1
DATABASE_PORT=27017
DATABASE_NAME=innolab_dev
```

Leave `DATABASE_URI` empty unless you intentionally use a full MongoDB connection string in another environment.

### Install and Run Backend

```bash
cd innolab-server
npm install
npm start
```

The backend defaults to:

```text
http://localhost:12220
```

### Install and Run Frontend

```bash
cd ../innolab-front
npm install
npm start
```

The Angular app defaults to:

```text
http://localhost:4200
```

## Useful Commands

From the repository root:

```bash
npm run install:all
npm run start:server
npm run start:front
npm run build:front
npm run lint:front
npm run docker:up
npm run docker:down
```

## Security and Publishing Notes

- Database dumps are intentionally excluded from the repository.
- MongoDB credentials are loaded from environment variables.
- Session and CSRF secrets are loaded from environment variables.
- `innolab-server/public/uploads/` has been confirmed safe to publish.
- If realistic demo data is needed, create sanitized seed data instead of publishing original database dumps.

## Portfolio Positioning

Full-stack CMS portal demonstrating Angular, Node.js, Strapi, MongoDB, content modeling, REST integration, Dockerized local development, and safe repository cleanup for public portfolio presentation.
