"""
Domain Availability Checker
Hromadná kontrola dostupnosti domén pomocí DNS a WHOIS.
Bez API klíče, zdarma.
"""

import socket
import time
from typing import Optional
from concurrent.futures import ThreadPoolExecutor, as_completed

# Zkusíme importovat knihovny
try:
    import dns.resolver
    DNS_AVAILABLE = True
except ImportError:
    DNS_AVAILABLE = False

try:
    import whois
    WHOIS_AVAILABLE = True
except ImportError:
    WHOIS_AVAILABLE = False


def check_dns(domain: str, timeout: float = 3.0) -> dict:
    """
    Kontrola přes DNS - pokud doména neresolvuje, je pravděpodobně volná.
    """
    if not DNS_AVAILABLE:
        return {"available": None, "method": "dns", "details": "dnspython not installed"}
    
    resolver = dns.resolver.Resolver()
    resolver.timeout = timeout
    resolver.lifetime = timeout
    
    # Zkusíme různé typy záznamů
    for record_type in ['A', 'AAAA', 'MX', 'NS']:
        try:
            resolver.resolve(domain, record_type)
            return {"available": False, "method": "dns", "details": f"Has {record_type} record"}
        except dns.resolver.NXDOMAIN:
            return {"available": True, "method": "dns", "details": "NXDOMAIN - domain not found"}
        except dns.resolver.NoAnswer:
            continue
        except dns.resolver.NoNameservers:
            return {"available": True, "method": "dns", "details": "No nameservers"}
        except Exception:
            continue
    
    return {"available": None, "method": "dns", "details": "Could not determine"}


def check_whois(domain: str) -> dict:
    """
    Kontrola přes WHOIS - spolehlivější, ale pomalejší a rate-limited.
    """
    if not WHOIS_AVAILABLE:
        return {"available": None, "method": "whois", "details": "python-whois not installed"}
    
    try:
        w = whois.whois(domain)
        
        # Různé způsoby jak WHOIS indikuje neexistenci
        if w.domain_name is None:
            return {"available": True, "method": "whois", "details": "No domain_name in WHOIS"}
        
        # Kontrola status
        if hasattr(w, 'status') and w.status:
            return {"available": False, "method": "whois", "details": f"Status: {w.status[0] if isinstance(w.status, list) else w.status}"}
        
        # Pokud má registrar, je zabraná
        if hasattr(w, 'registrar') and w.registrar:
            return {"available": False, "method": "whois", "details": f"Registrar: {w.registrar}"}
        
        # Pokud má creation_date, je zabraná
        if hasattr(w, 'creation_date') and w.creation_date:
            return {"available": False, "method": "whois", "details": "Has creation_date"}
        
        return {"available": True, "method": "whois", "details": "No registration info found"}
        
    except whois.parser.PywhoisError:
        return {"available": True, "method": "whois", "details": "WHOIS lookup failed - likely available"}
    except Exception as e:
        error_str = str(e).lower()
        if "no match" in error_str or "not found" in error_str or "no entries" in error_str:
            return {"available": True, "method": "whois", "details": "Domain not found in WHOIS"}
        return {"available": None, "method": "whois", "details": f"Error: {str(e)[:50]}"}


