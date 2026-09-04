# AGENTS.md

## What this repository is

Majesta.Net publishes open source software under the [MajestaNet](https://github.com/MajestaNet) GitHub organisation. Those software repositories are separate from this one and are not required to exist yet.

**This repository is only the public website** ([majesta.net](https://majesta.net)): a still brand landing, a live catalogue of public org repositories, and a notebook of notes. It is proprietary. Do not relicense it, and do not treat a public GitHub tree as an MIT grant.

When asked to “publish an article”, “add a note”, or similar, follow **Publish a note** below. That is the intended path. Do not rebuild the site, add a CMS, or edit React/Astro components in order to ship writing.

## Publish a note

Intended deployment path: **Markdown file → pull request against `main` → Netlify deploy preview → merge → production at `/notes/<slug>`**.

1. Add `content/articles/<kebab-case-slug>.md`. The slug is the public URL. Copy the shape of `content/articles/conscious-cognitive-learning.md`. Folder conventions are in `content/articles/README.md`.
2. Front matter must satisfy `src/content.config.ts`:

   | Field | Required | Notes |
   | --- | --- | --- |
   | `title` | yes | Non-empty string |
   | `date` | yes | `YYYY-MM-DD` (UTC). Listing sort is newest first |
   | `summary` | yes | One or two sentences; used on the listing, `<meta description>`, and social cards |
   | `draft` | no | Default `false`. `true` keeps the file in git and off the site |

3. Body is ordinary Markdown. Put images in `public/media/` and reference them as `/media/filename.jpg`. Do not hotlink third-party image hosts.
4. Do **not** edit `src/pages/`, `src/components/`, or the content collection unless the user asked to change the site itself. A new `.md` file is enough for the listing, `/notes/<slug>`, and the sitemap.
5. Use `draft: true` unless the user asked to publish now.
6. Open a pull request against `main`. Production is the merge (or a direct push to `main`). Netlify’s build is `npm test && npm run check && npm run build` with publish directory `dist`. GitHub Actions runs the same checks on the PR.

Locally, `npm run dev` hot-reloads article files (listens on `http://localhost:4321/`). Drafts remain hidden.

## Cursor Cloud specific instructions

Static [Astro](https://astro.build) site. Node 22.12 or newer is required (see `.nvmrc`). Dependencies are installed with `npm ci` (already run by the environment update script).

Standard commands are documented in `README.md` and `package.json` scripts:

- `npm run dev` — start the local dev server (listens on `http://localhost:4321/`). Run it as a long-lived process (e.g. in a tmux terminal), not in `install`/`start`.
- `npm run build` — static production build to `dist/`.
- `npm run check` — Astro + TypeScript diagnostics (lint/typecheck).
- `npm test` — Vitest unit tests (only `src/**/*.test.ts`, currently the repo-ranking and cache parsing logic in `src/lib/github.ts`).

Non-obvious notes:

- Notes are Markdown in `content/articles/`, loaded as an Astro content collection (`src/content.config.ts`). `README.md` in that folder is documentation only and is excluded from the collection. `draft: true` hides a file. Adding or editing a note appears at `/notes` and `/notes/<slug>` after a production build (and immediately in `npm run dev` if it is not a draft).
- Home-page project cards are fetched live from the GitHub API in the browser (`src/lib/github.ts`), so they are not part of the static build and require network access at view time. The build itself needs no GitHub credentials. Public, non-fork, non-archived org repos are shown, including this website repo. Sort is last push (`pushed_at`).
- Fonts are downloaded at build time through Astro’s Fonts API (`astro.config.mjs`) and served from this origin. Do not add a Google Fonts `<link>` in the layout.
- Keep `typescript` on 6.x. `@astrojs/check` cannot type-check with TypeScript 7 yet.
- Do not add runtime dependencies unless a page cannot be built without them. Vitest, TypeScript, and `@astrojs/check` stay in `devDependencies`.
- In prose the name is Majesta.Net; `MAJESTA.NET` stays on the SVG lockups in `public/brand/`. Do not type the wordmark.
