# V-004A — Swan head rig-component atlas, candidate 1

- Use case: `identity-preserve`
- Asset type: layered character-animation head component source atlas
- Input references:
  - Image 1: `visuals/00-references/canonical/ref-01-master-scene.png`, approved
    world/style context
  - Image 2: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    definitive pose, bill, eye, brow, identity, and costume reference
  - Image 3: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    definitive acting and expression reference
- Intended working frame: 4:3 landscape, invisible 4-column × 3-row atlas
- Chroma source destination:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v01-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v01.png`
- Status: rejected after independent rig-registration QA; superseded by candidate 2

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

Use case: identity-preserve.
Asset type: layered character-animation head component source atlas.
Input images: Image 1 is the approved office style context. Image 2 is the
definitive Swan identity, three-quarter orientation, facial spacing, bill, eye,
brow, palette, outline, and shading reference. Image 3 is the definitive acting
reference. None is an edit target. Generate production components for the exact
same original Swan; do not redesign or reinterpret him.

Create one 4:3 landscape puppet-component atlas using an invisible 4-column by
3-row grid. Place exactly one clean component group in each of the twelve
positions. Use a
perfectly flat, uniform solid #00ff00 chroma-key background across the entire
canvas for local background removal. The background must contain no shadows,
gradients, texture, floor plane, reflections, lighting variation, cream halo,
or painted vignette. Do not use #00ff00 anywhere inside any component.

Use generous clear padding around every component. No component may touch,
overlap, cast a shadow on, or bleed into another position. Draw no grid lines,
boxes, labels, letters, numbers, arrows, captions, swatches, registration marks,
symbols, or pseudo-writing.

Identity invariants: preserve Swan's exact screen-left three-quarter head
orientation from Image 2; long broad gently upturned warm-orange bill; nostril
placement; bill-to-head proportions; eye spacing; heavy upper lids; swept crown
tuft cluster; cheek feathers; slim neck; warm-white feather color; warm
near-black outline weight; and soft painted shading. No glasses. Never mirror
the parts. All component geometry must align back into the complete neutral
control head without scaling or redesign. Cell 1 is an assembly and registration
witness only, never a runtime layer. Every state component shares its exact
scale, three-quarter angle, light direction, and anchor coordinates.

Cell map, read left to right:

Row 1:
1. Complete neutral control head and neck only, assembled exactly like Image 2:
   bill closed, half-lidded eyes, relaxed brows, slight resting smile. No suit,
   collar, tie, wing, prop, or body.
2. Matching feather head-and-neck base layer for puppet assembly. Preserve the
   exact outer head, crown tuft, cheek, and neck silhouette from cell 1, but use
   smooth warm-white feather-colored attachment areas where the bill, eyes, and
   brows will be layered later. No dark sockets, cavities, marks, scars, or
   extra facial features. Extend the cream-feather neck base 15–20% beneath the
   visible collar line so the body layer can overlap it without a gap.
3. Upper bill component only, closed-position geometry, matching cell 1's exact
   three-quarter angle, length, upturn, nostrils, orange shading, and outline.
   Include 12–15% hidden hinge overlap behind the visible bill edge.
4. Lower bill component only, matching cell 1's exact three-quarter angle,
   orange shading, hinge width, smile corner, and outline. Include 12–15% hidden
   hinge overlap beneath the upper bill so rotation never reveals a gap.

Row 2:
5. Fully open wide-alert eye pair only, maintaining exact left/right spacing and
   three-quarter perspective; whites, pupils, and lids grouped together, with no
   eyebrows baked in. Keep the two eyes disconnected with a clear green moat.
6. Relaxed half-lidded eye pair only, matching the approved default expression.
   Keep the two eyes disconnected with a clear green moat and no eyebrows.
7. Fully closed eye pair only, clean painted eyelid strokes with no visible
   pupils or eyebrows; keep the left and right lids disconnected with green
   space between them.
8. Relaxed neutral eyebrow pair only, two separate aligned warm-dark brow
   shapes with exact approved spacing and a clear green moat between them.

Row 3:
9. Clearly raised eyebrow pair only, two fully disconnected aligned brow shapes
   with green space between them.
10. Gently lowered inward focused eyebrow pair only, two separate aligned brow
    shapes with green space between them.
11. Skeptical eyebrow pair only, one brow subtly raised and the other relaxed,
    preserving exact alignment and keeping both brows fully disconnected.
12. Inner-mouth backplate only for the open-bill rig: one clean warm dark-brown
    mouth-interior shape matching the exact three-quarter bill opening, with a
    restrained muted-orange inner surface, 12–15% hidden overlap beneath both
    bill pieces, and no teeth, lettering, or extra facial feature.

Every isolated part must look like the matching painted production layer from
the approved Swan, not a diagram, icon, sticker, toy, medical image, or new
character. Preserve feather #F5F0E4, bill #E8963C, and warm near-black #241A12.
Use crisp antialiased ink edges with no cast shadow, contact shadow, reflection,
glow, blur, color fringe, or watermark. No office environment, scenery, suit,
hands, props, extra heads, extra facial parts, typography, or decoration.
Generate at maximum available landscape resolution with clean silhouettes for
local chroma-key removal and later puppet-layer preparation.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, and despill. Validate transparent corners, alpha channel, component
coverage, and green-fringe absence before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-4f77c504-d951-461e-9443-2273c0f5a2d9.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/head-atlas/drafts/duck-rig-head-atlas--v01-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/head-atlas/alpha/duck-rig-head-atlas--v01.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: all four corner alpha values are 0; alpha bounding box is
  `(61, 30, 1370, 958)`; 1,365,447 fully transparent, 9,531 partially
  transparent, and 197,550 opaque pixels; 0 green-dominant pixels remain where
  alpha is greater than 16.
- Review result: visual and alpha pass, but rig-readiness fail. The twelve
  requested groups are present and clean; however, the isolated eye and brow
  pairs are enlarged and shifted relative to the assembled control head. They
  cannot be translated into place without manual rescaling, contrary to the
  exact-scale registration requirement.
- Single requested revision: preserve all accepted content while regenerating
  cells 5–11 at the control head's true on-head scale and shared tile-local
  registration coordinates.
