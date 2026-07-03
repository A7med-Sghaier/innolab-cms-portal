# Public Release Checklist

Use this checklist before changing the repository visibility from private to public.

## Current Status

- Repository is prepared for portfolio review.
- Local Docker startup is documented through `sh run.sh`.
- Original MongoDB dumps are not included.
- Local demo seed data is sanitized and stored in `db_dumps/init-demo-data.js`.
- Live InnoLab images are referenced by public URL only; image files are not copied into this repository.
- Local Docker credentials are development-only values.

## Required Confirmation Before Public Release

Before making this repository public, confirm:

- The code is allowed to be published from an ownership/licensing perspective.
- No employer, client, university-private, or confidential data is included.
- The live URL `https://innolab.ifi.lmu.de` may be referenced from the README.
- Referencing public live-site image URLs is acceptable for a portfolio repository.
- The repository should remain a cleaned portfolio version, not an official LMU/InnoLab source release.

## Technical Checks

Run these from the repository root:

```bash
sh run.sh clean
sh run.sh up
curl http://localhost:12220/view/dbs_view
```

Expected result: the API returns a JSON view containing demo project data.

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
Portfolio-ready Angular and Strapi CMS portal with Dockerized local setup and sanitized demo data.
```

Recommended topics:

```text
angular nodejs strapi mongodb docker cms portfolio-project javascript typescript
```

Recommended website URL:

```text
https://innolab.ifi.lmu.de
```

## Public Release Decision

Do not make the repository public until the owner explicitly confirms public release is safe.
