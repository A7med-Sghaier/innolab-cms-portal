# Architecture

## Overview

InnoLab CMS Portal uses a headless CMS-style architecture:

- `innolab-front` renders the public Angular website.
- `innolab-server` exposes CMS-managed content through Strapi REST endpoints.
- MongoDB stores content for articles, projects, studies, students, team members, and page views.

## Frontend

The Angular application is organized around reusable view components:

- `main-view` renders CMS-driven page sections.
- `card-view` and `table-view` provide reusable content layouts.
- `carousel` supports visual landing sections.
- `news` renders news-oriented content.
- `RestServices` centralizes HTTP calls.

## Backend

The backend is a Strapi application with custom API modules under `innolab-server/api`.

Important content modules:

- `articles`
- `componentview`
- `news`
- `projects`
- `student`
- `studies`
- `teammember`
- `views`

Each module follows the Strapi controller/model/service structure.

## Publishing Cleanup

The original project contained local database dumps and local configuration values. Those are intentionally excluded or replaced with environment variables so the project can be shared without exposing local credentials or private data.

## Future Improvements

- Migrate the backend from legacy Strapi to a supported Strapi release.
- Upgrade Angular to a current LTS-compatible version.
- Add sanitized seed data for a reproducible demo.
- Add focused frontend unit tests for shared rendering components.
- Add API smoke tests for the Strapi content endpoints.
