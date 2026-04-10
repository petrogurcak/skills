# Ceny, DPH a Omnibus smernice

## Zakony

- ZDPH zakon c. 235/2004 Sb. (dan z pridane hodnoty)
- ZOS §12 (zobrazovani cen)
- ZOS §12a (srovnavaci ceny — Omnibus)

## Sazby DPH (od 1.1.2024)

- **21 %** zakladni sazba (vetsina zbozi a sluzeb)
- **12 %** snizena sazba (potraviny, voda, leky, knihy, nektere sluzby)

## Zobrazovani cen (§12)

- Vsechny ceny pro spotrebitele (B2C) MUSI obsahovat DPH
- Ceny MUSI byt v CZK
- Jednotkova cena musi byt viditelna v miste prodeje

## Omnibus — srovnavaci ceny u slev (§12a, ucinnost 6.1.2023)

Pri inzerci slevy MUSI prodejce zobrazit **nejnizsi cenu za poslednich 30 dnu**.

Pravidla:
- Referenci cena = nejnizsi cena za ktere bylo zbozi prodavano v poslednich 30 dnech pred slevou
- Pokud je zbozi na trhu kratsi dobu nez 30 dnu: nejnizsi cena od zacatku prodeje
- Prodejce musi vest **evidenci cen** (cenova historie) pro kontrolu COI
- Platí pro vsechny formy cenoveho zvyhodneni (sleva, akce, vyprodej, Black Friday...)

Co neni sleva:
- Mnozstevni sleva (kup 3, zaplat 2)
- Vernostni program (body, kupony)
- Prvni nakup s kodem

## Sankce

- Pokuta az **5 000 000 CZK** nebo **4 % rocniho obratu** (ZOS §24-24a)
- COI aktivne kontroluje — v dubnu 2025 reportovano 80 % nesouladu u kontrolovanych e-shopu

## Prakticke poznamky

- Na produktove strance u slevy zobrazovat: puvodni cena (= nejnizsi za 30 dni), slevnena cena, procento slevy
- Implementovat cenovou historii v databazi — uchovavat zmeny cen s timestampy
- Pozor na dynamicke ceny (A/B testy cen) — kazda zmena se pocita do 30denni historie
- Flash sales / limitovane akce podlehaji stejnym pravidlum
