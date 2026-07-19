# V-040 - Authentic project media, candidate v01

- Use case: responsive media inside the Projects storybook and standard view
- Method: authentic owner-provided captures, curated with deterministic crop,
  resize, or presentation staging only
- Image generation: not used; no interface was invented, redrawn, or recreated
- Candidate masters: `visuals/07-project-media/drafts/`
- Candidate runtime set: `visuals/07-project-media/drafts/runtime/`
- QA report: `visuals/99-review/v040-project-media--v01-report.json`
- Owner-review sheet:
  `visuals/99-review/contact-sheets/v040-project-media-approval-set-v01.png`
- Mobile review:
  `visuals/99-review/contact-sheets/v040-project-media-mobile-review-v01.png`
- Exact 390px layout review:
  `visuals/99-review/contact-sheets/v040-project-media-390px-review-v01.png`
- Privacy/provenance review:
  `visuals/99-review/contact-sheets/v040-project-media-privacy-qa-v01.png`
- Status: internal and independent QA passed; awaiting owner review before promotion

## Locked delivery system

Every master is an opaque `1440x720` RGB PNG at an exact 2:1 ratio. Runtime
exports are encoded independently from each master at `360x180`, `720x360`,
and `1440x720` in both AVIF and WebP. AVIF uses quality 68, speed 6, and 4:4:4
subsampling. WebP uses quality 90 and method 6.

The six selected media files are:

| Project | Candidate | Authentic source and transformation |
|---|---|---|
| BahasaBot | `bahasabot-overview--v01.png` | Complete `1919x914` frame from `bahasabot--source-03--2026-05-31.png`, resized to `1440x686` and centered at `(0,17)`; thin vertical matte only, no crop |
| BahasaBot | `bahasabot-course-builder--v01.png` | `bahasabot--source-01--2026-05-19.png`, exact crop `(312,36)-(1912,836)`, resized once; account rail excluded |
| My Bibi | `my-bibi-chat--v01.png` | `my-bibi--desktop-us-dark.png`, exact top crop `(0,0)-(1440,720)`; lower account block excluded |
| My Bibi | `my-bibi-mobile-flow--v01.png` | Three complete privacy-safe phone captures resized uniformly and staged on one flat matte; no UI content changed |
| USM Evently | `usm-evently-overview--v01.png` | `usm-evently--01-home.png`, safe hero strip `(0,0)-(2560,800)` contained without horizontal crop; photography below the strip excluded |
| USM Evently | `usm-evently-analytics--v01.png` | `usm-evently--09-analytics.png`, exact crop `(0,0)-(2560,1280)`; contact footer excluded |

Virtual Zara remains a described-only fourth project entry by the owner's
confidentiality decision. V-040 contains no Virtual Zara screenshot, generated
mockup, authentic-looking recreation, or inferred interface.

## Privacy decisions

Privacy-sensitive content is excluded by crop or complete source rejection;
soft blur is never used as a substitute. The public set excludes the
BahasaBot user directory, My Bibi settings/account regions, Evently attendee
photography, credentials, profile data, payment-like fields, QR tickets, and
contact footers. Rejected pixels do not appear in the privacy review sheet.
No sensitive values are copied into this sidecar or the QA report.

The My Bibi onboarding capture contains its original intentionally blurred
in-product background. That blur is part of the authentic application capture,
not a privacy redaction added by this pipeline.

## Master hashes

| Candidate | Bytes | SHA-256 |
|---|---:|---|
| `bahasabot-overview--v01.png` | 344,650 | `AED7053ECEEE82DFD3585A8B8B1890E9FB16E84E7D6ABAA467A5EC3BE6B6AAAD` |
| `bahasabot-course-builder--v01.png` | 436,535 | `AC95B6B7F5827D002CF8941C11DAECEC5F08A18D85916E7933F50E21C00D5F69` |
| `my-bibi-chat--v01.png` | 109,431 | `B2E9EDED99DB1D532D821E2F1893A6F45F5F8044206001F7A330F66A322288F1` |
| `my-bibi-mobile-flow--v01.png` | 212,189 | `A3101C2FC8B83F0594E31FD11013951118A7FDAEE7618F136DDB88224B34C80C` |
| `usm-evently-overview--v01.png` | 451,583 | `8C87947C8DE9F934DC6E31AF1CBB9FF7CF790FFDC0A1903D25F358264FAD7D16` |
| `usm-evently-analytics--v01.png` | 139,079 | `C76E5C994BD842187CFD3B282D08145EF3A181FA8397386E69E06CC9F7AFF2A7` |

## QA result

All six PNGs are exact-size opaque RGB masters with no EXIF or ancillary
metadata. All 36 runtime files decode at the expected dimensions and mode and
pass the following gates: PSNR at least 35 dB, SSIM at least 0.985, mean
absolute error at most 3.5, and width-specific payload budgets. Across the
complete responsive set:

- minimum PSNR: 35.840 dB
- minimum SSIM: 0.988360
- maximum mean absolute error: 1.3630
- largest runtime file: 71,600 bytes
- total runtime payload across all alternatives: 778,208 bytes
- failed runtime gates: 0

The `360x180` decoded WebP variants were inspected at native display size, and
the decoded 720w variants were inspected at an exact `390x195` CSS display
size. The source inventory and privacy boundaries received an independent
review before export. A second independent audit then reproduced every source,
master, runtime, and review hash plus all 36 decoded metrics with zero delta.
Independent visual review also found and rejected an initial clipped navigation
label; the overview was rebuilt from the complete source frame and passed the
repeat review.

Final report SHA-256:
`AA5040A1FD376FFEFE265F4395EBE7FBD02E535F884D54E446A937BB3C7674E5`.

Review sheet SHA-256 values:

- owner-review: `502561B6935B367A5D2F295942859F257480B5BF3A1A8B74D85AF516154EC7DC`
- native-360px review: `CFA86DBA17C0EFDEDBE8CB4C964256A64E46519B2201E5897547A83AA1B9D1CB`
- exact-390px review: `A415808C43D5A3B45D788F0A1D1EFFD6143FBDC797E139F29BF3A9B5CD313705`
- privacy/provenance review: `EE4617F987779A4CF885DAF97DED0344335EE7FAFA9A3D770E9C8BB1D9B85392`

Promotion is intentionally deferred until the owner approves the review sheet.
When approved, all six masters and all 36 runtime files must be copied
byte-identically into `visuals/07-project-media/approved/` and its `runtime/`
subdirectory; no re-encoding is allowed during promotion.
