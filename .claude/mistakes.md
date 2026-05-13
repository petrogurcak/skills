# Mistakes Log

## 2026-05-13: Plugin.json version bump chyběl po přidání nových skills → Gabi v Cowork nevidí nové skills (podruhé stejný root cause)

**Co se stalo:** Po dvou commitech (`dca203d` = 6 nových skills, `d38d03f` = mobile-store-release) přidaných do source repo + symlinks synced + manual copy do Claude Code plugin cache jsem si lokálně potvrdil že vše funguje. Gabi v jejím Cowork session ale nevidí video-scripting ani žádný z nově přidaných skills. Audit odhalil: `copywriting/plugin.json` na 2.1.0 (přidány 3 skills bez bumpu), `marketing/plugin.json` na 1.1.0 (přidány 3 skills bez bumpu), `development/plugin.json` na 1.0.0 (přidán mobile-store-release bez bumpu). `installed_plugins.json` pinuje `gitCommitSha: 95d7ff79` z 28. dubna — od té doby žádný plugin update.

**Proc:** Plugin marketplace systém Claude Code/Cowork detekuje "novou verzi k instalaci" porovnáním `version` v `plugin.json` mezi installed copy a marketplace cache. Bez bumpu → žádná notifikace → uživatel (Gabi) nikdy nezjistí, že jsou nové skills. Petr to lokálně viděl jen proto, že workflow v `~/Projects/skills/CLAUDE.md > Workflow: Úprava skillu` zahrnuje **manuální `cp -r plugins/$p/. ~/.claude/plugins/cache/skills/$p/<ver>/`** — tj. bypassne plugin systém. Gabi tuhle mechaniku nemá, je odkázaná na `/plugins` update flow.

**Souvislost s 2026-04-28:** Tehdy jsme zjistili, že Cowork "Check for updates" tlačítko neudělá `git pull` v marketplace cache, takže i kdyby byl bump, Gabi by ho neviděla bez manuálního pull. Plus poznámka z tehdejšího entry: _"Pokud version bump chybí — bump v source repo."_ Tu lekci jsme nezvnitřnili — workflow "Nový skill" v `~/Projects/skills/CLAUDE.md` krok "bumpni plugin.json version" nezmiňuje, takže defaultně to zapomínám.

**Oprava (této session):**

1. `copywriting/plugin.json` 2.1.0 → **2.2.0** (3 nové skills: email-orchestrator, email-sequences, video-scripting)
2. `marketing/plugin.json` 1.1.0 → **1.2.0** (3 nové skills: launch-orchestrator, info-product-launch, testimonial-harvesting)
3. `development/plugin.json` 1.0.0 → **1.1.0** (1 nový skill: mobile-store-release)
4. Commit + push do `origin/main`
5. Návod pro Gabi: v Cowork `/plugins` → marketplace skills → update copywriting + marketing + development (případně předem manual `git pull` v `cowork_plugins/marketplaces/skills/` per 2026-04-28 fix)

**Pouceni (preventivně do workflow):**

- **SemVer pravidlo pro plugin.json:** přidání skill = MINOR bump, edit existujícího SKILL.md = PATCH bump, nový plugin = MAJOR (1.0.0).
- **Workflow "Nový skill" v `~/Projects/skills/CLAUDE.md` musí dostat krok 0:** "Bumpni `plugins/<plugin>/.claude-plugin/plugin.json > version` před commitem." Bez toho propagace na Gabi/Cowork nikdy nefunguje.
- **Pre-push check:** Před `git push` skills repo → `git diff origin/main -- 'plugins/**/SKILL.md'` ukáže nové/změněné skills; pokud ano → verify `plugin.json` má bumped version. Kandidát na hook nebo CI check.
- **Lokální Petrův workflow maskuje problém:** Manual `cp` do plugin cache funguje pro Petra ale skrývá fakt že downstream consumers (Gabi) jsou na nevedlejší koleji. Při testování nových skills vždy uvažovat: "Jak to Gabi uvidí přes `/plugins`?"

**Tags:** #plugin-version #semver #cowork-propagation #gabi-workflow #recurring-mistake #workflow-gap

