# V-034 — Approved framed entry portrait v04

- Use case: final framed entry/loading-screen portrait
- Selected likeness source:
  `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v03b.png`
- Frame, plaque, margin, and outer-backdrop authority:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v01--approved.png`
- Production draft:
  `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v04.png`
- QA report:
  `visuals/99-review/v034-entry-portrait--v04-report.json`
- Owner-approval sheet:
  `visuals/99-review/contact-sheets/v034-entry-portrait-approval-set-v04.png`
- Detailed composite QA:
  `visuals/99-review/contact-sheets/v034-entry-portrait-v04-qa.png`
- Exact 390 px review render:
  `visuals/99-review/contact-sheets/v034-entry-portrait-mobile-390-v04.png`
- Approved master:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v04--approved.png`
- Approved reusable inner portrait:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v04-inner--approved.png`
- Responsive delivery report:
  `visuals/99-review/v034-entry-portrait--v04-delivery-report.json`
- Status: owner-approved, promoted, and responsive delivery complete on
  2026-07-20

## Selection and generation record

The owner selected candidate B from the three fresh v03 generations. No new
image-generation call was used for v04. The selected raw v03b PNG has SHA-256
`D9FDDE3E34E2E8C28954D4BCC9CDF6A33CCB863BC57D884F1CCFB38382565DEA`.
Its exact successful generation prompt and both attached references are recorded
unchanged in `34-entry-portrait-v3.md`.

## Deterministic composition

`tmp/imagegen/prepare_v034_v04.py` performs the versioned composite:

1. Crop selected v03b at `(0,60)–(1023,1339)`, retaining the complete hair,
   face, neck, shoulders, and blank shirt while removing only excess lower-shirt
   area.
2. Resize that exact crop once with Lanczos into the recorded v01 inner-portrait
   aperture `(423,493)–(2172,2679)`.
3. Composite through an 8 px smooth aperture-edge feather. The feather never
   leaves the recorded inner box.
4. Preserve the approved v01 wooden frame, plaque, outer backdrop, canvas,
   margins, and all pixels outside the aperture byte-identically.

The preliminary 32 px feather was rejected internally before owner review
because it exposed thin remnants of the old shoulder silhouette at the inner
edges. That preliminary output is retained only under the gitignored `tmp/`
workspace. The filed v04 uses the corrected 8 px aperture blend and shows no
old-portrait remnant.

## QA results

- Candidate: `2600×3250 RGB`, fully opaque.
- SHA-256:
  `2BCF03EAD5FF52EED95D35DC1AA2E71D45AAF459E1E7A761E927D9C6E258361E`.
- Exact changed-pixel bounding box: `(424,494)–(2171,2678)`.
- Changed pixels outside the recorded inner box: `0`.
- Plaque: byte-identical to approved v01 and visibly blank.
- Frame, outer cream backdrop, corners, canvas, and margins: byte-identical to
  approved v01.
- Frame margins remain 6.85% left, 7.14% top, 6.73% right, and 8.65% bottom.
- Shirt: plain dark fabric with no visible text, letters, symbols, or logo.
- Full-resolution and exact 390 px review: no text, clipping, seam, old-portrait
  ghost, or readability blocker found internally.
- Mechanical gates: all pass. Independent visual and mechanical audits also
  pass with no blocker, artifact, hash mismatch, or stale derivative generated.

Review hashes:

- detailed QA:
  `1F48BFAE475EA407868B510108FE881E42A9C7D9DF0728D51211C478AB7B1136`
- owner-approval sheet:
  `233B1D2B5FFFE17225BDC527335C2E30D12AAD262E9BBDD622DD1EB99A6FE4AE`
- 390 px render:
  `E414B23EF610C2944B63D0597A7565AC5FF743AE7095B8E233B15EC756CBBE87`
- QA report:
  `C2FBCC719EA14A3242E04CEC885EE6A27E344F64791F563844718D8674486AF8`

## Owner approval and final delivery

The owner approved v04 on 2026-07-20. The production draft was promoted
byte-identically as
`visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v04--approved.png`:

- dimensions/mode: `2600×3250 RGB`
- SHA-256:
  `2BCF03EAD5FF52EED95D35DC1AA2E71D45AAF459E1E7A761E927D9C6E258361E`

The reusable inner portrait was derived deterministically from aperture
`(423,493)–(2172,2679)`, resized once with Lanczos to `1200×1500 RGB`, and
promoted byte-identically between its draft and approved copies:

- approved path:
  `visuals/06-supporting/entry-portrait/approved/entry-portrait-sowan--v04-inner--approved.png`
- SHA-256:
  `36C94DB8008033DE1A71665B1D003B93EE8D2F09816490D5C380CD64A10F1C94`

Twelve versioned runtime files were each encoded independently from the
corresponding lossless authority:

| Family | Widths | Formats | Encoding |
|---|---|---|---|
| Framed portrait | 400, 800, 1600 | AVIF, WebP | AVIF q58/speed 6/4:4:4; WebP q82/method 6 |
| Inner portrait | 320, 640, 1200 | AVIF, WebP | AVIF q58/speed 6/4:4:4; WebP q82/method 6 |

Draft runtime folder:
`visuals/06-supporting/entry-portrait/drafts/runtime/`.
Approved runtime folder:
`visuals/06-supporting/entry-portrait/approved/runtime/`.

Final delivery QA:

- runtime count: 12 in drafts and the same 12 in approved; every paired file is
  byte-identical
- combined approved runtime weight: `1,108,390 bytes`
- minimum decoded PSNR: `35.155461 dB`
- minimum decoded SSIM: `0.903672`
- maximum decoded mean absolute RGB error: `2.983685`
- all dimensions, opaque-RGB, single-frame, stripped-metadata, decoded-quality,
  and per-file byte-budget gates pass
- framed and inner portraits remain clear in the exact 390 px review
- no text, letters, symbols, brand logo, seam, clipping, or stale portrait
  remnant is visible
- fresh independent final-delivery mechanical and visual audits pass with zero
  mismatches, defects, or blockers; the mechanical audit reproduced the crop,
  every runtime metric, every hash, and all fourteen preserved v01 file hashes

Final evidence:

- delivery report:
  `visuals/99-review/v034-entry-portrait--v04-delivery-report.json`
  (`3A439D555BD42F48DBCB54F0FA90F9D794EE3BBC6FE3BC9C7B4147160991D752`)
- responsive decode sheet:
  `visuals/99-review/contact-sheets/v034-entry-portrait-runtime-v04.png`
  (`4AB5BEE06DC75A152D0BADC6ED1607DF6FEFA5DB8CC1EF84CB16D425691012A4`)
- mobile review sheet:
  `visuals/99-review/contact-sheets/v034-entry-portrait-mobile-review-v04.png`
  (`71918D15D13C5309A3E8635B47CE84C8E7467ECE6EE5940B05C3AB9530D9B210`)

The complete approved v01 set—master, reusable inner portrait, and twelve
runtime files—remains byte-identical and preserved as superseded history. No
v02 or v03 runtime set exists. The v04 files above are the only current V-034
authorities for development.
