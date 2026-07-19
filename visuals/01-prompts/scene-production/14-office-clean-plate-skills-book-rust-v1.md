# V-010C / V-012B — Rust-red Skills-book shelf state and clean plate, candidate 3

- Use case: `precise-object-edit`
- Asset type: movable bookshelf-trigger separation and localized shelf repair
- Input references:
  - Image 1:
    `visuals/04-scene-production/clean-plates/approved/office-clean-plate-resume-folder--v01--approved.png`,
    sole edit target at native 1448×1086
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Extracted transparent shelf-state destination:
  `visuals/04-scene-production/liftable-props/drafts/interactive-skills-book-shelf-cutout--v01.png`
- Full generated repair destination:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book-shelf--v01-full.png`
- Deterministically composited clean-plate destination:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-skills-book--v01.png`
- Approved cutout:
  `visuals/04-scene-production/liftable-props/approved/interactive-skills-book-shelf-cutout--v01--approved.png`
- Approved clean plate:
  `visuals/04-scene-production/clean-plates/approved/office-clean-plate-skills-book--v01--approved.png`
- Status: owner-approved; promoted byte-identically on 2026-07-19

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
Asset type: focused occlusion repair for one empty bookshelf slot.
Image 1 is the sole edit target. Image 2 locks Image 1's exact camera,
composition, furniture geometry, materials, lighting, palette, texture, and all
unchanged objects. Images 3 and 4 are canonical style and character references
only; do not add a character.

On the lowest visible book-filled shelf of the tall central-left bookcase,
remove exactly the large warm rust-red upright vintage hardback that is second
from the left, immediately right of the dark green upright book. It has a tall
blank rust-red spine with faint horizontal gold-toned bands and a shallow dark
rust-red top cover/page block projecting to the right over the neighboring
blue-gray books. Remove the complete visible L-shaped red-book silhouette,
including spine, projecting top block, ink outline, bottom edge, and only its own
narrow contact/occlusion shadow. Remove no other book or object.

The vacated rust-red-book slot must remain visibly EMPTY. Do not place, invent,
duplicate, widen, recolor, rotate, or move a replacement book into that slot.
Do not close the gap by rearranging the neighboring green or blue-gray books.

Inside the exact former red-book silhouette, show only the same dark warm wooden
bookcase back panel and the narrow shelf-top surface at the bottom. Complete only
the small newly revealed upper-left/top edge of the existing first blue-gray book
on the right where the red projecting cover previously overlapped it. Preserve
the dark green book on the left and every blue-gray book on the right in their
exact original positions, angles, widths, colors, outlines, bands, and lighting.
The result must show a natural empty vertical gap between unchanged neighbors.

Keep every other book, every plant and pot, all shelf beams and uprights, cabinet
drawers and handles, trophy shelf, wall frame, clock, whiteboard, chair, monitor,
desk blotter, mug, pipe, telephone, notebook, envelopes, lamp, filing cabinet,
window, and every other visible object exactly unchanged. Keep the empty chair
and cleared résumé-folder area unchanged. Do not reintroduce Swan, his newspaper,
or the résumé folder.

Preserve the exact 1448×1086 4:3 canvas, visitor-eye-level camera, crop,
perspective, object coordinates, furniture proportions, outline weight,
woodgrain, worn-leather texture, paper texture, shadows, highlights, warm
interior light, local green-gold lamp pool, and cool rainy window light. Do not
pan, zoom, crop, reframe, recolor, relight, clean up clutter, simplify, sharpen,
blur, or redesign anything. Do not redraw unaffected regions. Do not add a new
book, character, prop, decoration, text, glyph, pseudo-text, logo, symbol,
watermark, smoke, steam, reflection, or glow.

The result is the exact approved office with one clearly empty slot where the
selected rust-red Skills book used to be. Every unrelated pixel-level visual
relationship must remain as close as possible to Image 1.

## Deterministic compositing rule

The generated full frame is never accepted directly. Composite only the saved
semantic union of the red spine, projecting top block, contact shadow, newly
revealed blue-book edge, back panel, and shelf-top repair. Preserve explicit
green-book, visible-blue-book, shelf-lip, neighboring-book, plant, and bookcase
keep-outs. Pixels outside the final soft-mask support must be bit-for-bit
identical to Image 1. The shelf cutout is derived exactly from Image 1; V-024
later supplies the completed closed transition book and open blank spread.

## Review record

- Generated date: 2026-07-19
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-f07c7077-7224-439e-898d-a0317650065c.png`
- Workspace full repair:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book-shelf--v01-full.png`
- Shelf-state cutout:
  `visuals/04-scene-production/liftable-props/drafts/interactive-skills-book-shelf-cutout--v01.png`
- Object and repair masks:
  - `visuals/04-scene-production/segmentation/masks/office-mask-skills-book-object--v01.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-skills-book-repair--v01-binary.png`
  - `visuals/04-scene-production/segmentation/masks/office-mask-skills-book-repair--v01-soft.png`
- Workspace composited clean plate:
  `visuals/04-scene-production/clean-plates/drafts/office-clean-plate-skills-book--v01.png`
- Dimensions: repair/composite 1448×1086 RGB; cutout 59×113 RGBA with
  a 55×109 nonzero-alpha silhouette.
- Alpha validation: 3,162 nonzero-alpha pixels; 2,633 fully opaque;
  529 antialiased; 83 alpha levels; all four crop borders transparent; one
  connected silhouette. The exact rust spine, horizontal bands, ink edge,
  bottom band, sloped top block, and right tip remain; no green/blue neighbor,
  shelf strip, diffuse shadow, or detached halo is present. At a 390px scene
  width it reads at about 15×29px before the small motion reaction.
- Outside-mask pixel validation: 3,826 changed pixels, all inside the saved
  4,022-pixel soft support at inclusive bbox `(508,316)–(578,435)`; zero
  changed pixels outside support or in its five-pixel exterior ring. The green
  neighbor keep-out and shelf-front keep-out remain byte-identical. Recomposition
  changes zero pixels in the fully opaque cutout core.
- Visual repair validation: the rust spine, shallow top block, contact shadow,
  and occlusion residue are absent; the empty slot reads as natural dark wood;
  the newly exposed blue-book top edge is coherent. Green/blue books and shelf
  lip retain their geometry and color, with no feather seam or repeated texture.
- SHA-256:
  - cutout: `FFD8349EEC5ED0F21C2AC28A1D649913CAED129E404163F91AB1F54EE2210ABB`
  - masked composite: `87D499FB135E5758A3B2A138F739528EE244DCBBBB534A0159830B5BC898870B`
  - full generated repair: `0D4AB1E54F9ED8696C8D8C57242325BD2B50B5722C7A41228A4D8B41C9AFAE30`
- Review result: pass from internal review plus independent alpha/mobile and
  clean-plate QA; owner approved and both production sources were promoted
  byte-identically without overwriting their draft evidence.
- Single requested revision: none for this rust-book candidate.
