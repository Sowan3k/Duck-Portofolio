# CLAUDE.md - Swan's Office

> **Project codename:** `swans-office` · **Deliverable:** A portfolio you don't scroll - you visit. One fixed-camera animated office scene. A duck named Swan hosts it, reacts to the visitor, and introduces every section of Sowan's portfolio through the objects in his room.
>
> This file is the engineering source of truth. Read it fully at the start of every session, together with `status.md`. If reality and this file disagree, update this file deliberately and log the change in `status.md` - never drift silently.

---

## 0. The three documents and when to read them

This repo carries two owner-written vision documents alongside this file:

| File | Authority | When Claude reads it |
|---|---|---|
| `Swan_Office_Creative_Design_Bible.md` | **Creative authority.** Character, personality, origin story, tone, interaction philosophy, resume mapping, example dialogue, success criteria. | Fully in Phase 0. Re-read the relevant sections before: writing or revising any dialogue (§6, §10), designing any interaction (§8), building any physical UI (§11), adding sound (§14), or making any judgment call about tone or personality. |
| `Swan_Office_Portfolio_Concept.md` | **Creative authority.** Scene contents, object list, animation checklist, idle behaviours, visual language, mobile rules, future ideas. | Fully in Phase 0. Re-read the relevant sections before: laying out the scene (Reference Scene, Portfolio Objects), building animations (Animation Plan), building mobile layouts (Mobile Responsiveness), or scoping any Phase 7+ feature (Future Ideas). |
| `art_style.md` | **Creative authority for visuals.** The locked style paragraph, lighting, materials, palette, duck design, composition rules, the never-list. | Fully in Phase 0. Re-read before: writing any image generation prompt, reviewing any delivered asset, choosing any UI/DOM color or font over art, or building anything in Phases 5–6. Its §1 paragraph is pasted verbatim into every generation prompt. |
| `CLAUDE.md` (this file) | **Engineering authority.** Stack, architecture, laws, budgets, phases, protocols. | Every session, first. |
| `phases.md` | **Execution order.** Per-phase goals, tasks, exit criteria, asset paths - written so a fresh session told "work on phase N" can execute alone. Its numbering is authoritative; the bible §17 roadmap is the same journey in older numbering. | Every development session, after this file and `status.md`. |

Precedence: where the vision documents and this file conflict on engineering matters (stack, structure, budgets, accessibility, what ships when), this file wins and the conflict gets one line in the `status.md` decisions log. Where they conflict on creative matters (what the duck says, how the office feels), the vision documents win. Never resolve a creative conflict by silently rewriting the vision - flag it.

The vision documents are owner property. Claude never edits them. Proposed changes go in `status.md` under Blocked or the decisions log.

---

## 1. The concept in one paragraph

The visitor lands standing in front of Swan's desk. The camera never moves. The office is alive - coffee steams, rain falls past the window, the clock shows real time, the duck reads his newspaper and blinks. Clicking an object interrupts him: he lowers the paper, looks at the visitor, says two or three lines in character, and the relevant content opens as a physical object on the desk - projects as a storybook, experience as a paper folder, the CV as a printed document. Closing it, he returns to what he was doing. Every portfolio section is reached this way. The visitor leaves remembering the duck, the office, and Sowan.

## 2. The laws (non-negotiable)

