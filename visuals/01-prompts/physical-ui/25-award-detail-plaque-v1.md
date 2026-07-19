# V-025 — Blank Award detail plaque, candidate 1

- Use case: standalone transparent physical UI surface
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Candidate output:
  `visuals/05-physical-ui/award-card/drafts/award-detail-plaque--v01.png`
- Approved production asset:
  `visuals/05-physical-ui/award-card/approved/award-detail-plaque--v01--approved.png`
- Individual QA:
  `visuals/99-review/contact-sheets/award-detail-plaque--v01-alpha-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v025-v026-award-education-approval-set-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-19

## Exact generation prompt

Use case: stylized-concept

Asset type: transparent production asset for the Swan's Office Award detail card

Warm storybook cartoon illustration with heavy dark ink outlines and soft
painted shading. A cozy, cluttered, lived-in office rendered in muted warm
browns, mustard yellows, and cream, lit by late-afternoon interior light and the
green glow of a banker's lamp, with cool grey-blue rainy daylight coming through
the window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Primary request: Create exactly one standalone BLANK AWARD DETAIL PLAQUE, the
physical display card that appears when the visitor activates the trophy shelf.

Input images: Image 1 is the exact trophy-shelf brass, walnut, office
perspective, late-afternoon lighting, ink weight, and lived-in wear authority.
Images 2 and 3 lock the project's illustration language and color discipline
only; do not include Swan or any character.

Subject and materials: A substantial freestanding tabletop award plaque with a
gently arched dark-walnut backing, a broad warm aged-brass rectangular inset
plate with softened corners, four tiny dark brass mounting screws, and one
shallow dark-walnut pedestal foot. The plaque should feel ceremonious but
restrained, handcrafted, slightly worn, and clearly related to the brass trophy
in Image 1. Use visible walnut grain, mild brass patina, a warm hand-inked outer
contour, subtle painted shading, and one restrained highlight along the brass
rim. Show it almost front-facing with only the slightest top-down desk
perspective so later accessible DOM-rendered award content can align cleanly.
Overall object aspect about 1.45:1. The central blank brass plate must occupy at
least 76% of the object's width and 58% of its height, with a calm evenly lit
interior. No trophy sculpture, cup, medal, ribbon, star, laurel, crest, or award
symbol on the asset.

Lighting and palette: warm late-afternoon shading; dark walnut; muted aged brass
and mustard-gold; near-black warm ink, never pure black. No green glow, glossy
digital gradient, or mirror reflection.

Constraints: The entire plaque and brass plate are completely blank. Absolutely
no award name, text, letters, numbers, dates, icons, logos, emblems, seals,
badges, stars, laurels, medals, ribbons, trophy silhouettes, decorative glyphs,
pseudo-writing, engraving, ruled lines, boxes, dividers, buttons, controls,
labels, photographs, or portraits. No hands, duck, character, trophy shelf,
desk surface, extra plaque, props, or second object.

Scene/backdrop: Center the single complete plaque large on a perfectly flat
uniform pure chroma-key green background #00FF00 with generous clean margin on
every side. The background must contain no shadows, gradients, texture,
reflections, floor plane, horizon, lighting variation, vignette, noise, or
watermark. Do not use #00FF00 anywhere in the object. No cast shadow or contact
shadow. Preserve the complete crisp silhouette without touching any canvas
edge.

## Generation and processing record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-cfa4c5c9-4493-4175-ae4f-648823858208.png`
- Chroma source:
  `visuals/05-physical-ui/award-card/drafts/award-detail-plaque--v01-chroma-source.png`
- Helper-alpha intermediate:
  `tmp/imagegen/award-detail-plaque-helper-alpha-v01.png`
- The installed imagegen `remove_chroma_key.py` helper converted the flat green
  field to a soft RGBA matte. Project normalization and QA use
  `tmp/imagegen/prepare_award_education_assets.py` to crop, scale, remove hidden
  RGB, and replace any green-contaminated edge colors from nearby trusted object
  pixels.
- Candidate output: 2400×1800 RGBA; alpha bbox `(97,191)–(2303,1609)`.
- 256 alpha levels, four transparent corners, zero RGB beneath alpha zero, and
  zero materially green-dominant nonzero-alpha pixels.
- Material medians: walnut `#8B5B1E`; aged brass `#B47C29`.
- The brass face remains completely blank and provides a broad, evenly lit
  DOM-safe content surface.
- SHA-256:
  - chroma source: `822E89DF17C8540DF19C9F75A13653F0B74027351FE04F6577684400726C3F9C`
  - helper alpha: `F1090CE754D79CA2418455F35E5C7D64CF3A5D55F6E3CAF0D66CA2069E137C10`
  - candidate: `2E85027E368AB8EDCDB94ACF1566DC3760644D86CF53FAD3893266402F09E866`
  - alpha QA: `5505A965649CF73A7FA1364463D0BC197C58C74812CF3F9A1C1BAF8981F15441`
  - paired approval sheet: `66F0343269568B04331CB304A714EA1F2A8585E1EE4AE364D73D08C352C5B4D8`

## Review result

Internal identity, blankness, silhouette, transparency, spill, walnut/brass
palette, small-scale readability, and office-placement checks passed. Owner
approved the paired review on 2026-07-19; the approved file is byte-identical
to the reviewed candidate.
