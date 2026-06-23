# Handoff: Northstone Invest — Marketing Site

## Overview
Northstone Invest is a (fictional) Zurich-based private equity firm that raises capital from
institutional, family-office and private investors to invest in **GRC software companies**
(Governance, Risk & Compliance). The primary goal of the site is **investor acquisition** —
the dominant call-to-action everywhere is *Request fund materials*. A secondary goal is to
attract founders/operators of GRC software companies.

The site is an austere, institutional, "Vista-like" marketing site: deep navy, warm ivory,
a single brass accent, serif headlines over a clean sans body. It currently comprises four pages:

1. **Homepage** — value prop, investment thesis, approach, featured portfolio company (Zazoon),
   responsible investing, insights teasers, press, LP FAQ, contact.
2. **Contact / Investor relations** — copy + investor inquiry form with a submitted state.
3. **Insights index** — featured article + filter chips + 6-card grid.
4. **Article template** — long-form editorial article with standfirst, pullquote, CTA.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the
intended look, copy, and behavior. They are **not production code to copy directly**. They are
authored in a lightweight in-house "Design Component" format (a `<x-dc>`-style template + a tiny
logic class) that will not run outside the prototyping tool — **do not** try to ship the `.dc.html`
files as-is.

Your task: **recreate these designs in a real codebase** using its established patterns. If no
codebase exists yet, the recommended stack is **Next.js (App Router) + TypeScript + Tailwind CSS**
(or plain CSS modules) — it maps cleanly to this static, content-driven, mostly-server-rendered
marketing site. A headless CMS (or simple MDX files) is a natural fit for Insights articles.

The design uses **only inline styles and CSS custom properties** in the prototype. When porting,
lift the values in **Design Tokens** below into your token system (Tailwind theme, CSS variables,
etc.) rather than re-typing hex values inline.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout, copy, and interactions are
specified. Recreate the UI faithfully using your codebase's libraries and patterns. The only
placeholders are: (a) imagery — see **Assets**; (b) the contact form does not submit anywhere.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#f4f1ea` | Warm ivory — default page background |
| `--bg-alt` | `#ffffff` | White — alternating section / cards / header / footer |
| `--ink` | `#11213a` | Deep navy — primary text, dark buttons |
| `--ink-soft` | `#4a5a72` | Muted navy — body copy, labels |
| `--ink-body` | `#28344a` | Article body copy (slightly darker than ink-soft) |
| `--dark` | `#0e1b2c` | Navy — dark hero/portfolio/contact section backgrounds |
| `--on-dark` | `#eef1f6` | Near-white — text on dark |
| `--on-dark-soft` | `#9fb0c8` | Muted blue-grey — secondary text on dark |
| `--accent` | `#b0894e` | Brass — accent on light backgrounds, primary CTA fill |
| `--accent-on-dark` | `#cda868` | Lighter brass — accent on dark backgrounds |
| `--line` | `rgba(17,33,58,0.14)` | Hairline dividers / borders on light |
| `--line-dark` | `rgba(255,255,255,0.14)` | Hairline dividers / borders on dark |
| placeholder text | `#97a2b3` | Form input placeholder |
| fine print | `#8090a4` | Form disclaimer |

The accents are intentionally a single hue family (brass). Do not introduce additional accent colors.

### Typography
- **Serif (headlines, display, pullquotes):** `Spectral`, weights 400/500/600. Fallback: `Georgia, 'Times New Roman', serif`. Headlines use weight **500**.
- **Sans (body, UI, labels):** `Libre Franklin`, weights 400/500/600/700. Fallback: `Helvetica, Arial, sans-serif`.
- **Mono (section numbers "01", image captions):** `ui-monospace, 'SF Mono', Menlo, monospace`.

Type scale (px unless noted):
| Role | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Spectral | `clamp(40, 5vw, 68)` | 500 | 1.04 | -0.015em |
| Section H2 | Spectral | `clamp(30, 3.6vw, 46)` | 500 | 1.10 | -0.012em |
| Contact/Insights H1 | Spectral | `clamp(36, 4.6vw, 60)` | 500 | 1.04 | -0.015em |
| Article H1 | Spectral | `clamp(34, 4.6vw, 52)` | 500 | 1.06 | -0.015em |
| Card/sub headline | Spectral | 20–24 | 500 | 1.1–1.18 | — |
| Body large | Libre Franklin | 18 | 400 | 1.62–1.72 | — |
| Body | Libre Franklin | 15–17 | 400 | 1.56–1.62 | — |
| Eyebrow / label | Libre Franklin | 11–13 | 600 | — | 0.18–0.22em, UPPERCASE |
| Standfirst (article) | Spectral italic | 21 | 400 | 1.5 | — |
| Pullquote | Spectral italic | 24 | 400 | 1.4 | — |