---

## 2026-05-13: NotebookLM `notebook_query` biased to named book when prompt obsahuje book title

**Co se stalo:** 7 NotebookLM notebooků mělo total 21 zdrojů (13 unique books). První dvě query round použily `notebook_query` bez `source_ids` filtru + prompt obsahoval konkrétní book name ("Extrahuj z Expert Secrets..."). NotebookLM vrátil výsledky s `sources_used` array obsahující jen 1 source (=Expert Secrets), zbylé 2 zdroje (DotCom Secrets, Schwartz Breakthrough Advertising) v stejném notebooku skipnul. Discovered až v 3. kole když user explicitně řekl "vzdyt tady je save the cat ne?" + spustil jsem `notebook_get` na všechny notebooky → 9 books missed přes 7 notebooků.

**Proc:** Default `notebook_query` chování = AI se rozhodne který source je relevantní. Kdyz prompt obsahuje "z knihy Expert Secrets..." → AI bias na ten 1 specific source. Bez explicitního `source_ids: [...]` filtru se ostatní zdroje nemusí použít vůbec.

**Oprava:** (1) Vždy spustit `notebook_get` PRVNÍ k enumeraci všech sources. (2) Pokud notebook má 2+ sources a chci comprehensive coverage → 1 query per source s `source_ids` filtrem, ne 1 query naděje. (3) Pokud chci syntetický view → 1 query bez source_ids + explicit "Use ALL sources in this notebook" v promptu.

**Pouceni:** Multi-source NotebookLM notebooks vyžadují per-source query strategy, ne 1 broad query. Cost: 9 books missed = 3 extra query rounds + ~3h research time + retry assembly. Pattern: enumerate before query.

**Tags:** #notebooklm #multi-source #source-ids #research-strategy

---

## 2026-05-13: glm-delegate failed pro creative writing tasks (SKILL.md authoring)

**Co se stalo:** Spawn 4 paralel glm-delegate agentů pro write 4 SKILL.md files. Vsechny 4 vrátily suspicious summaries ("Let me create the file...", "Now I'll write...", "Now let me read key sections..."). Verify: 3/4 souborů NEzapsány (0 bytes, empty dirs), 1/4 (testimonial-harvesting) zapsán. Plus 2× během session (info-product-launch v2 + v3 rewrite rounds) glm-delegate vložil literal `[Content preserved in original]` placeholder místo skutečného obsahu při rewrite operations — repair via awk inject z /tmp source.

**Proc:** glm-delegate má omezený tool budget per invocation (~5 tool uses). SKILL.md authoring vyžaduje: read research (50K+) + read 2 reference patterns + write 8-21K output. To je 4+ tool uses jen na input gathering — agent dojede na turn limit před write operation. Plus glm má tendenci zkratkovitě "summarize for brevity" + insert placeholder místo verbatim content preservation v rewrites.

**Oprava:** Retry 3 failed SKILL.md s `general-purpose` (Sonnet) agenty + stripped-down prompts ("just write, minimal exploration"). 100% success rate, ~50s wall clock per agent. Pro file rewrite operations s preservation requirement → write explicit "NEVER use placeholders — preserve verbatim" + check after each agent run via grep for "placeholder" / "preserved in original" / specific known content terms.

**Pouceni:** glm-delegate ≠ creative writing. Profile match: glm pro mechanical/bulk operations (grep sweepy, mechanický refactor, repetitive task). Sonnet pro authoring/synthesis (SKILL.md, plan files, synthesis sections). Cost saving od delegation vs reliability trade-off — pro high-stakes outputs Sonnet pays off.

**Tags:** #glm-delegate #creative-writing #sonnet-fallback #placeholder-bug

---

## 2026-05-08: Marketplace cache fetch refspec limituje pre-merge testing

**Co se stalo:** Po push `feat/negotiation-plugin` do origin jsem chtěl checkoutnout feat branch v `~/.claude/plugins/marketplaces/skills/` pro pre-merge plugin testing v `/plugins` UI. `git fetch origin feat/negotiation-plugin` proběhl, ale `git checkout feat/negotiation-plugin` failoval s "pathspec did not match any file(s)". Branch nebyla v `git branch -a`.

