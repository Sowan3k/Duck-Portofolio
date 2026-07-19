# V-027 — Blank résumé document, candidate 1

- Use case: standalone transparent physical UI surface
- Identity authority:
  `visuals/04-scene-production/liftable-props/approved/interactive-resume-folder--v01--approved.png`
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Candidate output:
  `visuals/05-physical-ui/resume-document/drafts/resume-document-blank--v01.png`
- Approved production asset:
  `visuals/05-physical-ui/resume-document/approved/resume-document-blank--v01--approved.png`
- Individual QA:
  `visuals/99-review/contact-sheets/resume-document-blank--v01-alpha-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v027-v029-resume-whiteboard-approval-set-v01.png`
- 390px review:
  `visuals/99-review/contact-sheets/v027-v029-resume-whiteboard-mobile-review-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-19

## Exact generation prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft
painted shading. A cozy, cluttered, lived-in office rendered in muted warm
browns, mustard yellows, and cream, lit by late-afternoon interior light and the
green glow of a banker's lamp, with cool grey-blue rainy daylight coming through
the window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Use case: stylized-concept

Asset type: transparent production asset for the Swan's Office résumé
interaction

Primary request: Create exactly one standalone BLANK RÉSUMÉ DOCUMENT SHEET, the
physical paper that slides from the approved résumé folder onto Swan's desk.
This visual is supportive only; the real PDF downloads immediately and all
visible résumé content will be accessible DOM-rendered content later.

Input images: Image 1 is the exact approved résumé-folder identity, paper
family, desk perspective, edge wear, ink character, and warm office lighting
authority. Image 2 is the exact office composition, desk perspective,
late-afternoon palette, paper material, and ink-weight authority. Images 3 and 4
lock the project's illustration language and color discipline only; do not
include Swan or any character.

Subject and materials: Show exactly one complete portrait-oriented résumé sheet
viewed almost from above with only a gentle three-quarter desk-perspective skew
matching Images 1 and 2. Use a standard paper proportion close to 1:1.414, with
the sheet taller than wide. The sheet is warm cream, slightly lighter than the
manila folder cover, with subtle aged paper fibers, softly worn hand-cut edges,
a dark warm-brown hand-inked outer contour, restrained painted shading, and one
tiny natural curl confined to the lower-right corner. Keep the broad central
face calm, evenly lit, nearly flat, and uninterrupted, occupying at least 84% of
the sheet width and 88% of its height for later DOM-rendered résumé content. It
must read as one individual document sheet, not a folder, card, certificate,
book page, notebook, or paper stack.

Lighting and palette: warm late-afternoon painted shading; warm cream paper in
the approved office paper family; near-black warm ink, never pure black. No
green glow on the paper, no cold cast, glossy digital gradient, hard glare, or
mirror reflection.

Constraints: The entire document is completely blank. Absolutely no name,
heading, résumé title, text, letters, numbers, dates, contact details, bullets,
rules, dividers, columns, boxes, tables, icons, logos, portraits, photos,
signatures, stamps, seals, watermarks, pseudo-writing, scribbles, page number,
decorative glyphs, header bar, footer, border decoration, clip, staple, binder
holes, sticky note, tab, ribbon, or fold across the writing area. No hands,
duck, character, folder, desk surface, pen, props, extra paper, stack, or second
object.

Scene/backdrop: Center the single complete sheet large on a perfectly flat
uniform pure chroma-key green background #00FF00 with generous clean margin on
every side. The background must contain no shadows, gradients, texture,
reflections, floor plane, horizon, lighting variation, vignette, noise, or
watermark. Do not use #00FF00 anywhere in the document. No cast shadow or
contact shadow. Preserve the complete crisp silhouette without touching any
canvas edge.

## Generation and processing record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-d5fa3953-6b40-467f-ad6e-e1f6081a9f17.png`
- Chroma source:
  `visuals/05-physical-ui/resume-document/drafts/resume-document-blank--v01-chroma-source.png`
- Helper-alpha intermediate:
  `tmp/imagegen/resume-document-blank-helper-alpha-v01.png`
- The installed imagegen `remove_chroma_key.py` helper converted the flat green
  field to a soft RGBA matte. Project normalization and QA use
  `tmp/imagegen/prepare_resume_whiteboard_assets.py` to crop, scale, clear hidden
  RGB, and replace any green-contaminated edge colors from nearby trusted object
  pixels.
- Source: 1054×1492 RGB. Candidate: 2200×3000 RGBA.
- Alpha bbox: `(134,134)–(2067,2867)`; object ratio `0.7073:1`.
- 256 alpha levels, four transparent corners, zero RGB beneath alpha zero, and
  zero materially green-dominant nonzero-alpha pixels.
- Warm-paper median: `#FBDBA7`.
- The single sheet remains completely blank; its broad uninterrupted face is
  safe for later accessible résumé content and never gates the real PDF.
- SHA-256:
  - chroma source: `041EA05417276205704EFB59432116A276496BD076DE32D45396DB48D7AAD567`
  - helper alpha: `17A0565FDD5AB90777B2485B4F715E68C695EF0B004910A278A8A993494DEF08`
  - candidate: `0511C17A3E36CE742F0933FBD4E9CFDF14392E4D35D4F4671F3CADD13D0E8616`
  - alpha QA: `35A1DFA2B042431D5596257B72F89FC3CCD61F4B91DEB9EA952BEC5C14F40C83`
  - paired approval sheet: `2109EBF69C7537F2BAD085DDA63E5B4A2DE5AE2D5AA53405FB13F47240A0FC6A`
  - 390px review: `017ED3554312001BAA1376C6CD2F33C79F167B9F5B8DCBDB6E60BA6BC8F13E34`

## Review result

Internal identity, blankness, silhouette, transparency, spill, paper palette,
A4-like proportion, small-scale readability, office placement, and 390px checks
passed. Owner approved the paired review on 2026-07-19; the approved file is
byte-identical to the reviewed candidate.
