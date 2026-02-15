# Aktuální stav práce

## Poslední session

- **Datum:** 2026-02-14
- **Branch:** main
- **Dokončeno:**
  - **Claude-pilot inspired enforcement hooks** (inspirace z maxritter/claude-pilot)
  - **4 nové hook skripty** v `~/.claude/hooks/`:
    - `plan-utils.sh` — shared utilities pro plan-aware hooks
    - `context-monitor.sh` — tool call tracking (120/170/220 thresholds)
    - `tdd-enforcer.sh` — detekce chybějících testů po Write/Edit
    - `notify.sh` — macOS notifikace (osascript + Glass sound)
  - **2 upravené hooky**: `stop-verify.sh` (plan-aware stop guard), `drift-detection.sh` (plan-utils integrace)
  - **3 noví agenti** v `~/.claude/agents/`:
    - `plan-challenger.md` — adversarial plan review
    - `compliance-reviewer.md` — kód vs plán
    - `quality-reviewer.md` — kvalita kódu + TDD
  - **3 updatnuté skills**: planning (YAML frontmatter lifecycle), development-workflow (dual review), workflow-optimization (options J-O)
  - **settings.json** updatnutý s novými hooky (12 PostToolUse, 4 SessionEnd)
  - Commit `4ad7027`, pushed + cache updatnutý
- **Rozděláno:** Žádné
- **Další krok:** Žádný specifický

## Otevřené otázky

- Žádné

## Poznámky pro další session

- Hooks jsou mimo git repo (~/.claude/hooks/) — spravovat ručně
- Plan lifecycle: pending → in_progress → complete → verified (YAML frontmatter)
- Deep review odhalil 4 CRITICAL + 7 WARNING bugů PŘED implementací — všechny opraveny
- Klíčový fix: `status` je readonly v zsh → přejmenováno na `plan_status`
- Context monitor funguje přes /tmp/claude-context-counter (static path, bez PID)
- Stop guard escape hatch: dvojitý stop do 60s → approve
