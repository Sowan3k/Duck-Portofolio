# Visual generation plan

## Outcome

Finish a coherent, approval-gated visual source pack before any website
development begins. The pack will contain the canonical office and Swan
references, rig-ready character art, separated scene plates, blank physical UI
art, supporting illustrations, and authentic project media.

The default production path is OpenAI's built-in image generation, one focused
asset or variant per call. Generated project-bound files are copied into this
workspace and reviewed before they are approved.

`art/references/Reference Image.png` is attached to the first master generation
as **Image 1: inspiration-only style and mood reference**. It may guide the
storybook ink, warm office texture, visitor-eye-level intimacy, and organized
clutter. Its duck identity, exact layout, written jokes, props, and composition
must not be copied. The resulting office and Swan remain wholly original.

## Resolved interpretation of the briefs

- The computer is the Projects trigger; a physical storybook is the Projects
  content vessel.
- Desk/Swan opens About as dialogue plus a desk card.
- Telephone opens Contact as a physical business card.
- Bookshelf opens Skills as a book; filing cabinet opens Experience as a paper
  folder; trophy opens an award card; graduation frame expands Education;
  whiteboard enlarges the roadmap.
- Resume activation downloads the real PDF immediately. Its visual document is
  supportive and can never gate access.
- The scene remains one proportional fixed-camera composition. The first
  master is a compact landscape composition with a 4:3 working frame because
  it preserves more readable height at 390 px than a cinematic 16:9 frame.
  Approval includes a 390 px downscale test before this ratio is locked.
- Generated rain frames, steam, smoke, dust, lamp pulses, clock hands, and
  plant-sway sheets are excluded. The engineering brief assigns those to
  lightweight CSS/SVG/Rive behavior later.

## Stage 1 — lock the master scene

Generate one deliberate master candidate from
`01-prompts/master-scene/00-master-scene-v1.md`, inspect it, and revise one
problem at a time. Do not fan out to downstream assets while composition is
still moving.

Approval checklist:

- Fixed visitor-eye-level camera; no pan, tilt, zoom, or depth-of-field blur.
- Swan is center-right, clearly the host, and reads at 390 px wide.
- All nine interactive objects have distinct silhouettes and breathing room.
- The desk center-front has open space for the storybook and folder UI.
- Three depth bands read clearly: wall, Swan/furniture, desk foreground.
- Warm late-afternoon light dominates; green lamp glow is local; cool rainy
  daylight stays at the window.
- Materials, palette, organized clutter, and original storybook style pass
  `art_style.md`.
- Every text-bearing surface is truly blank. Pseudo-writing is a rejection.
- No known-character resemblance, watermark, glossy 3D, anime, or cold grade.

After approval:

1. Save the lossless approved source under `02-master-scene/approved/`.
2. Upscale it once to at least 2600 px wide under `02-master-scene/upscaled/`.
3. Copy a stable reference as
   `00-references/canonical/ref-01-master-scene.png`.
4. Record the exact approved prompt in `status.md`.

## Stage 2 — lock Swan

Generate the pose sheet with the master attached, then the expression sheet
with both approved references attached. Both are single unlabeled grids on a
plain warm-cream background.

Pose sheet requirements:

- Front three-quarter scene pose.
- Bill open and closed.
- Eyes open, half-lidded, and closed.
- Clear eyebrow acting positions.
- Two wing poses.
- Newspaper raised and lowered.

Expression sheet requirements:

- Relaxed, neutral, thinking, sleeping, surprised, smirk, laughing, direct
  viewer gaze, reading, sipping coffee, and adjusting the pipe.

Lock body proportions, bill shape, facial spacing, suit cut, loose tie,
outline weight, palette, and the glasses decision at this gate. The pipe stays
a removable held prop. On approval, save stable references as
`ref-02-duck-pose-sheet.png` and `ref-03-duck-expression-sheet.png`.

## Stage 3 — prepare scene and character production art

Use the canonical trio for every edit or new generation.

1. Prepare Swan's rig sources: head, upper/lower bill, eyes, brows, upper-body
   action states, wings, newspaper, pipe, and coffee. **Complete: corrected
   V-004A and V-004B passed internal, independent, and owner review.**
2. Produce the office clean plate through surgical, masked inpainting passes,
   beginning with the complete Swan cluster as one semantic removal. **Complete:
   V-010A/B/C and telephone/contact V-010D v03 are owner-approved. All production
   composites preserve pixels outside their saved repair supports; moving scene
   props have matching transparent sources and recomposition evidence.**
3. Separate lossless source layers for background wall, midground furniture,
   and desk foreground. **Complete: owner-approved V-011 v01 uses one exhaustive,
   disjoint class map to derive background, furniture, desk-surface, and
   pipe/mug occluder layers. Native/retina PNG and 724/1448/2896 AVIF/WebP
   packs pass internal and independent reconstruction, exact-alpha,
   boundary-seam, mobile-resource, and payload QA; all source, runtime, and
   ownership-mask files were promoted byte-identically.**
4. Extract the nine interactive objects where movement or overlap requires a
   separate layer.
5. Derive a calm static Swan pose for first paint and reduced motion.
   **Complete: owner-approved V-005 v01 is an exact approved-atlas extraction
   with transparent 320/640/1280 PNG plus AVIF/WebP runtime variants, promoted
   byte-identically after final approved V-011/V-012 integration QA.**
6. Validate every isolated asset on light, dark, and checkerboard backgrounds.

After the final supporting-visual pair, production returned to items 3 and 5:
V-005 calm static Swan and V-011 scene depth layers are both owner-approved and
promoted. V-013 does not require a
new raster source: approved cutouts provide physical movement, while monitor,
trophy, frame, whiteboard, and telephone emphasis is derived later with
DOM/CSS/SVG and Swan reactions belong to the Rive state machine.

