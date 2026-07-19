# V-032 — Caption-free 404 illustration, candidate 1

- Use case: opaque responsive supporting illustration with a DOM-caption region
- Canonical references attached to generation:
  - `visuals/00-references/canonical/ref-01-master-scene.png`
  - `visuals/00-references/canonical/ref-02-duck-pose-sheet.png`
  - `visuals/00-references/canonical/ref-03-duck-expression-sheet.png`
- Selected generated source:
  `visuals/06-supporting/404-illustration/drafts/swan-404--v01-source.png`
- Candidate output:
  `visuals/06-supporting/404-illustration/drafts/swan-404--v01.png`
- Approved production asset:
  `visuals/06-supporting/404-illustration/approved/swan-404--v01--approved.png`
- Individual QA:
  `visuals/99-review/contact-sheets/swan-404--v01-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v032-v033-404-avatar-approval-set-v01.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v032-v033-404-avatar-mobile-review-v01.png`
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
Asset type: caption-free supporting illustration for the Swan's Office missing-page screen

Create one simple full-bleed portrait illustration of the established Swan
character by himself against a quiet undecorated warm-plaster office wall.
Image 1 is the exact office material, palette, lighting, texture, and ink
authority. Image 2 is the exact Swan design and open-palm gesture authority.
Image 3 is the exact facial identity and restrained acting authority. Preserve
that character's head shape, long orange bill, warm-cream feathers, half-lidded
eyes, brown brows, deep-brown matte suit, cream shirt, and loose brown tie.

Show Swan waist-up in the lower-right, looking gently toward the visitor with
his bill closed in a small knowing smile, one eyebrow raised slightly, and one
feathered wing held palm-up beneath the empty upper region. The other wing rests
naturally against his torso. The feeling is calm, welcoming, intelligent, and
mildly amused.

Use an exact 4:5 portrait composition. Keep the upper 28 percent and broad
upper-left area completely empty, calm, and evenly lit for accessible webpage
copy added later. Keep Swan's complete head, bill, brows, eyes, raised wing,
shirt, tie, and suit readable at small mobile size. If the generated canvas is
narrower than 4:5, keep all essential content inside a centered 4:5 safe area
and place only disposable plain-plaster margin at the sides.

Use soft diffuse late-afternoon warmth from the upper left, restrained painted
shading, warm near-black ink, and a muted plaster background slightly darker
than Swan's feather highlights.

The artwork itself is completely blank. No caption, writing, marks, numbers,
symbols, interface, logo, watermark, speech bubble, paper, map, sign,
newspaper, pipe, mug, glasses, hat, furniture, decorations, or other
characters. No grid, panel, border, artificial vignette, hard shadow, lens
effect, digital gradient, photorealism, flat vector style, or glossy 3D look.
Produce one complete opaque illustration with no transparency or chroma key.

## Generation and processing record

- The first, longer wording was rejected by the image generator's output safety
  system before any image was returned; request ID
  `7a37e289-3c9b-4006-82c0-893dff6fed03`. The successful retry keeps the same
  visual request with a shorter exclusion list.
- Selected built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-b3910b41-ec3a-4e87-ad5d-8aec60773f18.png`
- `tmp/imagegen/prepare_404_avatar_assets.py` converts the 1003×1568 source to
  exact 4:5 at 2000×2500 without cropping or stretching Swan. It scales the
  complete source once to 1599×2500 and adds a 401px left margin made only from
  a reflected tile of the first 128 uninterrupted plaster columns. This avoids
  copying the raised wing into the extension.
- The extension/source join at x=400/401 is pixel-identical and visually
  seamless. The production image contains one Swan and no duplicated fragment.
- Candidate: 2000×2500 RGB, fully opaque.
- Caption-safe rectangle: `(140,150)–(1300,700)`, 1160×550. It contains only
  uninterrupted warm plaster; Canny edge density is 0.0% at thresholds 60/140
  and its approximate P95–P5 luminance spread is 16.67/255.
- `#241A12` DOM ink over the safe rectangle has minimum sampled contrast
  6.30:1, median 8.55:1, 100% at or above 4.5:1, and 99.689% at or above 7:1.
- Production art contains no caption or UI. “This page flew south.” appears
  only on designated QA previews.
- SHA-256:
  - selected source: `2D136412FBAA8638AB46C97B70F1A7019F542FBD7761DAB3336293C75A8D349E`
  - candidate: `3F98F07FA08080D1912F74BF20E41BA639B5C1D6D96B06C4F25B2B7603FD3AAE`
  - individual QA: `7E4A15CA5B477C56DD521F43B577C52AFED7A025F111190007736A13570847BE`
  - paired review: `17304B033FCBED4FCA99F7F7A2D099F7631FCCDA502F2699D7938DBAB8355294`
  - mobile review: `F1062695167F9E1FFF3E76EF118DF33DA29DB6D30A7EFDE98E2B0322EFDCB719`

## Review result

Internal and independent style, identity, acting, blankness, object-count,
opacity, exact-ratio, caption-safe-zone, contrast, extension, mobile, and 160px
checks passed. Owner approved the paired review on 2026-07-20; the approved
file is byte-identical to the reviewed candidate.
