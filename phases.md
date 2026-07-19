# phases.md — Swan's Office development phases

> **How to use this file (read this first in every session).**
> The owner will open a fresh Claude Code session and say "work on phase N" —
> nothing more. The procedure is always:
> 1. Read `CLAUDE.md` fully (engineering law), then `status.md` (live state),
>    then this file's Phase N section.
> 2. Check status.md's Done list and the repo itself: if Phase N is partially
>    complete, continue from where it stopped — never redo finished work,
>    never assume a clean slate.
> 3. Do not start Phase N if the previous phase's exit criteria are unmet;
>    finish those first (they are listed per phase).
> 4. Work autonomously. Ask the owner only for the items marked **OWNER** —
>    everything else: decide, log in status.md, move on.
> 5. Before closing a phase: verify every exit criterion, run the self-review
>    questions in CLAUDE.md §10.6, update status.md (Done + Current phase),
>    and commit with conventional commits (1–4 commits per phase).
>
> **Numbering note:** the bible's §17 roadmap sketches the same journey in
> older, coarser numbering (its "Phase 5" is AI, "6" sound, "7" polish). The
> bible is never edited; **this file's numbering is authoritative** for
> engineering (CLAUDE.md precedence rule, logged in status.md). CLAUDE.md's
> own phase mentions (gray-box 2–4, art 5, duck 6, ship 9, AI 10) match this
> file.
>
> **Standing facts every phase relies on** (full detail in status.md decisions log):
> - All visual assets are approved and live under `visuals/`; runtime-ready
>   AVIF/WebP exports exist under `*/approved/runtime/` and the scene set under
>   `visuals/04-scene-production/production-stack/approved/`. The selected
>   production WebP files fit the 700KB budget with only ~4.4KB headroom —
>   **copy them byte-identical, never re-encode**.
> - Local-only (gitignored) material: `visuals/00-references/owner/` (owner's
>   real photo), `visuals/07-project-media/resume-source/` (master CV — the
>   content source), `visuals/08-audio/candidates/` (raw audio). They exist on
>   the owner's machine but not on GitHub.
> - Featured projects: BahasaBot, Virtual Zara (**described-only — never show
>   or recreate its UI, it is confidential**), My Bibi, USM Evently. Wayfinder
>   appears on the whiteboard only. Grab demo is GitHub-only.
> - Contact publishes email, GitHub, LinkedIn — no phone number.
> - Entry sound toggle **defaults ON** (amended law 8); sound is always
>   gesture-initiated, never autoplay-on-load.
> - CRT power-on: **1350ms** (owner-tuned), reduced-motion → ≤150ms crossfade.
>   Reference implementation: the CRT demo artifact (beam flare → panels open
>   → warm flash → brightness settle; transform/opacity/filter only).

---

## Phase 0 — Scaffold

**Goal:** a deployable empty shell with the right bones.

Tasks:
1. Scaffold Astro 5 (static output) + React 19 island support + TypeScript
   strict + Tailwind CSS v4, npm, Node ≥ 20, matching the repo structure in
   CLAUDE.md §7 (the `visuals/`, `art/`, and md files already exist — build
   around them; never move or modify `visuals/`).
2. `src/styles/tokens.css`: palette tokens from `art_style.md` §4 (wood browns,
   cream `#EFE6D0`, mustard `#D9A441`, banker's green `#2E7D4F`, grey-blue
   `#7B93A6`, ink `#241A12`) + type scale tokens.
3. Fonts via `@fontsource`, self-hosted, subset: one warm hand-written display
   face (scene labels/props) + one clean sans (content). Pick tasteful pairs;
   log the choice in status.md.
4. `src/layouts/Base.astro` with full meta: title, description, canonical,
   OG image (`visuals/06-supporting/og-image/approved/` → copy to `public/`),
   favicon set (`visuals/06-supporting/avatar-favicon/approved/` → `public/`).
5. `public/resume.pdf` already exists — leave it.
6. Placeholder `src/pages/index.astro` + `src/pages/404.astro` (use the
   approved 404 illustration + DOM caption "This page flew south.").
7. Vitest + Playwright wiring, a first trivial test, npm scripts.
8. Git: keep `.gitignore` rules; verify build output isn't committed.

Exit criteria: `npm run build` clean; typecheck clean; deployable static
output; tokens/fonts render on a test page; 404 page complete.

---

## Phase 1 — Content (`profile.ts`)

**Goal:** every fact of the portfolio, typed, in one file.

