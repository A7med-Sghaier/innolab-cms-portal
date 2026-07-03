# Public Release Checklist

Use this checklist before changing public repository metadata or adding new demo content.

## Current Status

- Repository is public and prepared for portfolio review.
- Local Docker startup is documented through `sh run.sh`.
- Original MongoDB dumps are not included.
- Local demo seed data is sanitized and stored in `db_dumps/init-demo-data.js`.
- Copyrighted live-site images are not copied, embedded, or used as seed media.
- Demo records use neutral placeholder images.
- Local Docker credentials are development-only values.

## Required Confirmation Before Public Release Changes

Before adding new public-facing content, confirm:

- The code is allowed to remain public from an ownership/licensing perspective.
- No employer, client, university-private, or confidential data is included.
- Any screenshots, images, logos, documents, database dumps, or media assets are either original, explicitly permitted, or safely replaced with placeholders.
- The live URL `https://innolab.ifi.lmu.de` is used only as a public reference link.
- The repository remains a cleaned portfolio version, not an official LMU/InnoLab source release.

## Technical Checks

Run these from the repository root:

```bash
sh run.sh clean
sh run.sh up
curl http://localhost:12220/view/dbs_view
```

Expected result: the API returns a JSON view containing demo project data with placeholder image URLs.

Optional checks:

```bash
npm run build:front
npm run lint:front
npm run lint:server
```

Because this is a legacy Angular 7 / Strapi alpha project, document any legacy warnings instead of hiding them.

## Suggested GitHub Repository Settings

Recommended repository description:

```text
Dockerized Angular and Strapi CMS portal with sanitized demo data and copyright-safe placeholder media.
```

Recommended topics:

```text
angular nodejs strapi mongodb docker cms portfolio-project javascript typescript
```

Recommended website URL:

```text
https://innolab.ifi.lmu.de
```

## Ongoing Safety Rule

Do not add live-site images, copyrighted screenshots, production database exports, or university-private content unless explicit permission is available.
