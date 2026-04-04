---
name: banana-illustrator
description: Vizualni produkce detske knihy "Mlsne tlapky" ve stylu Andrea Tachezy. Character bible, style locking, spread kompozice. Pro generovani obrazku pouziva creative:image-generation skill.
---

# Banana Illustrator

Orchestrace vizualni stranky projektu "Mlsne tlapky". Zajistuje, aby vsech 14 spreadu vypadalo jako od jedne autorky (Andrea Tachezy) a bylo pripraveno pro sazbu textu.

**Prerekvizita:** Pro tool selection a generovani pouzij `creative:image-generation` skill. Tento skill definuje CO generovat a v jakem stylu.

## 1. Vizualni pasy (Character Bible)

Fixni znaky pro postavy:

| Postava | Popis | Klicove vizualni prvky |
|---------|-------|----------------------|
| **Sedik** | Sedy kocourek | Bile tlapky, teckovane oci, zvědavy vyraz |
| **Fous** | Cely bily kocour | Trcici vousy na vsechny strany, linejsi postoj |
| **Lap** | Rezavy kocourek | Aktivni, stale v pohybu, macha tlapkami |
| **Mila (Mama)** | Cernobila kocka | Vyrazne fleky, klidna, pecujici |
| **Mana (Jesterka)** | Zeleny jester | Pruhovany ocasek, minimalisticke linie |

Pro kazdou novou postavu vytvor "Visual ID" a vygeneruj stabilni seed prompt.

## 2. Style Locking (Master Prompt)

Pri generovani promptu VZDY pouzivej tyto klicove prvky:

```
Minimalist pencil lines, soft watercolor textures, off-white paper grain background,
naive art style, children's book illustration, fine graphite pencil details,
soft color washes, muted pastel palette, whimsical character design,
Andrea Tachezy style inspiration, plenty of white space.
```

Tento string vloz jako `style_reference` popis do kazdeho promptu. Pokud mas referecni obrazek stylu Tachezy, pouzij `style_reference_image_url` v Ideogram.

## 3. Scene Composer (Vignetni kompozice)

Kazdy spread musi respektovat:

- **Off-white/Cream background:** Nikdy ne ciste bila, vzdy s lehkou texturou papiru.
- **Negative Space:** Min. 40-50 % plochy prazdne pro budouci sazbu textu.
- **Vignette Style:** Objekty "plavou" v prostoru, nejsou ohraniceny rameckem (bleed-to-edge pouze u zeme/stolu).
- **Grounding:** Postavy stoji na jemne lince zeme nebo maji pod sebou mekky stin/vlnku.

## 4. Batch Prompting Workflow

Generuj prompty v tabulce:

| Spread # | Text Scene | Composition Layout | Tool | Full Prompt |
|----------|-----------|-------------------|------|-------------|
| 1 | ... | Ilustrace vpravo dole, text vlevo nahore | Ideogram | [master style] + [scene] |

- **Aspect ratio:** `--ar 2:1` pro spready (double page).
- **Character consistency:** Pouzij `character_reference_image_url` s master image kazde postavy.
- **Tool vyber:** Viz `creative:image-generation` decision tree.

## 5. Bedtime Typography

Pro maximalni citelnost pri usínani (v seru/pri lampicce):

- **Kontrast:** Tmave sedy text (#424242) na kremovem podkladu (#FCFBF9). Pro nocni sceny bily/kremovy text Bold.
- **Narration font:** Montserrat/Andika, 16-18pt, leading 1.5-1.6.
- **Emotion/Bubbles:** Rucne psany font (Gloria Hallelujah) ladici s linkou ilustrace.
- **Jmena postav:** Pri prvnim vyskytu na spreadu pis tucne (**Sedik, Fous, Lap, Mila**).

## Pracovni postup

1. **Analyzuj text spreadu**
2. **Navrhni kompozici** — kde bude teziste obrazku, aby neprekazelo textu
3. **Draft promptu** — master style string + specificka akce postav
4. **Generuj** — pouzij `creative:image-generation` skill pro vyber nastroje
5. **Validuj** — zkontroluj vysledek, iteruj

---

*Ship over perfect. Produkuj prompty, ktere jsou hned pouzitelne, vizualne ciste a v souladu s poetikou knihy.*
