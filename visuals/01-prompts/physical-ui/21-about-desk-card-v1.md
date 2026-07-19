# V-021 — blank About desk card, candidate 1

- Use case: accessible About biography content rendered later as DOM text
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Additional material reference attached:
  `visuals/05-physical-ui/contact-business-card/approved/contact-business-card-blank-front--v02--approved.png`
- Candidate output:
  `visuals/05-physical-ui/about-card/drafts/about-desk-card-blank--v01.png`
- QA sheet:
  `visuals/99-review/contact-sheets/about-desk-card-blank--v01-alpha-qa.png`
- Paired review:
  `visuals/99-review/contact-sheets/v020-v021-dialogue-about-approval-set-v01.png`
- Status: owner-approved and promoted byte-identically
- Approved output:
  `visuals/05-physical-ui/about-card/approved/about-desk-card-blank--v01--approved.png`

## Exact generation prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft painted
shading. A cozy, cluttered, lived-in office rendered in muted warm browns,
mustard yellows, and cream, lit by late-afternoon interior light and the green
glow of a banker's lamp, with cool grey-blue rainy daylight coming through the
window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Create exactly one standalone BLANK ABOUT DESK CARD as a production asset for
this same illustrated office portfolio. Image 1 is the exact office palette,
lighting, desk perspective, ink weight, worn walnut, aged paper, and brass
material authority. Images 2 and 3 lock the illustration language and color
discipline only; do not include the duck or any character. Image 4 is the exact
approved paper color, hand-inked border quality, restrained wear, and blankness
authority. Do not copy Image 4's loose business-card silhouette or its 7:4
proportions.

Make this clearly a larger personal introduction card displayed on the desk: a
broad warm-cream card face with gently softened corners, held upright at a very
slight backward lean in one shallow dark-walnut tabletop card holder with two
small aged-brass end caps. The card and holder together should have an overall
aspect around 1.45:1, clearly taller and more substantial than a business card.
Show it almost front-facing with only the slightest top-down office-desk
perspective, so later accessible DOM biography content can align cleanly over
the blank card. Use a near-black warm hand-inked outer contour, one thin
dark-brown inset border on the paper, subtle paper tooth, modest edge wear,
visible walnut grain, and restrained late-afternoon painted shading. Keep the
silhouette compact, readable, balanced, and welcoming. The blank paper face
should occupy at least 80% of the object's width and 72% of its height, with a
large quiet central region.

The entire card face and holder must contain no text, letters, numbers,
punctuation, icons, portraits, photographs, logos, labels, ruled lines, boxes,
dividers, buttons, controls, close marks, arrows, symbols, pseudo-writing,
scribbles, or stains resembling marks. No duck, character, hands, desk surface,
dialogue plaque, telephone, extra card, props, or second object.

Center the single complete card-and-holder object large on a perfectly flat
uniform pure chroma-key green background #00FF00, with generous clean margin on
all sides. No cast shadow, reflection, floor, horizon, vignette, background
texture, gradient, green glow, watermark, or cropped edge. Preserve the complete
silhouette and keep green entirely off the object.

## Generation and processing record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-cfbd1767-6e56-4156-9ceb-5cad3251c99b.png`
- Chroma source:
  `visuals/05-physical-ui/about-card/drafts/about-desk-card-blank--v01-chroma-source.png`
- Processing script: `tmp/imagegen/prepare_dialogue_about_assets.py`
- Output: 2400×1800 RGBA; alpha bbox `(96,182)–(2304,1617)`.
- Alpha has 256 levels, transparent corners, zero RGB under alpha zero, and
  zero materially green-dominant pixels.
- Central paper median matched from `#F1D09D` to `#D7B287`, aligned to the
  approved warm-paper family.
- The card remains completely blank, is visibly more substantial than the
  Contact business card, and provides a large near-front-facing DOM-safe face.
- SHA-256:
  - chroma source: `378B9119D85D8983C93ABA08D1C2088EB64F8C17B009FB8D6CBB774093F33955`
  - RGBA candidate: `389E0501ED8337DA61220314E540E9959D0FC8DFD5A4AC593450933BE098A597`
  - alpha QA: `562C32078C0BB6A547464147F707E9AE2F5CACA6E9A3068D61041938A70395C8`
  - paired review: `B08F994B18F7C2B0608BC79FC49F7A24B371288EF47BED1AE60F88BA4687573D`

## Review result

Internal composition, blankness, transparency, spill, paper-palette,
silhouette differentiation, small-scale readability, and scene-integration
checks passed. Owner approved the paired review on 2026-07-19; the approved
file is byte-identical to the reviewed candidate.
