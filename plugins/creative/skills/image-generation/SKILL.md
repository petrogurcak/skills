---
name: image-generation
description: Generate images via Ideogram 3.0 (typography, character/style consistency, brand colors) or Nanobanana / Google Imagen 3 (artistic textures, fast iterations). Cowork-friendly — uses bash + REST API, no MCP required, keys fetched from 1Password. Use whenever the user wants to create, generate, or produce any image — product photos, brand visuals, illustrations, social posts, mockups, posters, icons, or visual content. Triggers also on "Ideogram", "nanobanana", "Imagen", "vygeneruj obrázek", "udělej vizuál".
---

# Image Generation

Generates images using REST APIs through bash scripts. Works in Claude Code AND Cowork — no MCP server required.

**Announce:** "Using image-generation skill — [Ideogram | Nanobanana] for [purpose]."

---

## First-run setup (one-time per machine)

Before generating, the skill needs API keys. **Always run setup first when on a new machine:**

```bash
bash plugins/creative/scripts/setup.sh
```

(Path is relative to the skills repo root. From a Cowork project the absolute path is `~/Projects/skills/plugins/creative/scripts/setup.sh`.)

The script tries to find each key in this order:

1. **1Password** — `op://Dev/shared-keys/<KEY_NAME>` (recommended, portable across machines)
2. **Environment variable** — `$IDEOGRAM_API_KEY`, `$GEMINI_API_KEY`
3. **`.env` file** in current working directory

If a key is missing, the script prints exact instructions including the provider URL.

### What to tell the user when keys are missing

When `setup.sh` reports a missing key, instruct the user:

> Pro **Ideogram** (typografie, character consistency):
> 1. Get key: https://ideogram.ai/manage-api
> 2. Open 1Password → vault `Dev` → item `shared-keys` (create if missing)
> 3. Add field `IDEOGRAM_API_KEY` with the key value
> 4. Make sure `op` CLI is signed in (`op signin`)
> 5. Re-run setup
>
> Pro **Nanobanana** (Google Imagen 3, fast iterations):
> 1. Get key: https://aistudio.google.com/apikey
> 2. Same 1Password item, add field `GEMINI_API_KEY`
> 3. Re-run setup

The user can also use env vars or `.env` — `setup.sh` documents all options.

---

## Tool selection

```
Need text/typography IN the image?         → Ideogram
Need exact brand colors enforced?           → Ideogram (--colors)
Need character consistency across series?   → Ideogram (--char-ref)
Need fast/artistic exploration?             → Nanobanana
Need painterly/watercolor/sketch?           → Nanobanana
Need complex layout with named elements?    → Ideogram
Don't know yet?                             → Nanobanana (faster, cheaper) for first draft, then Ideogram if needed
```

---

## Ideogram

Best for: typography in images, complex compositions, character/style consistency, brand-color-locked outputs, inpainting edits.

### Generate

```bash
bash plugins/creative/scripts/ideogram-generate.sh \
  --prompt "minimalist coffee bag mockup with text 'Flatwhite La Marzocco'" \
  --aspect 4x5 \
  --style DESIGN \
  --speed QUALITY \
  --colors "#1C2B3A,#F7F4EF,#C9A86A" \
  --num 2 \
  --out ./generated/coffee-mockups
```

### Key flags

| Flag           | Values                                                   | Notes                                  |
| -------------- | -------------------------------------------------------- | -------------------------------------- |
| `--prompt`     | text                                                     | Required. Be specific about layout.    |
| `--aspect`     | `1x1` `2x1` `1x2` `2x3` `3x2` `3x4` `4x3` `4x5` `5x4` `9x16` `16x9` | Default `1x1`             |
| `--style`      | `AUTO` `REALISTIC` `DESIGN` `GENERAL` `FICTION`          | Default `AUTO`                         |
| `--speed`      | `QUALITY` `BALANCED` `TURBO` `FLASH`                     | Default `QUALITY`                      |
| `--magic`      | `AUTO` `ON` `OFF`                                        | `OFF` = use prompt verbatim            |
| `--num`        | `1`-`4`                                                  | Default `1`                            |
| `--seed`       | integer                                                  | Reuse seed from successful run         |
| `--negative`   | text                                                     | e.g. `"blurry, distorted text"`        |
| `--preset`     | preset name                                              | `WATERCOLOR` `OIL_PAINTING` `PRODUCT_PHOTOGRAPHY` `MINIMALISM` `LINE_ART` etc. |
| `--colors`     | `#hex,#hex,...`                                          | Enforce brand palette                  |
| `--char-ref`   | URL                                                      | Maintain character identity            |
| `--style-ref`  | URL                                                      | Lock artistic style                    |
| `--out`        | path                                                     | Default `./generated/ideogram`         |

### Prompting tips for Ideogram

