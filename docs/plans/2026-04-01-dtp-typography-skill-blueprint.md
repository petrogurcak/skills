# DTP and Typography Skill Blueprint - Beginning Readers & Dyslexics

**Project Reference:** "Supermáňa" by Ester Stará / Christian Boer's Dyslexie Font  
**Target Goal:** Maximal readability for children starting to read and individuals with dyslexia. Focus on syllable decoding and preventing visual crowding.

## 1. Core Typographic Principles

### A. Font Selection & Geometry
- **Weighted Baseline:** Use fonts with a "heavy bottom" (e.g., **Dyslexie**, **OpenDyslexic**, or **Andika**). This anchors letters and prevents the brain from flipping or rotating them (e.g., confusing 'b' and 'd').
- **Unique Silhouettes:** Ensure letters that are typically mirrors of each other (p/q, b/d) have distinct individual features (different slants, openings, or tail lengths).
- **Larger Apertures:** Characters like 'c', 'e', and 'o' must have clearly distinct openings to avoid confusion.

### B. Spacing for Decoding
- **Word Spacing:** Use extreme word spacing (approx. 3-4x standard) to clearly define word boundaries.
- **Line Spacing (Leading):** Minimum 1.5 to 1.8. Prevents "line jumping" and visual blurring of rows.
- **Tracking (Letter Spacing):** Increased (+5% to +10%) to combat the "crowding effect" where letters appear to melt together.

---

## 2. Syllable-Based Visual Anchors (The "Supermáňa" Method)

### A. Syllable Highlighting
- **Alternating Colors:** Use two alternating shades to indicate "reading units" (syllables or groups).  
  *Example:* "Su" (Grey), "per" (Red), "má" (Grey), "ňa" (Red).
- **Syllable Complexity Levels:**
  1. **Open Syllables (xo):** "to", "má" (Consonant + Vowel).
  2. **CVC (xox):** "jak", "pes".
  3. **Complex Clusters:** "bav-ln-ka" (Handle with care, keep as one unit if necessary or break clearly).

### B. Color Palette
- **Primary Text:** Dark Charcoal (#333333) or Dark Blue (#1A237E).
- **Accent/Syllable Color:** Soft Red (#E53935) or Burnt Orange (#F4511E).
- **Background:** Cream or Off-white (#FFFDE7 / #FCFBF9) to reduce "dazzling" glare.

---

## 3. Layout & Structure

### A. Short Text Blocks
- **Chunking:** Never present more than 3-5 lines of text in a single block.
- **Negative Space:** Surround text blocks with 50%+ white space to reduce cognitive load.
- **Ragged Right:** VZDY (Always) use left-alignment. Never justify text, as irregular word gaps are confusing for dyslexics.

### B. Emotional/Emphasis Layers
- **Names:** Use **Bold** for the first occurrence of a character name.
- **Sound Effects:** Use expressive, hand-drawn typography (e.g., "BUCH!", "PRÁSK!") to add a playful, non-linear layer to the reading experience.

---

## 4. Implementation Guidelines for Agents
1. **Research Phase:** Identify if the text is for early learners (level 1-3) or general accessibility.
2. **Analysis Phase:** Break the input text into syllables using the (xo, xox) rules before applying styles.
3. **Execution Phase:** Apply CSS/DTP settings (Letter-spacing: 0.12em; Word-spacing: 0.35em; Line-height: 1.8;).

---

*Prepared by Gemini CLI - 2026-04-01*
