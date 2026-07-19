# Swan's Office visual production

This directory is the source workspace for every visual asset used by Swan's
Office. It is intentionally separate from future runtime folders under
`public/assets/`: only approved, optimized exports will move there during
development.

The existing `art/` folder is preserved as an incoming owner workspace. Its
`art/references/Reference Image.png` is the current inspiration-only style and
mood reference. It is not an edit target, canonical reference, or shippable
asset; approved original production files live under `visuals/`.

## Current production gate

**Visual production is complete and ready for development.** Every required
raster source is owner-approved, responsive delivery exports are present, and
the final AVIF and WebP largest-scene stacks pass independent visual and
mechanical QA below the 700,000-byte compressed-art budget. Development should
copy approved outputs into `public/assets/` without re-encoding the selected
WebP production stack.

## Authority and non-negotiables

1. `art_style.md` governs all generated art. Its locked paragraph starts every
   generation prompt verbatim.
2. `Swan_Office_Creative_Design_Bible.md` and
   `Swan_Office_Portfolio_Concept.md` govern character, mood, and interaction.
3. `CLAUDE.md` governs delivery, accessibility, performance, and runtime use.
4. Every asset is original. External references are inspiration only and are
   never shipped.
5. Generated artwork contains no text, letters, numbers, glyphs, pseudo-text,
   logos, or symbols. All readable content will later be overlaid in DOM/SVG.
6. After approval, the master scene, pose sheet, and expression sheet become
   the canonical reference trio. Every later generated asset must attach them.
7. Authentic project screenshots, awards, certificates, and resume content are
   captured or supplied; they are never fabricated with image generation.

## Directory map

```text
visuals/
├── 00-references/          inspiration-only inputs and approved canonical trio
├── 01-prompts/             exact prompt sidecars grouped by asset family
├── 02-master-scene/        master drafts, approved source, and one upscale
├── 03-duck/                pose sheet, expression sheet, and rig-ready parts
├── 04-scene-production/    segmentation, clean plates, inpainting, layer exports
├── 05-physical-ui/         blank storybook, folders, cards, document, whiteboard
├── 06-supporting/          loading, social, 404, and small identity derivatives
├── 07-project-media/       authentic source captures and approved crops
├── 08-audio/               local, gitignored source candidates for development
└── 99-review/              contact sheets and rejected outputs
```

Final audio encoding is deliberately outside this visual-only production gate;
source candidates are staged separately for later review. Rive rigging,
CSS/SVG ambient effects, DOM text, audio integration, and runtime wiring belong
to the development phase and are not missing source visuals.

## File rules

- Use lowercase kebab-case.
- Drafts: `asset-name--v01.png`, `asset-name--v02.png`.
- Approved source: `asset-name--v03--approved.png`.
- Runtime pairs share a basename: `scene-background--2600w.avif` and
  `scene-background--2600w.webp`.
- Never overwrite an approved file; create the next version.
- Every generated image receives a Markdown prompt sidecar recording the exact
  prompt, date, references attached, review result, and requested revision.
- Keep lossless PNG working masters. Upscale the approved master scene once to
  at least 2600 px wide, then derive AVIF/WebP exports.

See `generation-plan.md` for the approval sequence and `manifest.md` for the
complete asset inventory.
