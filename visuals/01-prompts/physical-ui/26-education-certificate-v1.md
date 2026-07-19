# V-026 — Blank framed Education certificate, candidate 1

- Use case: standalone transparent physical UI surface
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Candidate output:
  `visuals/05-physical-ui/education-certificate/drafts/education-certificate-framed--v01.png`
- Approved production asset:
  `visuals/05-physical-ui/education-certificate/approved/education-certificate-framed--v01--approved.png`
- Individual QA:
  `visuals/99-review/contact-sheets/education-certificate-framed--v01-alpha-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v025-v026-award-education-approval-set-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-19

## Exact generation prompt

Use case: stylized-concept

Asset type: transparent production asset for the Swan's Office Education
certificate enlargement

Warm storybook cartoon illustration with heavy dark ink outlines and soft
painted shading. A cozy, cluttered, lived-in office rendered in muted warm
browns, mustard yellows, and cream, lit by late-afternoon interior light and the
green glow of a banker's lamp, with cool grey-blue rainy daylight coming through
the window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Primary request: Create exactly one standalone ENLARGED BLANK EDUCATION
CERTIFICATE IN ITS FRAME, the physical framed detail that expands from the
graduation frame in the office.

Input images: Image 1 is the exact wall-frame walnut, warm paper, subtle glass,
office perspective, late-afternoon lighting, ink weight, and lived-in wear
authority. Images 2 and 3 lock the project's illustration language and color
discipline only; do not include Swan or any character.

Subject and materials: A substantial landscape-oriented wall certificate frame
shown almost straight-on, with only the slightest office-perspective skew so
later accessible DOM-rendered education content can align cleanly. Use a slim
but tactile dark-walnut frame with visible grain and softly worn corners, a
narrow aged-brass inner filet, one large warm-cream parchment certificate
surface behind clear glass, and a heavy warm hand-inked contour. The parchment
should be calm, evenly lit, subtly aged, and completely uninterrupted, filling
at least 76% of the framed object's width and 67% of its height. Include only one
very soft narrow glass highlight confined to the upper-left frame edge, never
crossing the central writing area. Overall object aspect about 1.45:1. No stand,
pedestal, mat board, hanging wire, or wall shadow.

Lighting and palette: warm late-afternoon painted shading; dark walnut;
restrained aged brass; warm cream parchment near the approved office paper
family; near-black warm ink, never pure black. No green glow, mirror reflection,
glossy digital gradient, or cold color cast.

Constraints: The certificate paper and frame are completely blank. Absolutely
no institution name, qualification, text, letters, numbers, dates, signatures,
seals, ribbons, crests, logos, emblems, stamps, borders printed on the paper,
ruled lines, boxes, tables, dividers, icons, portraits, photographs,
pseudo-writing, scribbles, watermark, decorative glyphs, or corner ornaments.
No hands, duck, character, wall, shelf, trophy, graduation cap, diploma roll,
desk surface, extra frame, props, or second object.

Scene/backdrop: Center the single complete framed certificate large on a
perfectly flat uniform pure chroma-key green background #00FF00 with generous
clean margin on every side. The background must contain no shadows, gradients,
texture, reflections, floor plane, horizon, lighting variation, vignette,
noise, or watermark. Do not use #00FF00 anywhere in the object. No cast shadow
or contact shadow. Preserve the complete crisp silhouette without touching any
canvas edge.

## Generation and processing record

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-01820eb8-d40d-440f-a585-5400637f7bda.png`
- Chroma source:
  `visuals/05-physical-ui/education-certificate/drafts/education-certificate-framed--v01-chroma-source.png`
- Helper-alpha intermediate:
  `tmp/imagegen/education-certificate-framed-helper-alpha-v01.png`
- The installed imagegen `remove_chroma_key.py` helper converted the flat green
  field to a soft RGBA matte. Project normalization and QA use
  `tmp/imagegen/prepare_award_education_assets.py` to crop, scale, remove hidden
  RGB, and replace any green-contaminated edge colors from nearby trusted object
  pixels.
- Candidate output: 2800×2000 RGBA; alpha bbox `(101,118)–(2699,1882)`.
- 256 alpha levels, four transparent corners, zero RGB beneath alpha zero, and
  zero materially green-dominant nonzero-alpha pixels.
- Material medians: walnut `#5E3715`; warm parchment `#EFD49C`.
- The certificate remains completely blank and provides one large,
  uninterrupted DOM-safe paper surface.
- SHA-256:
  - chroma source: `439848F11E0670C4279F5A406190CCEB46B15CC6D5F641D9745B7239E24DA561`
  - helper alpha: `45EE04A1A34A7E52EA85FF43B05154C7D66A1310BD85DF1301768D1131FF6985`
  - candidate: `241FBA757A13AD9A7B8BA08A643AFB033C6824BF4DB8950F5355B2D55627C41F`
  - alpha QA: `985C40A72B28E26B9D50D5DB6C0370C006F1122AB83D0CFF7113C10684E47C2B`
  - paired approval sheet: `66F0343269568B04331CB304A714EA1F2A8585E1EE4AE364D73D08C352C5B4D8`

## Review result

Internal identity, blankness, silhouette, transparency, spill, walnut/paper
palette, small-scale readability, and office-placement checks passed. Owner
approved the paired review on 2026-07-19; the approved file is byte-identical
to the reviewed candidate.
