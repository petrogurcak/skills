---
name: legal-orchestrator
description: Routes legal compliance questions to specialist skills (labor-law, gdpr). Use when asking about legal compliance, employment law, data protection, contract validity, or whether a feature design meets Czech regulations. Trigger phrases include "je to legalni", "zakonik prace", "GDPR", "pracovni smlouva", "je tohle v souladu se zakonem", "legal check". NOT for writing marketing copy or business strategy.
---

# Legal Orchestrator

Route legal questions to the right specialist. Detect area from query, invoke specialist skill.

**Announce:** "Pouzivam legal-orchestrator k posouzeni pravni otazky."

## Routing

Detect area from keywords in user query:

| Keywords | Route to |
|----------|----------|
| smlouva, HPP, DPP, DPC, DPČ, výpověď, výpovědní, dovolená, mzda, přesčas, zaměstnanec, pracovní poměr, zkušební doba, odstupné, přestávka, noční práce, směna, mladistvý, rodičovská | `legal:labor-law` |
| osobní údaje, souhlas, DPIA, zpracování, monitoring, cookies, GDPR, ochrana údajů, subjekt údajů, správce, zpracovatel, právní základ | `legal:gdpr` |

**If query touches BOTH areas** (e.g. "mohu sledovat GPS polohu zaměstnanců během směny"):
1. Invoke both specialists in parallel (use Agent tool, both with `context: fork`)
2. **Merge step:** After both return, synthesize combined answer:
   - Take the **strictest verdict** (NEKOMPATIBILNI > RIZIKO > KOMPATIBILNI)
   - Combine citations from both specialists
   - Present unified recommendation

**If area unclear:** Ask user one clarifying question before routing.

## Response Format

Pass through specialist response directly. Do not add your own legal interpretation.

## Rules

- NEVER provide legal advice without routing to specialist
- NEVER fabricate law citations — only use what specialist returns from MCP
- Always include disclaimer: "Toto není právní porada. Ověřte s právníkem."
