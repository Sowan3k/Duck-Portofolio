# V-004A — Swan head rig-component atlas, candidate 2

- Use case: `precise-object-edit`
- Asset type: registration-corrected layered character-animation head source
  atlas
- Input references:
  - Image 1:
    `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v01-chroma.png`,
    sole edit target
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`, approved
    world/style context
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    definitive Swan identity, bill, eye, brow, and proportion reference
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    definitive acting and expression reference
- Intended working frame: retain the exact 4:3 landscape, invisible 4-column ×
  3-row atlas
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v02-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v02.png`
- Status: rejected after measured registration QA; superseded by candidate 3

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

Use case: precise-object-edit.
Asset type: registration-corrected character-animation head component source
atlas. Image 1 is the sole edit target. Images 2–4 are immutable canonical
references for Swan's exact identity, rendering, proportions, and acting
language. Retain Image 1's exact 4:3 canvas, flat green background, invisible
4-column by 3-row layout, component count, order, and generous padding.

Correct only the scale and tile-local registration of the isolated eye and brow
groups in positions 5–11. Preserve positions 1–4 and 12 in their current
identity, shape, scale, orientation, shading, and position: complete neutral
control head, featureless head-and-neck shell, upper bill, lower bill, and
inner-mouth backplate. Do not redesign, replace, rotate, mirror, crop, or enlarge
those accepted groups.

Treat every invisible tile as exactly one quarter of the canvas width and one
third of the canvas height. Each eye or brow state must use the same local
origin, exact feature scale, left/right spacing, three-quarter perspective, and
anchor coordinates as the matching features on the complete neutral control
head in position 1. If any state is copied into position 1 using tile-origin
translation only, with no rescaling, rotation, or distortion, it must land
correctly on Swan's face.

Do not enlarge small features to fill their tiles. This is the central
correction. For each eye pair in positions 5–7, the complete left-and-right pair
occupies only about 30–34% of its tile width and 25–29% of its tile height,
matching the eyes on the control head. For each brow pair in positions 8–11,
the complete two-brow group occupies only about 30–34% of its tile width and no
more than 10–12% of its tile height, matching the brows on the control head.
Leave the remaining tile area as uninterrupted green moat. The midpoint between
left and right features must sit at the same tile-local coordinate in every
state.

Retain the exact cell map, read left to right:

Row 1:
1. Complete neutral control head and neck, unchanged.
2. Featureless feather head-and-neck shell, unchanged.
3. Upper bill with hidden hinge overlap, unchanged.
4. Lower bill with hidden hinge overlap, unchanged.

Row 2:
5. Wide-alert eye pair at true control-head scale and registration.
6. Relaxed half-lidded eye pair at true control-head scale and registration.
7. Fully closed eye pair at true control-head scale and registration.
8. Relaxed neutral eyebrow pair at true control-head scale and registration.

Row 3:
9. Raised eyebrow pair at true control-head scale and registration.
10. Focused lowered-inward eyebrow pair at true control-head scale and
    registration.
11. Skeptical asymmetric eyebrow pair at true control-head scale and
    registration.
12. Inner-mouth backplate, unchanged.

Keep the two eyes and the two brows in every pair fully disconnected with a
clear green moat. Preserve the same warm-white feather texture, eye shapes,
pupils, heavy upper lids, warm-dark brow texture, warm near-black ink, and soft
painted shading from Image 1 and the canonical Swan. No glasses. Never mirror
the parts. No extra feature, socket, head, suit, body, wing, hand, prop, office
scenery, grid line, box, label, letter, number, arrow, caption, swatch,
registration mark, symbol, pseudo-writing, or watermark.

The full canvas background remains a perfectly flat, uniform, full-bleed solid
#00ff00 chroma key with no shadow, gradient, texture, floor, reflection, green
rim light, cream halo, or vignette. Do not use #00ff00 inside any component.
Use fully enclosed crisp antialiased ink edges with no cast shadow, contact
shadow, reflection, glow, blur, or green fringe. Retain maximum available
landscape resolution for local chroma-key removal and puppet-layer preparation.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, spill cleanup, and despill. Validate transparent corners, alpha
channel, component coverage, green-fringe absence, and visual feature-scale
registration against the position-1 control head before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-6f60f12f-d5e4-4262-a753-a14fcac4bdb4.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v02-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v02.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: passed; transparent corners and 0 green-dominant pixels at
  alpha greater than 16.
- Registration validation: failed. Eye groups remained 43–48% of tile width,
  brow groups 52–59%, and the two top heads crossed the conceptual row boundary.
- Review result: rejected as a no-rescale rig source.
- Single requested revision: stronger relative shrinking and tile clearance.
