# Osobni udaje v e-shopu

## Zakony

- GDPR (EU 2016/679) — cl. 6, cl. 7, cl. 12-22, cl. 28, cl. 30
- Zakon c. 110/2019 Sb. (ZZOOU — ceska adaptace GDPR)

## Pravni zaklady zpracovani v e-shopu

| Ucel | Pravni zaklad | Udaje |
|------|---------------|-------|
| Plneni objednavky | Plneni smlouvy cl. 6(1)(b) | Jmeno, adresa, email, telefon |
| Uctovani a dane | Pravni povinnost cl. 6(1)(c) | Fakturacni udaje |
| Prevence podvodu | Opravneny zajem cl. 6(1)(f) | IP adresa, platebni data |
| Zakladni analytika | Opravneny zajem cl. 6(1)(f) | Anonymizovane navstevnosti |
| Marketingove emaily | Souhlas cl. 6(1)(a) | Email (viz marketing-obchodni-sdeleni.md) |
| Remarketingove cookies | Souhlas cl. 6(1)(a) | Cookie ID, browsing data |

## Povinny obsah privacy policy

Zasady ochrany osobnich udaju MUSI obsahovat:
1. Totoznost a kontakt spravce udaju
2. Ktere udaje se zbirai a proc (ucely)
3. Pravni zaklad pro kazdy ucel zpracovani
4. Doby uchovani udaju
5. Prijemci / treti strany (dopravci, platebni brany, analytika)
6. Prava subjektu udaju (pristup, oprava, vymazani, prenositelnost, namitka)
7. Pravo podat stiznost u UOOU
8. Zda je poskytovani udaju povinne nebo dobrovolne
9. Automatizovane rozhodovani (pokud existuje)

## Zpracovatelske smlouvy (cl. 28)

Povinne s kazdym dodavatelem ktery zpracovava zakaznicke udaje:
- Platebni brany (Stripe, GoPay, Comgate)
- Dopravci (PPL, DPD, Zasilkovna)
- Emailove platformy (Mailchimp, Ecomail)
- Analytika (Google Analytics)
- Hosting provider
- CRM systemy

## Reakce na zadosti subjektu

- Lhuta: **30 dnu** od doruceni zadosti
- Prodlouzeni: mozne o dalsi 2 mesice u slozitych pripadu (informovat do 30 dnu)
- Bezplatne (prvni zadost, dalsi opakovan mohou byt zpoplatneny)

## Sankce

- UOOU: pokuta az **10 000 000 CZK** (cesky zakon)
- GDPR: az 20 000 000 EUR nebo 4 % globalniho obratu

## Prakticke poznamky

- Privacy policy = samostatna stranka, odkaz v paticce a pri registraci/objednavce
- Pro hloubkovy GDPR rozbor (DPIA, slozite zpracovani) pouzijte skill `legal:gdpr`
- ZZOOU (110/2019) nerozporuje GDPR, jen upresne nektere aspekty (vek souhlasu: 15 let v CZ)
- Uchovani udaju po objednavce: 10 let (uctovani), pak smazat nebo anonymizovat
