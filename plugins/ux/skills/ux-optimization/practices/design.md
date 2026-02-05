# Design Optimization Practices

Visual hierarchy, whitespace, CTA buttons.

---

## Practice #13: CTA Buttons (Contrast & Size)

**PROBLÉM:** Users miss main action button.

**ŘEŠENÍ:** ONE primary CTA, contrasting color, min 44×44px (ideally 48×48px).

**PRAVIDLA:**
- 1 primary CTA per page (max 2)
- Contrasting color
- Min 44×44px (Apple HIG), ideal 48×48px
- Text = action ("Koupit", NOT "Kliknout zde")
- 8px whitespace around

**KÓD:**
```css
.btn-primary {
  background: #FF6B00;
  color: #FFFFFF;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  min-width: 200px;
  min-height: 48px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #E55F00;
  transform: translateY(-2px);
}
```

**OČEKÁVANÝ DOPAD:** +25-50% click-through

---

## Practice #14: Visual Hierarchy

**PROBLÉM:** Everything looks equally important.

**ŘEŠENÍ:** 3 levels of importance via size, color, position.

**IMPLEMENTACE:**
```css
h1 { font-size: 48px; font-weight: 700; } /* Most important */
h2 { font-size: 36px; font-weight: 600; }
h3 { font-size: 24px; font-weight: 600; }
p  { font-size: 18px; line-height: 1.6; } /* Body */
.caption { font-size: 14px; color: #888; } /* Least important */
```

**F-Pattern:** Users read in F shape (horizontal top, shorter middle, vertical left)

**OČEKÁVANÝ DOPAD:** +15-30% engagement

---

## Practice #15: Whitespace System

**PROBLÉM:** Cluttered page, hard to read.

**ŘEŠENÍ:** Consistent spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px).

**KÓD:**
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}

.section { padding: var(--space-2xl) 0; }
.cta-section { padding: var(--space-3xl) 0; }
p { margin-bottom: var(--space-md); line-height: 1.6; }
.btn { padding: var(--space-md) var(--space-xl); margin-top: var(--space-lg); }
```

**60-30-10 Rule:**
- 60% dominant color (background)
- 30% secondary (content blocks)
- 10% accent (CTA, links)

**OČEKÁVANÝ DOPAD:** +10-20% readability & engagement

---

## Summary

**3 Design Practices:**
1. **CTA buttons** (+25-50%) - Contrast, size 48×48px, clear text
2. **Visual hierarchy** (+15-30%) - Size, color, position
3. **Whitespace** (+10-20%) - Consistent spacing system

**Total potential:** +50-100% improvement

**Next:** See practices/ab-testing.md for testing strategy
