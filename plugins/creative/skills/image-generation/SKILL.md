---
name: image-generation
description: Orchestrates image generation across Ideogram 3.0, Luma Dream Machine, and nanobanana (Gemini Imagen). Handles tool selection, prompting best practices, character/style consistency, and batch workflows. Use when generating images for any project — product photos, brand visuals, illustrations, social media, presentations.
---

# Image Generation Orchestrator

Universal skill for generating images using available MCP tools. Handles tool selection, prompt engineering, character consistency, and batch workflows.

**Announce:** "Using image-generation skill to [generate/orchestrate] visuals with [tool name]."

## Prerequisites

Before using this skill, check which tools are available. Not all are required — use what you have.

| Tool               | MCP Server                                                            | API Key            | How to get                                               |
| ------------------ | --------------------------------------------------------------------- | ------------------ | -------------------------------------------------------- |
| Ideogram 3.0       | `ideogram` — `python3 <path>/ideogram-mcp/src/ideogram_mcp/server.py` | `IDEOGRAM_API_KEY` | https://ideogram.ai/manage-api — create key in dashboard |
| Luma Dream Machine | `luma` — `python3 <path>/luma-mcp/src/luma_mcp/server.py`             | `LUMAAI_API_KEY`   | https://lumalabs.ai/api — generate API key               |
| Nanobanana         | Gemini extension (built into Claude Code)                             | Gemini API access  | Pre-configured if Gemini is set up                       |

**Setup:** Add the MCP server to your project's `.mcp.json`, set the API key in your environment or `.env`, restart Claude Code.

**At skill start:** Check which tools are actually available. If a tool is missing, say which one and why (e.g., "Ideogram not available — `ideogram_generate` tool not found. Install the Ideogram MCP server and set `IDEOGRAM_API_KEY`."). Continue with whatever tools ARE available.

## Available Tools

### 1. Ideogram 3.0 (`ideogram_generate`)

**Best for:** Typography in images, complex layouts, strong character consistency, detailed scenes.

**MCP tool:** `mcp__ideogram__ideogram_generate`

**Key parameters:**

- `prompt` — the generation prompt
- `aspect_ratio` — e.g. `"1:1"`, `"16:9"`, `"2:1"`, `"9:16"`
- `style_type` — `"auto"`, `"general"`, `"realistic"`, `"design"`
- `rendering_speed` — `"DEFAULT"`, `"TURBO"` (faster, slightly lower quality)
- `character_reference_image_url` — URL of reference image to maintain character identity across generations
- `style_reference_image_url` — URL of style reference to maintain artistic consistency

**When to use:**

- Text/typography needs to appear IN the image (logos, signs, labels)
- Character must stay consistent across multiple generations
- Complex multi-element compositions
- Product mockups with text overlays

**Prompting tips:**

- Be specific about composition: "character on the left, object on the right"
- For text in images, put the exact text in quotes within the prompt
- Use `character_reference_image_url` once you have a good base image — Ideogram maintains identity (including details like glasses, markings, accessories)
- Use `style_reference_image_url` to lock artistic style across a series

### 2. Luma Dream Machine (`luma_generate_video`)

**Best for:** Character turnarounds (360-degree rotations), motion references, animated previews.

**MCP tools:**

- `luma_generate_video` — generate video from prompt or image
- `luma_get_generation` — poll for completion status
- `luma_list_generations` — list recent generations

**Key parameters for `luma_generate_video`:**

- `prompt` — description of the video/animation
- `frame0_url` — starting image URL (image-to-video mode)
- `aspect_ratio` — video aspect ratio
- `loop` — whether to loop the video

**When to use:**

- Creating character reference sheets (turnarounds)
- Testing how a character/object looks from multiple angles
- Generating motion references for animation
- When static images aren't enough to establish consistency

**Workflow: Character Turnaround**

