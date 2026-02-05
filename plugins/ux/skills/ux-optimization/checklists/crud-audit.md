# CRUD Operations UX Audit Checklist

Use this checklist to audit Create, Read, Update, Delete operations in applications.

## Create Operations

### Entry Point
- [ ] CTA "Add [entity]" / "+ New" viditelné v page header
- [ ] CTA má primary button styling
- [ ] Ikona + text (ne jen ikona)
- [ ] Keyboard shortcut hint (např. "Ctrl+N")

### Create Form
- [ ] Pattern odpovídá use case:
  - [ ] Form-first: komplexní data s validací
  - [ ] Create-first: rychlé vytvoření, edit inline
  - [ ] Draft: důležitá data s auto-save
- [ ] Modal pro jednoduché (3-5 polí)
- [ ] Full page pro komplexní (6+ polí)
- [ ] Autofocus na první pole
- [ ] Required fields označeny (*)
- [ ] Field hints kde potřeba

### Create UX
- [ ] Clear "Cancel" / "Close" možnost
- [ ] Loading state na submit button
- [ ] Success feedback (redirect nebo toast)
- [ ] Error feedback s jasnou zprávou
- [ ] Validation před submit

---

## Read/List Operations

### List View
- [ ] Search/filter funguje
- [ ] Sorting funguje
- [ ] Pagination pro velké datasety
- [ ] Column customization (pokud mnoho sloupců)

### States
- [ ] Empty state s CTA ("Vytvořte první...")
- [ ] Loading state (skeleton/spinner)
- [ ] Error state s retry
- [ ] No results state ("Žádné výsledky pro...")

### Detail View
- [ ] Breadcrumbs pro navigaci zpět
- [ ] Edit button viditelný
- [ ] Delete v sekundární pozici
- [ ] Related data zobrazena

---

## Update/Edit Operations

### Edit Entry Point
- [ ] Edit button/icon jasně viditelný
- [ ] Double-click to edit (tabulky, inline)
- [ ] Keyboard shortcut (E nebo Enter)

### Edit Form
- [ ] Pre-filled s aktuálními daty
- [ ] Jasný "Save" / "Cancel"
- [ ] Pattern podle impact:
  - [ ] Low impact: Auto-save
  - [ ] Medium impact: Manual save + unsaved warning
  - [ ] High impact: Review step

### Edit Safety
- [ ] Unsaved changes warning při odchodu
- [ ] Save button disabled když no changes
- [ ] Loading state během save
- [ ] Success feedback
- [ ] Error handling s retry
- [ ] "Discard changes" možnost

### Inline Edit
- [ ] Visual indicator že pole je editable
- [ ] Click nebo double-click to edit
- [ ] Blur nebo Enter to save
- [ ] Escape to cancel
- [ ] Loading indicator během save

---

## Delete Operations

### Visual Safety
- [ ] Delete button má danger styling (červená)
- [ ] Delete není první v řadě akcí
- [ ] Delete má ikona + text, ne jen ikona
- [ ] Delete je ve "More actions" dropdown (optional)

### Confirmation
- [ ] Confirmation dialog vždy
- [ ] Dialog ukazuje CO bude smazáno
- [ ] Název/ID entity viditelný
- [ ] Warning text pro důsledky
- [ ] "Cancel" jako default, "Delete" jako danger

### High-stakes Delete
- [ ] Type-to-confirm pro kritická data
- [ ] Multi-step confirmation
- [ ] Admin approval (pokud potřeba)
- [ ] Audit log

### Recovery
- [ ] Soft delete implementován
- [ ] Undo toast (5-10 sekund)
- [ ] "Koš" / "Nedávno smazané" sekce
- [ ] Auto-purge s warning (např. "bude smazáno za 30 dní")

---

## Bulk Operations

### Selection
- [ ] Checkbox na začátku řádku
- [ ] "Select all visible" v header
- [ ] "Select all X items" pro celý dataset
- [ ] Selected count zobrazen
- [ ] Clear selection možnost
- [ ] Shift+click pro range select

### Actions
- [ ] Bulk actions bar při výběru
- [ ] Bulk actions seskupené logicky
- [ ] Bulk delete má extra confirmation
- [ ] Progress indicator pro dlouhé operace
- [ ] Partial failure handling
- [ ] "Retry failed" možnost

---

## Optimistic UI

### When to Use
- [ ] Toggle (like, favorite, archive)
- [ ] Inline edit
- [ ] Reorder (drag & drop)
- [ ] Delete (s undo)

### When NOT to Use
- [ ] Create (potřebuje ID z backendu)
- [ ] Payment/financial operations
- [ ] Irreversible operations

### Implementation
- [ ] UI update před API call
- [ ] Loading/pending state viditelný
- [ ] Rollback při error
- [ ] Error toast s jasnou zprávou

---

## Scoring

- **50+ items checked**: Excellent CRUD UX
- **35-49 items**: Good, minor improvements needed
- **20-34 items**: Fair, significant improvements recommended
- **< 20 items**: Poor, needs major redesign

## Priority Matrix

| Operation | Priority | Impact |
|-----------|----------|--------|
| Delete safety | Critical | Prevents data loss |
| Create CTA visibility | High | Affects adoption |
| Edit unsaved warning | High | Prevents data loss |
| Bulk operations | Medium | Power user feature |
| Optimistic UI | Medium | Improves perceived speed |
