# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A `README.md` exists at the repo root and is the canonical reference for stack, structure, deployment, adding articles, the contact form, and imagery. Read it first. This file covers the architecture and conventions that aren't obvious from a single file.

## What this is

Static marketing site for Northstone Invest, a Zurich investment firm backing software companies with durable, recurring revenue (with particular conviction in software for regulated industries — GRC is one focus area, not the headline). Two ways to invest are offered: the Northstone Bond and an equity partnership. Bilingual (German default at the root, English under `/en/`). Jekyll + GitHub Pages. Plain HTML/CSS/vanilla JS — no framework, no build step beyond Jekyll.

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

**One collection, two languages.** `insights` has `output: true` → each Markdown file in `_insights/` becomes a page. German articles use the clean slug and a `/insights/<slug>/` permalink; English articles add a `-en` filename suffix and set their own `/en/insights/<slug>/` permalink. Both carry a `lang` front-matter key, and the index pages filter `site.insights` by `page.lang` so each language shows only its own set. Every article (and every page) sets `alternate_url` to its counterpart for the language switcher.

**Bilingual: German is the default at the root, English under `/en/`.** Language is assigned by path-based `defaults` in `_config.yml` (`lang: de` / `locale: de_CH` at the root, `lang: en` / `locale: en_US` under `en/`). `header.html` and `footer.html` swap their nav labels, section-anchor slugs and home/section URLs on `page.lang`, and render the EN/DE switcher from `page.alternate_url`. When you add or change a page, set its `alternate_url`, or the switcher shows the other language as inert text.

**ALWAYS mirror DE ↔ EN — now and in future.** Every page and every insights article exists in both languages, and they must stay in lockstep. This is a standing rule, not a one-off:

- **Content in two files.** Editing copy on a DE page means making the equivalent edit on its `/en/` counterpart, and vice versa. Add an article? Add both the DE file (clean slug) and the `-en.md` file. Drop one language and you've created a dead `alternate_url` and a half-translated site.
- **Shared markup in one file.** `header.html`, `footer.html`, `_layouts/article.html` and `structured-data.html` carry *both* language branches (`{% if page.lang == 'en' %} … {% else %} … {% endif %}`). You edit one file but change both languages — so always update **both** branches and verify both render.
- **Localise anchors and slugs, keep keys stable.** DE home uses `#these`/`#ansatz`/`#portfolio`; EN uses `#thesis`/`#approach`/`#portfolio`. If you rename an anchor, update the page `id=`, the matching `anchor_*` assign in `header.html`/`footer.html`, **and** any in-page links — in both languages. `category` stays in English in both article files (it's a filter key); only the chip *labels* are translated.
- **New marketing page checklist:** create the DE version at the root and the EN version under `en/`; set `permalink` and `alternate_url` on each pointing at the other; add it to both nav branches in `header.html`/`footer.html` if it belongs in the nav.
- **Always preview both** before considering a change done: `http://localhost:4000/` (DE) and `http://localhost:4000/en/` (EN), and click the switcher to confirm it round-trips.

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
- **Reuse what exists.** Before adding a component, check `_includes/`, `main.css`, and existing pages for a pattern to follow or extend (e.g. the `.motif` frame, the `.split` + `.fact-list` two-column block, `.eyebrow` rules). Reuse design tokens from `tokens.css` rather than introducing new literal values.
- **DRY via includes and the layout chain**, not copy-paste. Shared markup belongs in `_includes/`; shared structure in `_layouts/`. Pages should declare only what differs.
- **Keep JS minimal and isolated.** Each behaviour in `main.js` is a small self-contained init function that no-ops when its target isn't on the page — follow that shape, and don't reach for JS when HTML/CSS suffices.
- **Clean up your own orphans.** Remove styles, includes, or JS that your change made unused; leave pre-existing dead code alone unless asked.
- **Name things plainly.** Class names, slugs, and front-matter keys should read like the existing ones — descriptive, kebab-case, no cleverness.
