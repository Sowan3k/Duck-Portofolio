# V-034 — Entry portrait of Sowan, candidate 1

- Use case: opaque entry/loading-screen portrait and reusable About portrait
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Owner likeness reference attached to generation:
  `visuals/Sowan's real photo.jpeg`
- Selected generated source:
  `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v01-source.png`
- Production candidate:
  `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v01.png`
- Reusable inner portrait:
  `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v01-inner.png`
- Approved framed master:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v01--approved.png`
- Approved reusable inner portrait:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v01-inner--approved.png`
- Approved responsive AVIF/WebP set:
  `visuals/06-supporting/entry-portrait/approved/runtime/`
- Responsive AVIF/WebP candidates:
  `visuals/06-supporting/entry-portrait/drafts/runtime/`
- Individual QA:
  `visuals/99-review/contact-sheets/entry-portrait-sowan--v01-qa.png`
- Owner-review sheet:
  `visuals/99-review/contact-sheets/v034-entry-portrait-approval-set-v01.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v034-entry-portrait-mobile-review-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-20

## Exact successful generation prompt

Warm storybook cartoon illustration with heavy dark ink outlines and soft
painted shading. A cozy, cluttered, lived-in office rendered in muted warm
browns, mustard yellows, and cream, lit by late-afternoon interior light and the
green glow of a banker's lamp, with cool grey-blue rainy daylight coming through
the window. Slightly exaggerated cartoon proportions, hand-drawn charm, gentle
texture, no gradients that look digital. Every paper, sign, sticky note, book
spine, newspaper, whiteboard, and label is completely blank with no text, no
letters, no symbols anywhere in the image.

Use case: stylized-concept
Asset type: entry/loading-screen framed portrait illustration
Asset name: entry-portrait-sowan--v01

Image 1 (ref-01-master-scene.png), Image 2 (ref-02-duck-pose-sheet.png), and
Image 3 (ref-03-duck-expression-sheet.png) are the canonical style references
for this world. Match their warm-dark ink outline weight, soft painted shading,
muted warm palette, paper-like texture, and hand-drawn charm exactly.

Image 4 (Sowan's real photo.jpeg) is the likeness reference for Sowan, the real
human owner. Translate him into the same cartoon world. Preserve his
recognizable thick swept dark hairstyle, youthful broad/oval face shape, thick
brows, almond dark eyes, medium straight nose, rounded cheeks and jaw,
warm-brown complexion, light jaw/chin stubble, full lower lip, and gentle
closed-mouth slight smile. He is a human character, never a duck.

Create one friendly head-and-shoulders cartoon portrait, front-facing or only
subtly three-quarter. Keep the likeness recognizable but fully stylized with
heavy warm-dark ink outlines, soft hand-painted shading, slightly exaggerated
cartoon proportions, and gentle texture.

Replace the photographed clothing completely with a plain unbranded warm
charcoal dark tee or simple warm-toned casual shirt. Its fabric is matte and
completely blank. Do not reproduce or resemble the photo's chest logo. No chest
graphic, rectangle, stripe, logo, lettering, symbol, brand mark, backpack, or
shoulder straps.

Replace the night photo background entirely with a plain uninterrupted
warm-cream painted backdrop like Images 2 and 3.

Place the portrait inside exactly one substantial warm walnut wooden picture
frame matching the office furniture in Image 1, including its grain, bevels,
gentle wear, ink treatment, and warm highlights. Attach exactly one small
centered aged-brass plaque to the bottom of the frame. The plaque face is
smooth, broad, evenly lit, and completely blank.

Composition: one centered vertical framed portrait. Use a 4:5 portrait-safe
composition. The complete frame fills most of the canvas while retaining a
clearly visible, generous warm-cream margin of at least 6–8 percent on every
side. Keep the frame centered and nearly straight-on with no perspective
distortion. Keep Sowan's complete hair, face, chin, shoulders, complete frame,
and complete plaque safely inside the canvas. Make the face large and readable
at mobile size. Opaque complete illustration. Generate at the highest available
portrait resolution.

Lighting and palette: muted warm browns, mustard/aged brass, cream, and warm
charcoal; soft late-afternoon illumination from upper left; restrained painted
shadows; warm near-black ink; no digital-looking gradient.

Exactly one human portrait, exactly one wooden frame, and exactly one blank
brass plaque. No duck, animal, additional person, office scenery, furniture
beyond the frame, paper, sign, sticky note, book, newspaper, whiteboard, label,
interface, caption, watermark, signature, logo, trademark, text, letters,
numbers, glyphs, pseudo-writing, decorative monogram, symbols, or source-photo
brand mark anywhere. Every surface, especially the shirt and plaque, is
completely blank. No photorealism, glossy 3D, flat vector style, anime styling,
hard vignette, lens effect, cold digital gradient, night background, rim light,
or hard black shadow.

## Generation and processing record

- Built-in image generation was used; no CLI/API fallback.
- Selected built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-f25ebd34-8dab-493c-8c1f-e85ad7f3884e.png`.
- Selected source: `1122×1402 RGB`, fully opaque; SHA-256
  `DB1B14CDE46A40C331551663CABAAD39D44201D8DC03C0D9DF50DE2068C4E9B1`.