**Proc:** Marketplace cache `.git/config` má refspec `+refs/heads/main:refs/remotes/origin/main` — fetch jen main, ne všechny branches. Explicitní `git fetch origin <branch>` jen vytvoří `FETCH_HEAD`, neukotví remote tracking branch. Pak `git checkout <branch>` neexistuje protože není v local refs ani remote-tracking refs.

**Oprava:** Buď (a) merge feat → main a pull cache (zvolili jsme pro tuhle session), nebo (b) modifikovat `.git/config` na `+refs/heads/*:refs/remotes/origin/*` pro full branch fetch. (a) je jednodušší, (b) umožní pre-merge testing v budoucnu.

**Pouceni:** Marketplace cache je read-only mirror nakonfigurovaný jen pro main. Pre-merge plugin testing v Claude Code `/plugins` UI vyžaduje merge nebo refspec change. Pro rychlou iteraci preferuj merge-first; pro velké pluginy s rizikem kde chceš pre-merge sanity check zvaž refspec úpravu.

**Tags:** #marketplace-cache #git-refspec #plugin-workflow #pre-merge-testing

---

## 2026-05-08: Plan validation grep counts byly underspecified

**Co se stalo:** Plan tasks měly validation rules typu `grep -c "^## Conversation" plugins/.../difficult-conversations-three-frame.md` s `Expected: count = 3`. Implementace ale obsahovala 4 valid matches (3 conversations + "Conversation structure" sekce). Validation by hlásilo "wrong count" i když content matchoval template přesně. Podobně pro orchestrator: `grep -c "cialdini"` rule "≤5 = embedded", actual byl 9 ale všech 9 byly pointer-style references, ne embedded content.

**Proc:** Plan author (já) napsal validation grep patterns příliš obecně. `^## Conversation` matchuje víc než jen číslované conversations. Číselná hranice "≤5" pro Cialdini byla intuitivní guess, ne empirická.

**Oprava:** Spec compliance review zachytil odchylky, ale subagent po implementaci taky flagoval — výsledek byl OK protože content matchoval template, jen validation rule byla loose. Pragmaticky proceeded.

**Pouceni:** Plan validation grep patterns by měly být buď specific (`^## Conversation [0-9]`) nebo s tolerance buffer (`Expected: count >= 3`). Číselné hranice typu "≤5 = embedded" jsou křehké — lepší check by byl "no full Cialdini content blocks (no `### N. <Principle Name>` H3 sections)" který detekuje skutečné embedding.

**Tags:** #plan-validation #grep-patterns #spec-compliance

---

## 2026-04-28: Cowork "Check for updates" nepull-ne marketplace cache

**Co se stalo:** Cowork UI tlačítko "Check for updates" v marketplace settings neudělalo `git pull` v `~/Library/.../cowork_plugins/marketplaces/skills/`. Cache zůstala na starém commitu (např. `80eb7a5` z 2026-02-05) i když origin/main byl 59 commits dál. Pattern se zopakoval 3× za poslední 2 session — pokaždé jsem musel manuálně pull.

**Proc:** Cowork update flow má pravděpodobně bug nebo specifický trigger condition (např. čeká na verze diff v marketplace.json) co se v naší situaci nesplnil. UI "Synced commit" indicator ukázal nový SHA i když filesystem byl pořád na starém.

**Oprava:** Manuální fast-forward pull:

```bash
cd "$HOME/Library/Application Support/Claude/local-agent-mode-sessions/<UUID>/<UUID>/cowork_plugins/marketplaces/skills"
git fetch origin && git pull --ff-only origin main
```

Po pull Cowork UI zobrazí update tlačítko jakmile je `plugin.json` version bumpnutá v cache.

**Pouceni:** Při každé Cowork update relaci zkontroluj (1) commit SHA cache vs origin (`git log --oneline -1` v cache dir), (2) version v `cache/skills/<plugin>/<ver>/.claude-plugin/plugin.json` vs aktuální v repu. Pokud nesoulad — manual pull. Pokud version bump chybí — bump v source repo.