Sources: `visuals/07-project-media/resume-source/Sowan_Master_CV.md` is the
content authority (local-only — if missing, ask the owner to restore it).
Respect its truthfulness flags **verbatim** (law 4): e.g. BahasaBot is "Live
demo" not "in production"; Evently's payments are simulated; Virtual Zara
bullets only what the testimonial letter supports; ECTrons title-mismatch
line is mandatory; no invented metrics.

Tasks:
1. `src/content/profile.ts`, fully typed: identity, bio/summary, education,
   experience (ECTrons + Museum Hotel), 4 featured projects with writeups
   chosen from the CV's bullet banks, awards (PIXEL Silver, 249 students, 30
   evaluators), skills (two tiers), leadership, interests, contact (email,
   GitHub `Sowan3k`, LinkedIn from the CV — swappable when owner customizes
   URL), whiteboard roadmap ("Building Wayfinder — an AI codebase mentor" +
   learning roadmap: LangGraph, CrewAI, MCP, AWS, CI/CD, pytest).
2. Project media paths: map each featured project to its approved runtime
   images under `visuals/07-project-media/approved/runtime/` (copied to
   `public/assets/` at Phase 2). Virtual Zara gets **no images** by decision.
3. Newspaper masthead + a rotating headline list (5–8 headlines drawn from
   real facts, per the 2026-07-20 features decision) and sticky-note texts:
   draft options, store as data marked `TODO(owner-review)` — **OWNER** picks
   before Phase 9.
4. Whiteboard roadmap entries carry a `done` flag (living-roadmap feature) —
   completed items render struck-through with an "updated <month year>" note.
4. Vitest schema tests: required fields present, no empty strings, URLs valid,
   every project link resolves to a real GitHub repo name.

Exit criteria: schema tests green; zero `TODO(content)` placeholders except
owner-review-marked flavor text; every claim traceable to the master CV.

---

## Phase 2 — Standard view (law 5: ships first)

**Goal:** the complete flat portfolio — fast, semantic, indexed.

Tasks:
1. `src/components/standard/`: static .astro sections rendering everything in
   profile.ts — hero (name, headline, cartoon portrait inner crop, contact
   links, resume download button), about, experience, projects (screenshots
   with real alt text; Virtual Zara as text + scope facts), skills, awards,
   education, roadmap, contact, footer.
2. Copy needed approved runtime images into `public/assets/` (byte-identical).
   Use `<picture>` AVIF→WebP with width variants and lazy loading below fold.
3. Resume download = plain `<a href="/resume.pdf" download>`.
4. Semantic HTML throughout, visible focus, contrast ≥4.5:1, skip link.
5. SEO: meta/OG complete, sitemap, robots.
6. Playwright: every section renders, resume link works, no-JS page complete.

Exit criteria: Lighthouse ≥95 all four categories on the built page; axe
clean; works with JS disabled; the page alone is a complete portfolio a
recruiter could use without ever seeing the office.

---

## Phase 3 — Entry screen + office shell (gray-box)

**Goal:** the visit begins: entry → CRT → an office you can touch (no art yet).

Tasks:
1. Entry screen (DOM, law 3): framed portrait
   (`entry-portrait-sowan--v04` runtime variants), "Welcome to Swan's Office"
   text, "Press Enter / tap to come in" affordance (enables when scene ready),
   speaker toggle **default ON**, visible standard-view link. Keyboard: Enter
   activates; all controls focusable.
2. CRT power-on: port the reference implementation (beam → panels → flash →
   settle), `CRT_POWER_ON_MS = 1350` in `engine.ts` constants;
   `prefers-reduced-motion` → ≤150ms crossfade. No strobing.
3. `src/lib/scene.ts`: typed object data — nine interactive objects (CLAUDE.md
   §4 table), hotspot geometry in scene-relative %, z-order, labels, aria
   labels, target content ids, duck reaction states. Estimate hotspot
   coordinates from `visuals/00-references/canonical/ref-01-master-scene.png`;
   they get refined in Phase 5.
4. `Office.tsx` island: proportional scene scaler (360→1920px, one unit),
   gray-box layers (flat labeled rectangles in final layout positions, same
   layer structure/z-order as the real art will use).
5. `Hotspots.tsx`: focusable, labeled buttons ≥44px; Tab cycles, Enter
   activates, Esc closes; warm outline + hand-written label on hover/first
   tap; mobile first-visit label flash (3s).
6. "Look around" control: lights all labels + opens the accessible section
   list (nav landmark; entries activate objects). Sits with the sound toggle.

Exit criteria: entry→CRT→gray-box office flows on mobile 390px and desktop;
fully keyboard operable; reduced-motion path works; Playwright covers entry,
keyboard traversal, look-around, standard-view link.

---