- For text in images, put the exact words in quotes: `text reading "Coffee Roastery"`
- Use `--magic OFF` when you've crafted a specific prompt — Ideogram won't rewrite it
- `--colors` is strict — Ideogram sticks to the palette
- `--char-ref` + `--style-ref` together = strong consistency across a series
- Reuse `--seed` from a successful generation to make controlled variations

---

## Nanobanana (Google Imagen 3)

Best for: fast iterations, artistic textures, watercolor/sketch styles, exploration.

### Generate

```bash
bash plugins/creative/scripts/nanobanana-generate.sh \
  --prompt "watercolor sketch of a small Italian coffee bar, morning light" \
  --aspect 16:9 \
  --num 3 \
  --out ./generated/exploration
```

### Key flags

| Flag       | Values                                | Notes                            |
| ---------- | ------------------------------------- | -------------------------------- |
| `--prompt` | text                                  | Required.                        |
| `--aspect` | `1:1` `3:4` `4:3` `9:16` `16:9`       | Default `1:1`                    |
| `--num`    | `1`-`4`                               | Default `1`                      |
| `--model`  | model id                              | Default `imagen-3.0-generate-002`|
| `--out`    | path                                  | Default `./generated/nanobanana` |
| `--prefix` | string                                | Filename prefix (default `banana`)|

### Prompting tips for Nanobanana

- Start every prompt with style keywords: `"watercolor, soft pastels, hand-drawn,"` then describe scene
- Imagen 3 doesn't render in-image text reliably — use Ideogram for typography
- Generate 3-4 variants at once (`--num 3`), pick the best, refine the prompt

---

## Workflows

### Character consistency (series of images)

1. Generate a master image with Ideogram (iterate until perfect)
2. Upload it somewhere with a public URL (Imgur, S3, GitHub raw)
3. For every subsequent image, pass `--char-ref <url>` and ideally `--style-ref <url>`
4. Reuse `--seed` for controlled variations

### Style consistency (project look)

1. Define style string: e.g. "minimalist line art, muted earth tones, naive style"
2. Prepend it to every prompt (both tools)
3. Ideogram: also use `--style-ref <url>` and `--colors` to enforce palette
4. Nanobanana: prepend the style string + add specific texture keywords

### Brand mockups with text

Use Ideogram only. Pattern:

```bash
ideogram-generate.sh \
  --prompt "[product] mockup, centered, white studio background, text '[BRAND]' visible on label" \
  --style DESIGN \
  --colors "#brand1,#brand2" \
  --magic OFF \
  --num 4
```

Pick the best, reuse `--seed`, refine.

### Quick exploration → polish

1. Nanobanana with `--num 4` and a loose prompt — pick best direction
2. Refine the prompt based on what worked
3. Switch to Ideogram for the final polished version with brand colors / typography

---

## Aspect ratio cheatsheet

| Use case                  | Ideogram | Nanobanana |
| ------------------------- | -------- | ---------- |
| Instagram post            | `1x1`    | `1:1`      |
| Instagram story / reel    | `9x16`   | `9:16`     |
| Book single page          | `3x4`    | `3:4`      |
| Presentation slide        | `16x9`   | `16:9`     |
| Product photo             | `4x5`    | `3:4`      |
| Web hero (banner)         | `2x1`    | `16:9`     |

---

## Error handling

If a script exits with code:
- `1` — key missing → run `setup.sh`, follow instructions
- `2` — bad CLI args → check `--help`
- `3` — API error → message printed to stderr (rate limit, quota, malformed prompt)

If `op` is not signed in: `eval $(op signin)` then retry.

If running on a machine without `op` and no env var set: create a `.env` in the project working folder with `IDEOGRAM_API_KEY=...` / `GEMINI_API_KEY=...` (and add `.env` to `.gitignore` — the get-key.sh helper reads `.env` from cwd).

---

## Output

Both scripts print absolute paths of saved images to stdout, one per line. Use this in shell composition:

```bash
img=$(bash plugins/creative/scripts/ideogram-generate.sh --prompt "..." | tail -1)
open "$img"
```

---

## Notes for Cowork

- **Plugin must be enabled.** Cowork loads only enabled plugins. If `creative@skills` is not in `cowork_settings.json > enabledPlugins`, this skill is invisible — enable it via Cowork UI or by editing the file.
- **`op` CLI inside Cowork sandbox.** Cowork runs in a gVisor sandbox; `op` may or may not work depending on filesystem access. If it fails, use the `.env` fallback in the project working folder.
- **Output dir:** by default scripts write to `./generated/<tool>/` relative to the current working directory — meaning relative to the Cowork project folder. Easy to find afterwards.

---

## When to delegate to MCP instead

This skill uses bash for portability. If you're in Claude Code with MCP servers configured (`ideogram`, `nanobanana`), the MCP tools are also valid — they expose the same parameters as structured tool calls. The bash path is the universal fallback that always works.
