# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-28
- **Branch:** main (pushed: `52f8d27`)
- **Dokonceno:**
  - **Layered IG architecture v copywriting plugin** (commit `66073f2`):
    - `ig-orchestrator` (245 lines) — IG family router, ready pro budoucí ig-reels/ig-stories/ig-carousel/ig-ads/ig-analytics
    - `ig-content` (662 lines + 1100 lines references) — 1:1 port Otto v3.3 production artifaktu (strict output discipline: 3-5 variants v code blocks, banned words, žádné HOOK/SUBSTANCE/PAYOFF labely, posts vs stories interpunkce)
    - `ig-strategy` (400 lines) — extracted z bývalého instagram-content (4 idea criteria, 9 formats, technical, engagement, monetizace)
    - Smazán starý `instagram-content` (847 řádků nahrazeno 3 čistšími skillami)
  - **Plugin-shared references** (3 nové soubory na úrovni plugin root):
    - `365-copy-triky.md` (766 lines) — full Mužíková extract + Best-of 50 curated for IG (Hooks, Anti-clichés, Numbers, CTAs, Microcopy)
    - `core-copywriting-principles.md` (180 lines) — Otto principles 1-11
    - `core-briefing-process.md` (160 lines) — 8 question brief + Quick brief 4 (fixed broken refs ze 4 skills)
  - **Storytelling skill update**: difficulty column ⭐ až ⭐⭐⭐ + 3 chybějící examples (Three-Act, Golden Circle, Star-Chain-Hook)
  - **Routing changes**: `copywriting-orchestrator` IG keywords → ig-orchestrator (nebo direct ig-content/ig-strategy když intent jasný)
  - **examples.md generalizace**: +3 ne-coffee niche (SaaS Drag&Drop builder, Restaurant Cacio e pepe, Fitness HIIT)
  - **AGENT.md (CLAUDE.md symlink) plugin counts** (commit `52f8d27`): 13 plugins/60 skills → **15 plugins/101 skills**, sorted desc, added branding (3) + utilities (2)
  - **Cleanup**: smazáno 5x `otto-copywriting*.skill` archivů z repo root (history v `3bf4cb3`)
  - **Git**: 2 commity pushed to GitHub (po cca 30min network delay s GitHubem)

- **Rozdelano:** Nic (Sprint 0 + Sprint 1 IG architecture komplet, pushed)

## PŘEDCHOZÍ session (2026-04-27)

- `utilities:cowork-setup` skill v1.0 + v1.1 (commits `63f0a24`, `a8898f6`, `bb2d58d`) — lightweight setup pro Cowork non-dev projekty, GitHub bridge integration. Detaily v git log.

## PŘEDCHOZÍ session (2026-04-16)

- Dual-CLI parity finale (`6f80a46`): 4 review agents portovaní jako skills, session-start.sh, hook-equivalent rules pro Gemini, planning Phase 3 hardened.

## Otevrene problemy

- **GitHub connectivity** — během této session 3× `git push` timeout 75s (Google fungoval 271ms). Push prošel po cca 30 min. Diagnostika pokud opakuje: `curl -v https://github.com`, `dig github.com`, VPN/firewall check.
- **CLAUDE.md je symlink → AGENT.md** v skills repu — `git add CLAUDE.md` neaktualizuje, musí se `git add AGENT.md`.
- **Test ig-content vs claude.ai** — produkční verifikace neudělaná, příští session.

## Poznamky pro dalsi session

- **Layered orchestrator pattern** osvědčený pro skill families — opakovaně použitelný šablona pro budoucí domény (UX, product family).
- **Plugin-shared references** convention: cross-skill reusable content → `plugins/<x>/*.md`. Skill-specific reference → `references/` daného skillu.
- **Future IG expansion**: ig-reels, ig-stories, ig-carousel, ig-ads, ig-analytics. Architektura ready.
- **365-copy-triky.md použití**: tahá se on-demand jako reference banka, není to skill — všechny copy skills mohou referencovat.
- **Sprint 2 = Flatwhite project CLAUDE.md** parking lot — udělá se až Petr migruje IG workflow z claude.ai do Claude Code (nebo Gemini, nebo Cowork, nebo Flatwhite na shared repo).

## Dalsi kroky

### Priorita 1

1. **Test ig-content v praxi** — restartni Claude Code, "napiš IG post o [Flatwhite produkt]" → porovnej s claude.ai. Gaps doladit.
2. End-to-end test Gemini CLI na skills projektu (carry-over) — čte session-start? Invokuje skills?
3. Verify 1Password `op run` v Claude Code po restartu (carry-over).

### Priorita 2

4. Cherry-pick `session-start.sh` do claude-config repa (carry-over).
5. Cowork stale directories cleanup (carry-over).
6. Brand Strategy skill — deep research (carry-over).
7. Sales skill — novy plugin (carry-over).