1. **The duck is the host, never a decoration.** Every section is introduced by the duck. This is the Core Philosophy of the bible and it binds.
2. **Charm never gates content.** Dialogue is at most 3 short lines before content opens, every line advances on tap/click, and a visible affordance skips straight to the content. Exception, hard rule: **the Resume Folder downloads the real PDF on first activation - no dialogue gate, ever.** A recruiter with seven seconds must win.
3. **No text baked into artwork.** All readable text - newspaper headline, sticky notes, whiteboard, nameplate, mug, book pages, folder contents - renders in the DOM/SVG on top of blank props in the art. Crisp at every size, editable without regenerating art, readable by screen readers, and the bible's "dynamic newspaper headlines" future idea becomes a data edit.
4. **The duck never lies.** Personality lives in the voice; facts live in `profile.ts`. No invented awards, dates, metrics, employers, or capabilities anywhere - dialogue, props, or (Phase 10) AI answers. A hallucinated credential on a portfolio is a lie about a real person. Every factual claim in any dialogue line must trace to `profile.ts`.
5. **The standard view is sacred.** A flat, fast, semantic scroll page with the complete portfolio ships first and remains the no-JS experience, the SEO surface, the `prefers-reduced-motion` experience, and one tap away from the office at all times (`standard view` link on the loading screen and inside the scene). It is a view, never phrased as a downgrade or a skip.
6. **Mobile is the primary target.** The scene is designed at 390px first and enriched upward, per the bible's Mobile First section. Interactive objects ≥ 44px tap targets at every size. Desktop gains detail, never functionality.
7. **The scene is real DOM underneath.** Every interactive object is a focusable, labeled element (`role`, `aria-label`, visible focus ring). The office is fully keyboard operable: Tab cycles objects, Enter activates, Esc closes content. Decorative layers are `aria-hidden`.
8. **No sound before the first gesture; on by default after it.** The entry screen carries a visible speaker toggle, **default on**: pressing Enter/tap with it on fades ambience in with the CRT power-on (gesture-initiated - never autoplay-on-load). The visitor can flip it off before entering; a visible mute toggle stays in the office; the choice persists via localStorage, and a returning visitor who muted stays muted. Ambience (≤ 150KB) fetches async behind the entry screen, never blocking scene readiness. Owner decision 2026-07-20, amending the earlier opt-in default; logged in status.md.
9. **Original art only.** The internet reference image is a style guide, not an asset. Every generated asset is original: Sowan's duck design, Sowan's props, Sowan's text. No traced or cropped third-party artwork.

## 3. Art direction (locked)

The full visual constitution lives in `art_style.md` - the locked style
paragraph (verbatim seed of every generation prompt), lighting, materials,
palette, duck design, composition rules, and the never-list. Summary: warm
storybook cartoon, heavy ink outlines, soft painted shading, muted warm
palette, green banker's-lamp glow, rainy grey-blue window light. Not pixel
art, not flat vector, not painterly realism.

The art pipeline is owner-driven with OpenAI image generation (Claude Code cannot generate images):

1. Owner locks `art_style.md` §1 and generates the **master scene** as a single image - consistency by construction - iterating until approved. All text props generated **blank** (law 3).
2. Owner generates the **duck sheets** separately, each as one grid image with the approved master attached as reference: the **pose sheet** (front pose, bill open/closed, eye states, wing poses, newspaper up/down) and the **expression sheet** - the acting reference (relaxed, thinking, sleeping, surprised, smirk, laughing, looking at viewer, reading, coffee, pipe). No animation work begins before the expression sheet is approved.
3. Scene is segmented into layers (background / furniture / interactive props / desk foreground), gaps inpainted.
4. Duck is rigged in **Rive** with a state machine: `idle`, `read`, `notice`, `talk`, `think`, `sleep`, `return` - poses and acting taken from the two approved sheets.

After approval, the master scene and duck sheets are the canonical
references: every subsequent generation attaches them, and an asset
generated without them is rejected (`art_style.md` usage rule).

Engineering never blocks on art. Phases 2–4 build against a **gray-box scene**: flat labeled rectangles in the final layout positions, swapped for real layers in Phase 5. The gray-box uses the same layer structure, z-order, and hotspot coordinates as the final art will.

Asset inventory, delivery format (transparent WebP/AVIF layers + the Rive file), and approval status are tracked in `status.md` under `TODO(assets)`.

## 4. Scene and mapping

One scene, three depth bands: background wall (window, clock, whiteboard, frames, shelf tops), midground (duck at desk, filing cabinet, bookshelf, trophy shelf, plants), desk foreground (papers, coffee, resume folder, telephone, nameplate, notebook).

