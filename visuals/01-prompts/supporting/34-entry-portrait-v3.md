# V-034 — Entry portrait face candidates v03

- Use case: fresh owner-likeness generation before reuse of the approved v01 frame
- Method: three independent built-in image-generation calls; no edit, iteration,
  correction, compositing, crop, resize, or self-selection
- Image 1 — likeness authority:
  `visuals/00-references/owner/Sowan's real photo.jpeg` (local-only and gitignored)
- Image 2 — art-style authority:
  `visuals/00-references/canonical/ref-01-master-scene.png`
- Status: owner selected candidate B (`v03b`) on 2026-07-20; v03a/v03c remain unselected process evidence

## Owner decision superseding v02

The localized V-034 v02 edit direction was rejected by the owner because it
made the owner look like a child. No v02 portrait was promoted and no v02 inner
crop or runtime exports were created. The v03 set restarts from three fresh,
independent generations rather than iterating on an edited portrait.

## Exact generation prompt

The following text was sent unchanged to each of the three generation calls:

```text
Draw the man in Image 1 as a hand-drawn storybook cartoon portrait in the exact art style of Image 2 — warm palette, dark ink outlines, soft painted shading.

Match his real face from the photo closely: a young adult man in his mid-20s with exactly this face shape, jaw, hairstyle, and slight smile. Do not make him look younger or rounder than the photo.

Head and shoulders, plain warm-cream background, portrait orientation, no text anywhere.
```

No prompt augmentation or negative-prompt text was added.

## Candidate files

All three workspace PNGs are byte-identical copies of their corresponding
built-in generation outputs.

| Candidate | Workspace file | Dimensions / mode | SHA-256 |
|---|---|---|---|
| A | `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v03a.png` | 1024×1536 RGB | `3F9CF7656935EC69146E3C1FAF89F30649236DE647B1729A765058AF628A6D71` |
| B | `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v03b.png` | 1023×1537 RGB | `D9FDDE3E34E2E8C28954D4BCC9CDF6A33CCB863BC57D884F1CCFB38382565DEA` |
| C | `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v03c.png` | 1023×1537 RGB | `983BE1C5603EC56DA8508809FB3DB6C312C3898DB2B79A181E81A78B87DF64F6` |

Built-in source paths:

- A: `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-23e07f12-faf2-4f8e-b1d5-1529bfb28354.png`
- B: `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-d2eb1401-5628-457b-8db6-03d876aeb58a.png`
- C: `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-00e6a890-518c-4457-b52b-8f22240f6484.png`

## Owner-selection review

- Review sheet:
  `visuals/99-review/contact-sheets/v034-face-candidates-v03-review.png`
- Dimensions: `2152×936 RGB`
- SHA-256:
  `E09CA7DBAAE52510BEDBFE8DC779FA6763313DA5792B3694B446C5F035A6C633`
- Privacy: the sheet contains a crop of the private owner photo and is therefore
  explicitly gitignored. It is a local selection aid and must never be
  committed or published.

The three candidates are presented in call order as A, B, and C. Codex did not
rank or select them; the owner selected candidate B. Initial eligibility inspection confirms
that all three are head-and-shoulders storybook portraits on warm-cream
backgrounds with plain dark clothing and no visible text, letters, symbols, or
brand logo. Likeness and apparent age remain exclusively the owner's selection
gate.

## Procedure after owner selection

1. Composite only the chosen inner portrait into the approved v01 wooden frame,
   plaque, and outer backdrop, leaving those v01 regions unchanged.
2. Save the framed draft as
   `visuals/06-supporting/entry-portrait/drafts/entry-portrait-sowan--v04.png`.
3. Run blankness, margin, opacity, 390 px readability, no-text, logo, and
   unchanged-frame QA; then stop for owner approval.
4. Only after approval, promote v04 byte-identically and derive its reusable
   inner portrait plus all twelve versioned responsive AVIF/WebP variants.
5. Mark the current v01-derived runtime set stale/superseded in records without
   overwriting or deleting its historical files, then update manifest and
   status.

The deterministic v04 composite and its QA record are documented in
`visuals/01-prompts/supporting/34-entry-portrait-v4.md`.
