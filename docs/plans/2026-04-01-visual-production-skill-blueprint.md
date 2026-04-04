# Visual Production Skill Blueprint - Typography for "Mlsné tlapky"

**Project:** "Mlsné tlapky" (Children's Book)  
**Style Inspiration:** Andrea Tachezy  
**Target Goal:** High readability in dim light/bedtime reading, strong contrast, whimsical and soft aesthetic.

## 1. Typographical Principles for Bedtime Reading

### A. Legibility in Low Light
- **High Contrast (Softened):** Avoid pure #000000 on #FFFFFF. Use graphite/dark charcoal on off-white/cream.
- **Generous Spacing:** Large leading (line spacing) is critical to prevent lines from blurring together when the parent is tired or light is low.
- **Simplified Glyphs:** Use fonts with distinct character shapes (humanist sans-serif) to support early readers and ease of recognition.

### B. Hierarchy of Information
- **Narration:** Clean, highly legible sans-serif.
- **Emphasis:** Bold names (Šedík, Fous, Lap, Míla) to anchor character identification.
- **Dialogue/Emotion:** "Hand-drawn" or handwritten font to match the pencil-line style of illustrations.

---

## 2. Technical Font Settings

### Primary Body Font (Sans-Serif)
- **Selection:** **Montserrat** (Medium/Semi-bold) or **Andika**.
- **Font Size:** 16pt - 18pt (Large).
- **Leading (Line Spacing):** 1.5 - 1.6 (approx. 24-28pt).
- **Tracking (Letter Spacing):** +2% to +5% (slightly loose for better separation).
- **Alignment:** Left-aligned (ragged right). Never justified (to avoid irregular word spacing).

### Expressive Font (Hand-drawn)
- **Selection:** **Gloria Hallelujah** or a custom font matching Andrea Tachezy's pencil strokes (must support CZ diacritics: š, č, ř, ž, ť, ň, ď).
- **Usage:** Speech bubbles, exclamations, page titles.
- **Style:** All-caps for emphasis (ex: "ACH JO!", "TADY JSEM!"), sentence case for softer thoughts.

---

## 3. Contrast & Color Palette

### Light Spread (Day/General)
- **Background:** Off-white / Cream (#FCFBF9) with subtle paper grain texture.
- **Text:** Graphite / Dark Charcoal (#424242 or #333333).

### Dark Spread (Night/Focus)
- **Background:** Deep Navy or Charcoal Grey (#263238).
- **Text:** Soft Cream or Pale Yellow (#FFFDE7).
- **Weight:** Increase font weight to **Bold** for light text on dark background (compensates for the visual "thinning" of light glyphs).

---

## 4. Layout & Composition
- **Negative Space:** Maintain 40-50% white space for text blocks to "breathe".
- **Grounding:** Text should be anchored to specific areas of the spread (e.g., top-left or bottom-right) to avoid overlapping with vignette characters.
- **Character Pacing:** Bold the first occurrence of a character name on each spread.

---

## 5. Implementation for Banana Illustrator (Skill Update)
When generating prompts or directing the layout, the sub-agent should:
1. Reserve specific regions for text based on the narrative weight.
2. Use the "Style Locking" master prompt to ensure background texture matches the typography's soft contrast.
3. For dark scenes, explicitly prompt for "soft luminous accents" where text might be placed.

---

*Prepared by Gemini CLI - 2026-04-01*
