# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-10
- **Branch:** main
- **Dokonceno:**
  - **legal:ecommerce skill** — novy skill pro ceskou e-commerce legislativu. 16 souboru (SKILL.md + 15 references). Tri mody: audit otazky, compliance check, planning. 13 pravnich oblasti (obchodni podminky, odstoupeni, reklamace, cookies, GDPR v e-shopu, ceny/Omnibus, pristupnost/EAA, ADR, GPSR, objednavkovy proces). Progressive disclosure — SKILL.md 798 slov, knowledge base v references/.
  - **Orchestrator update** — ecommerce routing s prioritnim pravidlem (e-shop kontext > GDPR routing)
  - **plugin.json** — aktualizovan popis
  - **Research** — ceska e-commerce legislativa (36 web searches, 20+ zdroju) ulozeny v docs/research/
  - **Design spec + plan** — ulozeny v docs/superpowers/specs/ a plans/
  - **Deploy** — Claude Code cache + Cowork symlink + pushed to GitHub
  - Commity: `62919ef`, `b0d29ff`, `69c3672`, `69ed670`, `1718dd6`, `084883f`
- **Rozdelano:** Nic

## Otevrene problemy

- **utilities:mac-cleanup** — skill funguje pres Skill tool, ale NEOBJEVUJE se v `/` autocomplete menu
- **Necommitnuty kod z minule session** — ideogram server v0.3.0, nanobanana MCP, image-generation skill update (stale necommitnuty)

## Poznamky pro dalsi session

- Commitnout a pushnout zbyle zmeny z minule session (ideogram, nanobanana, skill)
- Otestovat ecommerce skill v praxi (zavolat `/legal:ecommerce` s realnym dotazem)
- Otestovat nanobanana MCP server
- Finalizovat plakat Winegeek v Etape + Instagram post

## Dalsi kroky

### Priorita 1

1. Commit zbylych zmen (ideogram, nanobanana)
2. Test ecommerce skill
3. Finalni plakat + Instagram post

### Priorita 2

4. Brand Strategy skill — deep research
5. Sales skill — novy plugin
