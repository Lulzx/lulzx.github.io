# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the owner (lulzx) — the site is a personal artifact and thinking space; visitors are secondary. Secondary visitors arrive via GitHub, search, or shared links: engineers, readers of the notes, occasional recruiters.

## Product Purpose

Personal site of lulzx, a software engineer who builds "quiet systems": small, focused tools with a bias toward clarity, performance, and control. The site holds a digital garden of notes (~33, staged seed/sprout/evergreen), a personal vocabulary of 34 "words", project cards, and an about page. Success: the site itself is a striking, memorable artifact — distinctive enough that people recall and share it.

## Positioning

Minimal by default, auditable from source: the entire site is one hand-written HTML file with no build system. The design should be something a visitor remembers an hour later.

## Operating Context

Deployed at lulzx.com via GitHub Pages (branch master, CNAME), proxied by Cloudflare. Single-file Vue 3 + Vue Router SPA in `index.html`; `404.html` and `learn/index.html` are exact copies (SPA fallback). Per-item static HTML fallbacks in `words/` and `learn/`. `/gallery` is a standalone page loading remote images. The `notes/` directory is frozen by GitHub and must never serve content.

## Capabilities and Constraints

- Must remain a no-build single `index.html` (CDN Vue 3 + Vue Router 4); after edits, `404.html` and `learn/index.html` must be kept identical.
- All content is preserved verbatim: every word, note, project description, page copy.
- IA and routes preserved: home / words / projects / learn / about, notes at `/learn/<id>`, words at `/words/<id>`.
- Both dark and light themes with a toggle.
- Avoid em dashes in note/word copy.
- Assets live in `assets/ink/` today; asset paths are absolute.

## Brand Commitments

Name "lulzx", domain lulzx.com. The current sumi-e ink-wash world (paper palette, Spectral serif, dandelion seal) is the incumbent being replaced, not a binding commitment.

## Evidence on Hand

Real content: `wordData` (34 entries) and `notesData` (~33 notes) embedded in `index.html`. Ink-wash webp assets in `assets/ink/` (belong to the outgoing world). No testimonials, metrics, or commercial claims exist; none may be invented.

## Product Principles

- The site is the proof: minimal, legible source is part of the identity.
- Memorability over convention; the design is allowed to lead.
- The garden metaphor (staged, tended notes) is product truth, not decoration.
- Content is never rewritten to fit design.
