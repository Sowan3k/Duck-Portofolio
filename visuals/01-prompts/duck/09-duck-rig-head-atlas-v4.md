# V-004A — Swan head rig-component atlas, candidate 4

- Use case: `precise-object-edit`
- Asset type: bill-scale and top-row clearance correction on candidate 3
- Input references:
  - Image 1:
    `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v03-chroma.png`,
    sole edit target
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v04-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v04.png`
- Status: rejected after measured brow-scale QA; superseded by candidate 5

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
immutable canonical identity references. Perform only the following final
scale and clearance corrections. Preserve the exact 1448×1086 canvas, flat
full-bleed #00ff00 background, invisible four-column by three-row reading
order, twelve component groups, Swan identity, painting, color, orientation,
and all accepted feature shapes.

1. Move the complete control head in position 1 and the featureless head shell
   in position 2 upward by roughly 40 pixels without changing their current
   scale, silhouette, or painting. Their full neck feather tips must finish
   above the first-third boundary with a clear green moat below.
2. Reduce the isolated upper bill in position 3 and isolated lower bill in
   position 4 uniformly to about 78% of their current size around their own
   centers. They must match the exact visible bill scale on the control head in
   position 1 without later rescaling. Preserve hinge underlap, nostrils,
   smile-corner geometry, orange shading, and ink outlines.
3. Reduce the inner-mouth backplate in position 12 uniformly to about 78% of
   its current size around its own center so it matches the corrected bill
   pieces without later rescaling. Preserve its warm dark-brown cavity and
   muted-orange inner surface.
4. Preserve positions 5–11—the corrected open, half-lidded, and closed eye
   pairs plus neutral, raised, focused, and skeptical brow pairs—at exactly
   their current candidate-3 scale and shape. Do not enlarge, shrink, spread,
   redesign, or replace them. They are intentionally small production pieces.

Keep generous uninterrupted green separation between every silhouette. No
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
component separation, green-fringe absence, top-row clearance, and no-scale
feature/bill fit against the control head before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-6246a5ad-cc7a-4eac-a71e-858fde790642.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v04-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v04.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: passed; transparent corners and 0 green-dominant pixels at
  alpha greater than 16.
- Registration validation: partial pass. Eyes, bills, mouth, top-row clearance,
  separation, identity, and alpha passed; isolated brows remained oversized.
- Review result: rejected as a no-rescale rig source.
- Single requested revision: shrink only the four isolated brow pairs.
