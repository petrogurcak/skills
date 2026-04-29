# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-29
- **Branch:** main (merged + pushed `db88b8f`)
- **Dokonceno:**
  - **`creative` plugin 1.0.0 → 2.0.0** (commit `385b895`, merge `db88b8f`):
    - `plugins/creative/scripts/setup.sh` — first-run check, instruktuje user na 1Password setup s exact field names a provider URLs
    - `plugins/creative/scripts/lib/get-key.sh` — priority chain: `op read op://Dev/shared-keys/<KEY>` → env var → `.env` v cwd → fail s instrukcemi. Override přes `$CREATIVE_OP_VAULT` / `$CREATIVE_OP_ITEM`.
    - `plugins/creative/scripts/ideogram-generate.sh` — Ideogram 3.0 v1 generate REST, full param set (aspect, style, speed, magic, num, seed, negative, preset, colors, char-ref, style-ref). FLASH speed default pro low-cost.
    - `plugins/creative/scripts/nanobanana-generate.sh` — Google Imagen 4 REST. Default `imagen-4.0-fast-generate-001` (Imagen 3 už deprecated z v1beta).
    - `plugins/creative/skills/image-generation/SKILL.md` rewrite — first-run UX, key resolution chain, per-tool sections, workflows (character/style consistency, brand mockups), Cowork-specific notes.
  - **Plugin description update** v root `CLAUDE.md` — řádka pro creative plugin teď reflektuje bash+REST+1Password approach.
  - **Smoke test:** Ideogram FLASH 1024×1024 (PNG 330KB) + Imagen 4 Fast 1024×1024 (PNG 1.5MB) oba generated end-to-end z `/tmp/test-image-gen/` ✅
  - **Symlinks synced** — Cowork i Gemini CLI vidí novou verzi.

- **Rozdelano:** Nic. Tree clean, main pushed.

## Otevrene problemy

- **Cowork enable krok manuálně** — `creative@skills` stále chybí v `cowork_settings.json > enabledPlugins`. Bez UI/manual edit Cowork skill nevidí. User to musí kliknout v Cowork UI po restartu (Settings → Plugins → enable creative) nebo manuálně přidat `"creative@skills": true` do JSON.
- **`.zshenv` plaintext key konflikt** — `~/.zshenv` má `GEMINI_API_KEY=AIzaSyCFgLf...` který je JINÝ než ten v 1Password (`AIzaSyByOC...`). Pokud `AIzaSyCFgLf...` nebyl rotován, je leaked v public git historii commit `97c17a2`. Doporučení: rotovat + smazat z `.zshenv`, sjednotit přes `op`.
- **Cowork marketplace cache nepull-ne přes UI "Check for updates"** — pattern z předchozí session, opakovaně 3× za 2 session. Workaround: manual `git pull` v `~/Library/.../cowork_plugins/marketplaces/skills`. Diagnostika pending.
- **Test ig-content vs claude.ai** — produkční verifikace pořád neudělaná (carry-over).
- **Test sell-like-crazy v Cowork** — Cowork updated, čeká na praktický test (carry-over).

## Poznamky pro dalsi session

- **Bash heredoc gotcha:** `echo "$BODY" | python3 <<'PY'` — heredoc PŘEPÍŠE pipe, python dostane heredoc jako stdin (ne pipe). Fix: env var nebo tempfile + python3 -c. Saved as feedback memory.
- **Imagen 3 deprecated** na `generativelanguage.googleapis.com/v1beta` (April 2026) — jen Imagen 4 family available (`fast`, `generate`, `ultra`). Update default model když starší skripty fail s 404.
- **Portable skill pattern přes 1Password:**
  - Nový computer setup: `nainstaluju skills` → first invoke → `setup.sh` → user instruktován jak přidat do `Dev/shared-keys`.
  - `op read op://Dev/shared-keys/<FIELD>` v skriptu = bezpečné, žádný plaintext anywhere.
  - Reusable pattern pro budoucí skills s API keys (Luma, Replicate, ElevenLabs, atd.).
- **NotebookLM CLI workflow** osvědčený (carry-over): `nlm login` → `notebook_get` → parallel `source_describe` → `source_get_content` (pozor na 100K char limit).
- **Plugin versioning convention** (carry-over): version bump v `plugin.json` JE vyžadován pro Cowork update detection.

## Dalsi kroky

### Priorita 1

1. **Enable `creative@skills` v Cowork UI** — po restart Coworku, Settings → Plugins → enable creative. Pak otestuj: "vygeneruj minimalist logo pro Flatwhite" → měl by invoke image-generation skill.
2. **Rotovat & smazat `.zshenv` GEMINI_API_KEY** — pokud `AIzaSyCFgLf...` byl ten exposed v commit `97c17a2`, vytvořit nový v Google AI Studio, updatnout 1Password `Dev/shared-keys`, smazat řádku z `.zshenv`. Otestovat scripts po restart.
3. **Test sell-like-crazy v Cowork** (carry-over).
4. **Test ig-content v praxi** (carry-over).

### Priorita 2

5. **Cowork marketplace pull diagnostika** (carry-over).
6. **Generalize get-key.sh do shared lib** — pokud další skill bude potřebovat API key, povýšit `lib/get-key.sh` na plugin-shared (např. `plugins/_shared/lib/get-key.sh`) místo creative-only.
7. **DXT extension pro Ideogram** — pokud bash path bude limitovat (hosting URLs pro `--char-ref` v sandbox), DXT version of MCP server může být cleaner long-term path.
8. End-to-end test Gemini CLI na skills projektu (carry-over).
9. Verify 1Password `op run` v Claude Code (carry-over).
10. Cherry-pick `session-start.sh` do claude-config (carry-over).
11. Cowork stale directories cleanup (carry-over).
12. Brand Strategy skill — deep research (carry-over).
13. **Future canon imports** — Hormozi 100m Offers do `marketing:offers` (carry-over).
