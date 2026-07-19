# V-004A — duck head atlas v07 feather color correction

- Use case: `precise-object-edit`
- Operation: deterministic local pixel correction; no generative redraw
- Image 1, sole edit target:
  `visuals/03-duck/rig-parts/head-atlas/approved/duck-rig-head-atlas--v06--approved.png`
- Image 2, read-only color authority:
  `visuals/03-duck/rig-parts/body-props-atlas/approved/duck-rig-body-actions--v02--approved.png`
- Output:
  `visuals/03-duck/rig-parts/head-atlas/approved/duck-rig-head-atlas--v07--approved.png`
- QA sheet:
  `visuals/99-review/contact-sheets/duck-rig-head-atlas--v07-color-correction-qa.png`
- Machine-readable QA report:
  `visuals/99-review/duck-rig-head-atlas--v07-color-correction-report.json`

## Edit specification

Color correction only. Do not redraw, move, resize, add, remove, or reshape any
component. Change only the pale pink feather-painted material in the assembled
head, featureless back-of-head shell, and the corresponding pale eye/lid plates.
Keep the existing painted lightness and shading structure. Match the warm cream
feather palette in the approved body-actions atlas, with the named source anchor
`#FDD8C3` mapping exactly to `#F6DCB5`.

Freeze all orange bill pixels, brown brow pixels, pupils, irises, dark lid lines,
warm-black ink, mouth/tongue pixels, every component's geometry and registration,
and the entire transparency plane. Image 2 is immutable and must not be written.

## Method

- Whitelist only the assembled head, featureless shell, and six pale eye/lid
  connected components by their exact approved v06 alpha bounds.
- Use conservative warm-pale color classification inside those components.
- Apply tight semantic keep-outs around the assembled bill and brows.
- Preserve Lab lightness and transfer only feather chroma toward the measured
  cream clusters in Image 2.
- Pin every in-mask exact `#FDD8C3` source pixel to exact `#F6DCB5`.
- Preserve the source alpha byte exactly; never touch transparent RGBA pixels.

## Validation record

- Generated: 2026-07-19
- Dimensions/mode: `1448×1086 RGBA`
- Changed RGB pixels: `37,135`
- Source/output nonzero-alpha pixels: `62,979 / 62,979`
- Exact named-anchor mappings: `112 / 112`
- Feather-shading Lab-lightness correlation: `0.9999378410`
- 95th-percentile Lab-lightness change: `1 / 255`
- Alpha plane: byte-identical
- RGB outside semantic feather mask: byte-identical
- Transparent RGBA pixels: byte-identical
- Source v06 SHA-256:
  `6ac120026c3813bf21531b62dc83de70a13b3a39fd3ef2c532e7d73fa44b8d69`
- Read-only authority v02 SHA-256:
  `990be64bfae7fd0676c4a3fa79e2259e71065225c3843fbffd99614f33a80b12`
- Output v07 SHA-256:
  `4de77220d740037e36897ccd15ce4882b2b29e74fb04e7feb175574c87dc4cd0`
- Original approved v06 remains unchanged and available beside v07.
