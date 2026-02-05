# Admin Dashboard UX Audit Checklist

Use this checklist to audit admin dashboards and SaaS applications.

## Layout & Structure

- [ ] Kritická data viditelná above-the-fold (bez scrollu)
- [ ] F-pattern respektován (důležité vlevo nahoře)
- [ ] Grid system s konzistentním spacing (8/16/24px)
- [ ] Widget hierarchy jasná (velké = důležité)
- [ ] Responsive na tablet (1024px)
- [ ] Responsive na mobile (768px)
- [ ] Max 4-6 KPI cards viditelných najednou

## Data Visualization

- [ ] Správný typ grafu pro data (line = trend, pie = part-to-whole, bar = comparison)
- [ ] Y axis začíná na 0 (bar charts)
- [ ] Max 5-7 barev v grafech
- [ ] Interactive tooltips na hover
- [ ] Direct labels kde možné (ne jen legenda)
- [ ] Insight callout pro key findings
- [ ] Grafy mají jasné titulky

## Widgets

- [ ] Konzistentní header struktura (title + actions)
- [ ] Loading skeleton pro async data
- [ ] Empty state definován
- [ ] Error state definován
- [ ] Quick actions pro časté úkoly
- [ ] "View all" linky kde relevantní
- [ ] Alert widgety vizuálně odlišné

## Navigation

- [ ] Sidebar fixed na desktopu
- [ ] Sidebar collapsible s persist preference
- [ ] Tooltips v collapsed stavu
- [ ] Mobile má hamburger/bottom nav
- [ ] Active state jasně viditelný
- [ ] Breadcrumbs pro hlubokou navigaci
- [ ] Logo vede na dashboard/home

## Personalization

- [ ] Dark mode s persist preference
- [ ] Global date range selector
- [ ] Widget visibility toggle
- [ ] Preferences v localStorage
- [ ] Respektuje prefers-color-scheme

## Performance

- [ ] Initial load < 3s
- [ ] Lazy loading pro off-screen widgets
- [ ] No layout shift při loadování
- [ ] Skeleton loading pro charts
- [ ] Debounce na filter changes

## Accessibility

- [ ] Keyboard navigation funguje
- [ ] Focus states viditelné
- [ ] Screen reader labels (aria-label)
- [ ] Color contrast min 4.5:1
- [ ] Charts mají textovou alternativu
- [ ] Role="progressbar" na progress indicators

## Real-time Features

- [ ] Auto-refresh s indicator
- [ ] Manual refresh tlačítko
- [ ] "Last updated" timestamp
- [ ] Stale data warning
- [ ] Connection status indicator (pokud relevantní)

---

## Scoring

Count checked items and calculate score:

- **40+ items checked**: Excellent dashboard UX
- **30-39 items**: Good, minor improvements needed
- **20-29 items**: Fair, significant improvements recommended
- **< 20 items**: Poor, major redesign needed

## Priority Fixes

After audit, prioritize based on:

1. **High impact, low effort** - Quick wins (dark mode, loading states)
2. **High impact, high effort** - Major improvements (responsive, accessibility)
3. **Low impact, low effort** - Nice to have (animations, polish)
4. **Low impact, high effort** - Deprioritize or skip
