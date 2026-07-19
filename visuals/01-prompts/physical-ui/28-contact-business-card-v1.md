# V-028 — Blank Contact business-card front, candidate 2

- Use case: standalone transparent physical UI surface
- Generation references:
  - Image 1: approved resting contact-card cutout, paper/color/border authority
  - Images 2–3: approved office/canonical style references
- Approved production asset:
  `visuals/05-physical-ui/contact-business-card/approved/contact-business-card-blank-front--v02--approved.png`
- Status: owner-approved; promoted byte-identically on 2026-07-19

## Exact generation prompt

Create one finished blank Contact business card as a standalone production asset
for the same hand-painted storybook office. Image 1 is the exact
paper/color/border authority for the card. Images 2 and 3 are exact office
style, palette, ink-line, lighting, and material references only.

Show exactly one complete horizontal business card, centered and large, viewed
almost straight-on with only a very slight natural handmade skew (no dramatic
perspective), approximately 1.75:1 physical aspect ratio. Match Image 1's warm
cream aged-paper color, subtle mottled paper grain, thin dark warm-brown
hand-inked double border, softly worn corners, and understated painted shading.
The card must feel like the fully pulled-out, completed version of Image 1 and
must be suitable for later DOM contact text placed over it.

Keep the entire central writing area clean, calm, evenly lit, and completely
blank. Absolutely no text, letters, numbers, icons, logos, symbols,
pseudo-writing, scribbles, stamps, emblems, phone glyphs, email glyphs, QR code,
watermark, or decorative mark that could be mistaken for content. No hands,
character, telephone, holder, desk, props, shadows from other objects, or
additional cards.

Use the project's warm storybook-cartoon treatment: dark hand-drawn ink contour,
soft painted shading, gentle analog texture, muted cream/brown palette, no glossy
digital gradients, no photorealism, no vector-flat look.

Place the isolated card on a perfectly flat, uniform pure chroma-key green
background `#00FF00` with a generous clean margin on every side. Do not cast any
green-tinted reflection on the card. Do not add a floor, horizon, vignette,
texture, noise, shadow, or gradient to the green background. The full card
silhouette must be visible and must not touch the canvas edges.

## Processing and review record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-1f447402-e8f1-49b4-883b-45d1595f08c0.png`
- Chroma source:
  `visuals/05-physical-ui/contact-business-card/drafts/contact-business-card-blank-front--v01-chroma-source.png`
- v01 transparent preparation remains rejected evidence because of a green edge.
- v02 was chroma-keyed, despilled, matched to the resting-card paper authority,
  corrected to a 7:4 physical ratio, and exported at 2800×1600 RGBA.
- Alpha bbox: `(100,56)–(2700,1544)`; silhouette ratio `1.7473:1`.
- Paper median: `#D6B285`; resting-card authority: `#D5B184`.
- 256 alpha levels; transparent corners; zero RGB under alpha zero; zero
  green-dominant or blue-dominant nonzero-alpha pixels.
- Blank-content validation: no generated writing, glyphs, icons, logos, or
  pseudo-content. The central area remains safe for DOM text.
- SHA-256:
  - approved PNG: `7BEF3267C608D01A9D74CF1BD0A51EDD211DFE769579CEB043704BBB6854CA38`
  - QA/approval sheet: `F331F63FEBE375D5F58426F414A089C8E3C901D27AF56ACF35483357C043811E`
  - 390px review: `044A09A10CAF3C0BB8DEDC396CDB49EB91691693AF7E26EC3A2954AED2BE86EE`
- Review result: internal and independent QA pass; owner approved and production
  asset promoted byte-identically.

