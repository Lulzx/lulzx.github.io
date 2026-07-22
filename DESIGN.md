# DESIGN.md — Kaiju-Era Broadcast Bulletin

The visual world of lulzx.com: a kaiju-era Japanese emergency-broadcast graphic
system applied to a personal site. Newsreel monochrome ground, civil-defense
red reserved for alerts and primary emphasis, bilingual kanji/roman labels set
with bureaucratic calm. The garden's stages read as broadcast alert levels.
User-pinned direction (impeccable seed 9e7ac46e, challenger
`pop-culture-shelf-kaiju-broadcast-alert`).

## Palette

Monochrome + one alarm color. No other hues on the surface.

Light "day bulletin" (paper stock):
- ground `#EFEEEA`, panel `#F6F5F2`, black panel `#1B1B1D`
- ink `#1B1B1D`, soft `#3B3B3D`, muted `#6F7072`, faint `#9A9A97`
- line `#D2D1CD`, line-strong `#AEAEAa`
- civil-defense red `#C9252B` (text-safe `#B01E24`)

Dark "night broadcast":
- ground `#131314`, panel `#1B1B1D`, black panel `#0C0C0D`
- ink `#ECECEA`, soft `#C9C9C6`, muted `#909090`, faint `#616163`
- line `#2A2A2C`, line-strong `#404043`
- red `#E23636`

Warning stripe: 45° repeating red/ground stripes (CSS repeating-linear-gradient),
slow crawl animation. Full-color/amber is reserved; nothing else gets hue.

## Type

- Display kanji: `Yuji Syuku` (brush). Chrome only — kanji labels pair with the
  English content, never replace it.
- Display roman: `Oswald` 500–600, condensed caps, tracked (+.08–.2em).
- Body: `Zen Kaku Gothic New` 400/500/700 (shōwa-bureaucracy gothic).
- Mono (timestamps, code, designators): system mono stack.
- Bilingual label pattern: small brush/gothic kanji over tracked roman caps.

## Grammar

- Broadcast order rules composition: title card → map/figure → instruction.
- Header is a black broadcast bar with a crawling warning-stripe top edge.
- Section heads: centered or flush title with double "speed-line" rules.
- Stages map to alert levels: seed = dashed outline chip (routine notice),
  sprout = solid black chip, evergreen = solid red chip (the alert).
- Cards are notice placards: square corners, hairline or 2px black borders,
  corner registration ticks; striped border marks escalation/hover.
- Imagery is newsreel: grayscale, grain, scanline frame, captioned as footage
  (`assets/ink/fuji.webp` reused as archive footage in the hero monitor).
- Motion: hard broadcast cuts (stepped opacity page transitions), the stripe
  crawl, and one authored hero moment. No soft fades, no scattered hovers.
- Reading progress: red transmission bar, fixed top.
- Focus: 2px red outline. Selection: red on white / white on red.

## Constraints carried from PRODUCT.md

Single-file no-build Vue SPA; `404.html` and `learn/index.html` stay identical
copies of `index.html`. All copy verbatim. Routes unchanged. Both themes via
`html.dark` class toggle.