### Spacing / layout
- Content container: `max-width: 1240px; margin: 0 auto; padding: 0 48px;`
- Article reading column: `max-width: 680px` (body), `760px` (head), `980px` (lead image).
- Section vertical rhythm: `padding: 120px 0` (top-level sections); hero `96px` top.
- Standard gap between grid columns: `32px`–`80px` depending on context.
- Border radius: **2px** on buttons/inputs/cards (deliberately sharp); **999px** on chips/pills only.
- No drop shadows anywhere except the (now-removed) floating control. Depth comes from hairlines and the navy/ivory contrast, not shadows.
- Hairline dividers (`1px solid var(--line)`) are a core motif — used to separate meta cells, list items, FAQ rows, news rows.

### Interaction tokens
- Link hover (light): color → `--ink`. Link hover (dark): subtle bg `rgba(255,255,255,0.06)`.
- Primary button (brass) hover: `filter: brightness(1.07)`.
- Dark button hover: `opacity: 0.88`.
- Card hover: `opacity: 0.78–0.85`.
- Inputs focus: `outline:none; border-color: var(--accent)`.
- No long animations; transitions are color/opacity only (~150ms is fine).

---

## Global Components

### Header (sticky, all pages)
- `position: sticky; top: 0; z-index: 40;` background `--bg-alt`, bottom border `--line`, height **74px**, inner container 1240/48px, flex space-between.
- **Logo:** an 11×11px square filled `--accent`, rotated 45° (a diamond), + "Northstone" in Spectral 21px/600, + a divider-separated "INVEST" in Libre Franklin 10px/600, letter-spacing 0.26em, uppercase, `--ink-soft`.
- **Nav links:** Thesis, Approach, Portfolio, Insights — Libre Franklin 14px/500, `--ink-soft`, hover `--ink`. The current page's link is weight 600 / `--ink`.
- **CTA:** "Investor relations" — dark button (`--ink` bg, white text), 10×20px padding, radius 2px.
- Nav links on subpages point to homepage anchors (`/#thesis`, `/#approach`, `/#portfolio`); Insights → insights index; CTA → contact.

### Footer (all pages)
- `--bg-alt` background, top border `--line`, container 1240/48px.
- Row: logo (left) + nav links (Thesis, Approach, Portfolio, Insights, Contact).
- Below: legal/disclaimer paragraph, `max-width ~96ch`, Libre Franklin 12px/1.7, `--ink-soft`:
  > "Northstone Invest · Zurich, Switzerland. This page is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any security. Northstone Invest is a fictional entity created for design purposes. © 2026 Northstone Invest."

### Section eyebrow pattern
Most sections open with: a mono section number (`01`–`07`, brass) + a gap + an uppercase Libre Franklin 12px/600 label, `--ink-soft`, letter-spacing 0.2em.

---

## Screens / Views

### 1. Homepage (`Northstone Invest.dc.html`)
Dark and light sections alternate. Order top to bottom:

