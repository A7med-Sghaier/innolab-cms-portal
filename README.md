# InnoLab CMS Portal

InnoLab CMS Portal is a university content-management website built with an Angular frontend and a Strapi/Node.js backend. It demonstrates a full-stack CMS architecture with structured content models, REST-driven page rendering, reusable Angular components, and MongoDB-backed administration.

This repository is a portfolio-ready cleanup of the original university project. The cleanup focuses on safe publishing, clearer setup, maintainable repository structure, and documentation that makes the engineering decisions easy to review.

## Portfolio Value

- Full-stack JavaScript application with a separated frontend and backend.
- Angular component architecture for rendering content sections, cards, tables, news, and carousel views.
- Strapi-based CMS backend with custom content types for articles, projects, studies, students, team members, and page views.
- MongoDB configuration moved to environment variables for safer public repository publishing.
- Database dumps and generated artifacts excluded from version control.
- GitHub Actions workflow added for repeatable frontend build validation.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | Angular 7, TypeScript, SCSS, Angular Material, Bootstrap |
| Backend | Node.js, Strapi, Koa, REST APIs |
| Database | MongoDB via `strapi-hook-mongoose` |
| Tooling | npm scripts, GitHub Actions |

## Repository Structure

```text
.
├── innolab-front/      # Angular public website
├── innolab-server/     # Strapi CMS and REST API
├── db_dumps/           # Kept empty; database dumps are intentionally excluded
├── docs/               # Architecture and publishing notes
└── .github/workflows/  # CI workflow
```

## Getting Started

### Prerequisites

This project was originally built with older Angular and Strapi versions, but current dependency resolution requires Node's modern `node:` module namespace. Use the repository `.nvmrc`:

- Node.js 16.x
- npm 8.x
- MongoDB running locally or a MongoDB connection URI

With `nvm`:

```bash
nvm install
nvm use
```

This repository includes `.npmrc` with `legacy-peer-deps=true` because Angular 7 and its tooling use older peer dependency ranges that npm 8 otherwise rejects.

If you previously installed dependencies with another Node/npm version, remove them before reinstalling:

```bash
rm -rf innolab-server/node_modules innolab-front/node_modules
rm -f innolab-server/package-lock.json innolab-front/package-lock.json
```

### Configure Environment

Copy the sample backend environment file:

```bash
cp innolab-server/.env.example innolab-server/.env
```

Update the values for your local MongoDB setup.

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
```

## Security and Publishing Notes

- Database dumps are intentionally excluded from the repository.
- MongoDB credentials are loaded from environment variables.
- Session and CSRF secrets are loaded from environment variables.
- `innolab-server/public/uploads/` has been confirmed safe to publish.
- If realistic demo data is needed, create sanitized seed data instead of publishing original database dumps.

## Portfolio Positioning

Full-stack CMS portal demonstrating Angular, Node.js, Strapi, MongoDB, content modeling, REST integration, and safe repository cleanup for public portfolio presentation.
