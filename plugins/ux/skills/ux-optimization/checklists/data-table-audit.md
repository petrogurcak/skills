# Data Table UX Audit Checklist

Use this checklist to audit data tables in admin panels and applications.

## Visual Design

- [ ] Zebra striping se světlými odstíny (#f9fafb vs #ffffff)
- [ ] Fixed/sticky header při vertical scrollu
- [ ] Horizontal scroll na mobilu (ne oříznutí)
- [ ] Hover state na řádcích
- [ ] Čísla zarovnaná vpravo
- [ ] Čísla používají tabular-nums font feature
- [ ] Column widths optimalizované pro obsah
- [ ] Consistent cell padding (12-16px)

## Sorting & Filtering

- [ ] Column sorting s vizuálním indikátorem (šipka)
- [ ] aria-sort atributy pro accessibility
- [ ] Multi-column sort (pokud potřeba)
- [ ] Search s debounce (300ms)
- [ ] Quick filters pro top 3 use cases
- [ ] Advanced filters v dropdown/panelu
- [ ] Active filters viditelně označeny
- [ ] Reset filters tlačítko
- [ ] Clear search tlačítko (×)

## Pagination

- [ ] Page size selector (10, 25, 50, 100)
- [ ] Total count vždy zobrazen ("Zobrazeno X-Y z Z")
- [ ] First/Last page buttons
- [ ] Previous/Next buttons
- [ ] Direct page jump input
- [ ] Current page jasně označena (aria-current)
- [ ] Disabled state pro neaktivní buttons
- [ ] Mobile responsive pagination

## Actions

- [ ] Row-level actions na konci řádku
- [ ] Max 2-3 viditelné akce, zbytek v dropdown "⋮"
- [ ] Icons mají tooltips
- [ ] Bulk selection checkbox v headeru
- [ ] "Select all visible" vs "Select all X items"
- [ ] Bulk actions bar při výběru
- [ ] Selected count zobrazen
- [ ] Clear selection možnost

## Data States

- [ ] Loading state (skeleton nebo spinner)
- [ ] Empty state s jasnou zprávou
- [ ] Empty state s CTA ("Vytvořit první...")
- [ ] Error state s retry
- [ ] No results state (s "clear filters" CTA)

## Large Datasets

- [ ] Server-side pagination (ne all-at-once)
- [ ] Column visibility toggle
- [ ] Preferences uloženy v localStorage
- [ ] Lazy loading pro images/avatars
- [ ] Virtual scrolling pro 1000+ řádků (pokud potřeba)

## Delete Safety

- [ ] Delete confirmation dialog vždy
- [ ] Dialog ukazuje CO bude smazáno
- [ ] Soft delete kde možné
- [ ] Undo toast (5-10 sekund)
- [ ] "Koš" / "Nedávno smazané" sekce
- [ ] Bulk delete má extra confirmation

## Accessibility

- [ ] ARIA labels na buttons
- [ ] Keyboard navigation (Tab, Arrow keys)
- [ ] Focus management při modal open/close
- [ ] Screen reader announces updates
- [ ] table role nebo semantic HTML table
- [ ] Column headers mají scope="col"

## Mobile Responsiveness

- [ ] Horizontal scroll s visual indicator
- [ ] Pinned columns (ID, Actions) kde možné
- [ ] Touch targets min 44×44px
- [ ] Swipe actions (pokud nativní app)
- [ ] Simplified view option

---

## Scoring

- **35+ items checked**: Excellent table UX
- **25-34 items**: Good, minor improvements needed
- **15-24 items**: Fair, significant improvements recommended
- **< 15 items**: Poor, needs major work

## Common Issues & Fixes

| Issue | Quick Fix |
|-------|-----------|
| No zebra striping | Add alternating row backgrounds |
| Header scrolls away | Add position: sticky |
| Can't find data | Add search + filters above table |
| Accidental deletes | Add confirmation + undo toast |
| Slow loading | Implement server-side pagination |
| Inaccessible | Add ARIA labels + keyboard nav |
