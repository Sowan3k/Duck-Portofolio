# Rive rigging guide - making Swan live (Phase 6)

> **Who does what.** Rigging happens in the Rive editor (a GUI), so this part
> is yours. Everything on the code side is already built and waiting: the
> moment a file exists at `public/assets/duck/swan.riv`, the office loads it
> and Swan comes alive - idle behaviours, time-of-day moods, reactions, all
> already wired. No rig, no problem: the office keeps the calm static pose.
> You cannot break the site with a bad export; the worst case is a duck that
> stays still.
>
> **Budget one or two sessions of ~1-2 hours.** If Rive fights you for more
> than ~3 sessions, we stop and switch to Plan B (CSS animation of the same
> parts - ~80% of the life, zero Rive). The ship date always wins.

---

## 0. What you are building

One artboard. One state machine. **One number input** called `pose`. The
office sets `pose` to a value and your state machine crossfades to that
pose's animation:

| `pose` | name | what the visitor sees |
|---|---|---|
| 0 | idle | sitting at the desk, hands resting, blinking, gentle breathing |
| 1 | read | reading the newspaper, paper up |
| 2 | notice | paper lowered, eyes on the visitor |
| 3 | talk | open-hand gesture, bill moving |
| 4 | think | holding the pipe, thoughtful brows |
| 5 | sleep | eyes closed, slow breathing |
| 6 | return | settling back to rest (a brief transition pose) |
| 7 | sip | sipping the coffee |
| 8 | lookWindow | glancing left toward the rainy window |
| 9 | lookClock | glancing up-right toward the clock |

These numbers and names are law - they come from `src/components/office/engine.ts`
(`RIVE` and `RIVE_POSE`). The rig must use **exactly**:

- Artboard name: **`Swan`**
- State machine name: **`SwanMachine`**
- Input: a **Number** input named **`pose`**
- Export file: **`swan.riv`** placed at **`public/assets/duck/swan.riv`**

A typo in any of these = the duck silently stays static. That is the only
failure mode.

## 1. Your materials (already prepared)

Everything is in `rive-source/slices/` - 23 transparent PNGs cut from the two
approved atlases, cleaned and trimmed:

**Body poses** (whole duck, chest-up, same framing):
`body-idle-desk`, `body-read-paper-up`, `body-read-paper-low`,
`body-hand-raised`, `body-gesture-open`, `body-sip-coffee`,
`body-hold-pipe`, `body-shrug-welcome`

**Face parts** (for blinking, sleeping, talking):
`head-reference-full` (assembly reference - never shipped),
`head-blank` (head with no face), `eyes-open`, `eyes-half`, `eyes-closed`,
`brows-neutral`, `brows-raised`, `brows-skeptic`, `brows-think`,
`bill-closed`, `bill-smile`, `bill-open-talk`

**Props**: `prop-newspaper-open`, `prop-mug`, `prop-pipe`
(usually not needed - the body poses already hold their props)

**`registration.json`** - exact pixel positions of every part (used below).

**Framing reference**: `visuals/03-duck/static-swan/approved/runtime/` holds
the calm static Swan the site shows today. Your idle pose must sit in the
artboard the way that image sits in its frame - the canvas replaces it 1:1.

## 2. Editor setup (15 min)

1. Go to **rive.app**, sign in (free plan is fine), **New File**.
2. Delete the default artboard. Create one: name **`Swan`**, size **724 × 905**
   (the 4:5 shape of the slot in the scene). Background: transparent.
