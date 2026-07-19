# V-004A — Swan head rig-component atlas, candidate 3

- Use case: `precise-object-edit`
- Asset type: final scale-correction pass on the head component source atlas
- Input references:
  - Image 1:
    `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v02-chroma.png`,
    sole edit target
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v03-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v03.png`
- Status: rejected after measured component-scale QA; superseded by candidate 4

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
immutable canonical identity references. Perform one controlled scale and
spacing correction on Image 1. Keep the exact 1448×1086 4:3 canvas, the flat
full-bleed #00ff00 background, the invisible four-column by three-row reading
order, and exactly the same twelve component groups. Do not redesign or add
anything.

Preserve the shape, painting, orientation, and identity of every existing
component. Make only these relative size corrections around each component's
own center:

- Positions 1 and 2, the complete control head and featureless head shell:
  reduce uniformly to about 88% of their current size and move slightly upward
  so their complete feather and neck silhouettes sit wholly inside the top
  third with clear green below. They remain equal in outer-head scale.
- Positions 5–7, the three isolated eye pairs: reduce uniformly to about 68% of
  their current size. Do not enlarge or spread the eyes afterward. At final
  size, each individual eye must be the same width and height as its matching
  eye on the control head in position 1, and the left/right center distance must
  match the control head.
- Positions 8–11, the four isolated eyebrow pairs: reduce uniformly to about
  52% of their current size. Do not enlarge or spread the brows afterward. At
  final size, each individual brow must be the same width, thickness, and curve
  length as its matching brow on the control head in position 1, and the
  left/right center distance must match the control head.
- Positions 3, 4, and 12, the upper bill, lower bill, and mouth backplate:
  preserve their current shape, scale, and painting exactly.

After scaling, center every component group within its own conceptual tile.
Every alpha silhouette must have a broad uninterrupted green moat and must stay
at least 5% of one tile width or height away from every tile boundary. Nothing
may cross from the top third into the middle third or from the middle third into
the bottom third. Nothing may cross a column boundary. Do not use the empty
space to make any small feature visually prominent.

This is production registration art, not a presentation sheet. Small eye and
brow pieces are intentionally small. If a corrected eye or brow state is moved
onto the control head using translation only, with no scaling, it must fit the
face naturally. Keep paired eyes and paired brows internally separated by a
clear green moat so left and right pieces remain independently extractable.

Retain Swan's exact warm-white feather texture, orange bill, pupils, heavy upper
lids, warm-dark brow texture, warm near-black outlines, and soft painted
shading. No glasses. Never mirror a component. No extra head, eye, brow, bill,
mouth, suit, body, wing, hand, prop, office scenery, grid line, box, label,
letter, number, arrow, caption, swatch, registration mark, symbol,
pseudo-writing, or watermark.

The background remains perfectly uniform solid #00ff00 with no shadow,
gradient, texture, reflection, floor plane, green rim light, cream halo, or
vignette. Do not use #00ff00 inside any component. Preserve crisp fully enclosed
antialiased ink edges with no cast shadow, contact shadow, glow, blur, or green
fringe. Return the corrected atlas at maximum available landscape resolution.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, spill cleanup, and despill. Validate all four transparent corners,
tile-boundary clearance, green-fringe absence, and no-scale feature fit against
the control head before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-eee837aa-e670-493f-a10c-2e6d5b410af5.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v03-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v03.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: passed; transparent corners and 0 green-dominant pixels at
  alpha greater than 16.
- Registration validation: failed. Eyes became plausible at 1:1, but isolated
  brows remained about 1.5–2× too large; the retained bill components were also
  oversized relative to the newly reduced control head.
- Review result: rejected as a no-rescale rig source.
- Single requested revision: correct top-row clearance and bill/mouth scale
  while preserving the accepted eye scale.
