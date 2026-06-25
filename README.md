# Northstone Invest — marketing site

Static marketing site for Northstone Invest, a Zurich-based investment firm
backing software companies with durable, recurring revenue (with particular
conviction in the software regulated industries depend on). The site is
**bilingual** — German is the default at the root, English lives under `/en/`.
Built with **Jekyll** and deployed to **GitHub Pages**. Plain HTML, CSS and a
little vanilla JS — no build step beyond Jekyll, no framework.

## Stack

- **Jekyll** (`github-pages` gem) — same bundle GitHub Pages runs.
- **Custom CSS** in `assets/css/` — `tokens.css` (design tokens + self-hosted
  fonts) and `main.css` (all component styles). No inline styles.
- **Vanilla JS** in `assets/js/main.js` — reveal-on-scroll, mobile nav, FAQ
  markers, insights filter, contact-form thank-you state. Everything degrades
  gracefully without JS.
- **Self-hosted fonts** (`assets/fonts/`) — Spectral + Libre Franklin, no
  third-party requests.

## Structure

```
_config.yml            Site config + the `insights` collection; path-based
                       language defaults (root = de, /en = en)
_layouts/
  default.html         Page shell (head, header, content, footer)
  article.html         Insights article wrapper (language-aware CTA + links)
_includes/
  head.html  header.html  footer.html  structured-data.html
                       header/footer are bilingual: labels, anchors and the
                       EN/DE switcher swap on page.lang
_insights/             One Markdown file per article. German files use the
                       clean slug; English ones add a `-en` suffix and their
                       own /en/insights/ permalink (the collection is shared)
index.html             Homepage — German (default)           → /
kontakt.html           Investor-relations page + form — DE    → /kontakt/
insights.html          Insights index — DE                    → /insights/
datenschutz.html       Privacy notice — DE                    → /datenschutz/
en/
  index.html  contact.html  insights.html  privacy.html       → /en/...
assets/                css / js / fonts / img
```

## Languages

German is the default and lives at the root; English lives under `/en/`. The
language each page renders in comes from path-based `defaults` in `_config.yml`
(`lang: de` at the root, `lang: en` under `en/`); collection articles set
`lang` in their own front matter. Every page sets an `alternate_url` pointing
at its counterpart, which powers the EN/DE switcher in the header (a page with
no counterpart shows the other label as inert text). Insights index pages
filter `site.insights` by `page.lang`, so each language shows only its own
articles.

## Local development

```bash
bundle install
bundle exec jekyll serve        # http://localhost:4000
```

Check links and images against the built site (matches CI):

```bash
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external --allow-hash-href
```

## Adding an Insights article

Add the article twice — once per language — in `_insights/`. The German file
takes the clean slug; the English one adds a `-en` suffix and sets its own
`/en/insights/` permalink. Front matter (German example):

```yaml
---
title: "…"
category: Regulation        # Regulation | Markets | Perspective | Portfolio
date: 2026-03-01
read_time: "7 Min. Lesezeit"
lang: de
permalink: /insights/your-slug/
alternate_url: /en/insights/your-slug/
standfirst: "One-line italic intro shown under the title."
summary: "Short teaser used on cards and the index."
featured: true              # optional — promotes it to the index hero
---

Body in Markdown. `##` becomes a subhead, `>` a pullquote, `-` a list.
```

The English counterpart (`your-slug-en.md`) is identical but with `lang: en`,
`permalink: /en/insights/your-slug/` and `alternate_url: /insights/your-slug/`.
`category` stays in English in both files — it's a stable key the filter chips
match on; only the chip *labels* are translated per page.

Each article appears automatically on its language's Insights index and (for
the three newest) on that language's homepage.

## Deployment

Pushing to `main` triggers `.github/workflows/jekyll.yml`: build → htmlproofer
link check → deploy to GitHub Pages. Set the Pages source to **GitHub Actions**
in the repo settings.

Before going live, set `url` (and `baseurl` if served from a subpath) in
`_config.yml`. For a custom domain, add a `CNAME` file at the repo root.

## Contact form

The form validates client-side and shows a thank-you state. Because GitHub
Pages is static, submissions are handled by an external endpoint: connect a
hosted form handler (Formspree, Web3Forms, a serverless function) at the
marked hook in `assets/js/main.js` and set the form's `action`.

## Imagery

Lead/hero photography in `assets/img/*.webp` is architectural stock from
[Unsplash](https://unsplash.com/license) (free, commercial use, no attribution
required), processed to a navy duotone so it reads as part of the brand system.
Each image sits inside the `.motif` frame as a `.motif-photo`, under the brass
horizon line. Article lead images are chosen by `page.category` in
`_layouts/article.html`; override per-article with an `image:` front-matter key
pointing at a basename in `assets/img/` (e.g. `image: lead-markets`).

Sources (Unsplash): hero — Alex Robertson (Plaza de España, Seville);
regulation/featured — Niklas Weiss (Sultan Qaboos Grand Mosque, Muscat);
markets — Sebastian Schuster; perspective — Mike Hindle; portfolio — Harrison
Lin. The featured-investment block and the "to be announced" tiles deliberately
keep their CSS motifs (the modular grid evokes a modular software suite; no
fabricated screenshot).