Built-in transparent work uses a flat chroma-key source followed by local
background removal and alpha validation. Complex native transparency is not
assumed; if chroma-key removal cannot preserve a clean edge, that asset pauses
for explicit approval before any CLI fallback.

Separation follows the interaction, not the hotspot count. The résumé folder,
selected Skills book, telephone handset/contact card, and any drawer/front piece
that visibly moves receive isolated layers and hidden-surface repairs. The
graduation frame, monitor, trophy, and whiteboard remain fixed fixtures and use
reaction overlays or dedicated enlarged media. Pipe, mug, lamp, clock, plants,
and weather are ambient-only and remain part of the scene plate.

## Stage 4 — generate the blank physical UI kit

Generate these as matched office objects, not browser panels:

1. Dialogue panel skin.
2. About desk card.
3. Projects storybook — closed and open blank spread.
4. Experience paper folder — closed and open with blank sheets.
5. Skills book — complete closed transition/desk state and open blank spread,
   inheriting cover color, wear, outline, and proportions from approved V-012B.
   **Complete: approved paired V-024 v01 transparent closed/open states.**
6. Award detail card with a blank plaque region.
7. Education certificate/frame enlargement with blank paper.
8. Resume document sheet with blank content area.
9. Contact business card with blank content area. **Complete: approved V-028
   blank-front v02, 2800×1600 transparent RGBA; all content remains DOM-owned.**
10. Whiteboard enlargement with a blank writing surface.

**Complete: owner-approved V-020 dialogue panel v01, V-021 About desk card v01,
paired V-022 Projects storybook v01, paired V-023 Experience folder v01,
V-025 Award detail plaque v01, V-026 Education certificate enlargement v01,
V-027 blank résumé document v01, and V-029 whiteboard enlargement v01, all
promoted byte-identically. The physical UI kit is complete.**

All text, icons, project content, page controls, labels, close buttons, and
focus treatments are later DOM/SVG layers. The generated art supplies only
the physical material, silhouette, texture, and lighting.

## Stage 5 — supporting visuals

- Loading vignette: the office door with a blank pinned note; “come in” is DOM
  text later.
- OG/social image: Swan at the desk, preferably derived from the approved
  master or generated only with the canonical trio attached.
- 404 illustration: Swan alone in the same style, no baked-in caption.
- Avatar/favicon source: a simplified crop derived from the approved Swan
  reference, not a separately redesigned character.

**Complete: owner-approved V-030 loading vignette v01 and V-031 OG/social image
v01, plus owner-approved V-032 404 illustration v01 and V-033 avatar/favicon
v01, all promoted byte-identically. Stage 5 supporting visuals are complete;
V-005 calm static Swan v01 and V-011 scene-depth-layer v01 are owner-approved
and promoted.**

### Stage 5 addendum (2026-07-20) — V-034 entry portrait

Owner decision: the entry/loading screen is redesigned around a framed cartoon
portrait of Sowan ("welcome" text and the enter affordance are DOM, law 3),
followed by a warm CRT power-on transition into the office. The approved V-030
door vignette v01 is retained as an alternate, not deleted.

- New generation V-034: a head-and-shoulders cartoon portrait of the owner,
  translated into the locked storybook style from the photo
  `visuals/00-references/owner/Sowan's real photo.jpeg` (local-only, excluded
  from the public repo), with the canonical trio attached.
- Warm wooden frame with a small blank brass plaque; plain warm-cream backdrop;
  portrait orientation.
- The photo's clothing brand logo must NOT be reproduced; no text, letters, or
  symbols anywhere (standing rule).
- Same review gates as every asset: style match, blankness, 390 px readability,
  alpha/edge QA if cut out, prompt sidecar under `01-prompts/supporting/`.
- Reuse: the unframed inner portrait may be cropped for the About desk card
  overlay and the standard-view About section; no separate generation needed.

**Candidate complete: V-034 v01 uses the canonical trio plus the owner photo,
ships as a margin-safe 2600×3250 framed RGB master and deterministic 1200×1500
inner portrait, and includes independently validated AVIF/WebP responsive sets.
Internal and independent QA passed; owner-approved and promoted byte-identically
on 2026-07-20.**

## Stage 6 — authentic portfolio media

The featured roster is locked to BahasaBot, Virtual Zara, My Bibi, and USM
Evently. V-040 candidate v01 now contains six privacy-safe 1440x720 authentic
capture masters and 36 independently encoded 360/720/1440 AVIF/WebP variants
for BahasaBot, My Bibi, and Evently. Deterministic crop, resize, and staging are
the only transformations; no interface was generated or recreated. Automated
quality, metadata, payload, privacy-boundary, native 360px, and exact 390px
review gates pass. Independent visual and mechanical audits also pass. The
candidate awaits owner review before byte-identical promotion.
Virtual Zara remains deliberately described-only: no screenshot, UI
recreation, or authentic-looking mockup.

V-041 does not block v1. Awards and education use the approved blank V-025 and
V-026 physical surfaces with DOM text. Authentic certificate imagery is an
optional future owner-supplied enhancement.

## Review and delivery

Each candidate is checked at full resolution, 390 px scene width, and thumbnail
size. Reviews cover composition, character identity, palette, text absence,
edge quality, mobile readability, and asset invariants. Rejected outputs move
to `99-review/rejected/`; approved contact sheets go to
`99-review/contact-sheets/`.

The visual phase is complete when every non-blocked row in `manifest.md` is
approved, canonical references are present, source layers are lossless, and
the eventual largest-breakpoint scene export can fit the 700 KB compressed art
budget without visible failure.
