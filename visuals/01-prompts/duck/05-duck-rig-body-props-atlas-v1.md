# V-004B — Swan body, wing, and prop rig atlas, candidate 1

- Use case: `identity-preserve`
- Asset type: layered character-animation body and prop component source atlas
- Input references:
  - Image 1: `visuals/00-references/canonical/ref-01-master-scene.png`, approved
    world, costume, prop, and lighting context
  - Image 2: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    definitive Swan proportions, seated pose, wing anatomy, newspaper, and suit
  - Image 3: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    definitive coffee, pipe, and acting reference
- Intended working frame: 4:3 landscape, invisible 4-column × 3-row atlas
- Chroma source destination:
  `visuals/03-duck/rig-parts/body-props-atlas/drafts/duck-rig-body-props-atlas--v01-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/body-props-atlas/alpha/duck-rig-body-props-atlas--v01.png`
- Status: generation rejected by output safety filter; no image produced

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
Asset type: layered character-animation body, wing, and prop component source
atlas.
Input images: Image 1 supplies the approved office rendering, suit material,
coffee mug, pipe, and lighting context. Image 2 is the definitive Swan seated
body proportion, wing anatomy, suit, tie, newspaper, and three-quarter pose
reference. Image 3 is the definitive coffee, pipe, and acting reference. None
is an edit target. Generate production components for the exact same original
Swan; do not redesign or reinterpret him.

Create one 4:3 landscape puppet-component atlas using an invisible 4-column by
3-row grid. Place exactly one requested component group in each of the twelve
positions. Use a perfectly flat, uniform full-bleed solid #00ff00 chroma-key
background for local removal. The background must contain no shadows,
gradients, texture, floor plane, reflections, green rim lighting, lighting
variation, cream halo, or painted vignette. Do not use #00ff00 anywhere inside
any component.

Give every component generous padding and a clear green moat. No component may
touch, overlap, cast a shadow on, or bleed into another position. Draw no grid
lines, boxes, labels, letters, numbers, arrows, captions, swatches,
registration marks, symbols, pseudo-writing, or watermark.

Identity and registration invariants: preserve Swan's exact seated
screen-left three-quarter orientation, torso proportions, shoulder width,
deep-brown notch-lapel matte suit, cream shirt, loose brown tie, white
feather-wings, warm near-black outlines, and painted shading from Images 1–3.
No glasses. Never mirror a part. Cell 1 is an assembly witness only, not a
runtime layer. Every swappable arm, hand, and prop must share the witness's
exact scale, light direction, shoulder pivots, cuff anchors, and perspective.
Provide 15–20% hidden underlap at every shoulder or cuff joint.

Cell map, read left to right:

Row 1:
1. Complete assembled neutral seated upper-body witness through the jacket hem:
   approved neutral Swan head, suit, tie, and both relaxed wings, with no
   newspaper, mug, or pipe. Registration reference only.
2. Clean torso/body base only: deep-brown suit, lapels, cream shirt, loose tie,
   shoulders, and upper sleeve bases. No head, neck feathers, forearms, hands,
   newspaper, mug, or pipe. Preserve complete shoulder contours and include
   clean hidden overlap zones for the separate head and forearm layers.
3. One completely blank open newspaper only, matching the approved reading
   prop's fold, perspective, warm paper color, size, and outline. No hands.
4. Two standalone props in one component group: one plain warm-cream ceramic
   coffee mug and one small unlit brown wooden pipe, separated widely by a
   clear green moat. Both match Image 3. The mug contains visible dark coffee
   but has no steam, spill, saucer, logo, mark, or text. The pipe has no ember,
   smoke, ash, flame, or vapor.

Row 2:
5. Swan's screen-left reading-grip feather hand only, matching the raised
   newspaper pose. Include a long clean brown cuff underlap but no full sleeve.
6. Swan's screen-right reading-grip feather hand only, matching the raised
   newspaper pose. Include a long clean brown cuff underlap but no full sleeve.
7. Swan's screen-left relaxed feather hand only for the neutral seated pose,
   with a clean brown cuff underlap.
8. Swan's screen-right relaxed feather hand only for the neutral seated pose,
   with a clean brown cuff underlap.

The reading hands in cells 5 and 6 must remain independent foreground layers.
They do not include newspaper pixels or full sleeves. Intended stacking is
body and sleeves behind, then newspaper, then the two reading hands in front.

Row 3:
9. One complete presenting forearm swap: brown suit sleeve, cream cuff, and
   white feather-wing making the approved small welcoming gesture. Preserve the
   exact shoulder pivot and include hidden shoulder underlap.
10. One complete coffee-holding forearm composite: brown suit sleeve, cream
    cuff, white feather-wing, and the same blank cream mug held in the approved
    sipping position. Preserve the exact shoulder pivot and keep the mug edge
    cleanly separated from the wing except at the natural grip.
11. One complete pipe-adjusting forearm composite: brown suit sleeve, cream
    cuff, white feather-wing, and the same unlit brown pipe held beside the bill
    position. Preserve the exact shoulder pivot. The pipe remains a removable
    prop, with no smoke or ember.
12. One neutral alternate forearm swap: brown suit sleeve, cream cuff, and
    relaxed white feather-wing with a distinct clean silhouette for idle motion,
    exact shoulder pivot, and hidden shoulder underlap.

All wings remain the approved stylized white feather-wings, never human skin or
gloves. The newspaper is completely blank: no headline, columns, rules,
pictures, icons, letters, numbers, marks, or pseudo-writing. Every part must
look like the matching painted production layer from approved Swan, not an
icon, sticker, toy, diagram, or alternate character. Preserve feathers
#F5F0E4, suit #4A3524, bill/prop warmth, paper #EFE6D0, and warm near-black
#241A12. Use fully enclosed crisp antialiased ink edges with no cast shadow,
contact shadow, reflection, glow, blur, green fringe, or watermark. No office
environment, scenery, desk, chair, extra body, extra limb, extra prop,
typography, or decoration. Generate at maximum available landscape resolution
for local chroma-key removal and later puppet-layer preparation.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, and despill. Validate transparent corners, alpha channel, component
coverage, and green-fringe absence before approval.

## Review record

- Attempted date: 2026-07-18
- Built-in output path: none
- Workspace chroma source: none
- Workspace alpha output: none
- Dimensions: none
- Alpha validation: not applicable
- Review result: output rejected by the built-in safety filter before delivery;
  no candidate exists.
- Single requested revision: replace detached costume/wing components with
  complete upper-body action poses and standalone props, then segment them
  deterministically during rig preparation.
