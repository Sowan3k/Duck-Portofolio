# V-060 - Final responsive runtime and scene-budget pack

- Outcome: pre-development visual delivery gate closed
- Method: deterministic derivation from already approved PNG authorities
- Image generation: not used; no source artwork was redrawn or altered
- Runtime report: `visuals/99-review/v060-final-runtime-exports--v01-report.json`
- AVIF scene-budget report: `visuals/99-review/v060-scene-budget-avif--v01-report.json`
- WebP scene-budget report: `visuals/99-review/v060-scene-budget-webp--v01-report.json`
- Status: complete; independent visual and mechanical final audits passed with zero blockers

## Delivered runtime set

V-060 adds 108 responsive files derived independently from 18 approved PNG
sources:

- four V-012 resting-scene props: 12 AVIF and 12 WebP files;
- thirteen V-020-V-029 physical-UI states: 39 AVIF and 39 WebP files;
- one V-032 404 illustration: three AVIF and three WebP files.

Each asset stores its files in a source-adjacent `approved/runtime/` directory.
Filenames remove the source master's trailing `--approved` marker and append
the actual pixel width, for example
`dialogue-panel-blank--v01-960w.avif`.

### Scene-prop tiers

| Asset | Widths | Exact sizes |
|---|---|---|
| Resume folder | 170 / 341 / 682 | 170x102 / 341x205 / 682x410 |
| Skills shelf book | 30 / 59 / 118 | 30x56 / 59x113 / 118x226 |
| Telephone handset | 52 / 105 / 210 | 52x64 / 105x128 / 210x256 |
| Resting contact card | 64 / 128 / 256 | 64x42 / 128x85 / 256x170 |

These correspond to the 724 / 1448 / 2896 scene tiers. They preserve their
registered canvases; runtime integration must not trim their transparent
bounds.

### Physical UI and supporting tiers

| Asset | Widths |
|---|---|
| V-020 dialogue panel | 480 / 960 / 1920 |
| V-021 About card | 480 / 960 / 1920 |
| V-022 storybook closed | 480 / 960 / 1920 |
| V-022 storybook open | 600 / 1200 / 2400 |
| V-023 folder closed | 480 / 960 / 1920 |
| V-023 folder open | 600 / 1200 / 2400 |
| V-024 Skills book closed | 320 / 640 / 1280 |
| V-024 Skills book open | 600 / 1200 / 2400 |
| V-025 award plaque | 480 / 960 / 1920 |
| V-026 certificate | 600 / 1200 / 2400 |
| V-027 resume document | 400 / 800 / 1600 |
| V-028 contact card v02 | 360 / 720 / 1440 |
| V-029 whiteboard | 400 / 800 / 1600 |
| V-032 404 illustration | 400 / 800 / 1600 |

V-022 and V-023 paired states require a fixed, bottom-centered stage during
development. V-024 changes from portrait closed to landscape open and must use
a fixed wrapper with `object-fit: contain`; its contact shadow must never be
trimmed. Only the approved V-028 contact-card v02 is packaged.

## Encoding and invariants

Every size is derived directly from its approved PNG master; sizes are never
chained. RGBA assets use premultiplied-alpha Lanczos resizing. V-032 remains
opaque RGB.

- AVIF: quality 58, speed 6, 4:4:4, lossless alpha.
- Physical UI and V-032 WebP: quality 82, method 6, exact alpha.
- V-012 scene-prop WebP: quality 78, method 6, exact alpha.
- No EXIF, ICC, or XMP metadata.

Across all 108 files:

- failed file gates: 0;
- minimum composited PSNR: 36.2448 dB;
- maximum composited MAE: 2.5771;
- maximum AVIF alpha MAE: 0.0;
- total size across every alternative: 6,285,795 bytes.

SSIM is reported but is not the sole pass criterion for inked illustration.
Each matte passes when PSNR is at least 35 dB or SSIM is at least 0.985, with
MAE no greater than 3.5. This matches the existing V-011 runtime-quality rule.

Review evidence:

- overview: `visuals/99-review/contact-sheets/v060-runtime-exports-overview-v01.png`
- exact 390px stages: `visuals/99-review/contact-sheets/v060-runtime-exports-390px-review-v01.png`
- V-012 integration: `visuals/99-review/contact-sheets/v060-runtime-props-integration-v01.png`
- final WebP budget: `visuals/99-review/contact-sheets/v060-scene-budget-webp-v01.png`

## Largest-breakpoint production scene

The self-contained selected stacks live at:

- `visuals/04-scene-production/production-stack/approved/avif/`
- `visuals/04-scene-production/production-stack/approved/webp/`

Each contains exactly nine resources: four V-011 depth layers, V-005 calm Swan,
and four V-012 resting props.

| Format | Total | 700,000-byte headroom | Result |
|---|---:|---:|---|
| AVIF | 508,051 bytes | 191,949 bytes | pass |
| WebP | 695,540 bytes | 4,460 bytes | pass |

The WebP production stack is a new optimized runtime selection; it does not
overwrite the already approved V-011, V-005, or V-012 files. Its nine encodes
were promoted byte-identically from the independent budget audit. Per-file
PSNR is 40.675-43.441 dB, every audited codec alpha plane is exact, and the
integrated composite passes at 38.898 dB PSNR and 2.1288 MAE. Boundary-ring MAE
is 2.4347 with a 1.1437 ring/global ratio, below the existing V-011 seam gates.

The approved PNG masters remain the immutable artwork authorities. V-060 owns
only responsive delivery encodes and the explicit production-stack selection.
Rive/CSS/SVG behavior and audio conversion/integration remain development-owned
runtime work; they are not missing V-060 outputs or pre-development visual
blockers.

## Final independent audit

The final read-only audits passed on 2026-07-20. All 108 responsive file hashes,
dimensions, modes, metadata checks, alpha checks, decoded-quality metrics, and
group budgets reproduce the runtime report with zero mismatches. Both nine-file
production stacks reproduce their recorded totals and pass file, composite, and
seam gates. Visual inspection found no halo, clipping, distortion, registration
drift, state mismatch, or visible compression failure.

The WebP production stack has 4,460 bytes of remaining budget headroom. Treat
those nine files as immutable during development; copying is allowed, but
re-encoding is not.