def check_socket(domain: str, timeout: float = 2.0) -> dict:
    """
    Fallback - zkusí socket connection na port 80.
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.gethostbyname(domain)
        return {"available": False, "method": "socket", "details": "Domain resolves"}
    except socket.gaierror:
        return {"available": True, "method": "socket", "details": "Cannot resolve"}
    except Exception as e:
        return {"available": None, "method": "socket", "details": str(e)}


def check_domain(domain: str, use_whois: bool = True, delay: float = 0) -> dict:
    """
    Kompletní kontrola jedné domény.
    Kombinuje DNS a volitelně WHOIS pro přesnější výsledek.
    """
    domain = domain.lower().strip()
    
    if delay > 0:
        time.sleep(delay)
    
    # Nejdřív rychlá DNS kontrola
    dns_result = check_dns(domain)
    
    if dns_result["available"] is False:
        # DNS říká že existuje = určitě zabraná
        return {"domain": domain, **dns_result}
    
    if dns_result["available"] is True and not use_whois:
        # DNS říká volná a nechceme WHOIS
        return {"domain": domain, **dns_result}
    
    # WHOIS pro jistotu (doména může být registrovaná ale bez DNS)
    if use_whois:
        whois_result = check_whois(domain)
        
        if whois_result["available"] is not None:
            return {"domain": domain, **whois_result}
    
    # Fallback na socket
    socket_result = check_socket(domain)
    return {"domain": domain, **socket_result}


def check_domains_bulk(
    domains: list[str], 
    use_whois: bool = True,
    delay: float = 1.0,
    max_workers: int = 3,
    parallel: bool = False
) -> dict:
    """
    Hromadná kontrola více domén.
    
    Args:
        domains: Seznam domén ke kontrole
        use_whois: Použít WHOIS (přesnější ale pomalejší)
        delay: Prodleva mezi dotazy (respektuj rate limiting)
        max_workers: Počet paralelních workerů (pouze pokud parallel=True)
        parallel: Paralelní zpracování (rychlejší ale větší riziko rate limitingu)
    
    Returns:
        Dict s výsledky pro každou doménu
    """
    results = {}
    
    if parallel and max_workers > 1:
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = {
                executor.submit(check_domain, domain, use_whois, 0): domain 
                for domain in domains
            }
            for future in as_completed(futures):
                result = future.result()
                results[result["domain"]] = {
                    "available": result["available"],
                    "method": result["method"],
                    "details": result.get("details", "")
                }
    else:
        for i, domain in enumerate(domains):
            result = check_domain(domain, use_whois, delay if i > 0 else 0)
            results[result["domain"]] = {
                "available": result["available"],
                "method": result["method"],
                "details": result.get("details", "")
            }
            print(f"  [{i+1}/{len(domains)}] {domain}: {'✅ VOLNÁ' if result['available'] else '❌ Zabraná' if result['available'] is False else '❓ Nejisté'}")
    
    return results


def generate_domain_combinations(
    keywords: list[str], 
    tlds: list[str] = None
) -> list[str]:
    """
    Generuje kombinace klíčových slov a TLD.
    
    Args:
        keywords: Klíčová slova (např. ["clock", "time", "punch"])
        tlds: Seznam TLD (např. [".work", ".io", ".menu"])
    
    Returns:
        Seznam domén k ověření
    """
    if tlds is None:
        tlds = [".work", ".io", ".menu", ".today", ".app", ".dev", ".co", ".com"]
    
    domains = []
    for keyword in keywords:
        for tld in tlds:
            tld = tld if tld.startswith(".") else f".{tld}"
            domains.append(f"{keyword.lower().strip()}{tld}")
    
    return domains


def print_results(results: dict, only_available: bool = False):
    """
    Pěkný výpis výsledků.
    """
    print("\n" + "="*60)
    print("VÝSLEDKY KONTROLY DOMÉN")
    print("="*60)
    
    available = []
    taken = []
    unknown = []
    
    for domain, info in results.items():
        if info["available"] is True:
            available.append(domain)
        elif info["available"] is False:
            taken.append(domain)
        else:
            unknown.append(domain)
    
    if available:
        print(f"\n✅ VOLNÉ DOMÉNY ({len(available)}):")
        for d in sorted(available):
            print(f"   • {d}")
    
    if not only_available:
        if taken:
            print(f"\n❌ ZABRANÉ DOMÉNY ({len(taken)}):")
            for d in sorted(taken):
                print(f"   • {d}")
        
        if unknown:
            print(f"\n❓ NEJISTÉ ({len(unknown)}):")
            for d in sorted(unknown):
                print(f"   • {d} - {results[d].get('details', '')}")
    
    print("\n" + "="*60)
    print(f"Celkem: {len(available)} volných, {len(taken)} zabraných, {len(unknown)} nejistých")
    print("="*60)
    
    return available


# CLI rozhraní
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # Načti domény ze souboru nebo z argumentů
        if sys.argv[1].endswith('.txt'):
            with open(sys.argv[1], 'r') as f:
                domains = [line.strip() for line in f if line.strip()]
        else:
            domains = sys.argv[1:]
    else:
        # Demo
        print("Použití: python domain_checker.py domena1.com domena2.io")
        print("   nebo: python domain_checker.py seznam.txt")
        print("\nDemo s ukázkovými doménami:")
        domains = ["google.com", "github.io", "thisdomaindoesnotexist123456.com"]
    
    print(f"\nKontroluji {len(domains)} domén...\n")
    results = check_domains_bulk(domains, delay=1.5)
    print_results(results)
