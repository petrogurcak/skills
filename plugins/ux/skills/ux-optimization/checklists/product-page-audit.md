# Product Page Audit Checklist

Complete 17-element audit for e-commerce product pages. Use with `ux-optimization` practices.

**Target:** Identify quick wins + major issues blocking conversion.

---

## How to Use This Checklist

1. **Open product page** (representative of catalog)
2. **Review each element** (17 total)
3. **Mark status:** ✅ Good / ⚠️ Needs work / ❌ Missing
4. **Prioritize fixes** using Impact × Ease matrix
5. **Test changes** via A/B testing (see `ab-testing.md`)

---

## Element 1: Product Photos

**See:** `practices/ecommerce.md` Practice #9 for detailed guidance

### Checklist

- [ ] **Minimum 3 photos** (hero, angle, scale)
  - ⚠️ If <3: Add more angles immediately
  - ✅ Ideal: 5-8 photos

- [ ] **Photo #1: Hero shot** (white background, professional)
  - Resolution: 2000×2000px minimum for zoom
  - Centered, well-lit, high quality

- [ ] **Photo #2: Lifestyle image** (product in realistic use)
  - Real context, not overly staged
  - Shows product scale naturally

- [ ] **Photos #3+: Multiple angles** (front, back, side, top)
  - Satisfies "58% users want all angles" (Shopify)

- [ ] **Zoom functionality** (2x minimum, 4x ideal)
  - Desktop: Click/hover to zoom
  - Mobile: Pinch-to-zoom enabled

- [ ] **Detail shots** (close-ups of quality indicators)
  - Clothing: seams, fabric texture, closures
  - Tech: ports, materials, controls

- [ ] **Scale reference** included
  - Small items: hand, coin, ruler visible
  - Clothing: Model height stated
  - Furniture: Room context or measurements overlay

- [ ] **Mobile optimization**
  - Swipe gallery (not click-through)
  - Fast loading (WebP format)
  - Vertical scroll (not horizontal)

**Priority:** HIGH (photos = 46% of users start exploration here)

**Expected impact:** +20-40% add-to-cart with 3→8 photos upgrade

---

## Element 2: Product Title

### Checklist

- [ ] **Descriptive + specific** (not generic)
  - ❌ "Modrá taška"
  - ✅ "Turistický batoh North Explorer 40L, modrý, vodotěsný"

- [ ] **Includes key search terms**
  - Brand name
  - Product type
  - Key feature/benefit
  - Size/capacity (if relevant)

- [ ] **Scann able** (not a paragraph)
  - One line preferred
  - Max 2 lines on mobile

- [ ] **Keyword at front** (SEO + clarity)
  - ✅ "Batoh turistický 40L North Explorer"
  - ❌ "North Explorer batoh který je perfektní na turistiku 40L"

**Priority:** MEDIUM (affects SEO + clarity)

**Expected impact:** +5-10% organic traffic, +10-15% clarity

---

## Element 3: Price & Availability

### Checklist

- [ ] **Price prominently displayed**
  - Large font (24-32px)
  - High contrast
  - Above fold (visible without scrolling)

- [ ] **Original price shown** (if on sale)
  - Strikethrough original
  - Discount % visible ("Ušetříte 30%")
  - Red/green color for savings

- [ ] **Availability status clear**
  - ✅ "Skladem" (green)
  - ⚠️ "Poslední 3 kusy" (orange, urgency)
  - ❌ "Vyprodáno" (gray, with restock notification option)

- [ ] **Shipping cost preview**
  - "Doprava od 79 Kč"
  - "Doprava zdarma nad 1 000 Kč"
  - Shows before checkout

- [ ] **Price per unit** (if applicable)
  - "299 Kč / ks"
  - "24,92 Kč / 100 g" (for food)

**Priority:** HIGH (price = top-3 decision factor)

**Expected impact:** +15-25% with clear availability + shipping preview

---

## Element 4: Add to Cart Button

### Checklist

- [ ] **Prominently placed** (sticky on mobile)
  - Above fold
  - Near price
  - Sticky on scroll (mobile)

- [ ] **Large + high contrast**
  - Min 44×44px (accessibility)
  - Primary brand color
  - High contrast with background

