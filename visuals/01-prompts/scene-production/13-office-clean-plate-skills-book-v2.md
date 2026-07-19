# V-010C / V-012B — Selected Skills-book clean plate, candidate 2

- Use case: `precise-object-edit`
- Asset type: focused correction of the empty bookshelf slot
- Input references:
  - Image 1:
    `visuals/04-scene-production/clean-plates/approved/office-clean-plate-resume-folder--v01--approved.png`,
    sole edit target at native 1448×1086
  - Image 2: `visuals/00-references/canonical/ref-01-master-scene.png`
  - Image 3: `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - Image 4: `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Full generated repair destination:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book--v02-full.png`
- Status: rejected generation; left neighbor widened into the empty slot

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

Remove exactly the distinctive blank dark teal-blue hardcover book leaning to
the right on the uppermost book-filled shelf of the tall central-left wooden
bookcase. It is immediately left of the large warm ochre leaning book. Remove
the complete visible teal book, its dark outline, and only its own narrow
contact/occlusion shadow. Remove nothing else.

The vacated teal-book slot must remain visibly EMPTY. Do not place, invent,
duplicate, widen, recolor, rotate, or move any replacement book into that slot.
Do not turn the teal book into a brown, tan, grey, green, blue, or black book.
Do not close the gap by rearranging neighboring books.

Inside the exact former teal-book silhouette, show only the same dark warm
wooden back panel of the bookcase and the narrow horizontal shelf surface at the
bottom. Complete only the small newly revealed side edge of the existing warm
ochre leaning book on the right. Preserve the slim muted-brown upright book on
the left and the warm ochre leaning book on the right in their exact original
positions, angles, widths, colors, outlines, and lighting. The result must show
a natural narrow triangular empty gap between those two unchanged neighbors.

Keep every other book, every plant and pot, every shelf beam and upright,
cabinet drawer and handle, trophy shelf, wall frame, clock, whiteboard, chair,
monitor, desk blotter, mug, pipe, telephone, notebook, envelopes, lamp, filing
cabinet, window, and every other visible object exactly unchanged. Keep the
empty chair and cleared résumé-folder area unchanged. Do not reintroduce Swan,
his newspaper, or the résumé folder.

Preserve the exact 1448×1086 4:3 canvas, visitor-eye-level camera, crop,
perspective, object coordinates, furniture proportions, outline weight,
woodgrain, worn-leather texture, paper texture, shadows, highlights, warm
interior light, local green-gold lamp pool, and cool rainy window light. Do not
pan, zoom, crop, reframe, recolor, relight, clean up clutter, simplify, sharpen,
blur, or redesign anything. Do not redraw unaffected regions. Do not add a new
book, character, prop, decoration, text, glyph, pseudo-text, logo, symbol,
watermark, smoke, steam, reflection, or glow.

The result is the exact approved office with one clearly empty narrow slot where
the selected teal Skills book used to be. Every unrelated pixel-level visual
relationship must remain as close as possible to Image 1.

## Review record

- Generated date: 2026-07-19
- Built-in output path:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-afc017e5-c917-43ec-a3bd-bcf350ca2177.png`
- Workspace full repair:
  `visuals/04-scene-production/inpainted/drafts/office-inpaint-skills-book--v02-full.png`
- Review result: rejected before compositing. The gap exists, but the model
  widened/redesigned the left neighboring book into part of the removed teal
  silhouette; it cannot provide a clean hidden-surface patch.
- Single requested revision: selection changed after native-pixel/mobile audit;
  candidate 3 uses the larger, clearer rust-red lower-shelf hardback.