## Phase 4 — Interaction engine + dialogue + physical UI

**Goal:** the host behaves; content opens as physical objects.

Tasks:
1. `engine.ts`: the single interaction state machine implementing CLAUDE.md
   §5's canonical timing table (all timings as named constants): click →
   notice → talk (lines advance on input only, ≤3 lines, skip affordance) →
   content opens → close → return → resume idle. Every step interruptible per
   the table. Resume Folder bypasses everything — download at t=0 (law 2).
2. `src/lib/dialogue.ts`: typed line sets per object (≤60 chars/line, bible §6
   voice: confident, calm, funny, slightly sarcastic, never chatbot-like),
   origin-story intro (bible §3, once per visitor via localStorage, skippable,
   ends by naming key objects: projects/computer, CV/folder), repeat-visit
   alternates ("You've already seen my projects…"), the three easter eggs from
   bible §16 (typing "hire", spam-click, coffee-click achievement) — no more.
   Facts in dialogue must come from profile.ts. **OWNER** reviews all lines
   before Phase 9.
3. `Dialogue.tsx`: dialogue panel skin (approved V-020 art), word-chunk reveal
   ~40ms/word (off under reduced motion), advance/skip, aria-live polite.
4. `src/components/office/ui/`: Storybook (projects, page-turn), Folder
   (experience), Document (resume visual — never gates the real download),
   Card (about + business card), Whiteboard zoom, award plaque, certificate —
   each using its approved blank art + DOM content from profile.ts; focus
   trapped inside while open is NOT allowed (law 7 — Esc closes, focus
   returns to the object).
5. Visited-object memory in localStorage; idle scheduler skeleton (states
   only, real animation in Phase 6; reduced-motion freezes to calm pose).
6. v1 features from existing content (2026-07-20 decision):
   - **Time-aware duck**: idle scheduler + dialogue variants keyed to the
     visitor's local time (late night → sleeping idle + groggy notice lines;
     morning → coffee-leaning idles). Existing expression states only.
   - **"Take a card"**: the contact card offers a generated `.vcf` download
     built from profile.ts (name, email, GitHub, LinkedIn — no phone).
   - **Rotating newspaper headline**: DOM headline over the newspaper prop,
     picked per visit from the profile.ts headline list.
   - **Living whiteboard**: render the `done`-flagged roadmap entries with
     hand-drawn strikethrough style.

Exit criteria: all nine objects open their content with correct dialogue in
gray-box; recruiter path: entry → resume PDF in ≤2 interactions; unit tests
for engine transitions + dialogue/scene schema; Playwright per-object flows.

---

## Phase 5 — Real art integration

**Goal:** the gray-box becomes the painted office.

Tasks:
1. Copy the production scene stack (byte-identical, never re-encode) from
   `visuals/04-scene-production/production-stack/approved/` into
   `public/assets/scene/`; physical UI + supporting runtime files as needed.
2. Replace gray-box layers with real depth layers (background wall, midground
   furniture, desk surface, desk occluders) + liftable prop cutouts (resume
   folder, skills book, telephone handset, contact card) over their clean
   plates. Verify seams and z-order against
   `visuals/99-review/` integration sheets.
3. Refine every hotspot to the painted objects; verify at 390px and desktop.
4. Ambient layers (CSS/SVG, transform/opacity only, `aria-hidden`): window
   rain (note: rain is also baked in the art — keep the CSS layer subtle or
   drop it if it doubles badly; judge visually), coffee steam, clock hands at
   real time, plant sway, lamp glow. 60fps on mid-range mobile or cut.
5. Fixture activation overlays (monitor glow, frame/whiteboard/trophy/phone
   emphasis) via DOM/CSS per the V-013 decision.
6. Perf: LCP <2.5s mobile 4G (entry screen covers fetch), CLS <0.05, initial
   JS ≤180KB gz, scene art ≤700KB — measure and record numbers in status.md.

Exit criteria: office looks like the master scene, budgets measured and met,
Office view Lighthouse Perf ≥85 / A11y ≥95, hotspots pixel-true, ambient
loops 60fps.

---

## Phase 6 — The duck (Rive)

**Goal:** Swan lives.

Reality check: rigging happens in the Rive editor (a GUI) — Claude cannot rig.
Claude prepares and integrates; **OWNER** (guided step-by-step) does the
editor work using the approved atlases:
`visuals/03-duck/rig-parts/head-atlas/approved/duck-rig-head-atlas--v07--approved.png`
(v07, NOT v06 — v07 is the color-corrected authority) and
`visuals/03-duck/rig-parts/body-props-atlas/approved/duck-rig-body-actions--v02--approved.png`,
acting reference `ref-03-duck-expression-sheet.png`.

