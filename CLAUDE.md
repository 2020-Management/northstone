# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A `README.md` exists at the repo root and is the canonical reference for stack, structure, deployment, adding articles, the contact form, and imagery. Read it first. This file covers the architecture and conventions that aren't obvious from a single file.

## What this is

Static marketing site for Northstone Invest, a (fictional) Zurich PE firm investing in GRC software. Jekyll + GitHub Pages. Plain HTML/CSS/vanilla JS — no framework, no build step beyond Jekyll.

## Commands

```bash
bundle install
bundle exec jekyll serve     # http://localhost:4000 (baseurl is empty, so no flags needed)

# Link/image check — matches CI exactly. Run before pushing.
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --allow-hash-href
```

There is no test suite beyond htmlproofer. CI (`.github/workflows/jekyll.yml`) runs build → htmlproofer → deploy on push to `main`.

## Architecture notes that span multiple files

**Two collections, different output models.** `insights` has `output: true` → each Markdown file in `_insights/` becomes a page at `/insights/<slug>/`. `news` has `output: false` → items in `_news/` are data only, never standalone pages; `news.html` and the homepage iterate over `site.news` and render via the `news-row.html` include. A news item links out via an `external_url` front-matter key (commented out until the article is published) or falls back to the `/news/` index.

**baseurl is intentionally empty in `_config.yml`** so `jekyll serve` works at localhost with no flags. The correct `/northstone` baseurl is injected at build time by the workflow (`--baseurl "${{ steps.pages.outputs.base_path }}"`), and htmlproofer swaps it back out. Because of this, **always use the `relative_url` filter for internal links and asset paths** — never hardcode a leading `/`, or the link will break on the deployed project site.

**Layout chain:** everything defaults to `_layouts/default.html` (the `defaults` block in `_config.yml`); insights additionally default to `article.html`, which wraps `default.html`. Pages only declare what differs in their front matter.

**Article lead images are category-driven.** `article.html` picks `assets/img/lead-<category>.webp` based on `page.category` (Regulation/Markets/Perspective/Portfolio); override per-article with an `image:` front-matter key pointing at a basename. Each image lives inside the `.motif` frame as `.motif-photo`. Images are processed to a navy duotone to fit the brand; keep that treatment for new imagery.

**JS is progressive enhancement only** (`assets/js/main.js`). Everything must work without JS — reveal-on-scroll, mobile nav, FAQ markers, insights filter, contact-form thank-you state all degrade gracefully. Don't introduce JS-required content.

**CSS is two files, no inline styles.** `tokens.css` (design tokens + self-hosted Spectral/Libre Franklin fonts) and `main.css` (all component styles). Use the CSS custom properties (`var(--accent)` etc.) rather than literal colors.

## Conventions

- Match the existing voice/tone in copy — restrained, institutional PE register.
- The contact form is static-only; it shows a thank-you state but submits nowhere. The wiring hook is marked in `assets/js/main.js`.
- `DESIGN-HANDOFF.md` holds the original design spec and is excluded from the build.
