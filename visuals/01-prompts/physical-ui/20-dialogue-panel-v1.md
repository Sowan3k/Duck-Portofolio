# V-020 — blank dialogue panel, candidate 1

- Use case: short accessible dialogue lines rendered later as DOM text
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Candidate output:
  `visuals/05-physical-ui/dialogue-panel/drafts/dialogue-panel-blank--v01.png`
- QA sheet:
  `visuals/99-review/contact-sheets/dialogue-panel-blank--v01-alpha-qa.png`
- Paired review:
  `visuals/99-review/contact-sheets/v020-v021-dialogue-about-approval-set-v01.png`
- Status: owner-approved and promoted byte-identically
- Approved output:
  `visuals/05-physical-ui/dialogue-panel/approved/dialogue-panel-blank--v01--approved.png`

## Exact generation prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft painted
shading. A cozy, cluttered, lived-in office rendered in muted warm browns,
mustard yellows, and cream, lit by late-afternoon interior light and the green
glow of a banker's lamp, with cool grey-blue rainy daylight coming through the
window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Create exactly one standalone BLANK DIALOGUE PANEL SKIN as a production asset
for this same illustrated office portfolio. Image 1 is the exact office palette,
lighting, perspective, ink weight, paper, walnut wood, and brass material
authority. Images 2 and 3 lock the illustration language and color discipline
only; do not include the duck or any character.

The panel must feel like a real handcrafted office object, never a browser
window, app panel, speech bubble, comic balloon, game HUD, or modern interface.
Design a low, wide horizontal tabletop message plaque: a generous warm-cream
aged-paper writing surface inset into a slim worn dark-walnut frame, with only
four tiny round aged-brass corner fasteners. Use a simple readable silhouette,
softly irregular hand-drawn edges, near-black warm ink outlines, subtle wood
grain, restrained painted wear, and gentle late-afternoon shading. Show it
almost front-facing with only the slightest top-down desk perspective, so later
accessible DOM dialogue can align cleanly over the blank paper. Aspect of the
whole object about 2.7:1. The central paper area must occupy at least 78% of the
panel width and at least 58% of its height, remain calm and evenly lit, and
contain absolutely nothing.

The entire paper surface and frame must contain no text, letters, numbers,
punctuation, quotation marks, icons, portraits, logos, labels, ruled lines,
boxes, dividers, buttons, controls, close marks, arrows, symbols, pseudo-writing,
scribbles, or stains resembling marks. No character, hand, duck, desk, stand,
legs, shelf, extra paper, props, or second object.

Center the single complete plaque large on a perfectly flat uniform pure
chroma-key green background #00FF00, with generous clean margin on all sides.
No cast shadow, reflection, floor, horizon, vignette, background texture,
gradient, green glow, watermark, or cropped edge. Preserve the complete
silhouette and keep green entirely off the object.

## Generation and processing record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-98aaea24-28f7-4d3f-b0c1-75ce25fe7aa6.png`
- Chroma source:
  `visuals/05-physical-ui/dialogue-panel/drafts/dialogue-panel-blank--v01-chroma-source.png`
- Processing script: `tmp/imagegen/prepare_dialogue_about_assets.py`
- Output: 3000×1200 RGBA; alpha bbox `(85,174)–(2915,1025)`.
- Alpha has 256 levels, transparent corners, zero RGB under alpha zero, and
  zero materially green-dominant pixels.
- Central paper median matched from `#F1CE96` to `#D6B284`, aligned to the
  approved warm-paper family.
- The paper surface is completely blank and has a large near-front-facing
  DOM-safe region. Office-scale QA keeps Swan unobstructed.
- SHA-256:
  - chroma source: `D07735B61334AFEE9AF95C331B88623CC6BD605950F8DD50A62AEF0C8BFE5CC4`
  - RGBA candidate: `BE487D85276AAF75125EE62D58DC81951968ED298F327AA387B334012531C2EF`
  - alpha QA: `2BEE4EE339D775C99BD2AC7996A141D5137D380308BC74D94521D6091A7EB716`
  - paired review: `B08F994B18F7C2B0608BC79FC49F7A24B371288EF47BED1AE60F88BA4687573D`

## Review result

Internal composition, blankness, transparency, spill, paper-palette,
small-scale readability, and scene-integration checks passed. Owner approved
the paired review on 2026-07-19; the approved file is byte-identical to the
reviewed candidate.
