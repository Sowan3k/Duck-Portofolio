# V-011 — Scene depth layers, approved v01

- Use case: fixed-camera office stack for first paint, the static/Rive Swan,
  liftable props, and responsive runtime delivery
- Operation: deterministic segmentation only; no image generation, inpainting,
  recoloring, redraw, or new scene pixels
- Sole RGB authority:
  `visuals/04-scene-production/clean-plates/approved/office-clean-plate-telephone-contact--v03--approved.png`
- Source authority SHA-256:
  `541E9C1381F30819DCE831E964A57A96E925DEC629EFDDBDD13088738A97B5A8`
- Approved lossless PNGs:
  `visuals/04-scene-production/layers/source-png/approved/`
- Approved runtime files:
  - `visuals/04-scene-production/layers/avif/approved/`
  - `visuals/04-scene-production/layers/webp/approved/`
- Approved ownership masks:
  `visuals/04-scene-production/segmentation/masks/approved/`
- QA report:
  `visuals/99-review/v011-scene-depth-layers--v01-report.json`
- Status: owner-approved; promoted byte-identically on 2026-07-20

## Derivation decision

The approved clean plate is partitioned by one categorical `1448×1086` class
map. Every source pixel belongs to exactly one of four transparent full-canvas
layers:

1. `scene-background-wall` — wall, window, and fixed wall fixtures.
2. `scene-midground-furniture` — filing cabinet, bookcase, chair, right
   sideboard, and their grouped plants/objects.
3. `scene-desk-surface` — the desk plane and fixed desk-mounted furniture that
   must remain below the Swan.
4. `scene-desk-occluders` — only the retained pipe and coffee-mug silhouettes
   that must render above the Swan.

The desk is split into surface and occluder layers because a single foreground
desk plate would cover the calm Swan's resting hands. The pipe and mug use the
existing approved restore silhouettes at nonzero support. No Swan repair mask,
movable-prop repair mask, synthetic full-width desk ribbon, or removed-prop
mask is used as depth geometry.

Runtime z-order is background, midground, Skills shelf cutout, desk surface,
Swan, desk occluders, then the approved résumé-folder, telephone-handset, and
contact-card cutouts. All layers retain the full scene origin `(0,0)`.

## Source outputs

Each layer has a native `1448×1086` RGBA PNG and a direct `2896×2172` lossless
master. The retina set partitions one direct RGB Lanczos upscale of the clean
plate using a nearest-neighbour resize of the categorical map; RGBA layers are
never independently or sequentially upscaled.

| Layer | Native SHA-256 | Retina SHA-256 |
|---|---|---|
| Background wall | `148157BA0D927255AAF7091CA3372F9034291A71202ED3863E28D615A6361565` | `DAC5B33B69576215860286646FCE8F00B7BBF0988B4AF9BFE2CFDE942590CFF3` |
| Midground furniture | `98AC0D64B5C55C956567628371C07578D4B38EBE5ABDB53D14FA2D458F3CD5AC` | `37CE514A2DEA6030E7823A1D3DB0E6037B3EFF2A2134CAAAB79E2876563BD59D` |
| Desk surface | `6AAD84B8851F7FCE25AC5FC142C47C3E5C2661DBFA5EA3C8CC4FB55265406267` | `7AD961C9D97925DD72B747DC0D148243599965ED96F59CB3C63252A73A389B01` |
| Desk occluders | `4FB5AC5DDBB8A6A41775BD9508217B40DF78134330E1480C2B52C45936A213E7` | `8F610AD05AD00A9DCD1F65B5D99D4F609F33EAB1A489FDFCC18A7F2B16D85C6F` |

The saved ownership map and four binary masks are under
`visuals/04-scene-production/segmentation/masks/` as
`office-mask-depth-*--v01.png`.

## Runtime outputs and budgets

