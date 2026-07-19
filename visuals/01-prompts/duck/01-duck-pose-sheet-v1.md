# V-002 — Swan pose sheet, candidate 1

- Use case: `identity-preserve`
- Asset type: canonical character pose and rig reference sheet
- Input references: Image 1 is
  `visuals/00-references/canonical/ref-01-master-scene.png`, the approved master
  office scene and character/style anchor; it is not an edit target
- Intended working frame: 4:3 landscape, 4-column × 3-row unlabeled grid
- Output destination after generation:
  `visuals/03-duck/pose-sheet/drafts/duck-pose-sheet--v01.png`
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
Asset type: canonical Swan character pose and rig reference sheet.
Input images: Image 1 is the approved master office scene and the sole identity,
costume, palette, line-work, shading, and character-proportion reference. It is
not an edit target. Extract and faithfully preserve the same original Swan
character shown behind the desk.

Create one clean 4-column by 3-row character pose grid on a perfectly plain,
uniform warm-cream #EFE6D0 background. Use generous cream gutters between the
twelve cells, but draw no boxes, panel borders, labels, captions, numbers,
letters, symbols, registration marks, or callouts. Show exactly one Swan in
each cell and no office environment.

Character invariants for all twelve cells: identical rounded head and body
proportions, identical warm-white feather silhouette and head tuft, identical
warm-orange bill shape and size, identical facial spacing, identical expressive
dark eyebrows, identical deep-brown matte suit and loose tie, identical outline
weight, identical hand-painted texture, and identical warm palette from Image
1. Keep the same calm, clever, welcoming personality. Swan has no glasses;
this is now the locked design choice. The pipe is not part of his body and does
not appear on this pose sheet. Do not redesign, age, slim, enlarge, recolor, or
restyle him between cells. He must remain original and must not resemble any
recognizable existing fictional duck.

Use consistent waist-up seated framing, the same front three-quarter angle,
the same scale, the same shoulder position, and the same soft neutral lighting
in every cell. Keep the full head, bill, torso, tie, and both wings inside each
cell with comfortable padding. Except for the named feature or prop change,
hold every other facial feature, pose, camera angle, and costume detail still.

Cell map, read left to right:

Row 1:
1. Definitive neutral rig anchor — bill closed, relaxed half-lidded eyes,
   relaxed brows, slight resting smile, both wings resting and clearly visible.
2. Same neutral rig anchor; change only the lower bill to a natural speaking-open
   position. Keep eyes, brows, head, and body unchanged.
3. Same neutral rig anchor; bill closed; change only the eyes to fully open.
4. Same neutral rig anchor; bill closed; change only the eyes to fully closed.

Row 2:
5. Same neutral rig anchor; change only both eyebrows to a clearly raised pose.
6. Same neutral rig anchor; change only both eyebrows to a gently lowered,
   inward thinking pose.
7. Same neutral rig anchor; change only one eyebrow to a subtle skeptical lift,
   confident and playful rather than smug.
8. Same neutral rig anchor; one wing makes a small open welcoming gesture while
   the other wing remains relaxed.

Row 3:
9. Same neutral rig anchor; one wing makes a different restrained presenting
   gesture toward the desk while the other wing remains relaxed.
10. Swan holds a completely blank open newspaper raised in a natural reading
    position; his eyes look gently down at it.
11. Swan holds the same completely blank open newspaper lowered to chest level;
    his eyes look directly toward the visitor.
12. Clean separation anchor — neutral default face, bill closed, half-lidded
    eyes, relaxed brows, and both wings held slightly away from the torso so the
    head, bill, eyes, brows, body, wings, and tie have clear silhouettes for
    later rig-part preparation.

The newspaper in cells 10 and 11 must be plain warm paper with absolutely no
headline, columns, lines, pictures, boxes, lettering, pseudo-writing, symbols,
or decorative marks. Do not add a mug, pipe, desk, chair, office props, floor,
shadow, scenery, speech bubble, arrows, swatches, typography, watermark, or any
extra character. The warm-cream background must remain clean and uncluttered.

Use soft painted shading and warm near-black #241A12 ink outlines, never pure
black. Preserve feather #F5F0E4, bill #E8963C, suit #4A3524, and warm paper
#EFE6D0 targets from the approved master. No hard shadows, rim lighting, digital
gradients, glossy 3D, anime, pixel art, photorealism, flat vector styling,
Disney/Pixar-like gloss, cold grading, depth-of-field blur, or watermark
artifacts. Generate at the maximum available landscape resolution with crisp,
readable silhouettes suitable as the canonical acting and rigging reference.

## Review record

- Attempted date: 2026-07-18
- Built-in output path: none
- Workspace copy: none
- Dimensions: none
- Review result: output rejected by the built-in safety filter before delivery;
  no candidate exists.
- Single requested revision: remove explicit named-character/style comparisons
  that may cause a false positive and adopt the stricter QA-approved grid map.
