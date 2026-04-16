# Mistakes Log

## 2026-04-15: Pushnul jsem 2 API klice na public GitHub repo

**Co se stalo:** Vygeneroval jsem `.gemini/settings.json` v `~/Projects/skills` (PUBLIC repo `petrogurcak/skills`) kopirovanim env values z `.mcp.json` — ktery obsahoval plaintext `GEMINI_API_KEY` a `IDEOGRAM_API_KEY`. `.mcp.json` byl v `.gitignore`, ale novou `.gemini/settings.json` jsem tam nepridal. `git add -A` ji stagnul. Pushnul jsem commit `97c17a2` na public repo. Keys exposed.

**Proc:**

1. Predpokladal jsem ze zdrojovy `.mcp.json` je gitignored takze i cilovy `.gemini/settings.json` bude bezpecny — spatny predpoklad, zapomnel jsem dodat vlastni gitignore entry.
2. Neudelal jsem pre-push secret scan. Repo je PUBLIC a to vyzaduje vyssi laťku.
3. Kopiroval jsem env values 1:1 misto aby uz zdrojovy config pouzival secret manager reference (op://, ${ENV_VAR}).

**Oprava:**

1. `git rm --cached .gemini/settings.json` + add to `.gitignore` (commit `de6aa35`).
2. User rotated both keys (Gemini Studio + Ideogram dashboard).
3. Prepsal `.mcp.json` na `op run --no-masking -- python3 ...` wrapper + `op://Dev/shared-keys/<KEY>` env refs. Lokalni configy uz neobsahuji plaintext.
4. `sync-mcp-to-gemini.sh` nyni auto-addne `.gemini/settings.json` do `.gitignore` + warning kdyz output obsahuje env vars.

**Pouceni:**

- **Pred `git push` na public repo VZDY:** `git diff --cached | grep -iE "api[_-]?key|secret|token|password"` + `git diff --cached --stat` review.
- **Secret manager reference (op://, ${VAR}) v configu,** nikdy ne plaintext value — i kdyz je soubor gitignored. Defence in depth: prvni vrstva je `.gitignore`, druha je ze soubor ani lokalne neobsahuje raw secrets.
- **Novy file vedle gitignored sourcu:** pokud zdroj je v `.gitignore` kvuli citlivemu obsahu, derivovany soubor se STEJNYM obsahem MUSI byt taky v `.gitignore` — nebo lepe, mit pattern `*.json` + allowlist.
- **History scrubbing na public pushed commit nepomuze** — keys jsou v GitHub search indexu, archive.org, botnet scrapers do minuty. Jedina oprava = rotace.

**Tags:** #security #api-keys #gitignore #public-repo #1password

---

## 2026-04-04: git add -A s embedded git repos

**Co se stalo:** `git add -A` failnul s "error: 'flutter/' does not have a commit checked out" a pridaval embedded git repos jako submoduly.
**Proc:** V repo byly 3 adresare s vlastnim `.git/` (code-mode, flutter, postmark) — `git add -A` je neumi zpracovat.
**Oprava:** `git rm --cached` pro uz pridane + pridani do `.gitignore`.
**Pouceni:** Pred `git add -A` na repo s hodne untracked soubory zkontrolovat embedded git repos: `find . -name .git -not -path './.git' -type d`.
**Tags:** #git #gitignore

## 2026-02-28: Sentry API JSON s control chars rozbije jq

**Co se stalo:** Sentry API odpovedi obsahuji literal control characters (U+0000-U+001F) uvnitr JSON stringu. `jq` je odmita parsovat, `jq -c '.[]'` failne s "Invalid string: control characters".
**Proc:** Sentry metadatove pole (stacktrace, breadcrumbs) obsahuji raw control chars ktere nejsou escaped. Python `json.loads` je handle, jq ne.
**Oprava:** Nahrazeno `jq` za `python3` parser v polleru — extrahuje do TSV pres `json.load()`.
**Pouceni:** Pri praci se Sentry API nepouzivat `jq` na detailni issue data. Python3 `json` modul je robustnejsi. Alternativne: `jq` pouze na soubory (ne pres bash variable), ale stale muze failnout na control chars.
**Tags:** #sentry #jq #json #control-chars

## 2026-02-28: sed & v replacement stringu

**Co se stalo:** Template substituce pres `sed "s|{{TEST_CMD}}|$TEST_CMD|g"` kde `$TEST_CMD` je `cd backend && python -m pytest -x -q`. Znak `&` v sed replacement znamena "matched text" — vysledek: `cd backend {{TEST_CMD}}{{TEST_CMD}} python -m pytest -x -q`.
**Proc:** Standardni sed behavior — `&` v replacement je special char.
**Oprava:** Template substituce prepsana na python3 s env vars (`os.environ`), ktery nema special chars v replacementech.
**Pouceni:** Nikdy nepouzivat `sed` pro substituci kde replacement muze obsahovat `&`, `/`, `\`. Python3 `str.replace()` je bezpecny. Alternativne: `sed` s `\&` escapovanim, ale env vars v shellu to komplikuji.
**Tags:** #sed #escaping #template-substitution

---

## 2026-02-27: Doporucil neexistujici CLI command bez overeni

**Co se stalo:** Doporucil `openclaw chat` — command neexistuje. Spravne je `openclaw tui`.
**Proc:** Predpokladal jsem nazev z kontextu clanku misto overeni pres `openclaw --help`.
**Oprava:** User reportoval error, overil jsem pres `--help`.
**Pouceni:** U CLI toolu vzdy overit dostupne commandy pres `--help` pred doporucenim.
**Tags:** #cli #verification #openclaw

---

## 2026-02-14: zsh readonly variable `status` in bash hook

**Co se stalo:** `plan-utils.sh` pouzil `local status=$(...)` — v zsh je `status` readonly (ekvivalent `$?`)
**Proc:** Bash skripty v Claude Code hooks bezi pres zsh (uzivateluv shell), ne bash
**Oprava:** Prejmenovano na `plan_status`
**Pouceni:** V hookach nepouzivat promenne `status`, `path`, `precmd`, `preexec` — jsou reserved v zsh. Testovat hooky v zsh, ne jen `bash -n`.
**Tags:** #hooks #zsh #bash-compatibility

## 2026-02-26: Claude in Chrome nefunguje s vice sessions

**Co se stalo:** Cela session (30+ min) stravena debugovanim proc Claude in Chrome nereaguje. Vsechny page-interaction tooly (read_page, navigate, javascript_tool, computer, find) vracely "Browser extension is not connected" — ale tabs_context fungoval.
**Proc:** Bezelo 4-5 starych `claude --chrome` procesu z predchozich sessions. Chrome nativni messaging host se pripoji jen k jednomu procesu — stare procesy blokovaly pripojeni pro aktualni session.
**Oprava:** Neopraveno v teto session — identifikovan root cause. Reseni: killnout stare procesy pred spustenim.
**Pouceni:** Pred pouzitim Claude in Chrome: `ps aux | grep "claude --chrome" | grep -v grep` — pokud bezi vice nez 1, killnout stare. Idealne `killall -f "claude --chrome"` pred novou session.
**Tags:** #claude-in-chrome #mcp #native-messaging

## 2026-02-26: Paralelni agenti prepsali soubory se stejnymi nazvy

**Co se stalo:** 9 paralelních scan agentů zapisovalo proposals do stejného adresáře s překrývajícím se číslováním (LP-007 az LP-013). Pozdější agenti přepsali soubory dřívějších.
**Proc:** Každý agent čísloval od posledního existujícího souboru, ale nevidel soubory ostatních agentů (psali současně).
**Oprava:** Manuální recreate 15 ztracených proposals jako LP-017 až LP-031.
**Pouceni:** Paralelní agenti NIKDY nemají psát do společného adresáře bez koordinace. Řešení: 1) per-persona numbering ranges (seo: 100-199, growth: 200-299), 2) per-persona output dirs, 3) sekvenční zpracování.
**Tags:** #parallel-agents #file-collision #learning-advisor

## 2026-02-25: Nested claude -p inside Claude Code session

**Co se stalo:** Pokusil jsem se spustit `claude -p` spike testy primo z Claude Code session. Proces se zasekl/crashnul.
**Proc:** Claude Code nepodporuje nested claude sessions — ani s `env -u CLAUDECODE` to nefunguje spolehlive.
**Oprava:** Uzivatel spustil spike testy manualne v externim terminalu.
**Pouceni:** `claude -p` (headless mode) VZDY spoustet z externiho terminalu, nikdy z aktivni Claude Code session. Pri psani planu s `claude -p` kroky vzdy oznacit "spust v terminalu".
**Tags:** #claude-code #nested-sessions #headless
