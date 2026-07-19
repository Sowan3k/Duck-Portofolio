# V-010B — Résumé-folder cutout and desk clean plate, candidate 1

- Use case: `precise-object-edit`
- Asset type: liftable interactive-prop separation and fixed-camera
  hidden-surface repair
- Input references:
  - Image 1:
    `visuals/04-scene-production/clean-plates/approved/office-clean-plate-swan--v03--approved.png`,
    sole edit target at native 1448×1086
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`, immutable
    composition, geometry, material, and lighting reference
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`,
    canonical character/style reference
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`,
    canonical character/style reference
- Extracted transparent prop destination:
  `visuals/04-scene-production/liftable-props/drafts/interactive-resume-folder--v01.png`
- Full generated repair destination:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-resume-folder--v01-full.png`
- Deterministically composited clean-plate destination:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-resume-folder--v01.png`
- Status: owner-approved V-010B clean-plate and V-012A prop checkpoint

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

Remove exactly one object from Image 1: the large closed blank cream-manila
résumé folder lying in the lower-center/right foreground of the wooden desk,
immediately left of the spiral notebook and below the green leather blotter.
Remove the complete folder stack, including its cream cover, dark ink outline,
visible paper edges, stepped tabs along its right edge, and only its own narrow
contact shadow on the desk. Remove no other object.

Reconstruct only the wooden desktop directly hidden beneath that removed
folder and its contact shadow. Continue the same dark warm-brown desk surface,
horizontal perspective, hand-drawn woodgrain, fine ink marks, soft painted
shading, and existing late-afternoon illumination across the newly exposed
area. The restored patch must read as one uninterrupted part of the original
desk, with no replacement paper, stain, outline echo, pale silhouette, or
folder-shaped shadow.

Keep the spiral-bound blank notebook and black pen immediately to the right
exactly unchanged, including every ring, page edge, outline, and shadow. Keep
the green leather blotter above-left, coffee mug, wooden pipe, telephone and
coiled cord, blank card holder, envelopes, nameplate, memo pad, keyboard,
mouse, lamp, chair, wall fixtures, cabinets, shelves, books, plants, and every
other visible object exactly unchanged. Keep the already empty chair and do
not reintroduce Swan or the newspaper.

Preserve the exact 1448×1086 4:3 canvas, visitor-eye-level camera, crop,
perspective, object coordinates, furniture proportions, outline weight,
woodgrain, worn-leather texture, paper texture, shadows, highlights, warm
interior light, local green-gold lamp pool, and cool rainy window light. Do not
pan, zoom, crop, reframe, recolor, relight, clean up clutter, simplify, sharpen,
blur, or redesign anything. Do not redraw unaffected regions. Do not add a
character, replacement prop, decoration, text, glyph, pseudo-text, logo,
symbol, watermark, smoke, steam, reflection, or glow.

The result is the exact approved empty-chair office with only the résumé folder
absent and the newly revealed desk wood plausibly completed. Every unrelated
pixel-level visual relationship must remain as close as possible to Image 1.

## Deterministic compositing rule

The generated full-frame output is never accepted directly. Composite only the
approved padded folder-and-contact-shadow repair region into Image 1. Pixels
outside the final saved repair-mask support must be bit-for-bit identical to
Image 1. The transparent folder cutout is derived from Image 1 before repair,
not regenerated.

## Review record

- Generated date: 2026-07-18
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-74b282f9-0b57-4805-8263-7c84fc060d06.png`
- Workspace full repair:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-resume-folder--v01-full.png`
- Workspace transparent cutout:
  `visuals/04-scene-production/liftable-props/drafts/interactive-resume-folder--v01.png`
- Object and repair masks:
  - `visuals/04-scene-production/segmentation/masks/office-mask-resume-folder-object--v01.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-resume-folder-repair--v01-binary.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-resume-folder-repair--v01-soft.png`
- Workspace composited clean plate:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-resume-folder--v01.png`
- Dimensions: repair/composite 1448×1086 RGB; cutout 341×205 RGBA.
- Alpha validation: 39,939 nonzero-alpha pixels; 37,560 fully opaque;
  2,379 antialiased; 25 alpha levels; all four crop borders fully transparent;
  no meaningful green-blotter contamination; one connected physical silhouette
  with the curled spine, stepped tab, backing edge, and thin paper layers intact.
- Outside-mask pixel validation: 53,543 changed pixels, all inside the saved
  54,040-pixel soft support at inclusive bbox `(685,788)–(1047,1012)`; zero
  changed pixels outside support, in its five-pixel exterior ring, or in the
  notebook keep-out. Recomposition changes zero pixels in the opaque folder core.
- Visual repair validation: folder and contact shadow absent; reconstructed
  lower-right blotter boundary, stitching, and desk grain read coherently; no
  rectangular patch, repeated-grain artifact, residual ghost, or visible feather
  seam; notebook, coil, telephone, mug, pipe, and all other props remain intact.
- SHA-256:
  - cutout: `2F09C3780022A2225568B8BD3D722B5522166DB6A7A06C36BA3EA1FB4E943C8C`
  - masked composite: `881C6BE9C8CBE8EBFE8E7AB235539DCA8D5674A41D8AE1B2493D9763FBF03E19`
  - full generated repair: `4C0A5ADF1E1C85329C09AC81BF7143234E29C3D3D217CC14BAC9FDD50D7A2F81`
- Review result: pass from internal review plus two independent QA passes;
  owner approved on 2026-07-19 and both immutable sources were promoted.
- Approved transparent cutout:
  `visuals/04-scene-production/liftable-props/approved/interactive-resume-folder--v01--approved.png`
- Approved clean plate:
  `visuals/04-scene-production/clean-plates/approved/office-clean-plate-resume-folder--v01--approved.png`
- Single requested revision: none.
