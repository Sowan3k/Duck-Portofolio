# V-004B — Swan upper-body action and prop atlas, candidate 2

- Use case: `identity-preserve`
- Asset type: character-animation upper-body action and prop source atlas
- Input references:
  - Image 1: `visuals/00-references/canonical/ref-01-master-scene.png`, approved
    world, costume, prop, and lighting context
  - Image 2: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    definitive Swan proportions, seated poses, wing anatomy, newspaper, and suit
  - Image 3: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    definitive coffee, pipe, and acting reference
- Intended working frame: 4:3 landscape, invisible 4-column × 3-row atlas
- Chroma source destination:
  `visuals/03-duck/rig-parts/body-props-atlas/drafts/duck-rig-body-actions--v02-chroma.png`
- Alpha destination after local background removal:
  `visuals/03-duck/rig-parts/body-props-atlas/alpha/duck-rig-body-actions--v02.png`
- Status: owner-approved V-004B production source

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
Asset type: character-animation upper-body action and prop source atlas.
Input images: Image 1 supplies the approved office rendering, suit material,
coffee mug, pipe, and lighting context. Image 2 is the definitive Swan seated
body proportion, wing anatomy, suit, tie, newspaper, and three-quarter pose
reference. Image 3 is the definitive coffee, pipe, and acting reference. None
is an edit target. Generate the exact same original Swan; do not redesign or
reinterpret him.

Create one 4:3 landscape animation-source atlas using an invisible 4-column by
3-row grid. Use exactly eight complete seated upper-body Swan figures in the
first eight positions, exactly three standalone props in positions 9–11, and
leave position 12 completely empty. Use a perfectly flat, uniform full-bleed
solid #00ff00 chroma-key background for local removal. The background must have
no shadows, gradients, texture, floor plane, reflections, green rim lighting,
lighting variation, cream halo, or vignette. Do not use #00ff00 anywhere in
Swan, his clothing, or the props.

Give every figure and prop generous padding with clear green space around it.
No figure or prop may touch, overlap, cast a shadow on, or bleed into another
position. Draw no grid lines, boxes, labels, letters, numbers, arrows, captions,
swatches, registration marks, symbols, pseudo-writing, or watermark.

Identity invariants across all eight figures: preserve Swan's exact seated
screen-left three-quarter orientation, head and torso proportions, long broad
orange bill, eye spacing, crown tuft, warm-white feathers, deep-brown
notch-lapel matte suit, cream shirt, loose brown tie, white feather-wings, warm
near-black outline weight, and soft painted shading from Images 1–3. No
glasses. Never mirror him. Use the same crop, scale, jacket hem, shoulder
position, light direction, and character identity in every figure. Except for
the named wing, prop, or gaze change, keep the rest of the pose stable.

Cell map, read left to right:

Row 1:
1. Neutral seated upper body, bill closed, half-lidded eyes, relaxed brows,
   slight resting smile, both white feather-wings relaxed and clearly visible,
   no props.
2. Reading pose with one completely blank open newspaper raised at comfortable
   reading height, both wings gripping it naturally, eyes lowered to the page.
3. Same newspaper, fold, and grip lowered to chest or desk height so the loose
   tie is fully visible; eyes look toward the visitor.
4. No prop; one white feather-wing makes the approved small welcoming gesture
   while the other remains relaxed.

Row 2:
5. No prop; the opposite white feather-wing makes a restrained presenting
   gesture while the other remains relaxed.
6. Coffee action: one white feather-wing holds the approved plain cream ceramic
   mug naturally at the bill in the sipping pose; half-lidded content eyes.
7. Pipe action: one white feather-wing holds and adjusts the approved small
   unlit brown wooden pipe beside the bill; the pipe is removable, with no smoke
   or ember.
8. Clean separation pose: neutral face, both white feather-wings held slightly
   away from the torso with distinct silhouettes, no props, suitable for later
   deterministic wing and body segmentation.

Row 3:
9. One standalone completely blank open newspaper only, matching cells 2 and 3
   in fold, scale, perspective, warm paper, outline, and shading. No hands.
10. One standalone plain warm-cream ceramic coffee mug only, matching cell 6,
    containing visible dark coffee but no steam, spill, saucer, logo, mark, or
    text.
11. One standalone small unlit brown wooden pipe only, matching cell 7, with no
    ember, smoke, ash, flame, or vapor.
12. Leave this entire position empty solid #00ff00 with no figure, prop, shadow,
    mark, artifact, or bleed.

All wings remain the approved stylized white feather-wings, never human skin or
gloves. Every newspaper surface is completely blank: no headline, columns,
rules, pictures, icons, letters, numbers, marks, or pseudo-writing. Every figure
and prop must look like the matching painted production source from approved
Swan, not an icon, sticker, toy, diagram, or alternate character. Preserve
feathers #F5F0E4, suit #4A3524, paper #EFE6D0, and warm near-black #241A12.
Use fully enclosed crisp antialiased ink edges with no cast shadow, contact
shadow, reflection, glow, blur, green fringe, or watermark. No office
environment, scenery, desk, chair, extra character, extra wing, extra prop,
typography, or decoration. Generate at maximum available landscape resolution
for local chroma-key removal and later puppet-layer preparation.

## Local alpha conversion

Run the installed `remove_chroma_key.py` helper with border auto-key sampling,
soft matte, and despill. Validate transparent corners, alpha channel, component
coverage, and green-fringe absence before approval.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-07f0546c-1b48-454c-976c-f226d35c8d64.png`
- Workspace chroma source:
  `visuals/03-duck/rig-parts/body-props-atlas/drafts/duck-rig-body-actions--v02-chroma.png`
- Workspace alpha output:
  `visuals/03-duck/rig-parts/body-props-atlas/alpha/duck-rig-body-actions--v02.png`
- Dimensions: 1448×1086 RGBA
- Alpha validation: all four corner alpha values are 0; alpha bounding box is
  `(21, 46, 1398, 1019)`; 1,027,371 fully transparent, 18,129 partially
  transparent, and 527,028 opaque pixels; 0 green-dominant pixels remain where
  alpha is greater than 16.
- Review result: candidate pass. All eight upper-body action states, the three
  matching standalone props, and the empty twelfth position are present; no
  text or scenery was introduced; cream, dark, and checkerboard composites show
  clean feather, suit, paper, ceramic, and pipe edges with no material spill.
- Single requested revision: none; owner approved on 2026-07-18.
