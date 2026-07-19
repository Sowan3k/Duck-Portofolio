# V-010A — Office clean plate behind Swan, candidate 1

- Use case: `precise-object-edit`
- Asset type: fixed-camera occlusion-repair source for the office clean plate
- Input references:
  - Image 1:
    `visuals/02-master-scene/approved/master-scene--v01--approved.png`, sole
    edit target at native 1448×1086
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`, immutable
    composition, geometry, material, and lighting reference
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`, Swan
    identity reference used only to identify the complete removal target
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    Swan identity reference used only to identify the complete removal target
- Full generated repair destination:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-swan-cluster--v01-full.png`
- Deterministically composited clean-plate destination:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-swan--v01.png`
- Status: owner-approved V-010A clean-plate checkpoint

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
Asset type: occlusion-repair source for the fixed-camera office clean plate.
Image 1 is the sole edit target. Image 2 is an immutable high-resolution
reference for Image 1's exact camera, composition, furniture geometry,
materials, lighting, palette, texture, and all unchanged objects. Images 3 and
4 identify the single Swan character and his held newspaper that must be
removed; they are not scene-layout references.

Remove only the complete visible Swan cluster from Image 1: Swan's feathered
head and neck, orange bill, suit-covered torso and arms, both white
feather-wings/hands, loose tie, and the entire blank open newspaper he is
holding. Remove no other object.

Reconstruct only the surfaces directly hidden behind that removed cluster:
complete the same empty dark-brown worn leather executive chair, including its
back, seat, inner side, and arm areas; continue the existing wall and the
partially obscured blank graduation frame where applicable; continue the exact
wooden side furniture, rear desk edge, green leather blotter, and desk wood
surface where the character and newspaper had covered them. The chair remains
in exactly the same position and perspective and must simply be empty.

Keep the plain cream coffee mug and its dark coffee exactly unchanged. Keep the
small unlit brown wooden pipe on the desk exactly unchanged. Keep the green
banker's lamp, computer and keyboard, mouse, filing cabinet, bookshelf and all
books/plants, trophy shelf, wall frame, round wall clock, whiteboard and its
three blank markers, globe, telephone and cord, desk folder, notebook and pen,
blank cards, envelopes, plants, chair exterior, desk silhouette, and every
other visible object exactly unchanged.

Preserve the exact 1448×1086 4:3 canvas, visitor-eye-level camera, crop,
perspective, object coordinates, furniture proportions, outline weight,
woodgrain, worn-leather texture, paper texture, shadows, highlights, warm
interior light, local green-gold lamp pool, and cool rainy window light. Do not
pan, zoom, crop, reframe, recolor, relight, clean up clutter, simplify, sharpen,
blur, or redesign anything. Do not redraw unaffected regions. Do not add a new
character, extra chair, replacement prop, decoration, text, glyph, pseudo-text,
logo, symbol, watermark, smoke, steam, reflection, or glow.

The result is the exact approved office with Swan and his newspaper absent and
only the newly revealed hidden surfaces plausibly completed. The office must
look naturally empty at the chair while every unrelated pixel-level visual
relationship remains as close as possible to Image 1.

## Deterministic compositing rule

The generated full-frame output is never accepted directly. Composite only the
approved padded Swan-cluster repair region into the original native master,
with explicit exclusion holes that restore the original pipe, coffee mug, and
all unaffected foreground props. Pixels outside the final repair mask must be
bit-for-bit identical to Image 1.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-adb821a6-2b0e-4e4a-864c-145cc21e5e36.png`
- Workspace full repair:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-swan-cluster--v01-full.png`
- Repair masks:
  - `visuals/04-scene-production/segmentation/masks/office-mask-swan-cluster--v02-binary.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-swan-cluster--v02-soft.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-pipe-restore--v01.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-coffee-mug-restore--v01.png`
- Workspace composited clean plate:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-swan--v03.png`
- Dimensions: 1448×1086 RGB
- Outside-mask pixel validation: 0 changed pixels outside the saved Swan-mask
  support; 0 changed pixels in the five-pixel exterior edge ring; 0 changed
  pixels in the fully opaque cores of both original-prop restore masks.
- Visual repair validation: no Swan, newspaper, contact-shadow, ambient-
  occlusion, feather, hand, or paper ghost remains. The empty chair, wall,
  completed graduation frame, side furniture, desk edge, blotter, and desk
  surface read coherently at full resolution and 390 px. Original pipe and mug
  are restored through tight silhouettes.
- Review result: candidate pass from internal and independent QA. Composite v01
  was rejected for mask holes that reintroduced fragments; v02 fixed the full
  subject union; v03 restored the exact original pipe and mug. Owner approval
  pending.
- Single requested revision: none for v03; owner approved on 2026-07-18.