1. Generate one perfect master image (via Ideogram or nanobanana)
2. Use `luma_generate_video` with `frame0_url` pointing to master image
3. Prompt: "character turnaround, rotating 360 degrees, white background, consistent lighting"
4. Poll `luma_get_generation` until complete
5. Extract frames from different angles as reference images for future generations

### 3. Nanobanana (Gemini Imagen)

**Best for:** Quick iterations, artistic textures, watercolor/sketch styles, rapid prototyping.

**Commands:**

- `/generate "prompt" --ar 2:1` — generate new image
- `/edit "change description"` — modify existing image
- `/restore` — enhance quality of previous generation

**When to use:**

- Fast sketching and exploration
- Artistic/painterly styles (watercolor, pencil, charcoal)
- Quick edits to existing images
- When you need many variations fast

## Tool Selection Decision Tree

```
Need text IN the image?
  YES → Ideogram 3.0
  NO →
    Need character turnaround/360 view?
      YES → Luma (image-to-video)
      NO →
        Need strong character consistency across series?
          YES → Ideogram 3.0 (with character_reference)
          NO →
            Need artistic/painterly style?
              YES → Nanobanana
              NO →
                Need complex layout/composition?
                  YES → Ideogram 3.0
                  NO → Nanobanana (fastest)
```

## Character Consistency Workflow

When generating a series of images with the same character(s):

1. **Create Master Image:** Generate the definitive version of the character using any tool. Iterate until perfect.
2. **Upload/Host:** Make the master image available via URL (for `character_reference_image_url`).
3. **Lock Style:** If using a specific artistic style, also save a style reference image.
4. **Generate Series:** Use Ideogram with both `character_reference_image_url` and `style_reference_image_url` for all subsequent images.
5. **Optional Turnaround:** If you need the character from multiple angles, run a Luma turnaround first, extract frames, then use those as additional references.

## Style Consistency Workflow

When all images in a project must share the same visual style:

1. **Define Style Keywords:** Write a master style string (e.g., "minimalist pencil lines, soft watercolor, muted pastels, naive art").
2. **Create Style Reference:** Generate or find one image that perfectly represents the target style.
3. **Lock:** Pass `style_reference_image_url` to every Ideogram generation.
4. **For nanobanana:** Prepend the master style string to every prompt.

## Batch Generation

When generating multiple images for a project:

1. **Plan in a table:**

| #   | Description | Composition | Tool               | Prompt      |
| --- | ----------- | ----------- | ------------------ | ----------- |
| 1   | ...         | ...         | Ideogram/Luma/Nano | Full prompt |

2. **Generate sequentially** — each image may inform the next
3. **Review after each batch of 3-5** — adjust style/prompts if drifting
4. **Save successful prompts** — reuse structure for consistency

## Aspect Ratio Quick Reference

| Use Case                  | Ratio | Notes             |
| ------------------------- | ----- | ----------------- |
| Instagram post            | 1:1   | Square            |
| Instagram story/reel      | 9:16  | Vertical          |
| Book spread (double page) | 2:1   | Wide horizontal   |
| Book single page          | 3:4   | Vertical          |
| Presentation slide        | 16:9  | Widescreen        |
| Product photo             | 4:5   | Slightly vertical |
| Banner/header             | 3:1   | Ultra-wide        |
| Social media card         | 16:9  | Standard          |

## Common Prompt Patterns

**Product on clean background:**
`[Product description], centered, clean white background, studio lighting, product photography, high detail, [aspect_ratio]`

**Character illustration:**
`[Character description], [action/pose], [setting], [art style], [mood/lighting]`

**Typography/Logo:**
`[Design description], text reading "[EXACT TEXT]", [style], clean composition`

**Scene/Environment:**
`[Setting description], [time of day], [atmosphere], [art style], [perspective]`

---

_Always ask the user which tool to use, or suggest based on the decision tree above. When in doubt, start with Ideogram for quality or nanobanana for speed._
