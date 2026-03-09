---
status: pending
created: 2026-03-09
tasks_total: 6
tasks_done: 0
---

# Gemini 3.1 Frontend & UX Integration Plan

**Goal:** Integrate Gemini 3.1 Pro visual and logic capabilities (sketches-to-code, interactive SVGs, logic-to-wizard) into React and Alpine.js workflows.
**Architecture:** Update existing skills with new prompt patterns, specialized components, and visual-first workflows.
**Tech Stack:** React (Vite/Tailwind), Alpine.js, Framer Motion, SVG, Gemini 3.1 Canvas/Vision.

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify → demo → merge → wrapup

---

### Task 1: Update frontend-lp (React) with Visual & Logic Patterns

**Files:**
- Modify: `plugins/development/skills/frontend-lp/SKILL.md`

**Step 1: Add Interactive SVG pattern**
Vložit sekci pro generování interaktivních SVG pomocí Gemini 3.1 s využitím Framer Motion.
**Step 2: Add Logic-to-UI React Wizard pattern**
Vložit instrukce pro transformaci FigJam diagramů do React Wizard komponent.
**Step 3: Add Visual Design Prompting**
Přidat instrukci "Upload sketch first" do úvodního workflow.

### Task 2: Update frontend-app (Alpine.js) with Logic & SVG Patterns

**Files:**
- Modify: `plugins/development/skills/frontend-app/SKILL.md`

**Step 1: Add Logic-to-UI Alpine Machine pattern**
Vytvořit vzor pro x-data stavový automat mapující diagramy na UI kroky.
**Step 2: Add Alpine Interactive SVGs**
Vzor pro ovládání SVG atributů přes Alpine direktivy a CSS vars.

### Task 3: Update ux-optimization with Visual Prompting Guide

**Files:**
- Modify: `plugins/ux/skills/ux-optimization/SKILL.md`

**Step 1: Add Gemini 3.1 Visual Diagnosis**
Aktualizovat Phase 1 (Diagnose) o analýzu screenshotů z heatmap a session recordingů pomocí Gemini Vision.

### Task 4: Enhance micro-interactions practice

**Files:**
- Modify: `plugins/ux/skills/ux-optimization/practices/micro-interactions.md`

**Step 1: Add Gemini 3.1 Prompt Samples**
Vložit 5 konkrétních promptů z článku Nicka Babiche (Interactive Card, Telemetry Dashboard, atd.) přizpůsobených pro naše stacky.

### Task 5: Verification - React Demo

**Step 1: Run verification**
Simulovat generování "Interactive Credit Card" v Reactu podle nového skillu.
Expected: Kód používá Tailwind a Framer Motion, SVG je čisté a malé.

### Task 6: Verification - Alpine Demo

**Step 1: Run verification**
Simulovat generování "Mortgage Wizard" v Alpine.js podle diagramu.
Expected: x-data obsahuje stavový automat pro kroky, x-show přepíná sekce.
