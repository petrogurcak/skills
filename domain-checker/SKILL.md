# Domain Availability Checker Skill

## Popis
Tento skill umožňuje hromadnou kontrolu dostupnosti domén pomocí DNS a WHOIS lookupů. Funguje bez API klíče, zcela zdarma.

## Kdy použít
- Uživatel chce zkontrolovat dostupnost domén
- Brainstorming názvů pro projekty/mikroslužby
- Hromadná kontrola více TLD kombinací
- Hledání volných kreativních domén (.work, .io, .menu, .today, atd.)

## Jak použít

### Krok 1: Nainstalovat závislosti
```bash
pip install python-whois dnspython --break-system-packages -q
```

### Krok 2: Vytvořit checker skript
Použij kód z `domain_checker.py` (přiložen v tomto skillu).

### Krok 3: Spustit kontrolu
```python
from domain_checker import check_domains_bulk

domains = [
    "clock.work",
    "punch.work", 
    "hours.today",
    "log.menu"
]

results = check_domains_bulk(domains)

# Zobrazit jen volné
available = [d for d, info in results.items() if info['available']]
print("Volné domény:", available)
```

## Výstupní formát

Pro každou doménu vrací:
```python
{
    "domain.tld": {
        "available": True/False,
        "method": "dns" | "whois" | "error",
        "details": "..."  # Volitelné detaily
    }
}
```

## Podporované TLD
Funguje pro většinu běžných TLD včetně:
- Klasické: .com, .net, .org, .io, .co
- Kreativní: .work, .menu, .today, .app, .dev
- Národní: .cz, .sk, .de, .uk

## Omezení
- WHOIS servery mají rate limiting (max ~10-20 dotazů/min)
- Některé exotické TLD nemusí fungovat
- Výsledek "available" znamená "pravděpodobně volná" - vždy ověřit u registrátora

## Tipy pro použití
1. Pro velké seznamy používej `delay=2` mezi dotazy
2. Kombinuj DNS + WHOIS pro přesnější výsledky
3. Výsledky cachuj, pokud kontroluješ opakovaně

## Příklad konverzace

**Uživatel:** Zkontroluj mi tyto domény: clock.work, punch.work, time.menu

**Claude:** 
1. Nainstaluje závislosti
2. Spustí kontrolu
3. Vrátí tabulku s výsledky a seznamem volných domén