- [ ] **Action-oriented text**
  - ✅ "Přidat do košíku"
  - ✅ "Koupit nyní"
  - ❌ "Objednat" (vague)

- [ ] **Loading state** (prevents double-click)
  - Spinner while adding
  - Disabled during add

- [ ] **Success feedback** (see `ecommerce.md` Practice #11)
  - Toast notification "✅ Přidáno do košíku"
  - Cart count updates
  - Option to view cart or continue

**Priority:** CRITICAL (conversion bottleneck)

**Expected impact:** +10-20% with proper feedback

---

## Element 5: Product Description

### Checklist

- [ ] **Scannable format** (not wall of text)
  - Bullet points for features
  - Short paragraphs (max 3 lines)
  - Bold keywords

- [ ] **Features → Benefits translation**
  - ❌ "Vodotěsný materiál"
  - ✅ "Vodotěsný materiál = obsah zůstane suchý i při dešti"

- [ ] **Key features above fold**
  - Top 3-5 benefits visible without scrolling
  - Detailed specs can be below

- [ ] **Technical specs** (if relevant)
  - Dimensions
  - Weight
  - Materials
  - Care instructions
  - In table format (scannable)

- [ ] **SEO-friendly** (unique content)
  - Not manufacturer's generic description
  - Includes search keywords naturally

**Priority:** MEDIUM (important but not primary driver)

**Expected impact:** +10-15% with benefit-focused copy

---

## Element 6: Social Proof (Reviews/Ratings)

**See:** `practices/ecommerce.md` for case studies

### Checklist

- [ ] **Star rating visible above fold**
  - Next to title or price
  - Shows average (e.g., "4.7 ★★★★★")
  - Shows count (e.g., "127 hodnocení")

- [ ] **Minimum 3 reviews** displayed
  - Recent reviews prioritized
  - Mix of ratings (not all 5-star = suspicious)

- [ ] **Reviews include:**
  - Reviewer name (real or initials)
  - Date (recent = more credible)
  - Verified purchase badge
  - Specific details (not just "Great!")

- [ ] **Photo reviews highlighted**
  - User-uploaded product photos
  - Higher trust than text-only

- [ ] **Response to negative reviews**
  - Shows company cares
  - Addresses issues publicly

- [ ] **Review summary** (if many reviews)
  - "95% would recommend"
  - Common pros/cons
  - Filter by rating

**Priority:** HIGH (reviews = #1 trust factor)

**Expected impact:** +25-35% with proper social proof display

**Data:**
- 63% require reviews before purchase (BrightLocal)
- Testimonials with results: +62% persuasiveness

---

## Element 7: Variant Selection (Size, Color, etc.)

### Checklist

- [ ] **Visual selector** (not just dropdown)
  - Color: Swatches with images
  - Size: Buttons (S M L XL)
  - Clicking changes hero photo

- [ ] **Size guide link** (for clothing)
  - Modal or new tab
  - Measurement chart
  - Fit guide (slim, regular, loose)

- [ ] **Out-of-stock variants grayed out**
  - Still visible (shows full range)
  - "Notify when available" option

- [ ] **Selected variant clearly indicated**
  - Bold border
  - Checkmark
  - Color/size name restated

- [ ] **Price updates** per variant
  - If XL costs more, show immediately
  - No surprises at checkout

**Priority:** MEDIUM-HIGH (prevents cart abandonment)

**Expected impact:** +10-20% with visual selectors vs dropdowns

---

## Element 8: Quantity Selector

### Checklist

- [ ] **Visible + usable**
  - Not hidden in dropdown
  - +/- buttons (easier than typing)
  - Shows current quantity

- [ ] **Min/max enforced**
  - Min: Usually 1
  - Max: Stock limit or bulk limit
  - Error message if exceeded

- [ ] **Bulk discount shown** (if applicable)
  - "Buy 3, save 10%"
  - Updates price dynamically

**Priority:** LOW (most users buy 1)

**Expected impact:** +5-10% average order value with bulk discounts

---

## Element 9: Trust Signals

### Checklist

- [ ] **Security badges** (if payment info on page)
  - SSL certificate icon
  - Payment provider logos (Visa, Mastercard)
  - "Bezpečná platba" text

- [ ] **Return policy** linked
  - "30-day return guarantee"
  - Link to full policy

- [ ] **Warranty info** (if applicable)
  - "2-year warranty"
  - What's covered

- [ ] **Certifications** (if relevant)
  - Organic, Fair Trade, CE
  - Icons with tooltips

**Priority:** MEDIUM (builds trust, reduces anxiety)

**Expected impact:** +10-15% with visible guarantees

**Data:** Money-back guarantee: +25% sales (HBR)

---

## Element 10: Cross-Sell / Related Products

**See:** `practices/ecommerce.md` Practice #12 (AOV strategies)

### Checklist

- [ ] **"Frequently bought together"** section
  - 2-3 complementary products
  - Bundle discount shown
  - Quick add to cart

- [ ] **"Customers also viewed"** section
  - Alternative products
  - Below main content (not distracting)

- [ ] **"Complete the look"** (for fashion)
  - Styling suggestions
  - Add all to cart option

- [ ] **Not overwhelming**
  - Max 3-4 recommendations
  - Clear separation from main product

**Priority:** MEDIUM (increases AOV)

**Expected impact:** +15-25% AOV with relevant cross-sells

---

## Element 11: Call-to-Action Hierarchy

### Checklist

- [ ] **One primary CTA** (Add to Cart)
  - Largest button
  - Primary color
  - Most prominent

- [ ] **Secondary CTAs less prominent**
  - "Add to wishlist" (outline button)
  - "Compare" (text link)
  - "Share" (icon only)

- [ ] **No competing CTAs**
  - Don't show "Buy Now" AND "Add to Cart"
  - Choose one primary action

**Priority:** MEDIUM (reduces decision paralysis)

**Expected impact:** +10-15% with clear hierarchy

---

## Element 12: Mobile Optimization

**See:** `practices/mobile.md` for comprehensive mobile practices

### Checklist

- [ ] **Sticky Add to Cart** (mobile)
  - Button stays at bottom while scrolling
  - Always visible = +20-30% mobile conversion

- [ ] **Touch targets ≥44×44px**
  - Buttons, variant selectors, +/- quantity
  - Spacing between clickable elements

- [ ] **Images optimized**
  - WebP format
  - Lazy loading
  - Swipe gallery (not click)

- [ ] **Text readable** (min 16px)
  - No horizontal scrolling
  - Proper line spacing

- [ ] **Form fields mobile-friendly**
  - Large enough to tap
  - Correct keyboard (see `forms.md` Practice #6)

**Priority:** CRITICAL (50%+ traffic is mobile)

**Expected impact:** +30-50% mobile conversion

---

## Element 13: Page Load Speed

**See:** `practices/performance.md` for optimization techniques

### Checklist

- [ ] **Load time <3 seconds**
  - Test with PageSpeed Insights
  - Mobile AND desktop

- [ ] **Images optimized**
  - WebP format
  - Compressed
  - Lazy loading (except hero)

- [ ] **Core Web Vitals pass**
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1

**Priority:** HIGH (1-second delay = -7% conversion)

**Expected impact:** +10-20% per second improved

**Data:** Amazon: 100ms improvement = +1% revenue

---

## Element 14: SEO Fundamentals

### Checklist

- [ ] **Unique product title** (H1)
  - Not duplicate across products
  - Includes keywords

- [ ] **Meta description** (155-160 characters)
  - Unique per product
  - Compelling (encourages click)

- [ ] **Image alt text** descriptive
  - Not "IMG_1234.jpg"
  - "Modrý turistický batoh 40L, pohled zepředu"

- [ ] **Structured data** (Schema.org Product)
  - Product name, price, availability
  - Review ratings
  - Helps Google rich snippets

- [ ] **Clean URL**
  - ✅ `/batoh-north-explorer-40l-modry`
  - ❌ `/product.php?id=12345`

**Priority:** MEDIUM (long-term traffic)

**Expected impact:** +20-40% organic traffic over time

---

## Element 15: Breadcrumbs

### Checklist

- [ ] **Breadcrumb trail visible**
  - "Domů > Outdoorové vybavení > Batohy > North Explorer 40L"
  - Above product title

- [ ] **Clickable links** (except current page)
  - Easy navigation back to category

- [ ] **Structured data** (BreadcrumbList schema)
  - For SEO

**Priority:** LOW (nice to have)

**Expected impact:** +5-10% easier navigation

---

## Element 16: Accessibility

**See:** `practices/accessibility.md` and `legal-ux.md` Practice #20

### Checklist

- [ ] **Alt text on all images**
  - Descriptive (not "image")

- [ ] **Color contrast** (WCAG AA)
  - Text: 4.5:1 minimum
  - Buttons: 3:1 minimum

- [ ] **Keyboard navigable**
  - Tab through all interactive elements
  - Visible focus states

- [ ] **Labels on form elements**
  - Quantity selector
  - Variant dropdowns

- [ ] **Heading hierarchy** (H1 → H2 → H3)
  - Logical structure

**Priority:** MEDIUM (EAA compliance deadline June 2025)

**Expected impact:** Legal compliance + better UX for 15% population

---

## Element 17: Analytics & Testing Setup

### Checklist

- [ ] **Add-to-cart tracking**
  - Google Analytics event
  - Know which products add but don't convert

- [ ] **Scroll depth tracking**
  - How far users scroll before leaving

- [ ] **Click tracking** on key elements
  - CTA button
  - Photo zoom
  - Reviews section

- [ ] **A/B testing capability**
  - Ready to test variants
  - Traffic splitting implemented

**Priority:** MEDIUM (enables optimization)

**Expected impact:** Enables data-driven decisions

---

## Prioritization Matrix

After audit, prioritize fixes using Impact × Ease:

### Quick Wins (High Impact, Low Effort)

**Do immediately:**
- Add 2-3 more product photos (if <3)
- Enable zoom on photos
- Add availability status ("Skladem")
- Show shipping cost preview
- Add sticky "Add to Cart" on mobile
- Fix any mobile text <16px

**Expected combined impact:** +40-60% conversion

---

### High-Impact Projects (High Impact, Medium-High Effort)

**Plan for next sprint:**
- Collect + display customer reviews (if <3)
- Implement proper photo gallery (5-8 photos)
- Optimize page load speed (<3 seconds)
- Add multi-angle product photos
- Create size guide (for clothing)

**Expected combined impact:** +50-80% conversion

---

### Medium Priority (Medium Impact, Medium Effort)

**Month 2-3:**
- Add cross-sell recommendations
- Implement variant selector (visual, not dropdown)
- Create bulk discount display
- Add breadcrumbs
- Improve product description (features → benefits)

**Expected combined impact:** +20-30% conversion

---

### Low Priority (Low Impact OR High Effort)

**Ongoing optimization:**
- Structured data implementation
- Advanced analytics setup
- A/B testing framework
- Full accessibility audit

**Expected impact:** Long-term gains

---

## Testing Protocol

After implementing fixes, A/B test:

1. **Test one element at a time** (isolate impact)
2. **Minimum sample size:** 100 conversions per variant
3. **Duration:** 1-2 weeks minimum
4. **Metrics:**
   - Add-to-cart rate
   - Bounce rate
   - Time on page
   - Purchase completion rate

**See:** `practices/ab-testing.md` for complete methodology

---

## Summary Checklist

Use this for quick product page audit:

```
PHOTOS:
[ ] Min 3 photos (hero, angle, scale)
[ ] Zoom enabled (2x+)
[ ] Mobile swipe gallery

CONTENT:
[ ] Descriptive title with keywords
[ ] Price + availability prominent
[ ] Features → benefits translation
[ ] 3+ reviews with ratings

CTAs:
[ ] Large "Add to Cart" button (44×44px+)
[ ] Sticky on mobile
[ ] Success feedback (toast notification)

MOBILE:
[ ] Load time <3s
[ ] Text ≥16px
[ ] Touch targets ≥44×44px
[ ] Sticky Add to Cart

TRUST:
[ ] Reviews visible
[ ] Return policy linked
[ ] Security badges (if payment)

CONVERSION BOOSTERS:
[ ] Cross-sell recommendations
[ ] Variant selector (visual)
[ ] Bulk discounts (if applicable)

ACCESSIBILITY:
[ ] Alt text on images
[ ] Color contrast 4.5:1+
[ ] Keyboard navigable
```

---

**Product page audit complete.** Prioritize quick wins first, then tackle high-impact projects.

**Expected total impact:** +100-200% conversion with comprehensive optimization.
