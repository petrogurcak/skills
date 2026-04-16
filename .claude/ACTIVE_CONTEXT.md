# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-15 / 2026-04-16 (vecer)
- **Branch:** main (pushed: `5034cb6`)
- **Dokonceno:**
  - **Dual-CLI setup sjednoceny** mezi Claude Code a Gemini CLI:
    - `~/.gemini/GEMINI.md` resynced s `~/.claude/CLAUDE.md` (byl 7. brezna, za mezi tim driftnul o "skill capture", "worktree isolation", "memory decay dates", MCP SERVERS sekci)
    - Pridano pravidlo **"Dual-CLI config sync"** do obou global configs — agent sam sync-uje pri edit
    - Pridano pravidlo **"Cross-CLI session continuity"** — .claude/ACTIVE_CONTEXT.md / DECISIONS.md / mistakes.md cte a pise oba CLI stejne
  - **Novy script `~/.claude/scripts/sync-mcp-to-gemini.sh`** — prevadi `.mcp.json` → `.gemini/settings.json` (strip `"type":"stdio"`, warning na secrets, auto-add do .gitignore)
  - **`projectsetup` Step 2.5 Step 6** pridan: po `claude mcp add` auto-generate Gemini settings + security check
  - **🚨 API key leak + oprava:**
    - Push `97c17a2` obsahoval `GEMINI_API_KEY` + `IDEOGRAM_API_KEY` v `.gemini/settings.json` na public `petrogurcak/skills`
    - User rotoval oba klice (Gemini Studio + Ideogram dashboard)
    - Commit `de6aa35`: `.gemini/settings.json` → `.gitignore` + `git rm --cached`
    - **Migrace na 1Password:** `.mcp.json` + `.gemini/settings.json` nyni pouzivaji `op run --no-masking -- python3 ...` + `op://Dev/shared-keys/<KEY>` env refs. Zero plaintext klicu lokalne.
    - Commit `5034cb6`: `mistakes.md` postmortem (4 lessons)
  - **Skills project ma** `.gemini/settings.json` (gitignored) s 4 MCP servery: notebooklm, luma, nanobanana, ideogram
- **Rozdelano:** Nic

## Otevrene problemy

- **Verify 1Password setup funguje v praxi** — po restartu Claude Code otestovat `ideogram_generate` nebo `nanobanana_generate`, pokud `op signin` neni aktivni, MCP server spadne
- **Retrofit existujicich projektu** — crewboard a dalsi projekty nemaji `.mcp.json` / `.gemini/settings.json`. Pokud nekdy budou potrebovat MCP, pouzit workflow: `claude mcp add --scope project ...` → `~/.claude/scripts/sync-mcp-to-gemini.sh`
- **claude-config repo** ma spoustu necommitnutych zmen (17k deletions z migrace skills/, 10 novych hook scriptu) — user je ceka, commit pozdeji sam
- **Root CLAUDE.md plugin table** — stale nutne aktualizovat counts (development 13, review 5, total 60)

## Poznamky pro dalsi session

- Novy pattern pro MCP secrets: **vzdy op:// refs + `op run` wrapper**, nikdy plaintext v `.mcp.json`
- **Pre-push check na public repo:** `git diff --cached | grep -iE "api[_-]?key|secret|token|password"`
- Sync script umi retrofit existujici projekty: `cd ~/Projects/<foo> && ~/.claude/scripts/sync-mcp-to-gemini.sh`
- Gemini CLI v projektu: `.claude/*` soubory sdilene, MCP pres `.gemini/settings.json` (ma vlastni format bez `"type":"stdio"`)

## Dalsi kroky

### Priorita 1

1. Otestovat `op run` wrapper v Claude Code (restart + trigger MCP call)
2. Zrotovane klice uz jsou v 1Password? Verify `op item get shared-keys --vault Dev --fields GEMINI_API_KEY,IDEOGRAM_API_KEY`
3. Aktualizovat root CLAUDE.md plugin table

### Priorita 2

4. Test designing-abstractions v praxi (carry-over z minule session)
5. Brand Strategy skill — deep research
6. Sales skill — novy plugin