Tasks:
1. Write a precise Rive rigging guide for the owner: artboard setup, part
   slicing from the atlases, state machine `idle / read / notice / talk /
   think / sleep / return` with input triggers, blink/bill timelines per the
   pose sheet, export settings. Iterate with the owner until the .riv file
   exists in `public/assets/duck/`.
2. `Duck.tsx`: `@rive-app/react-canvas` lazy-loaded after first paint; calm
   static Swan (`calm-static-swan--v01` runtime files) renders before Rive
   arrives and permanently under `prefers-reduced-motion`.
3. Bridge engine.ts states → Rive state machine inputs; sync talk state with
   dialogue; idle scheduler drives randomized idle behaviours (bible §7),
   interrupted cleanly by interaction.

Exit criteria: duck idles, notices, talks, returns per the timing table; Rive
runtime + .riv lazy-load outside the 180KB budget; static fallback verified;
reduced-motion shows calm pose only.

---

## Phase 7 — Sound

**Goal:** the office hums — politely.

Tasks:
1. Convert `visuals/08-audio/candidates/` (local-only) to mono Opus/OGG
   ~32–48kbps into `public/assets/audio/`; loudness-match; verify the rain
   loop seam (crossfade if needed); **check the rain file for fireplace
   crackle** — trim/EQ or ask owner to re-pick if audible. Total ≤150KB.
2. Audio manager: WebAudio, master gain, fade in/out; ambience bed (rain +
   soft clock) + one-shots (paper on book/folder open, mug, chair creak, CRT
   power-on sound synced with the transition).
3. Wire the entry toggle (default ON) + in-office toggle; preference persisted
   (`localStorage`); returning muted visitor stays muted; ambience preloads
   async behind the entry screen; sound only ever starts from the enter
   gesture.

Exit criteria: full flow with sound on/off/persisted; no sound before
gesture; ≤150KB verified; no audible loop seam.

---

## Phase 8 — Polish

**Goal:** the details that make it feel finished.

Tasks:
1. Hand-built cursor effect experiment (per logged decision): warm amber glow
   trailing the visible native cursor + hover label-lean with elastic timing;
   ~1KB, no deps, desktop-only, gone under reduced motion. Ship only if it
   doesn't compete with the duck — owner judges live; cut freely.
2. Micro-interactions: hotspot outline pulse, physical UI open/close easing
   against the timing table, entry button hover.
3. Cross-device QA (small phones 360px, tablets, desktop, dark rooms), Safari
   + Firefox + Chromium; fix jank; re-run all budgets.
4. Full accessibility audit: axe on every state (entry, office, each open
   UI), screen-reader walkthrough, keyboard-only full tour including look-
   around list.
5. v1.1 polish menu (schedule-permitting, in this order; all from existing
   content, 2026-07-20 decision): standard view's office-entry link becomes
   the approved door vignette; truthful build-time GitHub stats (license/
   stars/forks) on storybook pages; print stylesheet for the standard view;
   "?" keyboard-hints overlay. Skip freely if time is short — none block v1.

Exit criteria: no known jank; axe clean everywhere; budgets still green;
owner has seen and approved the cursor call.

---

## Phase 9 — Ship

**Goal:** live, indexed, done.

Tasks:
1. **OWNER** final reviews: all dialogue lines, newspaper masthead/headline,
   sticky notes, resume.pdf is final.
2. Deploy to Cloudflare Pages, custom domain (spell "portfolio" correctly),
   HTTPS, redirects, 404 route works.
3. Verify OG cards (real URL) on major platforms; submit sitemap; verify
   indexing.
4. Record final numbers in status.md: Lighthouse both views, bundle sizes,
   art/audio payloads, LCP/CLS.
5. CLAUDE.md §13 definition-of-done checklist + §10.6 self-review, item by
   item, logged in status.md. Fix anything failing before calling it v1.

Exit criteria: CLAUDE.md §13 v1 paragraph is true at the live URL.

---

## Phase 10 — The AI duck (v2, do not start early)

Per CLAUDE.md §9, only after v1 ships and the owner explicitly opens it:
build-time corpus from profile.ts + writeups + pinned repo READMEs → static
JSON; one Cloudflare Pages Function; retrieval + grounded generation in the
duck's voice; law 4 at maximum force (out-of-corpus → in-character refusal +
closest real section); `[how do I know this?]` trace; rate-limited,
token-capped, fail-closed (scripted dialogue keeps working); no key on the
client. Exit: CLAUDE.md §13 v2 paragraph is true.
