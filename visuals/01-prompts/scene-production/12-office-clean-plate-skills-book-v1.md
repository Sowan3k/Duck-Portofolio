# V-010C / V-012B — Selected Skills-book shelf state and clean plate, candidate 1

- Use case: `precise-object-edit`
- Asset type: movable bookshelf-trigger separation and fixed-camera
  hidden-surface repair
- Input references:
  - Image 1:
    `visuals/04-scene-production/clean-plates/approved/office-clean-plate-resume-folder--v01--approved.png`,
    sole edit target at native 1448×1086
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`, immutable
    composition, geometry, material, and lighting reference
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    canonical character/style reference
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    canonical character/style reference
- Extracted transparent shelf-state destination:
  `visuals/04-scene-production/liftable-props/drafts/interactive-skills-book-shelf-state--v01.png`
- Full generated repair destination:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book--v01-full.png`
- Deterministically composited clean-plate destination:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-skills-book--v01.png`
- Status: rejected generation; replacement book invented in the vacated slot

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
4 are canonical style and character references only; do not add a character.

Remove exactly one object from Image 1: the distinctive blank dark teal-blue
hardcover book leaning slightly to the right on the uppermost book-filled shelf
of the tall central-left wooden bookcase. It sits between a slim muted-brown
upright volume on its left and a larger warm ochre leaning volume on its right.
Remove the complete visible teal book, including its dark ink outline, blue-green
spine and cover planes, tiny blank highlight marks, bottom edge, and only its own
narrow shelf-contact and neighbor-occlusion shadow. Remove no other book or
object.

Reconstruct only the surfaces directly hidden by that removed book and its
narrow shadow: continue the same dark warm wooden bookcase back panel and the
small exposed strip of horizontal shelf beneath it; plausibly complete only the
newly revealed side edges of the immediate muted-brown book on the left and warm
ochre leaning book on the right. Keep those neighboring books in exactly their
existing positions and angles. The opening must read as a natural narrow gap left
by a pulled book, with no teal silhouette, duplicate volume, pasted rectangle, or
book-shaped shadow.

Keep every other book, every blank spine and cover, both bookcase plants and
their pots, all shelves and uprights, cabinet drawers and handles, trophy shelf,
wall frame, clock, whiteboard, chair, monitor, desk blotter, mug, pipe, telephone,
notebook, envelopes, lamp, filing cabinet, window, and every other visible object
exactly unchanged. Keep the already empty chair and already cleared résumé-folder
area unchanged. Do not reintroduce Swan, his newspaper, or the résumé folder.

Preserve the exact 1448×1086 4:3 canvas, visitor-eye-level camera, crop,
perspective, object coordinates, furniture proportions, outline weight,
woodgrain, worn-leather texture, paper texture, shadows, highlights, warm
interior light, local green-gold lamp pool, and cool rainy window light. Do not
pan, zoom, crop, reframe, recolor, relight, clean up clutter, simplify, sharpen,
blur, or redesign anything. Do not redraw unaffected regions. Do not add a
character, replacement prop, decoration, text, glyph, pseudo-text, logo, symbol,
watermark, smoke, steam, reflection, or glow.

The result is the exact approved empty-chair office with only the selected teal
Skills book absent and the newly exposed bookcase surfaces plausibly completed.
Every unrelated pixel-level visual relationship must remain as close as possible
to Image 1.

## Deterministic compositing rule

The generated full-frame output is never accepted directly. Composite only the
approved padded selected-book-and-shadow repair region into Image 1, with explicit
keep-outs for both neighboring books, shelf trim, plant, and bookcase uprights.
Pixels outside the final saved repair-mask support must be bit-for-bit identical
to Image 1. The transparent shelf-state cutout is derived from Image 1 before
repair, not regenerated. V-024 later generates the complete closed and open book
media; this cutout preserves only the exact shelf-visible trigger state.

## Review record

- Generated date: 2026-07-19
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-b79c479c-e3a1-43a3-bde4-12bbf28bd2d5.png`
- Workspace full repair:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book--v01-full.png`
- Shelf-state cutout: pending
- Object and repair masks: pending
- Workspace composited clean plate: pending
- Dimensions: pending
- Alpha validation: pending
- Outside-mask pixel validation: pending
- Visual repair validation: selected teal book is absent, but the model filled its
  slot with an invented upright brown volume instead of exposing the back panel.
- Review result: rejected before compositing.
- Single requested revision: keep the slot visibly empty; show only back-panel
  wood, shelf surface, and the revealed edge of the unchanged ochre neighbor.