The nine interactive objects and their mapping (from the bible's Resume Mapping - do not add or remove without an owner decision):

| Object | Opens | Physical UI |
|---|---|---|
| Desk / Duck | About Me | Dialogue + card on desk |
| Computer | Projects (screenshots, live demos, GitHub) | Storybook on the desk |
| Filing Cabinet | Work Experience | Paper folder |
| Bookshelf | Skills & Technologies | Book spines → open book |
| Trophy Shelf | Awards (incl. PIXEL Silver) | Card with trophy detail |
| Graduation Frame | Education | Framed certificate zoom |
| Resume Folder | CV download | **Direct PDF download, no gate (law 2)** |
| Telephone / Business Card | Contact | Business card |
| Whiteboard | Current goals & roadmap | Whiteboard zoom, DOM text |

Ambient-only objects (window rain, coffee steam, pipe smoke, clock with real time, plants, lamp) never open content and are `aria-hidden`.

Hover (desktop) / first tap (mobile) affordance: a soft warm outline plus a small hand-written label, so discoverability never depends on pixel hunting. On mobile, the first visit shows the labels for 3 seconds after load.

## 5. Interaction engine

The bible §8 pattern is the only interaction pattern, implemented once and driven by data:

`click → duck notices (state: notice) → dialogue lines (state: talk) → content opens → close → object returns → duck resumes previous idle`

- `src/lib/dialogue.ts` - typed data, not JSX: per object, an array of line sets (so repeat visits can vary), each line ≤ 60 characters, tone per bible §6 (confident, calm, funny, slightly sarcastic, welcoming, never arrogant, never chatbot-like). Includes the origin-story intro sequence from bible §3, played once per visitor (`localStorage`), skippable.
- `src/lib/scene.ts` - typed data: objects, hotspot geometry (as % of scene, so one coordinate system survives responsive scaling), z-order, labels, aria labels, target content id, duck reaction state.
- Repeat-visit memory (bible Future Ideas, promoted to core): visited objects tracked in `localStorage`; the duck acknowledges ("You've already seen my projects…") with alternate line sets.
- Easter eggs: exactly the three in bible §16. Do not add more.
- Idle scheduler: duck cycles idle behaviours (bible §7) on a randomized timer; interrupted cleanly by any interaction; `prefers-reduced-motion` freezes the scheduler to a single calm pose.

### The canonical timing table

One interaction pattern means one timing table. These values live as named
constants in `engine.ts` (single source, no magic numbers in components) and
are tuned there, never forked per object. Every step is interruptible: a
second input during notice/talk skips straight to the next dialogue line, and
a third input during the final line opens the content immediately.

| t (s) | Beat |
|---|---|
| 0.00 | Input on object. Hotspot acknowledges instantly (outline pulse, ≤ 0.10s). |
| 0.15 | Duck's current idle eases out (newspaper pauses mid-motion, sip stops). |
| 0.30 | Blink. |
| 0.45 → 0.90 | Pose shift to `notice`: newspaper lowers / head turns toward viewer. |
| 1.00 | Eyes settle on the visitor. Micro-hold. |
| 1.15 | Dialogue line 1 appears (word-chunk reveal, ~40ms per word). |
| - | Lines advance on input only, never on a timer. Max 3 lines (law 2). |
| +0.25 | After the final line's input: physical UI opens (book/folder animation ≤ 0.45s). |
| close +0.35 | Content closes; object returns to its place (≤ 0.45s). |
| close +0.80 | Duck transitions `return` → resumes the exact idle he was in before. |

Hard rules: input-to-first-line ≤ 1.2s worst case; anything slower reads as
loading, not noticing. Resume Folder ignores this table entirely - download
fires at 0.00 (law 2). `prefers-reduced-motion`: all beats collapse to
≤ 0.15s crossfades, no word-chunk reveal, duck goes straight to the calm
pose. Repeat activation of an already-visited object may shorten 0.15–1.00
to a single 0.4s glance (the duck already knows this visitor).

## 6. Tech stack (decided - do not relitigate mid-project)

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Astro 5**, static output | The standard view is pre-rendered semantic HTML (SEO baseline). The office mounts as an island over it. Same stack as the owner's previous portfolio - proven, portable. |
| Island | **React 19 + TypeScript strict** | One `Office.tsx` island composing scene, engine, physical UI. |
| Styling | **Tailwind CSS v4** + tokens in `@theme` | Palette and type tokens defined once in `src/styles/tokens.css`. |
| Animation | **Motion** for UI transitions and ambient CSS-driven loops; **Rive** (`@rive-app/react-canvas`) for the duck only | Rive gives a state machine, tiny runtime, and rig-once animation. Rive is canvas-based; this is a deliberate, scoped exception - one canvas, the duck, lazy-loaded. Nothing else uses canvas or WebGL. |
| Content | `src/content/profile.ts` - all owner facts, typed. Port from the previous portfolio repo, then update. | Owner edits data, never components. Dialogue references it; never duplicates facts. |
| Fonts | One warm hand-written display face for scene labels/props + one clean sans for content, via `@fontsource`, self-hosted, subset | Text-in-DOM (law 3) makes font choice part of the art. |
| Images | AVIF with WebP fallback, responsive sizes, layers lazy-loaded below the fold of relevance | See budgets. |
| Testing | Vitest (dialogue/scene data validation, engine logic) + Playwright (open each object, keyboard path, standard-view path, reduced-motion path) | Data files get schema tests so a typo can't ship. |
| Deploy | **Cloudflare Pages**, custom domain | Continuity with current setup. The new domain must spell "portfolio" correctly. |
| Backend | **None until Phase 10.** Then exactly one Cloudflare Pages Function for the AI duck. No auth, no database, no CMS - ever. | |

Node ≥ 20, npm.

## 7. Repository structure

```
swans-office/
├── CLAUDE.md                          ← this file
├── phases.md                          ← phases & exit criteria
├── status.md                          ← living progress tracker
├── Swan_Office_Creative_Design_Bible.md   ← owner vision (read-only for Claude)
├── Swan_Office_Portfolio_Concept.md       ← owner vision (read-only for Claude)
├── astro.config.mjs
├── public/
│   ├── assets/scene/                  ← art layers (Phase 5)
│   ├── assets/duck/                   ← Rive file (Phase 6)
│   └── resume.pdf
├── src/
│   ├── content/profile.ts             ← ALL facts, typed
│   ├── lib/scene.ts                   ← objects, hotspots, z-order, labels
│   ├── lib/dialogue.ts                ← all duck lines, typed
│   ├── styles/tokens.css
│   ├── layouts/Base.astro
│   ├── pages/index.astro              ← standard view (SEO baseline) + office island mount
│   ├── pages/404.astro                ← the duck, alone: "This page flew south."
│   └── components/
│       ├── standard/                  ← flat sections (static .astro)
│       ├── office/
│       │   ├── Office.tsx             ← island root: scene scaler, layer stack
│       │   ├── Hotspots.tsx           ← focusable object layer
│       │   ├── Duck.tsx               ← Rive wrapper + state machine bridge
│       │   ├── Dialogue.tsx           ← line renderer, advance/skip
│       │   ├── engine.ts              ← interaction state machine
│       │   └── ui/                    ← Storybook, Folder, Document, Card, Whiteboard
│       └── ambient/                   ← Steam, Rain, Smoke, ClockHands, PlantSway (CSS/SVG)
└── tests/
```

## 8. Budgets and quality floor

- Initial JS ≤ 180KB gz. Rive runtime + duck file lazy-load after first paint and sit outside this budget; the gray-box/static duck pose renders before Rive arrives.
- Scene art ≤ 700KB total compressed at the largest breakpoint; the entry screen covers the fetch: a framed cartoon portrait of Sowan (asset V-034) with welcome text and a "press Enter / tap to come in" affordance rendered in DOM (law 3). The affordance enables when the scene is ready; the standard-view link stays visible on this screen (law 5). Entering plays a warm CRT power-on transition - cream/amber phosphor bloom, **1.35s** (owner-tuned against the live prototype, 2026-07-20), no strobing, never a cold glitch (art_style.md §8) - then the office fades in; `prefers-reduced-motion` replaces the transition with a ≤ 0.15s crossfade. LCP < 2.5s on mid-range mobile 4G; CLS < 0.05.
- Standard view: Lighthouse ≥ 95 in all four categories. Office view: Performance ≥ 85, Accessibility ≥ 95.
- 60fps ambient animation on a mid-range phone; every ambient loop is transform/opacity only; anything that can't hold 60fps is cut, not excused.
- Contrast ≥ 4.5:1 for all real text, including text on props. Focus visible everywhere. The office never traps focus. Full keyboard operation per law 7.
- Responsive 360px → 1920px. The scene scales as one proportional unit (bible Mobile First); hotspot geometry in scene-relative %, one source of truth.

## 9. Phase 10 preview - the AI duck (build nothing early)

Bible: "The AI is the duck - not a floating chatbot." When Phase 10 opens: build-time corpus from `profile.ts` + project writeups + pinned repo READMEs into static JSON; one Cloudflare Pages Function; retrieval + grounded generation; answers delivered as duck dialogue in the duck's voice; law 4 applies with maximum force - out-of-corpus questions get an in-character refusal plus the closest real section; a real `[how do I know this?]` trace affordance; rate-limited, token-capped, fail-closed (route down → duck says the phone line is out, scripted dialogue keeps working). No key ever reaches the client. Nothing in Phases 0–9 may depend on Phase 10 existing.

## 10. Session protocol

1. Read `CLAUDE.md` → `status.md` → the current phase in `phases.md`. Read the vision documents per §0.
2. State the session plan in one short paragraph, then execute. Prefer finishing a phase over starting the next.
3. Build → run → verify against exit criteria → update `status.md`.
4. Conventional commits, one phase ≈ 1–4 commits.
5. Ask the owner only when blocked on personal content, missing assets, or a law/creative conflict. Everything else: decide, log it, move on.
6. Self-review before closing any phase: *Does the duck feel like a host or a gimmick? Can a recruiter reach the CV in seven seconds? Is every fact traceable to profile.ts? Is the phone experience first-class? Would the bible's author recognize this as his office?* Fix before closing.

## 11. Content requirements (owner supplies - track as TODO(content) in status.md)

Everything in the bible's Resume Mapping needs real data: bio, education, experience with impact bullets, 3–6 featured projects (BahasaBot, Virtual Zara with its own entry, My Bibi, Evently are the known candidates), awards including PIXEL Silver, certifications, whiteboard roadmap items, contact links, the actual resume.pdf. Port the previous repo's `profile.ts` as the starting point. Placeholders must be realistic, marked `TODO(content)`, and never ship past Phase 9. Newspaper headlines and sticky-note flavor text are content too - owner-approved, listed in `dialogue.ts` review.

## 12. Non-goals

No scrolling in the office. No camera movement, pan, or zoom (bible §5). No page navigation. No game mechanics, scores, or inventories. No CMS, database, auth, analytics beyond Cloudflare's, i18n, or blog. No canvas/WebGL outside the single Rive duck. No autoplaying sound, ever. No third-party artwork. No new easter eggs beyond bible §16. No AI features before Phase 10.

## 13. Definition of done

**v1 (Phases 0–9):** The live URL loads a breathing office. The duck introduces himself with the Swan origin story, reacts to every one of the nine objects, and returns to his idle life. Projects open as a book a visitor wants to turn the pages of. The resume downloads in one tap. The standard view is complete, fast, and indexed. Every fact traces to `profile.ts`. Fully keyboard operable, axe-clean, budgets met and recorded. A first-time visitor says some version of "I've never seen a portfolio like that" - the bible's own success criterion.

**v2 (Phase 10):** A visitor asks the duck a question and gets a grounded, in-character, cited answer - and the duck refuses to invent anything under adversarial questioning.
