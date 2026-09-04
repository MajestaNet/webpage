# Notes

Each published note is one Markdown file in this folder. The filename is the public slug:

`conscious-cognitive-learning.md` → `https://majesta.net/notes/conscious-cognitive-learning`

This `README.md` is not an article. Copy [`conscious-cognitive-learning.md`](conscious-cognitive-learning.md) or start from:

```md
---
title: Title as it should appear
date: 2026-08-22
summary: One or two sentences for the Notes listing and for social previews.
draft: true
---

Body in Markdown.
```

Then open a pull request against `main`. Netlify builds a preview; merging publishes to [majesta.net](https://majesta.net). Set `draft: false` (or omit `draft`) when it should ship.

Images go in `public/media/` and are referenced as `/media/filename.jpg`.

Do not edit Astro pages or components to publish. The full path is in the repository [`README.md`](../../README.md).