- An earlier attractive source is retained only as rejected process evidence at
  `entry-portrait-sowan--v01-rejected-noncanonical-prompt-source.png`, SHA-256
  `51C7C14C7CEB5762B4F6FF21917766CB11A6B67F14DFE1E26AB13945AEB7AA94`.
  It was rejected before review because the locked style paragraph was not the
  literal first paragraph sent to generation, as required by `art_style.md`.
- `tmp/imagegen/prepare_entry_portrait_asset.py` performs one deterministic
  normalization to the delivery master. It uniformly resizes the complete
  generated source to `2393×2990`, places it at `(103,130)` on a `2600×3250`
  exact-4:5 warm-cream paper canvas, and feathers only 24 pixels of disposable
  generated background at the join. Sowan, the frame, shirt, and plaque are not
  redrawn, retouched, cropped, or selectively transformed.
- Production candidate: `2600×3250 RGB`, fully opaque; SHA-256
  `B5D1FF95DB12333152DF018328F2430E6B969BA59184816BC4F03D6C8ACC6728`.
- Measured frame box: `(178,232)–(2425,2969)`. Frame margins are 6.85% left,
  7.14% top, 6.73% right, and 8.65% bottom.
- Measured plaque box: `(845,2740)–(1758,2947)`. Its central inspection region
  has only 0.0012% high-gradient pixels; full-resolution inspection finds no
  text, pseudo-writing, logo, or symbol.
- The shirt is plain matte charcoal. The source-photo chest logo and backpack
  straps are absent, with no replacement graphic, rectangle, stripe, glyph, or
  brand geometry.
- The reusable portrait is derived without generation from exact selected-source
  crop `(150,170)–(970,1195)`, mapped to production-master crop
  `(423,493)–(2172,2679)`, then resized once to `1200×1500 RGB`. It contains no
  wooden frame or plaque pixel and has SHA-256
  `009B339738CA2CFFF24684712AFB5F42D5DCCA57110E740F014325DD67A17B87`.

## Runtime exports

Every runtime file is encoded independently from its lossless master. AVIF uses
quality 58 with 4:4:4 subsampling; WebP uses quality 82/method 6.

| Asset | Format | Bytes | Decoded PSNR | SHA-256 |
|---|---|---:|---:|---|
| framed 400×500 | AVIF | 14,442 | 36.489 dB | `96DA1C76FADFB7EF94B3AAA4BB8A6D3C82528617D69EA6E1A89A0A274393553A` |
| framed 400×500 | WebP | 21,378 | 35.278 dB | `AC24DAC3BFEAE04F66AB181555AF66B6C7510D5C2CDB043A851E2056B78B41E4` |
| framed 800×1000 | AVIF | 56,622 | 36.354 dB | `8B80834F156002771A2DE94539E80EF313E83314780B0926647CA91FDE5193F7` |
| framed 800×1000 | WebP | 88,654 | 35.943 dB | `7C8B80B862F4526E48F6C9DDE64CFCA0ECD6F2A02B527308FDA21E3CB87B7352` |
| framed 1600×2000 | AVIF | 207,417 | 38.995 dB | `82D222CFFEA286D93D35AD074CE6AFF2C5A7AE9083429450691437F6FF39E34D` |
| framed 1600×2000 | WebP | 276,884 | 37.937 dB | `011C04055B0E541E32960B772E9DA615ACE41BFA25FB267DB05BA092654E2BCD` |
| inner 320×400 | AVIF | 10,761 | 35.657 dB | `41F138E4EBA69453F6740846C3A13954CB8152D93EB6394E1AB0226B4E087497` |
| inner 320×400 | WebP | 15,594 | 35.562 dB | `B8C3B7D6FB926F3C84F43F9DE150C5CA59EFCCB10669AF8D8B65BCB3D4A50541` |
| inner 640×800 | AVIF | 45,346 | 36.145 dB | `2E06F3F8DF6E8F1BC231A67CFB21726E8683E516F4BAA021D5D511FEF241C996` |
| inner 640×800 | WebP | 64,432 | 36.044 dB | `F733164A2C0C1C82CA2D353843FC02726B345C8FA6100B9694B3A552057A19EA` |
| inner 1200×1500 | AVIF | 130,203 | 39.129 dB | `AA9C55704B80890DF69F943869B8E82537BA1E1C065727BBF5556E33C249B880` |
| inner 1200×1500 | WebP | 166,272 | 38.129 dB | `ABF614B40719C73C8E2D3D2956A699484522CF5DAB7CC7B018B57E9ADFE8911D` |

All files pass their individual size budgets and decode as opaque RGB. Minimum
decoded PSNR is 35.278 dB.

## Review result

Internal and independent likeness, human identity, style match, object-count,
complete-frame, margin, opacity, exact-ratio, warm palette, logo/backpack
removal, shirt and plaque blankness, inner-crop, 160px recognition,
390px/360px entry-screen, compression-budget, and decoded-quality checks
passed with no blocker. Owner approved the reviewed candidate on 2026-07-20;
both PNGs and all twelve runtime files were promoted byte-identically.

QA sheet SHA-256:

- individual QA: `95B7FF6CDDB7225C8811881E27873DE7E3265F0708937DEC960C23B06ED8F2D2`
- owner-review sheet: `A0622FE24550DC75268C64588F13FC4DBD175F3FABE443A0579259522D0D015C`
- mobile review: `22F60E89E733DE72F8D818F505E0CA0A9278AD68F1282774E1619B7EFCF31ACA`
