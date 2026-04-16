# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-16
- **Branch:** main (pushed: `6f80a46`)
- **Dokonceno:**
  - **Dual-CLI parity — finalni runda (3 iterace):**
    1. Global config sync: CLAUDE.md ↔ GEMINI.md identicky, pravidlo "auto-sync při editu"
    2. Per-project MCP: `.mcp.json` + `.gemini/settings.json` přes 1Password `op://Dev/shared-keys/<KEY>` + `op run` wrapper. Zero plaintext lokálně.
    3. Skills symlinks: 98/98 v Gemini a Cowork (retrofit 32 missing Gemini + 66 missing Cowork + 3 broken)
  - **API key leak + oprava (postmortem v mistakes.md):**
    - Pushnul jsem `.gemini/settings.json` s `GEMINI_API_KEY` + `IDEOGRAM_API_KEY` na public `petrogurcak/skills` (commit `97c17a2`)
    - User rotoval oba klíče. Commit `de6aa35` removal + gitignore. Commit `5034cb6` mistakes.md postmortem (4 lessons).
  - **4 agenti portovani na skills** (Gemini teď může volat to samé co Claude Code přes Agent tool):
    - `review:plan-challenger` (commit `80f4703`)
    - `review:compliance-reviewer` (commit `6f80a46`)
    - `review:quality-reviewer` (commit `6f80a46`)
    - `development:build-error-resolver` (commit `6f80a46`)
  - **Planning skill Phase 3 posileny gates:**
    - "POVINNÝ KROK" / "POVINNÝ DOTAZ" markery
    - 6-item checklist před Phase 4 exit
    - Explicit cross-CLI invocation paths (Skill tool / activate_skill)
  - **Hook-equivalent rules pro Gemini:**
    - `~/.claude/scripts/session-start.sh` — cross-CLI session context loader (ACTIVE_CONTEXT + DECISIONS + mistakes + MEMORY.md)
    - GEMINI.md "Lifecycle Rules" sekce — manuální equivalent pro auto-prettier, console-log-check, auto-capture-corrections, stop-verify, memory-reindex
    - "Ztráta Agent Tool isolation" awareness + compensation rules (concise reading, sekvenční review)
  - **Global configs nová sekce `# DEVELOPMENT`:**
    - Skill Invocation Protocol (1% rule + red flags tabulka)
    - 22 Trigger → Skill mapping (development + domain + nove review skills)
    - 8 Always-Applied Principles (branch first, TDD, verify, Principle 14, commit rules, git safety, pre-push grep, CLI verify)
    - 7 Checkpoints s user confirmation
    - Session Start mandatory rules (s session-start.sh fallback)
  - **Utility scripts:**
    - `~/.claude/scripts/sync-mcp-to-gemini.sh` (konverze .mcp.json → .gemini/settings.json + auto-gitignore)
    - `~/.claude/scripts/sync-skills-symlinks.sh` (idempotentni sync Gemini + Cowork)
    - `~/.claude/scripts/session-start.sh` (cross-CLI session loader)
  - **`projectsetup` Step 2.5 Step 6** pridan: auto-generate `.gemini/settings.json` + security check
- **Rozdelano:** Nic (tato session kompletni)

## Otevrene problemy

- **Verify 1Password `op run` funguje v Claude Code** — po restartu otestovat `ideogram_generate` / `nanobanana_generate` a ověřit `op signin` je aktivni
- **Gemini CLI behavior test** — spustit Gemini session v projektu, ověřit že:
  1. Běží `session-start.sh` jako první akci
  2. Invokuje `review:plan-challenger` po `planning` Phase 2
  3. Ptá se na deep-review a second-opinion
  4. Před claim "hotovo" spouští tests/lint
- **Session start script commit** — skript je v `~/.claude/scripts/`, to je claude-config repo (massive uncommitted changes 17k deletions from skills/ migration). Buď commit jen tento skript (cherry), nebo nech čekat
- **Cowork stale directories** — 10 ne-symlink dirs (canvas-design, consolidate-memory, atd.) — user old skills, let user rozhodnout co s nimi
- **Root CLAUDE.md plugin table counts** — stále outdated (development 13, review 5, total 60)

## Poznamky pro dalsi session

- **Memory path encoding:** `~/.claude/projects/$(pwd | tr / -)/memory/` — Claude Code convention, session-start.sh používá stejné
- **Dual-CLI sync pravidlo v obou configs:** editnout jeden → vždy updatni druhý (liší se jen v path refs k NOW.md + Gemini Added Memories sekce)
- **Review skills patterně-unifikované:** všechny 3 (plan-challenger, compliance, quality) mají `Announce` + `When to Use` + `When NOT to Use` + `Process` + `Output Format` + `Rules` + `After Review` strukturu
- **Hook semantika:** hook = deterministic enforcement harness-side, skill = instruction current session. Gemini nemá hooks → spoléhá na disciplinu + explicit rules v GEMINI.md.

## Dalsi kroky

### Priorita 1

1. **End-to-end test Gemini CLI** na skills projektu — čte session-start? Invokuje skills? Následuje Lifecycle Rules?
2. Verify 1Password `op run` v Claude Code po restartu
3. Cherry-pick commit `session-start.sh` do claude-config repa (jen ten jeden skript)

### Priorita 2

4. Root CLAUDE.md plugin counts update (carry-over)
5. Test designing-abstractions v praxi (carry-over)
6. Brand Strategy skill — deep research
7. Sales skill — novy plugin
