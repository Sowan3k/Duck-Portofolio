# V-010D / V-012C — Telephone handset, resting card, and localized clean plate

- Use case: `precise-object-edit` plus deterministic masked compositing
- Source plate:
  `visuals/04-scene-production/clean-plates/approved/office-clean-plate-skills-book--v01--approved.png`
- Approved moving layers:
  - `visuals/04-scene-production/liftable-props/approved/interactive-telephone-handset--v02--approved.png`
  - `visuals/04-scene-production/liftable-props/approved/interactive-contact-card-rest--v01--approved.png`
- Approved production clean plate:
  `visuals/04-scene-production/clean-plates/approved/office-clean-plate-telephone-contact--v03--approved.png`
- Status: owner-approved; promoted byte-identically on 2026-07-19

## Final localized handset-donor prompt

Image 1:
`tmp/imagegen/local-inputs/telephone-local-source--v01.png`

Image 2:
`tmp/imagegen/local-inputs/telephone-local-removal-reference--v01.png`

> Edit Image 1 as an exact local clean plate. Keep the crop framing,
> perspective, position, scale, and vintage hand-inked storybook rendering
> unchanged. Remove only the large black telephone handset lying diagonally
> across the left side of the phone. Reconstruct the pixels underneath as the
> same empty cradle and sloped charcoal phone housing shown semantically in
> Image 2, but align everything to Image 1. Preserve Image 1's exact outer phone
> body, cream display, every keypad button, coiled cord, chair edge, wooden desk
> grain, cabinet, and plant fragment. Do not move or redesign the phone. Do not
> alter the cord. Do not add text or objects. The intended changed region is
> only the silhouette occupied by the handset; everywhere else should visually
> match Image 1. The exposed upper cradle must be a dark recessed hook-switch
> cavity; the lower exposed area must continue the surrounding sloped charcoal
> plastic with consistent perspective, fine ink hatching, wear, and lighting.
> Preserve the same 3:2 crop and resolution.

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-341c5537-be89-4cfe-b952-a13a2246ace1.png`
- Workspace donor:
  `visuals/04-scene-production/inpainted/drafts/telephone-local-clean-donor--v01.png`
- SHA-256: `2B86BB8F1989009C786A10A34FB2CB9B5205BC77A8F425F80979BC813340B019`

## Final localized card-donor prompt

Image 1:
`tmp/imagegen/local-inputs/contact-card-local-source--v01.png`

Image 2:
`tmp/imagegen/local-inputs/contact-card-local-removal-reference--v01.png`

> Edit Image 1 as an exact local clean plate. Preserve the crop framing,
> perspective, scale, linework, warm palette, lighting, desk grain, telephone
> corner, metal plant pot, wooden card holder geometry, and vintage hand-inked
> storybook texture. Remove only the large blank cream contact card standing in
> the wooden holder. Reveal the same empty dark interior slot and wooden back
> wall shown semantically in Image 2, but align all geometry and materials to
> Image 1. Keep every wooden rim, front lip, corner, highlight, shadow, and the
> surrounding desk and pot unchanged. Do not move, resize, redesign, or replace
> the holder. Do not add text, paper, symbols, or new objects. The intended
> changed region is only the visible silhouette of the cream card, including
> its antialiased edge; everywhere else should visually match Image 1. Preserve
> the same wide crop and resolution.

- Built-in output:
  `C:/Users/ASUS/.codex/generated_images/019f741f-c8fc-7602-b5be-30a268be618e/exec-d589a06f-0e59-4642-b310-b3bcab62ca44.png`
- Workspace donor:
  `visuals/04-scene-production/inpainted/drafts/contact-card-local-clean-donor--v01.png`
- SHA-256: `B44710F258B78DAD98CC9140980B2ECF5D3D34A89A6B6A68F2018B73701E7F5E`

## Deterministic production rule

1. Resize each localized donor back to its exact source crop.
2. Register it to the immutable source with translation only; scaling, rotation,
   shear, and global donor drift are forbidden.
3. Composite through the exact nonzero-alpha handset/card object supports with
   a 2.25-pixel inward feather.
4. Restore all pixels outside the combined support byte-for-byte from the source.
5. Recompose the approved cutouts at handset `(1108,697)` and card `(1242,849)`
   to validate the resting state.

The broad v01 repair altered fixed telephone/holder pixels and is rejected. The
localized radius-4 v02 plate improved the lifted state but changed a narrow
fringe outside the cutout alphas, so it remains superseded draft evidence. V03
is the integration-safe production plate.

## Review record

- Dimensions: 1448×1086 RGB.
- Combined exact support: 14,943 pixels.
- Clean-plate changed pixels: 14,923, all inside support; zero outside.
- Recomposition: 1,352 changed pixels, mean absolute RGB error `0.010658`,
  maximum channel error `94`; differences are confined to antialiased edges.
- Fixed display, keypad, cord, plant pot, holder front, desk, and every unrelated
  scene pixel remain source-owned outside support.
- Approved hashes:
  - clean plate v03: `541E9C1381F30819DCE831E964A57A96E925DEC629EFDDBDD13088738A97B5A8`
  - handset v02: `48A11158A11CB1E10C76E1BB92D22786AA3BAA4A52FBB851D1A3AC1660BC5651`
  - resting card v01: `A05E482D6ADEBE04CB05D77522244E2967D05261E021E750675C86534B175E77`
  - QA/approval sheet v03: `79C2C1D577FAAE9C83148B754B0A9DA1007A2CAB7FB8981165815500D48B0BBC`
- Review result: internal QA plus owner approval; production sources promoted
  without overwriting rejected or superseded evidence.