**Tags:** #cowork #plugin-marketplace #git-pull #manual-workaround #cache-staleness

---

## 2026-04-28: `git add CLAUDE.md` neaktualizuje když je symlink

**Co se stalo:** Po edit CLAUDE.md (plugin counts update) jsem stagnul `git add CLAUDE.md` a commit prošel s "1 file changed, 21 insertions(+), 11 deletions(-)" — ale `git status` pak nezobrazil žádné staged changes, "no changes added to commit". Musel jsem zjistit že `CLAUDE.md` je symlink na `AGENT.md` (`-> AGENT.md`), reálný file který se editoval byl AGENT.md. `git add CLAUDE.md` přidal symlink (který se nezměnil), ne target file.

**Proc:** Symlinky v repu jsou pro dual-naming convention (CLAUDE.md pro Claude Code/users, AGENT.md jako neutrální název pro budoucí AGENTS.md spec). Edit tools (Read/Edit/Write) následují symlink transparentně, ale `git add <symlink>` přidá pouze symlink entry, ne target. Easy mistake když nevíš že je to symlink.

**Oprava:** `git add AGENT.md` (target souboru), pak commit. Pro budoucnost: před commit edit-after-symlink check `ls -la <file>` — pokud je `lrwxr-xr-x ... -> target.md`, staguj target.

**Pouceni:** Při práci v skills repu (a kdekoliv kde existují CLAUDE.md ↔ AGENT.md ↔ AGENTS.md symlinky) si pamatuj: edits vidí target, git vidí symlink. Když `git add <symlink-name>` ale `git status` nezobrazí staged → `ls -la` na file a stage target místo symlinku.

**Tags:** #git #symlinks #claude-md #agent-md #stage-target

---

## 2026-04-27: Designoval jsem skill bez identifikace target usera

**Co se stalo:** Dlouho jsem brainstormoval `cowork-setup` skill v předpokladu že primary user je Petr. Spec, voice extraction defaulty, GitHub bridge instrukce — všechno laděné na jeho profil. Po dokončení v1.0 a začátku v1.1 plánování Petr revealoval _"nedělám to pro sebe ale pro Gabi"_. To si vynutilo retroaktivní reframe: nový memory file (user_gabi.md), spec addendum o Gabi context, úpravu setup instrukcí, restrukturalizaci kdo je technical proxy vs. end user.

**Proc:**

1. Zeptal jsem se "co potřebuješ" ale neptal jsem se "pro koho" — předpokládal jsem default audience = ten kdo chatuje (Petr).
2. Žádný explicitní "audience check" v brainstormingu skill design — skill description říká "use when user says X", ale neptá se "what kind of user".
3. Petr používá Claude Code intenzivně sám pro sebe v ostatních kontextech, takže default assumpce dávala statisticky smysl, ale tady selhala.

**Oprava:**

1. Memory file `user_gabi.md` s Gabi profilem (non-dev, marketing/copy, MacBook setup, technical proxy = Petr).
2. Spec addendum (2026-04-27 sekce) zaznamenává context shift, GitHub bridge requirements (must-have ne optional), setup instrukce pro Petra jako proxy.
3. SKILL.md `description` zůstal user-agnostic ("non-development projects (marketing, copywriting, strategy, concepts, research)") — naštěstí to nebylo Petr-specific. Ale `<NAME>` v Global Instructions templátu by mohl být problém pokud by extracted hardcoded "Petr".

**Pouceni:**

1. **Při designu skillu / tooling: explicitní audience question před scope question.** "Pro koho je tohle? Ty sám, nebo někdo jiný — koho a jak technicky zdatný?"
2. **Default audience hypothesis musí být ověřena**, ne assumed. I když Petr je primary user pro 90% věcí, content/marketing tooling může mít jiný target (Gabi).
3. **Brainstormingem skillu s "user" = vágní. Persona = konkrétní.** "User" myslí oba (Petr i Gabi). "Persona = Gabi (non-dev marketer, MacBook, iPhone)" produkuje jiné defaulty.

**Tags:** #brainstorming #skill-design #user-personas #defaults #assumption-check

---

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
