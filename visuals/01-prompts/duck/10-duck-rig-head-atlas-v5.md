# V-004A — Swan head rig-component atlas, candidate 5

- Use case: `precise-object-edit`
- Asset type: isolated brow-scale correction on candidate 4
- Input references:
  - Image 1:
    `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v04-chroma.png`,
    sole edit target
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v05-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v05.png`
- Status: rejected after measured brow-scale QA; superseded by candidate 6

## Exact prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft
painted shading. A cozy, cluttered, lived-in office rendered in muted warm
browns, mustard yellows, and cream, lit by late-afternoon interior light
and the green glow of a banker's lamp, with cool grey-blue rainy daylight
coming through the window. Slightly exaggerated cartoon proportions,
hand-drawn charm, gentle texture, no gradients that look digital. Every
paper, sign, sticky note, book spine, newspaper, whiteboard, and label is
completely blank with no text, no letters, no symbols anywhere in the
image.

Use case: precise-object-edit. Image 1 is the sole edit target. Images 2–4 are
immutable canonical identity references. Perform exactly one correction:
uniformly reduce each isolated eyebrow pair in positions 8, 9, 10, and 11 to
about 50% of its current candidate-4 size around its own center. Preserve each
brow's existing curve, asymmetry, texture, warm-dark color, outline, painting,
left/right separation, and state identity. Do not spread or enlarge the brows
after shrinking. At final size, each individual isolated brow must be the same
width, thickness, and curve length as the matching brow on the complete control
head in position 1, with no later rescaling required.

Freeze every other accepted component exactly as it appears in Image 1. Do not
change the complete control head, featureless head shell, upper bill, lower
bill, wide-open eyes, half-lidded eyes, closed lids, or mouth backplate. Preserve
their current scale, silhouette, position, orientation, color, shading, and
identity. Keep the exact 1448×1086 canvas, flat full-bleed #00ff00 background,
invisible four-column by three-row reading order, and exactly twelve component
groups.

Maintain generous uninterrupted green separation around every silhouette. No
component may touch or overlap another. Retain Swan's exact warm-white feather
texture, orange bill, pupils, heavy upper lids, warm-dark brows, warm near-black
ink, and soft painted shading. No glasses. Never mirror a component. No extra
head, eye, brow, bill, mouth, suit, body, wing, hand, prop, office scenery, grid
line, box, label, letter, number, arrow, caption, swatch, symbol,
pseudo-writing, or watermark.

The background remains perfectly uniform solid #00ff00 with no shadow,
gradient, texture, reflection, floor plane, green rim light, cream halo, or
vignette. Do not use #00ff00 inside any component. Preserve crisp fully enclosed
antialiased ink edges with no cast shadow, contact shadow, glow, blur, or green
fringe. Return the corrected atlas at maximum available landscape resolution.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, spill cleanup, and despill. Validate all four transparent corners,
component separation, green-fringe absence, and 1:1 brow fit against the
control head before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-d7284336-e9ae-4ee6-baec-3c545f8325a7.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v05-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v05.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: passed; transparent corners and 0 green-dominant pixels at
  alpha greater than 16.
- Registration validation: failed only on brows. Control brows measured about
  20–25 px wide while isolated brows remained 34–54 px wide.
- Review result: rejected as a no-rescale rig source.
- Single requested revision: set isolated brow widths explicitly to 20–26 px.
