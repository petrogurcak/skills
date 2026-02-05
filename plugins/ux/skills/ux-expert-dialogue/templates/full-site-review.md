# Full Site Expert Review Template

**Duration:** 1-2 hours
**Scope:** Complete website audit (all pages + flows)
**Output:** Comprehensive prioritized roadmap

---

## SETUP PHASE

**Expert collects:**
1. **Site map** (all pages to review)
2. **Primary user flows** (homepage → conversion, product → checkout, etc.)
3. **Analytics data** (top pages, drop-off points, conversion funnels)
4. **Business goals** (prioritize what matters)

---

## REVIEW STRUCTURE

### Phase 1: Core Pages (Use individual templates)

**Homepage**
- Use: `homepage-review.md` template
- Focus: First impression, value prop clarity, navigation

**Key Landing Pages**
- Use: `landing-page-review.md` template
- Focus: Conversion optimization, message match

**Product/Service Pages**
- Use: E-commerce checklist from `CRITIQUE-FRAMEWORKS.md`
- Focus: Product clarity, add-to-cart optimization

**Checkout Flow** (if e-commerce)
- Use: Checkout checklist from `CRITIQUE-FRAMEWORKS.md`
- Focus: Friction reduction, trust signals

---

### Phase 2: Supporting Pages

**About Us**
- [ ] Shows USP/differentiation (uvp-optimization positioning)
- [ ] Personal/human elements (not corporate)
- [ ] Team photos (real, not stock)
- [ ] Conversational tone

**Contact**
- [ ] Multiple contact methods visible
- [ ] Response time expectations stated
- [ ] Location/hours if relevant
- [ ] Contact form optimized (min fields)

**Blog** (if present)
- [ ] Recent posts (not abandoned 2019)
- [ ] Clear categories/navigation
- [ ] Related posts visible
- [ ] CTAs in posts (subtle, relevant)

**FAQ**
- [ ] Top questions answered
- [ ] Searchable
- [ ] Links to deeper resources
- [ ] Reduces support burden

**Privacy/Terms**
- [ ] Accessible (footer link)
- [ ] GDPR compliant if EU traffic
- [ ] Plain language summary

---

### Phase 3: Navigation & Information Architecture

**Global Navigation**
- [ ] Max 7 items (Miller's Law)
- [ ] Logical grouping
- [ ] Kontakt last item, right-aligned
- [ ] Mobile: hamburger or priority+
- [ ] Consistent across site

**User Flows**
- [ ] Critical paths clear (homepage → conversion)
- [ ] Max 3 clicks to any page
- [ ] Breadcrumbs for deep pages
- [ ] Clear "next steps" on every page

**Internal Linking**
- [ ] Related content linked
- [ ] No dead ends (orphan pages)
- [ ] Contextual CTAs throughout

---

### Phase 4: Cross-Cutting Concerns

**Performance**
- [ ] Page load <3 seconds (all pages)
- [ ] Images optimized
- [ ] Core Web Vitals pass (LCP, FID, CLS)

**Mobile**
- [ ] Fully responsive (all pages)
- [ ] Touch targets min 44x44px
- [ ] Forms mobile-optimized
- [ ] Readable text (min 16px)

**Accessibility**
- [ ] Contrast ratio 4.5:1 (text)
- [ ] Alt text on images
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] WCAG AA compliance

**SEO Basics**
- [ ] Unique title tags
- [ ] Meta descriptions
- [ ] H1 on every page
- [ ] Clean URLs
- [ ] Sitemap.xml

---

## COMPREHENSIVE ISSUE LOG

**Expert creates master list across all pages:**

### Critical Issues (Fix Immediately)

| Page | Issue | Impact | Effort | Priority |
|------|-------|--------|--------|----------|
| Homepage | Headline generic | -40% conversion | 2h | 1 |
| Checkout | 12 form fields | -50% completion | 1 day | 2 |
| Product | No multiple photos | -30% add-to-cart | 4h | 3 |
| All | Load time 8s | -60% bounce | 2 days | 4 |

### Medium Issues (Week 2-3)

| Page | Issue | Impact | Effort | Priority |
|------|-------|--------|--------|----------|
| About Us | Stock photos | -20% trust | 1 day | 5 |
| Contact | No hours listed | -10% calls | 1h | 6 |

### Low Priority (Month 2+)

| Page | Issue | Impact | Effort | Priority |
|------|-------|--------|--------|----------|
| Footer | Link organization | -5% findability | 2h | 10 |

---

## PRIORITIZATION FRAMEWORK

**ROI Matrix:**

```
High Impact, Low Effort (DO FIRST):
- Homepage headline rewrite
- CTA text changes
- Remove checkout fields

High Impact, High Effort (PLAN FOR):
- Site-wide performance optimization
- Complete checkout redesign

Low Impact, Low Effort (FILL TIME):
- Footer organization
- Blog category cleanup

Low Impact, High Effort (DON'T DO):
- Unless strategic reason
```

---

## IMPLEMENTATION ROADMAP

### Sprint 1 (Week 1): Quick Wins
- [ ] Fix top 5 critical issues
- [ ] Deploy to production
- [ ] Monitor impact

### Sprint 2 (Week 2-3): Medium Effort
- [ ] Address 5-10 medium issues
- [ ] Set up A/B tests
- [ ] Begin performance optimization

### Sprint 3 (Week 4-6): Major Projects
- [ ] Tackle high-effort items
- [ ] Complete redesigns if needed
- [ ] Full testing cycle

### Ongoing (Month 2+):
- [ ] Low-priority cleanup
- [ ] Continuous optimization
- [ ] Monthly reviews

---

## TESTING STRATEGY

**Parallel A/B tests across site:**

**Test 1: Homepage**
- Element: Headline
- Expected: +40-50%

**Test 2: Product Pages**
- Element: Photo count (1 → 5)
- Expected: +30%

**Test 3: Checkout**
- Element: Form fields (12 → 5)
- Expected: +50%

**Stagger tests** (don't run all simultaneously if traffic limited)

**See:** `ux-optimization` practices/ab-testing.md for methodology

---

## FINAL DELIVERABLES

1. **Executive Summary** (1 page)
   - Top 10 issues
   - Expected ROI
   - Timeline

2. **Detailed Issue Log** (spreadsheet)
   - All issues with priority/effort/impact
   - Sortable/filterable

3. **Implementation Roadmap** (Gantt chart)
   - Week-by-week plan
   - Dependencies noted
   - Resource requirements

4. **Testing Plan** (document)
   - What to test
   - How to measure
   - Success criteria

---

**Full site review complete.** Ready for implementation phase.