3. Drag all PNGs from `rive-source/slices/` into the Assets panel
   (skip `registration.json` - it's for reading, not importing).

## 3. Assemble the poses (30-45 min)

The eight body poses were drawn in a shared 362 × 362 frame, so they align by
coordinates, not by eye. Make a group named `poses` and place every body PNG
in it at exactly these positions (X/Y are the image's top-left within the
frame; set each image's position in the Inspector):

| image | X | Y |
|---|---|---|
| body-idle-desk | 86 | 46 |
| body-read-paper-up | 34 | 49 |
| body-read-paper-low | 26 | 51 |
| body-hand-raised | 0 | 54 |
| body-gesture-open | 21 | 0 |
| body-sip-coffee | 53 | 0 |
| body-hold-pipe | 24 | 0 |
| body-shrug-welcome | 0 | 0 |

Now scale the whole `poses` group to fill the artboard: with
`body-idle-desk` visible and the others hidden (opacity 0), scale/position
the group until the idle duck matches the calm static Swan reference -
import `calm-static-swan--v01-1280.png` temporarily, set it to 25% opacity,
align the group's idle pose over it, then **delete the reference image**.
Bottom edges matter most: the desk line must sit at the artboard bottom.

Rule of thumb: only ONE body pose is at full opacity at any moment; the
others sit at 0. The animations below just cross-fade these opacities.

## 4. The face rig (30-45 min) - blinking, sleeping, talking

The face parts are drawn at the same scale as `head-reference-full`
(pre-verified - no rescaling between parts is ever needed, only the group
scales as one).

1. Make a group `face` containing: `head-blank`, then `brows-neutral`,
   `eyes-open`, `bill-closed` on top. Assemble them **by eye** against
   `head-reference-full` at 25% opacity (place parts until the face matches
   the reference exactly), then delete the reference from the stage.
2. Add the alternates into the same group, each at opacity 0, in the same
   spots as their counterpart: `eyes-half` and `eyes-closed` over
   `eyes-open`; `brows-raised`/`brows-skeptic`/`brows-think` over
   `brows-neutral`; `bill-smile` and `bill-open-talk` over `bill-closed`.
3. Scale the whole `face` group down and place it over `body-idle-desk`'s
   painted head so it covers it exactly. When it matches, the swap between
   "painted face" and "rigged face" is invisible.
4. The `face` group is only shown in animations built on the idle body
   (idle, sleep, lookWindow, lookClock, talk if you use it there). For the
   other poses the painted heads in the pose art do the job - keep `face`
   at opacity 0 there.

## 5. Animations (45-60 min)

Create one **timeline** per pose, named exactly: `idle`, `read`, `notice`,
`talk`, `think`, `sleep`, `return`, `sip`, `lookWindow`, `lookClock`.

Every timeline does the same three things: set its body pose's opacity to
100 (all others 0), set the face group appropriately, add small motion.
Keep all motion small - this is a calm office, not a cartoon fight.

- **idle** (loop, ~4s): body-idle-desk. Face group ON (eyes-open,
  brows-neutral, bill-closed). Breathing: scale the body 100→101→100% very
  slowly. **Blink**: eyes-open opacity dips to 0 while eyes-closed pops to
  100 for ~120ms, twice per loop at uneven times (e.g. 1.1s and 3.4s).
- **read** (loop, ~5s): body-read-paper-up. Face OFF. The paper hand rocks
  ±1° or bobs 2px - barely.
- **notice** (loop, ~2s after a 0.4s entry): body-read-paper-low. Face OFF.
  Hold nearly still; a 1px settle.
- **talk** (loop, ~1.2s): body-gesture-open (or alternate with
  body-shrug-welcome for variety). If you put the face group on this pose:
  bill-closed ↔ bill-open-talk alternate every ~150-200ms. If not, the
  painted bill still reads fine - ship it and refine later.
- **think** (loop, ~4s): body-hold-pipe. Slow 1° pipe-hand rock.
- **sleep** (loop, ~6s): body-idle-desk + face ON with eyes-closed at 100,
  brows-neutral. Slower, deeper breathing (100→102%).
- **return** (one-shot, ~0.5s, then the machine moves on): body-idle-desk,
  face ON, a small settle (2px down, back up).
- **sip** (loop, ~3.5s): body-sip-coffee. A tiny tilt of the mug hand.
- **lookWindow** (loop, ~4s): body-idle-desk + face ON, eyes-half at 100
  (eyes-open 0), whole face group rotated/shifted a touch toward screen-left.
- **lookClock** (loop, ~4s): same, but toward the upper-right.

## 6. The state machine (20 min)

1. Create a **State Machine**, name it **`SwanMachine`** (exact).
2. Add a **Number input** named **`pose`** (exact), default 0.
3. Drag all ten timelines into the graph.
4. From **Any State**, add a transition to each timeline with the condition
   `pose == <its number>` (table in §0). Set every transition's duration to
   **200ms** (the crossfade). On the `return` state, also add
   `return → idle` when its one-shot ends (Exit Time 100%).
5. Set `idle` as the entry state.

Test inside the editor: play the machine, scrub `pose` through 0-9 and watch
every state engage. If a number does nothing, its transition condition or
timeline name is off.

## 7. Export and see him live (5 min)

1. **Export → Download → .riv** (latest runtime).
2. Save the file as `public/assets/duck/swan.riv` in the repo.
3. `npm run dev` → open the office. Swan breathes. That's it - no code
   changes, no rebuild of anything else needed.
4. Things to check with me afterwards: blink timing, crossfade feel against
   the §5 timing table, the newspaper headline position over the read pose
   (a TODO(rig) in the code waits for exact registration), and mobile.

## Checklist before you call it done

- [ ] Artboard `Swan`, machine `SwanMachine`, number input `pose` - exact names
- [ ] All ten `pose` values reach a state (scrub 0-9 in the editor)
- [ ] Idle blinks; sleep has closed eyes; night visitors will see it often
- [ ] Bottom of the duck sits at the artboard bottom (desk alignment)
- [ ] Exported to `public/assets/duck/swan.riv`, office checked on desktop + 390px
- [ ] Nothing moves violently - the office stays calm (bible §7: "The office
      continues breathing")
