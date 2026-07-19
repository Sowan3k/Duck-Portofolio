# V-031 — Swan-at-desk OG/social image, candidate 1

- Use case: opaque social-preview image derived from approved art
- Identity and pixel authority:
  `visuals/02-master-scene/upscaled/master-scene--v01--approved--2896w.png`
- Lossless working crop:
  `visuals/06-supporting/og-image/drafts/og-swan-at-desk--v01-source-2400x1260.png`
- Candidate output:
  `visuals/06-supporting/og-image/drafts/og-swan-at-desk--v01.png`
- Approved production asset:
  `visuals/06-supporting/og-image/approved/og-swan-at-desk--v01--approved.png`
- Individual QA:
  `visuals/99-review/contact-sheets/og-swan-at-desk--v01-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v030-v031-loading-social-approval-set-v01.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v030-v031-loading-social-mobile-review-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-19

## Derivation decision

No image-generation prompt was used. V-031 is a deterministic crop of the
approved master scene so Swan's identity, expression, newspaper, office layout,
materials, lighting, and every retained pixel relationship remain canonical.
This avoids character drift and introduces no invented content.

## Processing record

- Approved source: 2896×2172 RGBA; source SHA-256
  `ECC63E50ABC7CB534DF24340669F6EC27163CD1BB1585F7D25D4E386FA7D915E`.
- Exact Pillow-exclusive crop box: `(174,150,2894,1578)`.
- The 2720×1428 crop is exact 40:21. It is resized once with Lanczos at an
  exact factor of 15/17 to 2400×1260, verified fully opaque, and converted to
  RGB. No sharpening, denoising, recoloring, text, compositing, generative fill,
  or new artwork is applied.
- The 1200×630 candidate is derived from that 2400×1260 lossless working crop.
- Face/bill placement in the working crop is approximately
  `x 1252–1669, y 232–588`; the Swan/newspaper cluster is approximately
  `x 861–1888, y 201–1167`.
- Swan's face remains fully inside the 10% inset, centered square, centered 4:5,
  and centered 4:3 fallback crops. The full social crop retains the rainy
  window, lamp, monitor, bookcase, whiteboard, telephone, Swan's complete head,
  the readable newspaper silhouette, and both hands.
- `tmp/imagegen/prepare_loading_social_assets.py` performs the deterministic
  crop, resize, export, and QA-sheet construction.
- SHA-256:
  - 2400×1260 lossless crop: `7A57040A6E13A2C34151B31CD471AB6CF528E761880C451DB93A5FF47F967649`
  - 1200×630 candidate: `4A14EFBF47817F8DC95C3493A1B24DA974759AFD60C5198F1065919146E5E913`
  - individual QA: `F9BEAB6E5D39992BF4191878E05C6ED42AAA52827D03556650C7B59F643DB21C`
  - paired review: `B7151A1A49B8DBD10B10EBE13BD215F0315A08991C23CF1BD90E8454ACAC082E`
  - mobile review: `2E4DDD6B121B90BBF848D6E2035DE415F83EF4CE63BDAD9E0D239475423446A3`

## Review result

Internal identity, crop, opacity, social-ratio, focal-safe-zone, 390px, 240px,
120px, square-fallback, and no-new-content checks passed. Owner approved the
paired review on 2026-07-19; the approved file is byte-identical to the
reviewed candidate.
