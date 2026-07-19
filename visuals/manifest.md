# Visual asset manifest

Status values: **ready**, **candidate review**, **approved**, **gated**,
**pending input**, **derived later**, and **excluded from raster generation**.
“Gated” means its required canonical reference is not approved yet.

| ID | Asset group | Method | Required states / outputs | Depends on | Status |
|---|---|---|---|---|---|
| V-001 | Master office scene | Generate + targeted edits | Approved PNG, one ≥2600 px upscale, canonical reference | Locked style paragraph + inspiration-only Image 1 | **approved** |
| V-002 | Swan pose sheet | Generate | One unlabeled grid; pose, bill, eye, brow, wing, newspaper states | V-001 | **approved** |
| V-003 | Swan expression sheet | Generate | One unlabeled grid; eleven approved acting states | V-001, V-002 | **approved** |
| V-004 | Swan rig-parts source | Generate + local alpha preparation | One head/face component atlas plus one upper-body action/prop atlas; transparent PNG working sources | V-001–003 | **approved** |
| V-005 | Calm static Swan | Derive | Transparent first-paint/reduced-motion pose; 320/640/1280 PNG + AVIF/WebP | V-001–004 | **candidate review — v01** |
| V-010 | Office clean plate | Edit/inpaint | Scene with occluded areas restored behind liftable assets | V-001–004 | **approved — V-010A/B/C plus telephone/contact V-010D v03** |
| V-011 | Scene depth layers | Segment/derive | Background wall, midground furniture, desk surface and precise occluders; native/retina PNG + 724/1448/2896 AVIF/WebP | V-001, V-010, V-012 | **approved — v01** |
| V-012 | Interactive prop cutouts | Segment/edit | Clearly isolated moving scene targets where separation is needed | V-010 | **approved — folder, Skills shelf book, telephone handset, and resting contact card** |
| V-013 | Prop activation overlays | Derive during development | Use approved cutouts plus DOM/CSS/SVG highlights; no new raster source required | V-010, V-012, V-020–029 | **derived later** |
| V-020 | Dialogue panel skin | Generate | Blank physical panel, no text or controls | V-001–003 | **approved — v01** |
| V-021 | About desk card | Generate | Blank card face | V-001–003 | **approved — v01** |
| V-022 | Projects storybook | Generate/edit | Closed cover and open blank spread | V-001–003 | **approved — paired v01** |
| V-023 | Experience folder | Generate/edit | Closed and open folder with blank papers | V-001–003 | **approved — paired v01** |
| V-024 | Skills book | Generate/edit | Complete closed transition/desk state and open blank spread | V-001–003, approved V-012B | **approved — paired v01** |
| V-025 | Award detail card | Generate | Blank trophy-detail/plaque region | V-001–003 | **approved — v01** |
| V-026 | Education certificate frame | Generate/edit | Scene-consistent frame and blank enlarged certificate | V-001–003 | **approved — v01** |
| V-027 | Resume document | Generate | Blank printed-paper surface; never gates the real PDF | V-001–003 | **approved — v01** |
| V-028 | Contact business card | Generate | Blank card tied visually to the telephone | V-001–003 | **approved — blank front v02** |
| V-029 | Whiteboard enlargement | Generate/edit | Blank writing surface and matching frame | V-001–003 | **approved — v01** |
| V-030 | Loading vignette | Generate | Office door and blank pinned note | V-001–003 | **approved — v01; retained as alternate, entry screen now uses V-034** |
| V-031 | OG/social image | Crop/derive or generate | Swan at desk; social-safe crop | V-001–003 | **approved — v01** |
| V-032 | 404 illustration | Generate | Swan alone; blank composition for DOM caption | V-001–003 | **approved — v01** |
| V-033 | Avatar/favicon source | Derive | Simplified Swan head crop, no redesign | V-002–004 | **approved — v01** |
| V-034 | Entry portrait of Sowan | Generate from owner photo + canonical trio | Framed cartoon portrait (wooden frame, blank plaque), head-and-shoulders, warm backdrop, no text/logos; welcome text is DOM | V-001–003 + `visuals/Sowan's real photo.jpeg` | **approved — v01** |
| V-040 | Featured project screenshots | Authentic capture | Desktop/mobile captures and consistent thumbnails | Final project list + URLs/builds | **pending input** |
| V-041 | Award/certificate source media | Owner-supplied/capture | Authentic PIXEL Silver and education artifacts if displayed | Source artifacts | **pending input** |
| V-050 | Rain, steam, smoke, dust, clock hands, plant sway, lamp glow | CSS/SVG/Rive later | Lightweight runtime behavior | Development | **excluded from raster generation** |
| V-051 | Rive state machine | Rig during development | `idle`, `read`, `notice`, `talk`, `think`, `sleep`, `return` | V-004 | **derived later** |
| V-052 | Labels, dialogue, headlines, notes, pages, UI controls | DOM/SVG later | Accessible live text and controls | Development/content | **excluded from raster generation** |

## Canonical reference filenames

```text
00-references/canonical/ref-01-master-scene.png
00-references/canonical/ref-02-duck-pose-sheet.png
00-references/canonical/ref-03-duck-expression-sheet.png
```

No later generated asset can move to approved status unless all required
canonical references were attached to its generation or edit call.