Every runtime size is derived directly from the clean RGB authority plus the
categorical map. AVIF uses quality 58, speed 6, 4:4:4 plus a lossless alpha
plane; WebP uses quality 84, method 6, and exact alpha/hidden-RGB handling.
Each runtime layer receives an
eight-pixel RGB bleed outside its still-binary visible alpha, using the same
clean-plate pixels. This invisible codec context removes block seams at class
boundaries; the lossless PNG authorities retain strictly zero hidden RGB.

| Width | Dimensions | AVIF pack | WebP pack | AVIF PSNR / MAE | WebP PSNR / MAE |
|---:|---:|---:|---:|---:|---:|
| 724 | 724×543 | 69,151 B | 81,102 B | 35.594 dB / 2.966 | 35.238 dB / 3.118 |
| 1448 | 1448×1086 | 192,000 B | 252,074 B | 36.979 dB / 2.664 | 36.065 dB / 2.924 |
| 2896 | 2896×2172 | 400,200 B | 575,838 B | 41.068 dB / 1.682 | 39.342 dB / 2.031 |

The largest four-layer pack remains below the 700 KB scene-art ceiling in both
formats. Decoded alpha is byte-exact binary `{0,255}` for every layer, size,
and format; alpha IoU is `1.0`, and the reconstructed scene alpha is `255` at
every pixel.

## QA record

- Native ownership counts: background `411,387`, midground `493,704`, desk
  surface `651,402`, desk occluders `16,035`; total `1,572,528` pixels.
- The four native masks contain only binary alpha, cover all pixels, have zero
  pairwise overlap, and leave zero uncovered pixels.
- Hidden RGB is zero in every transparent source pixel.
- Native and retina lossless stacks reproduce their direct clean-plate targets
  exactly: zero changed pixels, MAE `0`, maximum error `0`, final alpha `255`.
- Runtime decoded composites pass the project gate of PSNR ≥35 dB or
  SSIM ≥0.985 with RGB MAE ≤3.5. Exact values and every file hash are recorded
  in the JSON report.
- Two-pixel boundary-ring MAE is `1.857–3.704`; the boundary/global MAE ratio
  is `1.104–1.209`, below the `1.25` no-seam gate at every size and format.
- Working integration uses V-005 at `(689,176)`, displayed at `448×560`. The
  chair stays behind Swan, the desk surface stays below both resting hands,
  and the mug provides the only current meaningful foreground overlap. The
  pipe is retained for future action poses.
- Mobile QA exercises the decoded `724w` WebP layer pack plus the decoded
  `640w` V-005 WebP, then displays that real resource stack at 390 and 360 CSS
  pixels; it is not merely a reduction of the lossless native composite.
- Resting-state QA re-adds the approved Skills book at `(515,320)`, résumé
  folder at `(697,796)`, handset at `(1108,697)`, and contact card at
  `(1242,849)` without restoring any of them into the clean-plate layers.
- V-005 remains a working candidate and is not promoted by this V-011 review.

Review files:

- `visuals/99-review/contact-sheets/scene-depth-layers--v01-alpha-qa.png`
  — SHA-256
  `03EA2238C707BD81EF32183FCC75DF85CE9C614D4B4DB44AB031D0B8744DEFA5`
- `visuals/99-review/contact-sheets/v011-scene-depth-layers-approval-set-v01.png`
  — SHA-256
  `4E62B3EC85603FE38433B29CBE89DCB136D042EB955980A1A1F9BDE87CE82F7B`
- `visuals/99-review/contact-sheets/v011-scene-depth-layers-mobile-review-v01.png`
  — SHA-256
  `D441DD0416312C7FAEFDF2B52F57B9F3625F1F4565C0198F1F4891B1CDD49AFB`

## Review result

Internal and independent provenance, mask-union, overlap, hidden-RGB,
exact-reconstruction, responsive decode, exact-alpha, boundary-seam, payload,
full-scene, prop-resting, and real-resource mobile checks passed. Owner approval
was received on 2026-07-20. Eight lossless PNGs, twenty-four runtime files, and
five ownership masks were copied into their `approved/` folders with zero hash
drift; draft evidence remains preserved.
