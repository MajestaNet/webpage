# Technical design

Executable design for the Majesta.Net site: a still brand landing, a live project catalogue, Markdown notes, and a Netlify deploy.

## Intent

Majesta.Net publishes open source software under the MajestaNet GitHub organisation. This repository is not that software. It is the public website at majesta.net: the gold lockup and slogan, a catalogue of public org repositories, and a notebook of notes.

Software repositories can use their own licenses. This website repository is proprietary. Notes are written as Markdown in git so a new piece of writing is a file and a pull request, not a component change.

The August 2026 identity is a custom MAJESTA.NET lockup (gold globe as the domain separator), reference navy, luminous gold, warm ivory, slate, Josefin Sans for display, Inter for text. An earlier Create React App + MUI draft was replaced by this static Astro project so the site can be public and auto-deployed.

## Brand application

| Token | Value | Use |
| --- | --- | --- |
| Reference navy | `#1B2E46` | Hero, footer, 70% field |
| Luminous gold | `#F6CF55` | Primary lockup, nav |
| Warm ivory | `#F5F1E8` | Projects, notes, article pages |
| Slate | `#697685` | Secondary text |
| Display | Josefin Sans Light / Regular | Slogan, section labels, titles |
| Text | Inter Regular / Medium | Body, UI, repo metadata |

Rules taken from the guidelines:

- The lockup is supplied SVG, not typed text.
- Gold is the mark on navy; it is not body text on ivory or white.
- Navy on ivory and ivory on navy carry body copy.
- In prose the name is Majesta.Net; `MAJESTA.NET` stays on the artwork.
- Full lockup stays above 180px wide; the globe symbol is the favicon.

Page composition:

1. **Landing (100svh).** Gold lockup, slogan *Kein Lebendiges ist ein Eins,Immer ist’s ein Vieles.* Projects and Notes links sit at the base of this screen.
2. **Projects (100svh).** Ivory. Up to four public GitHub repositories from `https://github.com/MajestaNet`. One scroll from the hero. Navy lockup top-left.
3. **Notes (100svh).** Ivory. Articles from `content/articles/*.md` (except `README.md`, which is the publishing cheat-sheet). A click opens `/notes/<slug>`. One further scroll from Projects. Footer sits at the base of this screen.
4. **Footer.** Terms & Privacy (page at `/terms`), centred white globe home link, mail icon to `hello@majesta.net`, GitHub icon to the organisation. No wordmark in the footer.

## Stack

**Astro, static HTML, Netlify.**

Reasons:

- The page is a landing plus documents, not an application.
- Markdown files can become HTML pages at build time (shareable URLs, no client Markdown parser).
- `dist/` is a folder Netlify understands.
- GitHub projects still update without a deploy, because that list is requested at runtime.
- Direct dependencies stay at Astro plus TypeScript, `astro check`, and Vitest.

Build output is static. There is no server runtime and no database.

```
content/articles/*.md     source of notes
src/pages/                routes
src/components/           hero, projects, notes, footer
src/lib/github.ts         org fetch + ranking (tested)
public/brand/             official SVG lockups
public/media/             optional article images
netlify.toml              build, Node 22, headers, 404
```

Fonts are fetched at build time (Astro Fonts API) and served from this origin, so visitors are not sent to Google Fonts.

## Projects

Client code calls `https://api.github.com/orgs/MajestaNet/repos`, caches the payload for ten minutes, then keeps repositories that are public, not forks, not archived, and not `webpage`, `website`, or `.github`. Sort: stars, then last push. Cap: four.

The organisation currently has no public software repositories. The section already has an empty state. When repos are published they appear on the next page load, with no site change. This website repo stays excluded so the catalogue is software, not the notebook.

Unauthenticated GitHub allows 60 requests per IP per hour; the cache keeps a quiet site inside that budget. If the API is unavailable, the empty state points at GitHub.

## Articles without editing the site

Articles are Markdown with a fixed front matter shape:

```yaml
title: string
date: YYYY-MM-DD
summary: string
draft: boolean   # optional, default false
```

Intended publishing path:

1. Add `content/articles/my-slug.md` (see that folder’s `README.md` and the example `a-public-notebook.md`).
2. Open a pull request against `main`. GitHub Actions and a Netlify deploy preview run on the PR.
3. Merge. Netlify runs `npm test && npm run check && npm run build` on `main` and replaces the listing plus `/notes/my-slug`.

That is the editorial workflow: nobody runs a local production build, and nobody touches Astro or CSS. Netlify rebuilds static HTML. Direct pushes to `main` also deploy; a pull request is preferred so the preview can be read first.

`draft: true` keeps a file in git without shipping it.

A later editorial form can sit on the same files (Decap CMS / Netlify Identity writing into `content/articles`). It is not wired now, so the repo stays a plain git publishing surface.

Article pages are prerendered on purpose. Runtime-only Markdown would avoid a Netlify build, but it would also hide posts from sharing crawlers and would depend on GitHub remaining public and unthrottled. Projects can be live-fetched; essays should be real URLs.

## Netlify and a public repo

`netlify.toml` already names the build command, publish directory, Node version, and security headers. When the repository is connected to Netlify:

- Netlify builds on push to `main` (production) and on pull requests (previews).
- The same Markdown workflow works for anyone with write access.
- `/orgs/MajestaNet/repos` starts returning software as soon as those repos are public.
- The website repo itself is excluded from the projects grid.

No secrets are required. The GitHub catalogue uses the public API. Do not put tokens in the frontend.

Pretty URLs match `trailingSlash: 'never'` (`/notes/a-public-notebook`, not a trailing slash). Unknown paths render `src/pages/404.astro`. `/blog/*` redirects to `/notes/*`.

## Out of scope

- CMS login, comments, search, or a newsletter.
- Recreating the wordmark in a font.
- Dark/light toggle. The identity is navy + ivory, applied by section.
- Hosting setup. Connect this repo to Netlify when ready; the build contract is already in the tree.
