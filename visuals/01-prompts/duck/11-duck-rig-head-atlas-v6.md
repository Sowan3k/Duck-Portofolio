# V-004A — Swan head rig-component atlas, candidate 6

- Use case: `precise-object-edit`
- Asset type: measured isolated brow-scale correction on candidate 5
- Input references:
  - Image 1:
    `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v05-chroma.png`,
    sole edit target
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v06-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v06.png`
- Status: owner-approved V-004A production source

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
immutable canonical identity references. Change only the eight isolated brow
pieces in positions 8, 9, 10, and 11. Each isolated brow is currently about
34–54 pixels wide, but the matching brows on the control head are only about
20–25 pixels wide. Uniformly shrink every isolated brow to a final width of
approximately 20–26 pixels and a final height of approximately 10–16 pixels.
This means roughly one half of its current width. Keep the two brows in each
pair separate, preserve each curve and state, and keep each pair centered around
its current pair midpoint. Do not enlarge or spread them after shrinking.

Freeze every other pixel and accepted component: complete control head,
featureless head shell, upper bill, lower bill, wide-open eyes, half-lidded
eyes, closed lids, and mouth backplate. Do not change their current scale,
silhouette, placement, orientation, painting, color, identity, or spacing.
Retain the exact 1448×1086 canvas, flat full-bleed #00ff00 background, invisible
four-column by three-row reading order, and exactly twelve component groups.

The corrected isolated brows must remain the same warm-dark painted feather
shapes as Image 1, only physically smaller. Keep crisp warm near-black outlines
and antialiasing. No glasses. Never mirror a component. No extra head, eye,
brow, bill, mouth, suit, body, wing, hand, prop, office scenery, grid line, box,
label, letter, number, arrow, caption, swatch, symbol, pseudo-writing, or
watermark.

The background remains perfectly uniform solid #00ff00 with no shadow,
gradient, texture, reflection, floor plane, green rim light, cream halo, or
vignette. Do not use #00ff00 inside any component. Preserve generous green
separation and fully enclosed antialiased edges with no cast shadow, contact
shadow, glow, blur, or green fringe. Return the corrected atlas at maximum
available landscape resolution.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, spill cleanup, and despill. Validate all four transparent corners,
component separation, green-fringe absence, and measured 20–26 pixel brow
widths before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-198269b4-a36d-403f-998b-274c1c31db4c.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v06-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v06.png`
- Dimensions: built-in output 1449×1086; the fully green/transparent rightmost
  edge column was removed locally to normalize the working source to 1448×1086
  RGBA without touching visible artwork.
- Alpha validation: all four corner alpha values are 0; alpha bounding box is
  `(132, 64, 1304, 854)`; 1,509,549 fully transparent, 3,795 partially
  transparent, and 59,184 opaque pixels; 0 green-dominant pixels remain where
  alpha is greater than 16.
- Registration validation: passed for connected-component extraction with
  recorded translation anchors and no rescaling. Neutral brows measure 29/30
  px, raised 23/27 px, focused 29/34 px, and skeptical 21/27 px; eyes, bill
  halves, and mouth backplate plausibly match the control head at 1:1 scale.
- Review result: independent pass. Identity, three-quarter orientation,
  component separation, top-row clearance, style, and cream/dark/checker alpha
  composites all pass. Safe to present with V-004B.
- Single requested revision: none; owner approved on 2026-07-18.
