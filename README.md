# Majesta.Net website

Public site for [Majesta.Net](https://majesta.net). Majesta.Net publishes open source software; this repository is the brand site and public notebook that travels with that work, not the software itself.

The landing page is the gold lockup and slogan on reference navy. One scroll is **Projects** (public repositories from the [MajestaNet](https://github.com/MajestaNet) GitHub organisation, loaded live in the browser). The next scroll is **Notes** (Markdown in this repo, built into real URLs).

Software will live in other public repositories under that organisation. They can use their own licenses. This website repository is proprietary (all rights reserved); a public GitHub tree is not an open-source grant. See [LICENSE](LICENSE).

The organisation does not need public software yet for this site to ship. Project cards appear on the next page load once those repositories exist. This repo and `.github` are excluded from that grid on purpose.

## Publish a note

This is the whole editorial workflow. You add a Markdown file. You do not edit Astro, HTML, or CSS.

1. Add `content/articles/<slug>.md`. The filename is the URL: `content/articles/a-public-notebook.md` becomes `https://majesta.net/notes/a-public-notebook`. Use a stable kebab-case slug; renaming later changes the public URL.
2. Start with YAML front matter. `title`, `date`, and `summary` are required.

```md
---
title: A public notebook
date: 2026-08-21
summary: One or two sentences for the listing and for social previews.
draft: false
---

Article body in Markdown.
```

3. Open a pull request against `main`. GitHub Actions runs tests, `astro check`, and a production build. Netlify builds a deploy preview of the same commit.
4. Merge the pull request. Netlify rebuilds production. The note is listed under Notes and served at `/notes/<slug>`.

`draft: true` keeps the file in git without shipping it. Omit `draft`, or set it to `false`, to publish.

Images belong in this repository at `public/media/` and are referenced as `/media/filename.jpg`. The published site does not load third-party image hosts.

The worked example in the tree is [`content/articles/a-public-notebook.md`](content/articles/a-public-notebook.md). A short checklist also lives in [`content/articles/README.md`](content/articles/README.md).

Pushing straight to `main` also deploys, but a pull request is the intended path: you read the preview before it is live.

## Local development

```bash
npm ci
npm run dev
```

The dev server is `http://localhost:4321/`. Adding or editing a file under `content/articles/` hot-reloads; drafts stay hidden.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm test` | Repo-ranking unit tests |
| `npm run check` | Astro/TypeScript check |

Node 22.12 or newer is required (see `.nvmrc`). Use `npm ci` so the lockfile is the source of truth.

## Deploy

The site is static HTML. There is no application server and no database. Netlify is the host.

`netlify.toml` already names the contract:

- Build command: `npm test && npm run check && npm run build`
- Publish directory: `dist`
- Node: `22`

Connect this GitHub repository to Netlify if it is not connected yet. After that:

| Event | Result |
| --- | --- |
| Pull request against `main` | Deploy preview, plus GitHub Actions CI |
| Merge or push to `main` | Production deploy at [majesta.net](https://majesta.net) |

No secrets are required. The GitHub catalogue uses the public API from the visitor’s browser. Do not put tokens in the frontend.

`/blog` and `/blog/<slug>` redirect to `/notes` and `/notes/<slug>`.

## Brand assets

Vector lockups from the August 2026 visual identity live in `public/brand/`. Use the SVG files; do not type the wordmark. The gold-on-navy lockup is the primary digital signature. In prose the name is Majesta.Net; `MAJESTA.NET` stays on the artwork.
