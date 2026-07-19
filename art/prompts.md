# Art Prompt Log

Every kept image (approved **or** rejected-but-useful) gets an entry here — the exact prompt, the model, and what references were attached. This is what makes results reproducible and edits possible.

Rules (from `CLAUDE.md` §3 and `art_style.md`):
- Every prompt starts with the locked style paragraph from `art_style.md` §1, pasted **verbatim**.
- After the master scene is approved, every generation attaches the master scene (and duck sheets where relevant) as reference images. An asset generated without them is rejected.
- All text props are generated **blank** (law 3 — no text baked into artwork).

---

## Template

### `<filename as saved in art/...>`
- **Date:**
- **Model:**
- **References attached:** (none / master scene / pose sheet / expression sheet / reject `<file>`)
- **Status:** candidate | approved | rejected → moved to `rejects/`
- **Prompt:**

```
<exact prompt, including the verbatim art_style.md §1 paragraph>
```

- **Notes:** what worked, what to change next iteration

---

<!-- Entries below, newest first -->
