# Northstone Invest — marketing site

Static marketing site for Northstone Invest, a (fictional) Zurich-based private
equity firm investing in GRC software companies. Built with **Jekyll** and
deployed to **GitHub Pages**. Plain HTML, CSS and a little vanilla JS — no build
step beyond Jekyll, no framework.

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
_config.yml            Site config + the `insights` collection
_layouts/
  default.html         Page shell (head, header, content, footer)
  article.html         Insights article wrapper
_includes/
  head.html  header.html  footer.html  structured-data.html
_insights/             One Markdown file per article (the collection)
index.html             Homepage
contact.html           Investor-relations page + inquiry form  → /contact/
insights.html          Insights index (featured + filterable grid) → /insights/
assets/                css / js / fonts / img
DESIGN-HANDOFF.md      Original design spec & tokens (excluded from the build)
```

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

Drop a Markdown file in `_insights/`. Front matter:

```yaml
---
title: "…"
category: Regulation        # Regulation | Markets | Perspective | Portfolio
date: 2026-03-01
read_time: "6 min read"
standfirst: "One-line italic intro shown under the title."
summary: "Short teaser used on cards and the index."
featured: true              # optional — promotes it to the index hero
---

Body in Markdown. `##` becomes a subhead, `>` a pullquote, `-` a list.
```

It appears automatically on the Insights index and (for the three newest) on
the homepage. Categories map to the filter chips on `/insights/`.

## Deployment

Pushing to `main` triggers `.github/workflows/jekyll.yml`: build → htmlproofer
link check → deploy to GitHub Pages. Set the Pages source to **GitHub Actions**
in the repo settings.

Before going live, set `url` (and `baseurl` if served from a subpath) in
`_config.yml`. For a custom domain, add a `CNAME` file at the repo root.

## Contact form

The form validates client-side and shows a thank-you state. GitHub Pages is
static, so it does not submit anywhere yet — wire it to a hosted form handler
(Formspree, Web3Forms, a serverless function) at the marked hook in
`assets/js/main.js` and set the form's `action`.
