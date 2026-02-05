# Mobile UX Practices

60%+ traffic is mobile. Design for thumb zone.

---

## Practice #18: Touch Target Sizes

**PROBLÉM:** Small buttons = mis-taps.

**ŘEŠENÍ:** Min 44×44px (Apple HIG), ideal 48×48px.

**KÓD:**
```css
.btn-mobile {
  min-width: 48px;
  min-height: 48px;
  padding: 12px 24px;
}

/* Mezera mezi targety */
.btn-mobile + .btn-mobile {
  margin-left: 8px; /* Min 2mm */
}
```

**THUMB ZONES:**
- 🟢 Easy reach: Bottom center (main actions)
- 🟡 Medium: Middle of screen (content)
- 🔴 Hard reach: Top corners (less important)

**OČEKÁVANÝ DOPAD:** +20-35% mobile conversions

---

## Practice #19: Mobile Form Optimization

**PROBLÉM:** Forms hard to fill on mobile.

**ŘEŠENÍ:** 8 optimizations.

1. **Font size min 16px** (prevents iOS zoom)
2. **Correct inputmode** (email, tel, numeric)
3. **Large tap areas** (48px height)
4. **Floating labels** (always visible)
5. **Sticky submit button** (always accessible)
6. **Progress indicator** (for multi-step)
7. **Native pickers** (date, time)
8. **Autosave** (localStorage)

**OČEKÁVANÝ DOPAD:** +25-40% mobile form completion

**CHECKLIST:**
- [ ] Font size ≥ 16px
- [ ] inputmode attributes set
- [ ] Touch targets ≥ 48px
- [ ] Labels above fields (not inside)
- [ ] Tested on real device (not just DevTools)

---

## Summary

**2 Mobile Practices:**
1. **Touch targets** (+20-35%) - Min 48×48px, thumb zone placement
2. **Form optimization** (+25-40%) - 8 mobile-specific optimizations

**Next:** See practices/performance.md
