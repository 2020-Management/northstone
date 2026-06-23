# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A `README.md` exists at the repo root and is the canonical reference for stack, structure, deployment, adding articles, the contact form, and imagery. Read it first. This file covers the architecture and conventions that aren't obvious from a single file.

## What this is

Static marketing site for Northstone Invest, a Zurich PE firm investing in GRC software. Jekyll + GitHub Pages. Plain HTML/CSS/vanilla JS — no framework, no build step beyond Jekyll.

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

## Clean code & simplicity

This is a small static site. Bias hard toward the least code that solves the problem — favour Jekyll/Liquid and plain HTML/CSS over JS, and CSS over JS for anything that can be done with CSS.

- **No speculative abstraction.** Don't add config, parameters, or "flexibility" that wasn't asked for. A single-use include or one-off style block beats a generic system. If you wrote 200 lines and it could be 50, rewrite it.
- **Surgical changes.** Touch only what the task requires. Don't reformat, rename, or "improve" adjacent markup, copy, or CSS you weren't asked to change. Match the surrounding style even if you'd do it differently. If you spot unrelated dead code, mention it — don't delete it.
- **Reuse what exists.** Before adding a component, check `_includes/`, `main.css`, and existing pages for a pattern to follow or extend (e.g. `news-row.html`, the `.motif` frame, `.eyebrow` rules). Reuse design tokens from `tokens.css` rather than introducing new literal values.
- **DRY via includes and the layout chain**, not copy-paste. Shared markup belongs in `_includes/`; shared structure in `_layouts/`. Pages should declare only what differs.
- **Keep JS minimal and isolated.** Each behaviour in `main.js` is a small self-contained init function that no-ops when its target isn't on the page — follow that shape, and don't reach for JS when HTML/CSS suffices.
- **Clean up your own orphans.** Remove styles, includes, or JS that your change made unused; leave pre-existing dead code alone unless asked.
- **Name things plainly.** Class names, slugs, and front-matter keys should read like the existing ones — descriptive, kebab-case, no cleverness.
