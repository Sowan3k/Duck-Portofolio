# V-024 — Skills book closed desk state and open blank spread, candidate 1

- Use case: paired standalone physical UI states
- Identity authority:
  `visuals/04-scene-production/liftable-props/approved/interactive-skills-book-shelf-cutout--v01--approved.png`
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Candidate outputs:
  - `visuals/05-physical-ui/skills-book/drafts/skills-book-closed-desk--v01.png`
  - `visuals/05-physical-ui/skills-book/drafts/skills-book-open-spread--v01.png`
- Status: owner-approved and promoted byte-identically
- Approved outputs:
  - `visuals/05-physical-ui/skills-book/approved/skills-book-closed-desk--v01--approved.png`
  - `visuals/05-physical-ui/skills-book/approved/skills-book-open-spread--v01--approved.png`

## Exact closed-state prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft painted
shading. A cozy, cluttered, lived-in office rendered in muted warm browns,
mustard yellows, and cream, lit by late-afternoon interior light and the green
glow of a banker's lamp, with cool grey-blue rainy daylight coming through the
window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Create exactly one standalone CLOSED Skills hardback book as a production asset.
Image 1 is the exact identity, rust-red/brown cover color, worn material,
horizontal spine-band, ink-outline, and age authority: reconstruct the complete
book that this shelf-state piece belongs to. Image 2 is the exact office
perspective, palette, lighting, and material authority. Images 3 and 4 lock the
project's illustration language only; do not include the character.

Show the complete closed book removed from the shelf and laid on the desk, cover
facing upward, in a gentle three-quarter top-down view matching Image 2's desk
perspective. It is a substantial portrait-proportioned vintage hardback, with a
muted rust-red cloth/leather cover, dark warm-brown hand-inked outline, softly
worn corners and edges, faint horizontal gold-toned bands inherited from Image
1, a visible warm cream page block, subtle painted wear, and restrained
late-afternoon shading. Keep the silhouette simple and readable at small size.
The cover and spine are entirely blank: absolutely no title, text, letters,
numbers, icons, emblems, symbols, pseudo-writing, decoration that resembles a
glyph, bookmark, clasp, or label. No hands, duck, shelf, desk, props, extra books,
or loose pages.

Center the single complete book large on a perfectly flat, uniform pure
chroma-key green background `#00FF00` with generous clean margin on every side.
Allow only a compact soft dark-brown painted contact shadow directly beneath the
book; no green spill on the object. Do not add a floor, horizon, vignette,
background texture, noise, gradient, watermark, or second object. Preserve the
entire silhouette without touching the canvas edges.

## Exact open-state prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft painted
shading. A cozy, cluttered, lived-in office rendered in muted warm browns,
mustard yellows, and cream, lit by late-afternoon interior light and the green
glow of a banker's lamp, with cool grey-blue rainy daylight coming through the
window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Create exactly one standalone OPEN Skills hardback book as the matching second
state of Image 1. Image 1 is the exact closed-book identity, cover color,
proportions, leather/cloth wear, page-block color, binding, gold-toned spine
bands, ink treatment, and lighting authority. Image 2 is the original
shelf-source identity. Image 3 is the office perspective and palette authority.
Images 4 and 5 lock the project's illustration language only; do not include the
character.

Show that exact rust-red vintage book now opened and lying naturally flat on the
desk in a gentle three-quarter top-down view matching Image 3. The open book is
wider than tall, centered, and fully visible. Show two large warm-cream
aged-paper pages, a believable dark center gutter and stitched binding, subtle
page curvature near the spine, a few layered page edges, softly worn outer
corners, and a narrow visible rim of the same rust-red cover beneath the pages.
Keep both page interiors calm, evenly lit, and spacious for later DOM-rendered
Skills content. The left and right pages must be completely blank: absolutely no
text, letters, numbers, icons, diagrams, lines, rules, boxes, labels, symbols,
pseudo-writing, scribbles, stains resembling marks, emblems, or bookmarks. No
hands, duck, shelf, desk, props, extra book, loose pages, page tabs, clasp, or
ribbon.

Center the single complete open book large on a perfectly flat, uniform pure
chroma-key green background `#00FF00` with generous clean margin on every side.
Allow only a compact soft dark-brown painted contact shadow directly beneath the
book; no green spill on the object. Do not add a floor, horizon, vignette,
background texture, noise, gradient, watermark, or second object. Preserve the
entire silhouette without touching the canvas edges.

## Generation and processing record

- Closed built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-d89bb153-c571-4f16-927d-fb5049737844.png`
- Open built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-3c83d4b0-aca7-4d23-a77e-508e565c3bc0.png`
- Chroma sources remain in the draft directory for audit.
- Chroma keying solved the green composite, kept the connected painted contact
  shadow, removed hidden RGB, and decontaminated edge color.
- Rust material medians after matching:
  - closed: `#683717`
  - open: `#683719`
- Open page median after matching: `#E8C58D`.
- Closed output: 1800×2400 RGBA; alpha bbox `(116,348)–(1684,2052)`.
- Open output: 2400×1800 RGBA; alpha bbox `(116,288)–(2282,1509)`.
- Both have 256 alpha levels, transparent corners, zero RGB under alpha zero,
  and zero materially green-dominant edge pixels.
- Both remain completely blank; the open spread has two large DOM-safe page
  interiors with no pseudo-writing, rules, icons, or diagrams.
- SHA-256:
  - closed candidate: `16B7B1653DDB4FDCB73F9508F6E903589092E0BA335182CD739B935BAF9DD6DD`
  - open candidate: `1857C48FC744D1A148CA84ABF766861ECBC436F6C9CDD201E2E5A45061BAB401`
  - closed alpha QA: `CAC37205A9EE4865DF537EB22FD56D59762B2997036EF31778EA5A5B79894FAF`
  - open alpha QA: `56034DD7D4C288E013BC788AF14BAB784C62DB8A076121B85CC5A3F6CCEF60C5`
  - paired approval sheet: `0E613A2084A9993304E7CCC16C5C943A760B7C66F9E112A76C9DC396A358F1A1`
- Review result: internal alpha, spill, blankness, palette, and desk-scale checks
  passed; owner approved the paired review sheet on 2026-07-19. Both approved
  files are byte-identical to the reviewed candidates.
