# art_style.md — Swan's Office Visual Constitution

This document governs every image generated for this project. It is creative
authority, same rank as the two vision documents. Claude reads it before
writing any generation prompt, reviewing any asset, or positioning any DOM
text over art. The owner judges every generated asset against it. An asset
that fails this document is rejected regardless of how good it looks alone.

Usage rule: §1 is pasted verbatim at the top of every image generation
prompt. Never rephrase it, never summarize it, never "improve" it. Rephrasing
is where style drift starts. After the master scene and duck sheet are
approved, they are attached to every subsequent generation as reference
images alongside this paragraph. An asset generated without them attached is
automatically rejected.

---

## 1. The locked style paragraph (paste verbatim, never edit)

> Warm storybook cartoon illustration with heavy dark ink outlines and soft
> painted shading. A cozy, cluttered, lived-in office rendered in muted warm
> browns, mustard yellows, and cream, lit by late-afternoon interior light
> and the green glow of a banker's lamp, with cool grey-blue rainy daylight
> coming through the window. Slightly exaggerated cartoon proportions,
> hand-drawn charm, gentle texture, no gradients that look digital. Every
> paper, sign, sticky note, book spine, newspaper, whiteboard, and label is
> completely blank with no text, no letters, no symbols anywhere in the
> image.

Amending this paragraph is an owner decision, logged in status.md, and
invalidates all previously approved references.

## 2. Lighting

Late afternoon. Two sources only. Warm interior light fills the room from
the upper left, soft and diffuse, no hard cast shadows. The green banker's
lamp on the desk adds one local pool of green-gold glow over the desk
foreground. The window contributes cool grey-blue rainy daylight that stays
at the window and desaturates only what sits directly against it. Warm wins
everywhere except the windowsill. No rim lighting, no neon, no volumetric
rays.

## 3. Materials

Wood (desk, shelves, floor) with visible grain. Worn leather (chair). Paper
in stacks, slightly yellowed, edges soft. Ceramic (mug, plant pots). Brass
(lamp base, clock rim, desk fittings). Glass (window, frame fronts) with a
single soft highlight, never mirror reflections. Fabric (the duck's suit)
matte, no sheen. Everything slightly worn. Nothing looks new, nothing looks
dirty.

## 4. Palette guide

Warm browns `#6B4A2F` to `#8C6844` for wood. Cream and warm paper `#EFE6D0`.
Mustard and warm yellow accents `#D9A441`. Banker's-lamp green `#2E7D4F`.
Rainy window grey-blue `#7B93A6`. Duck body warm white `#F5F0E4`, bill and
feet warm orange `#E8963C`, suit deep brown `#4A3524`. Ink outline near-black
warm `#241A12`, never pure black. These are targets for judging generated
assets and for matching DOM text and UI colors to the art, not literal fills.

## 5. Mood

Comfortable. Welcoming. Intelligent. Slightly mischievous. Lived-in. The
office of someone who works hard and enjoys it. A visitor should want to sit
down. Clutter is warm and organized-messy, never chaotic. Nothing sterile,
nothing corporate, nothing sad.

## 6. The duck

The face of the entire project. Design him slowly, after the master scene
locks the style, with the master attached as reference. Personality per the
bible §6: confident, calm, funny, slightly sarcastic, welcoming, never
arrogant. Design intentions: rounded and approachable, expressive brows
(they do most of the acting), half-lidded relaxed eyes as the default,
slight smile at rest, small round glasses optional, brown suit with a loose
tie, pipe as a prop he holds rather than a permanent fixture. Built from
separable parts for rigging: head, bill upper and lower, eyes, brows, body,
wings, newspaper, pipe, coffee.

Required sheets, each generated as ONE grid image on a plain warm-cream
background with the master scene and this paragraph attached:

1. **Pose sheet** — front three-quarter (the scene pose), bill open, bill
   closed, eyes open, eyes half-lidded, eyes closed, two wing poses,
   newspaper raised, newspaper lowered.
2. **Expression sheet (the acting reference)** — relaxed, neutral, thinking,
   sleeping, surprised, smirk, laughing, looking directly at the viewer,
   reading, sipping coffee, adjusting pipe. Animate nothing until this sheet
   is approved.

## 7. Composition rules for the master scene

Fixed camera, eye level of a visitor standing before the desk. Duck behind
the desk, center-right, always the focal point. The desk center-front stays
relatively calm so the storybook and folder UI have somewhere to open. The
nine interactive objects (CLAUDE.md §4) each get clear silhouette separation
and breathing room, sized to survive 390px wide. Depth in three bands:
background wall, midground duck and furniture, desk foreground. Clutter
lives in the foreground corners and shelf tops, never covering an
interactive object.

## 8. Never

- No text, letters, numbers, or symbols in any generated image, anywhere.
- No anime. No pixel art. No photorealism. No flat corporate vector. No
  3D render look. No neon or cyberpunk. No Disney/Pixar gloss.
- No resemblance to existing characters (Donald, Howard, Scrooge, Duckman).
  The reference image is style inspiration only; the duck, props, and
  composition are original.
- No hard black shadows, no lens effects, no depth-of-field blur, no
  watermark artifacts (reject and regenerate).
- No cool-dominant color grading. If a generated image reads cold, reject it.

## 9. Technical delivery

Generate at the model's maximum landscape resolution, then upscale once
(Upscayl or equivalent) to at least 2600px wide for the desktop retina
master. Layers export as transparent AVIF with WebP fallback. Liftable props
get their occluded background inpainted before layer export. File the
approved master scene and both duck sheets in status.md under TODO(assets)
as the canonical references; record the exact prompt that produced each.
