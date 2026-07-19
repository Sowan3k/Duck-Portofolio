# V-033 — Deterministic Swan avatar and favicon source, candidate 1

- Use case: small identity derivative with transparent and opaque outputs
- Approved pixel authority:
  `visuals/03-duck/rig-parts/head-atlas/approved/duck-rig-head-atlas--v07--approved.png`
- Native padded derivative:
  `visuals/06-supporting/avatar-favicon/drafts/swan-head-avatar--v01-native.png`
- Transparent avatar candidates:
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-avatar--v01-512.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-avatar--v01-192.png`
- Opaque banker-green favicon candidates:
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01-512.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01-192.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01-64.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01-32.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01-16.png`
  - `visuals/06-supporting/avatar-favicon/drafts/swan-head-favicon--v01.ico`
- Approved production set:
  `visuals/06-supporting/avatar-favicon/approved/`
- Individual QA:
  `visuals/99-review/contact-sheets/swan-head-avatar-favicon--v01-qa.png`
- Paired owner-review sheet:
  `visuals/99-review/contact-sheets/v032-v033-404-avatar-approval-set-v01.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v032-v033-404-avatar-mobile-review-v01.png`
- Status: owner-approved and promoted byte-identically on 2026-07-20

## Derivation decision

No image-generation prompt or redraw was used. V-033 is extracted directly
from the complete front head in the owner-approved, feather-color-corrected v07
transparent rig atlas. This keeps Swan's exact bill, eyes, brows, feather
silhouette, palette, texture, and alpha edge.

The opaque favicon plate uses the locked banker's-lamp green `#2E7D4F` so the
cream head and orange bill remain legible in both light and dark browser chrome.
No circle, badge, border, symbol, letter, or additional artwork is introduced.

## Processing record

- Approved atlas: 1448×1086 RGBA; SHA-256
  `4DE77220D740037E36897CCD15CE4882B2B29E74FB04E7FEB175574C87DC4CD0`.
- Exact assembled-head alpha bbox: `(132,64)–(309,294)`, 177×230.
- Exact padded extraction: `(120,52)–(321,306)`, 201×254. The head bbox within
  it is `(12,12)–(189,242)`; no nontransparent pixel touches an edge.
- `tmp/imagegen/prepare_404_avatar_assets.py` uses premultiplied-alpha Lanczos
  directly from the native padded extraction for each size. It never sharpens,
  thresholds, recolors, thickens outlines, traces, or chains multiple resizes.
  A deterministic edge pass preserves alpha exactly and replaces only
  impossible green- or magenta-dominant Lanczos ringing on partially
  transparent pixels with the nearest fully opaque approved-source color.
- Expected meaningful-alpha bboxes (`alpha > 15`) are:
  - 512: `(105,61)–(405,450)`
  - 192: `(40,23)–(152,168)`
- The transparent variants retain alpha 0–255, transparent corners, zero RGB
  beneath alpha zero, and no chroma spill. The edge cleanup changes RGB on only
  401 partially transparent pixels at 512px and 50 at 192px; alpha is
  byte-identical before and after cleanup, and zero pixels outside the partial
  edge are changed. Both outputs contain zero green-dominant pixels at the
  audit threshold and zero magenta-dominant partial-edge pixels.
- Opaque RGB favicon sizes are generated independently at 512, 192, 64, 32,
  and 16px. The ICO bundle contains 16, 32, 48, and 64px frames.
- SHA-256:
  - native padded derivative: `84A968A4228C9D2CC2E50BB34C6AFF2080C8D4CB819A55AF490B91B4CD23C449`
  - transparent 512: `A9FDEE7A35E50EEBD323466032BFAAC71FADDC67ED93D9F44561974E0D6F25AE`
  - transparent 192: `67372854F10A0257BF009E6C0448C1D5897B0D7DB6D910BD5EA834C8D1248B77`
  - green 512: `8438D34A2F798F41F61103480C6A55907092BE4EA79CF35C39D9892694FA6E15`
  - green 192: `A66F8651C3D6F02D3578CC109BEE5168612BCAB58840E55ED355998F4A9D80D8`
  - green 64: `033DD611AE0064959F769177A6CA0A3A5708A5EBBECCB93B2876CAACA854C1E3`
  - green 32: `21824A120CC18D4940C51525F71ED7691516CFCA649808732BB62853EEAF4EA9`
  - green 16: `571DA8461BF3451094DA751F3272C5B3B82C980286B3F4A398F94F4EFD8CAF91`
  - ICO bundle: `3B9052E42153BF8D00975D5966655EA760B9025E778A1882C2A88C0CE6BAD68C`
  - individual QA: `B252663D8B438CA9DA4DD9D6DDAA0B1133057728043FD3DAEC78CA2AD0453C0F`
  - paired review: `17304B033FCBED4FCA99F7F7A2D099F7631FCCDA502F2699D7938DBAB8355294`
  - mobile review: `F1062695167F9E1FFF3E76EF118DF33DA29DB6D30A7EFDE98E2B0322EFDCB719`

## Review result

Internal and independent source-provenance, identity, crop, alpha, hidden-RGB,
spill, banker-green plate, maskable-safe-zone, and 512/192/64/32/16 readability
checks passed. Owner approved the paired review on 2026-07-20; every approved
file is byte-identical to its reviewed candidate.