**Hero** (`#top`, dark `--dark`):
- 2-col grid `1.25fr / 0.85fr`, gap 72px, container padded `96px 48px 0`.
- Left: eyebrow "Governance · Risk · Compliance — Zurich" (brass, with a 28×1px brass rule before it); H1 "We invest in the software that governs the modern enterprise."; 18px sub-paragraph (max 50ch); two CTAs — **primary brass** "Request fund materials →" (→ contact) and **ghost-on-dark** "Read the thesis" (→ #thesis).
- Right: **architectural "colonnade" motif** (see Assets) — a 3:4 framed panel.
- Below both columns: a **meta strip** — top border, 4 equal columns separated by vertical hairlines, each a small uppercase label + a Spectral 21px value:
  Sector → "GRC software" · Approach → "Control & growth equity" · Geography → "Europe & North America" · Fund I → "In formation" (value in brass).

**Thesis** (`#thesis`, light `--bg`), eyebrow "01 — The thesis":
- 2-col `1.1fr / 0.9fr`. Left: H2 "Regulation only compounds. The software that manages it is becoming indispensable." + 18px intro paragraph. Right: 4 hairline-separated numbered points (36px number column): Regulatory expansion / From spreadsheets to systems / Non-discretionary spend / A fragmented market. (Exact copy in the HTML.)

**Approach** (`#approach`, white `--bg-alt`), eyebrow "02 — Our approach":
- H2 "We back operators, then build alongside them." + a 4-column grid (vertical hairlines) of pillars labelled A–D: Operating partnership / Buy-and-build / Commercial engine / Governance & talent.

**Portfolio / Zazoon** (`#portfolio`, dark `--dark`), eyebrow "03 — Featured investment":
- 2-col `0.9fr / 1.1fr`. Left: **modular-grid motif** (see Assets) — 4×4 cell grid in a 4:3 frame, a few cells filled brass / white-6%. Right: label "Inaugural investment · Modular GRC platform", big "Zazoon" headline, description of MyGRC, and module chips: Internal Control System / Risk Management / Data Protection / "+ further modules" (last is dashed border).
- Below: a 3-column **case-study deep dive** (hairline top, vertical dividers): The opportunity / What we saw / The plan.
- Below: "The rest of the portfolio" + note "Fund I is being assembled…" + 3 dashed "to be announced" placeholder tiles (16:10).

**Responsible Investing** (`#responsible`, light `--bg`), eyebrow "04 — Responsible investing":
- 2-col like Thesis. H2 "Good governance is the business we're in." + intro. Right: 3 hairline points: In diligence / In ownership / In impact.

**Insights** (`#insights`, white `--bg-alt`), eyebrow "05 — Insights":
- Header row with "All perspectives →" (→ insights index). 3-col card grid; each card: top border `--ink`, category + date row (brass + muted), Spectral 23px title, 15px summary. Cards link to the article page.

**In the News** (`#news`, light `--bg`), eyebrow "06 — In the news":
- A list of 3 rows, grid `200px 1fr auto`, hairline-separated: publication+date (brass, uppercase) / Spectral 21px headline / "→". (Finews, Private Equity Intl, GRC World Forums.)

**FAQ** (`#faq`, white `--bg-alt`), eyebrow "07 — For prospective investors":
- 2-col `0.8fr / 1.2fr`. Left: heading "Questions, answered." Right: 5 native `<details>`/`<summary>` accordion rows (hairline separated). Summary: Spectral 21px + a brass "+" marker (default disclosure marker hidden). 5 LP questions — eligibility, what the fund invests in, hold period, location (Zurich), how to request materials. (When porting, animate open/close height and rotate/swap the "+" to "−" if desired; the prototype is static.)

**Contact** (`#contact`, dark `--dark`):
- H2 "Get in touch." + brass line "Northstone Invest · Zurich, Switzerland". 2-col (vertical divider): **For investors** (brass primary CTA "Request fund materials →" → contact) / **For founders & operators** (ghost CTA "Tell us what you're building" → contact).

### 2. Contact / Investor relations (`Contact.dc.html`)
- 2-col `0.85fr / 1.15fr`, gap 80px.
- **Left:** eyebrow "Investor relations"; H1 "Request the fund materials."; intro paragraph; then a hairline-separated detail list — Office "Bahnhofstrasse, 8001 Zurich, Switzerland", Investors `investors@northstone.invest`, Founders `founders@northstone.invest` (email values are Spectral 19px links, hover brass).
- **Right:** a white card (`1px var(--line)` border, 48px padding) containing the **form**:
  - Row 1 (2-col): Full name (text, required), Work email (email, required).
  - Row 2 (2-col): Organisation (text), Investor type (select, required: Institutional / Family office / Private–high-net-worth / Adviser–intermediary / Other).
  - Country / jurisdiction (text). Message (textarea, 4 rows, optional, vertical resize).
  - Submit: full-width brass button "Request fund materials →".
  - Fine print under button (this is a prototype / no data transmitted — replace with real privacy copy).
  - **Behavior:** on submit, prevent default and swap the card to a **thank-you state** (brass ✓ in a 44px square, "Thank you — request received.", follow-up sentence, "← Back to home" link), and scroll to top. In production, POST to your CRM/endpoint and keep the same success state.
- Labels: Libre Franklin 12px/600, uppercase, 0.06em, `--ink-soft`, 9px below.
- Inputs: full width, `13px 14px` padding, `1px solid rgba(17,33,58,0.22)`, radius 2px, 15px text; focus border `--accent`.

### 3. Insights index (`Insights.dc.html`)
- Page head: eyebrow "Insights" + H1 "Perspectives on governance, risk and the software that runs it." + a row of **filter chips** (pills): "All" (active = `--ink` fill / white text), then Regulation / Markets / Perspective / Portfolio (outline). Chips are visual-only in the prototype — wire to real filtering.
- **Featured article**: full-width link, 2-col `1.05fr / 0.95fr`, top border `--ink`. Left: 16:10 colonnade motif. Right: category+date+"Featured", Spectral ~40px title, summary, "Read the article →".
- **Grid**: 3-col, 6 cards, same card style as homepage insights (top border `--ink`, category/date, Spectral 22px title, summary). All cards link to the article page (in production, each links to its own slug).

### 4. Article template (`Article.dc.html`)
- Reading column centered. Back link "← Insights" (brass).
- Article head: category · date · read-time row; H1; **standfirst** (Spectral italic 21px, `--ink-soft`); author block — 38px navy circle avatar with brass "N", "Northstone Research" / "Zurich".
- **Lead image**: 21:9 colonnade motif (max 980px).
- **Body** (max 680px): 18px Libre Franklin paragraphs (`--ink-body`, line-height 1.72); Spectral 30px H2 subheads; a **pullquote** — left brass 2px border, Spectral italic 24px; a bulleted list.
- **End CTA**: hairline top, "Investing in the infrastructure of compliance." + "Fund I is open to qualified investors." + brass "Request fund materials →" (→ contact).

---

## Interactions & Behavior
- **Navigation:** standard `<a>` links. Homepage section links are in-page anchors (`#thesis`, `#approach`, `#portfolio`, `#contact`); cross-page links go to `/`, `/insights`, `/insights/[slug]`, `/contact`. (Prototype uses file names with anchors.)
- **Header:** sticky; consider a subtle shadow/border on scroll in production (prototype keeps a static border).
- **FAQ accordion:** expand/collapse one item at a time or allow multiple; native `<details>` is fine. Animate height + swap "+"/"−".
- **Contact form:** client-side required validation on name, email, investor type; on success show the thank-you state. Hook submit to your backend/CRM. Add real consent/privacy copy.
- **Insights filters:** wire chips to filter the grid by category; "All" default active.
- **Hover states:** as listed in Interaction tokens. Keep transitions short (color/opacity).
- **Responsive:** prototype is desktop-first at ~1240px. For ≤900px, collapse all 2-col and 3/4-col grids to single column, reduce section padding (~72–80px), and switch the header nav to a menu/disclosure. `clamp()` already handles type scaling. The news rows (`200px 1fr auto`) should stack on mobile.

## State Management
Minimal. Only two pieces of real state, both local/per-page:
- **Contact form** — field values + a `submitted` boolean toggling form ↔ thank-you. (Plus your async submit status: idle/submitting/success/error.)
- **Insights filter** — active category string (default "All").
Everything else is static content; ideal for SSG/MDX/CMS. No global store needed.

## Assets
There are **no bitmap images** in the prototype. Imagery is rendered with CSS as deliberate
**abstract architectural placeholders** in the brand palette — replace these with real
photography/art in production (the client indicated abstract/architectural stock-style imagery):

1. **Colonnade motif** (hero, article lead, insights featured): a framed panel with a
   navy vertical gradient (`linear-gradient(180deg, rgba(22,41,64,0.85), #0a1622)`), an overlay of
   evenly spaced thin vertical lines (`repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 30px)`),
   a 1px brass horizon line at ~60%, and a soft bottom highlight. Intended replacement: austere
   architecture / abstract long-exposure imagery.
2. **Modular-grid motif** (Zazoon): a 4×4 grid of cells (8px gap) inside a navy frame, most
   cells outlined `rgba(255,255,255,0.12)`, a few filled brass / white-6% — evokes the modular
   MyGRC suite. Intended replacement: a real product screenshot of Zazoon's MyGRC platform.
3. **"To be announced" tiles** (portfolio): dashed-border placeholder tiles for future portfolio
   companies — replace with portfolio logos/cards as the fund closes investments.

**Fonts:** Spectral + Libre Franklin, loaded from Google Fonts in the prototype. In production,
self-host (e.g. `next/font`) for performance and privacy.

**Logo:** the diamond + wordmark is built from a rotated square + type (no SVG file). Reproduce as
an SVG/component, or swap for a final logo if one is commissioned.

**Portfolio reference — Zazoon:** real company (zazoon.com). Product is **MyGRC**, a modular GRC
platform with modules including **Internal Control System**, **Risk Management**, and **Data
Protection**, usable separately or together. Use accurate product naming if Zazoon assets are provided.

## Files (in this bundle)
- `Northstone Invest.dc.html` — homepage
- `Contact.dc.html` — contact / investor relations + form
- `Insights.dc.html` — insights index
- `Article.dc.html` — article template
- `support.js` — prototyping runtime (reference only; **not** for production)

> Reminder: `.dc.html` files are design references. Recreate them in your chosen framework using
> the tokens and specs above; do not ship them directly.
