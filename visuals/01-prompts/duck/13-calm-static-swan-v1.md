# V-005 — Calm static Swan, candidate 1

- Use case: transparent first-paint and `prefers-reduced-motion` fallback
- Operation: deterministic extraction from approved rig art; no image generation,
  compositing, or redraw
- Approved pixel authority:
  `visuals/03-duck/rig-parts/body-props-atlas/approved/duck-rig-body-actions--v02--approved.png`
- Native lossless derivative:
  `visuals/03-duck/static-swan/drafts/calm-static-swan--v01-native.png`
- Responsive lossless PNG candidates:
  - `visuals/03-duck/static-swan/drafts/calm-static-swan--v01-640.png`
  - `visuals/03-duck/static-swan/drafts/calm-static-swan--v01.png`
- Runtime AVIF/WebP candidates:
  `visuals/03-duck/static-swan/drafts/runtime/`
- Approval sheet:
  `visuals/99-review/contact-sheets/v005-calm-static-swan-approval-set-v01.png`
- Alpha QA:
  `visuals/99-review/contact-sheets/calm-static-swan--v01-alpha-qa.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v005-calm-static-swan-mobile-review-v01.png`
- Final approved-depth integration review:
  `visuals/99-review/contact-sheets/v005-calm-static-swan-v011-final-review-v01.png`
- Status: candidate v01; internal and independent QA passed, owner review pending

## Derivation decision

Use the first pose in the owner-approved upper-body action atlas. It is already
the required calm state: neutral seated upper body, closed bill, half-lidded
eyes, relaxed brows, slight resting smile, both wings resting, and no prop.
Retaining this complete assembled pose preserves its approved head/neck/collar,
suit, hands, lighting, outlines, and seams. The separate head atlas is an
identity and color authority only; it is not composited into this asset.

The exact right/bottom-exclusive crop is `(71,21)–(391,421)`, producing a
native `320×400` 4:5 RGBA image. The native derivative is byte-identical to
that source rectangle. No part is redrawn, recolored, sharpened, retouched,
or geometrically altered.

## Processing record

- Approved atlas: `1448×1086 RGBA`; SHA-256
  `990BE64BFAE7FD0676C4A3FA79E2259E71065225C3843FBFFD99614F33A80B12`.
- Native derivative: `320×400 RGBA`; SHA-256
  `E53B585D0E350DEA4BC8098475405258D0DEB1FC95E10C4BC3981B06B0C64E24`.
- Native alpha bbox: `(13,25)–(307,382)`; one connected character component;
  57,086 nonzero-alpha pixels, 55,365 opaque pixels, 1,721 partial-alpha
  pixels, four transparent corners, and zero hidden RGB.
- `tmp/imagegen/prepare_static_swan_asset.py` generates each responsive size
  directly from the native crop with premultiplied-alpha Lanczos resizing.
  It does not chain resizes. A deterministic partial-edge cleanup preserves
  alpha exactly and replaces only impossible green- or magenta-dominant
  Lanczos ringing with a nearby approved-source edge color.
- Lossless PNG outputs:
  - `640×800`: 445,914 bytes; SHA-256
    `061E4DAC392BBBBA40A435ABA82EFD8A611DA1792B9B96AFADC162EC772B4538`.
  - `1280×1600`: 1,246,324 bytes; SHA-256
    `33FFCA22EC8CC527D3DA534DCAB5753BF8FCD3D05B91BE36D15FA25678D13A2B`.
- The 1280px master retains 256 alpha levels, zero hidden RGB, zero
  materially green-dominant pixels, and one character component.
- Runtime exports are encoded independently at 320w, 640w, and 1280w:

| Width | AVIF bytes / SHA-256 | WebP bytes / SHA-256 |
|---:|---|---|
| 320 | 12,266 / `B302B2F15C967F90A72F4849FD2303A0E8CF144EDDC7B3CA1C423B06E940F29C` | 17,660 / `77FAD8D7D185F43039F879565ECF8A549507BDCDBDF8B3DC1045C198B8E769CD` |
| 640 | 27,987 / `2234D2E413197ED0B668E7B8E076DC56DEA6B2211B449B63C6A910BE454E5B63` | 52,258 / `D3A5C83118B9D52BB249E042BA7533E80658D80CF39624652D0BFA0EDBFC4EEA` |
| 1280 | 60,037 / `16C3C20E5AD8A596AA11AF7C693BC9659E689832FB24AF2AE7215E7969D41297` | 117,524 / `5A3C47190AC8906258413457230BFF86316586716C7ACCDFF9A35AD389454E0E` |

- WebP decoded alpha is exact at the meaningful-alpha threshold. AVIF alpha
  IoU is 0.99913–0.99956 across the three sizes, with transparent corners and
  the silhouette intact.
- Final scene QA uses the approved V-011 background, furniture, desk-surface,
  and pipe/mug-occluder layers. It places the asset canvas at `(689,176)` at
  `448×560`, bottom-center anchor `(913,736)`, with the chair behind Swan, desk
  surface below both hands, and mug above the right hand. Approved V-012
  resting props are restored after the character where required.
- The final mobile proof exercises the actual approved `724w` WebP scene-layer
  pack plus the candidate `640w` V-005 WebP, displayed at 390 and 360 CSS px.
- At a 390px scene width, Swan displays at approximately `121×151` and the
  half-lidded gaze, closed smile, tie, and both resting wings remain readable.
- QA sheet SHA-256:
  - alpha QA: `95558AE4B1AB902C2CF7DD1570463F8C62E4665CCED7EF7C9D20D10B5B6F588B`
  - approval sheet: `5653418D67E857037B2727B93E19E691273AFED102175F3DFF57DE23D0DB50DB`
  - mobile review: `D449F9F9B92B9236D842678DAFAB4BB1FC839A9E86AE39FD5B40B4641E727B1D`
  - final V-011 integration review:
    `78043EE824300AD72AEFD02CD33184FD9C1D0971E66484850C937A275C9B8902`

## Review result

Internal and independent source-provenance, identity, exact-crop, alpha,
hidden-RGB, spill, responsive-size, compression-budget, full-scene, 390px,
360px, and 200px-tall checks passed. Independent decoding measured composite
PSNR from 36.5 dB at 320w to 45.3 dB at 1280w and found no visible fringe or
blocking correction. The final approved V-011/V-012 integration proof also
passes character placement, chair depth, desk-edge, mug occlusion, and real
mobile-resource checks. The candidate remains in `drafts/` until explicit
owner approval.
