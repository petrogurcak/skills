# E-commerce Optimization Practices

Based on case studies: Spa.cz (+21.5% orders), 680% revenue increase

---

## Practice #9: Product Photos (Min 3, Ideal 5-8)

**PROBLÉM:** 58% users want to see product from all sides. 20% return products because photo ≠ reality. 46% users start product exploration via photo gallery.

**ŘEŠENÍ:** Minimum 3 photos (feature, angle, scale). Ideal 5-8 with strategic sequencing.

### Research Data

**Shopify Study:**
- **0.52% lidí stačí jedna fotka** (only 0.52% find one photo sufficient)
- **58% lidí chce vidět produkt ze všech stran** (58% want to see all angles)

**Weebly Research:**
- **75% shoppers consider photos very important** in purchase decisions
- **Každý pátý respondent vracel produkt, protože fotka neodpovídala samotnému produktu** (1 in 5 returned items due to photo-reality mismatch)

**Baymard Institute:**
- **46% users begin product exploration through photo gallery** (not description)
- Photos are primary discovery tool, not secondary

---

### MINIMUM (3 fotky)

**Absolute minimum required:**

1. **Feature photo** - what it does/contains
   - White background preferred
   - Product centered, well-lit
   - Professional quality

2. **Angle photo** - different view (back, side, top)
   - Shows what hero photo doesn't reveal
   - Multiple perspectives build confidence

3. **Scale photo** - size reference (hand, ruler, context)
   - Prevents "bigger/smaller than expected" returns
   - See Practice #10 for scale reference details

---

### IDEAL (5-8 fotek)

**Strategic sequencing matters:**

#### Photo #1: Hero Shot (White Background)

**Purpose:** Professional, clean, traditional product view

**Requirements:**
- White/neutral background
- Centered, well-lit
- Highest resolution (zoom-worthy)
- Consistent across catalog (brand cohesion)

**Example:**
- Clothing: Front view, flat lay or on model
- Electronics: 45-degree angle showing screen/controls
- Furniture: Front-facing, full view

---

#### Photo #2: Lifestyle Image (Emotional Context)

**Purpose:** Help customers envision ownership

**Requirements:**
- Product **in realistic use** (not overly idealized)
- Context matches target customer environment
- Authentic (avoid stock photo feel)

**CAUTION:** "Vyvarujte se přehnaně idealizovaným reprezentacím, které neodrážejí typické uživatele"
- Don't show luxury mansion if targeting average consumers
- Show real people, not just models (diversity important)

**Example:**
- Coffee maker: On real kitchen counter, morning scene
- Backpack: Person wearing it hiking (real trail, not studio)
- Software: Real user working at desk (not staged)

**Impact:** Emotional connection drives +30-50% add-to-cart

---

#### Photo #3: Video OR 360° View (Optional but Powerful)

**Purpose:** Show product in motion, all angles simultaneously

**When positioned third (after hero + lifestyle):**
- Video performs strongest
- Users already have context (what it is + why they want it)
- Now want to see "how it works"

**Video Best Practices:**
- 15-30 seconds max
- Autoplay muted (user can unmute)
- Show key features in action
- Mobile-optimized

**360° Views:**
- Only for products where rotation adds value (shoes, furniture, tech)
- Requires specialized setup (turntable, camera rig)
- Not worth effort for simple items (books, flat items)

**Example:**
- Shoes: 360° spin shows all angles
- Vacuum: Video showing it cleaning carpet
- Blender: Video blending smoothie

---

#### Photos #4-6: Detail Shots (Zoom on Important Parts)

**Purpose:** Answer "what's the quality like?" question

**Clothing Details:**
- Seams (stitching quality)
- Fabric texture (close-up)
- Closures (zippers, buttons)
- Tags (care instructions, materials)

**Technical Items:**
- Ports/connectors
- Control panels
- Materials (metal, plastic, wood)
- Dimensions with measurements visible

**Benefit:** Reduces "quality uncertainty" returns

**Implementation:**
- Enable 2x-4x zoom on detail photos
- Show texture clearly (high resolution)

---

#### Photo #7: Before/After OR Feature Callouts

**Purpose:** Embed key benefits directly into gallery (many users don't scroll to description)

**Before/After:**
- Cleaning products: dirty → clean
- Skincare: before treatment → after
- Organization products: messy → organized

**Feature Callouts:**
- Annotated image with arrows pointing to features
- Text overlay: "Waterproof", "USB-C", "Adjustable"
- Visual faster than reading description

**Example:**
- Backpack photo with callouts: "Laptop pocket 15\"", "Water bottle holder", "Anti-theft zipper"

**Impact:** +20-30% feature awareness without requiring description scroll

---

#### Photo #8: User-Generated Content (UGC)

**Purpose:** Add credibility, show products across diverse body types/use cases

**Sources:**
- Customer submissions (Instagram, reviews)
- Incentivize with contests/discounts
- Curate for quality

**Requirements:**
- Real customers (not influencers with 100k followers)
- Diverse representation (body types, ages, contexts)
- Permission secured (legal compliance)

**Display:**
- Mixed into main gallery OR
- Separate "Customer Photos" section

**Impact:** +25-35% trust increase (Cialdini social proof)

**Example:**
- Clothing: 5 different body types wearing same item
- Furniture: 3 different home styles/decor
- Tech: Various use cases (office, travel, home)

---

### Photo Sequencing Strategy

**Order matters for conversion:**

| Position | Photo Type | Purpose |
|----------|-----------|---------|
| 1 | Hero (white background) | Professional trust, "what is it" |
| 2 | Lifestyle | Emotional connection, "why I want it" |
| 3 | Video OR 360° | "How it works", comprehensive view |
| 4-6 | Detail shots | Quality verification, texture/materials |
| 7 | Before/After OR Callouts | Benefit visualization without reading |
| 8+ | UGC OR Variants | Social proof, real-world validation |

---

### Common Mistakes

**Mistake #1: Only white-background photos**
- ❌ No emotional context
- ✅ Mix hero + lifestyle + details

**Mistake #2: Overly idealized lifestyle**
- ❌ Luxury mansion when targeting middle-class
- ✅ Realistic context matching target customer

**Mistake #3: Low resolution (can't zoom)**
- ❌ Users can't verify quality
- ✅ Min 2x zoom on all photos

**Mistake #4: No scale reference**
- ❌ "It looked bigger in photos" returns
- ✅ Include ruler, hand, or person in frame

**Mistake #5: All photos same angle**
- ❌ Doesn't satisfy "58% want all angles"
- ✅ Front, back, side, top views

**Mistake #6: Stock photos only**
- ❌ Generic, low trust
- ✅ Mix professional + UGC for authenticity

---

### Technical Optimization

**File Format:**
- WebP for modern browsers (30-50% smaller than JPEG)
- JPEG fallback for legacy browsers
- Lazy loading (load on scroll)

**Image Size:**
- Hero: 2000×2000px (zoom-worthy)
- Details: 1500×1500px
- Thumbnails: 300×300px

**Mobile Optimization:**
- Swipe gallery (not click-through)
- Pinch-to-zoom enabled
- Vertical scroll for full gallery (horizontal harder on mobile)

**Loading Strategy:**
```javascript
// Load hero + lifestyle first, lazy-load rest
<img src="hero.webp" loading="eager" />
<img src="lifestyle.webp" loading="eager" />
<img src="detail1.webp" loading="lazy" />
<img src="detail2.webp" loading="lazy" />
```

---

### OČEKÁVANÝ DOPAD

**Baseline → Optimized:**
- 1-2 photos → 5-8 photos: **+20-40% add-to-cart rate**
- No lifestyle → Lifestyle included: **+30-50% emotional engagement**
- No UGC → UGC included: **+25-35% trust**
- Low res → High res (zoom): **+15-25% quality confidence**

**Combined:** +60-100% total improvement possible

---

### CHECKLIST

**Minimum viable (every product):**
- [ ] Min. 3 photos (hero, angle, scale)
- [ ] 2x zoom available on all photos
- [ ] Mobile-optimized gallery (swipe)
- [ ] Fast loading (WebP + lazy load)

**Ideal (high-value products):**
- [ ] 5-8 photos including lifestyle
- [ ] Video or 360° view at position 3
- [ ] Detail shots (zoom 4x)
- [ ] Before/after OR feature callouts
- [ ] UGC included or solicited
- [ ] Diverse representation (body types, contexts)

**Technical:**
- [ ] Hero images min 2000×2000px
- [ ] WebP format with JPEG fallback
- [ ] Lazy loading enabled
- [ ] Alt text for SEO/accessibility
- [ ] Consistent lighting/style across catalog

---

## Practice #10: Photo Scale Reference

**PROBLÉM:** Users don't know how big product is.

**ŘEŠENÍ:** Show product next to known object (hand, coin, ruler, person).

**IMPLEMENTACE:**
- Small items: next to coin, ruler, hand
- Medium: on body, with person
- Large: in room, next to door

**OČEKÁVANÝ DOPAD:** +15-25% conversion, -20% returns

---

## Practice #11: Cart Confirmation

**PROBLÉM:** User doesn't know if item added to cart.

**ŘEŠENÍ:** Clear visual feedback (toast notification OR slide-in mini-cart).

**KÓD:**
```javascript
function addToCart(product) {
  cart.add(product);

  // Show toast
  showToast({
    icon: '✅',
    title: 'Přidáno do košíku',
    message: product.name,
    actions: [
      { label: 'Pokračovat', action: 'close' },
      { label: 'Košík', action: () => window.location = '/kosik' }
    ],
    duration: 5000
  });

  // Animate cart icon
  cartIcon.classList.add('pulse');
  updateCartCount();
}
```

**OČEKÁVANÝ DOPAD:** +10-20% cart completion

**CHECKLIST:**
- [ ] Immediate feedback (< 100ms)
- [ ] Visual confirmation
- [ ] Cart count updated
- [ ] Option to view cart or continue
- [ ] Works on mobile

---

## Practice #12: AOV (Average Order Value) Strategies

**PROBLÉM:** Low average order value.

**ŘEŠENÍ:** 4 strategies to increase AOV.

**Strategy #1: Free Shipping Threshold**
```html
<div class="free-shipping-progress">
  <p>Přidej zboží za <strong>147 Kč</strong> a získáš
    <strong>dopravu zdarma</strong>
  </p>
  <div class="progress-bar">
    <div class="progress" style="width: 85%"></div>
  </div>
  <p>853 Kč / 1 000 Kč</p>
</div>
```

**Strategy #2: Bundles**
```
Zvlášť: 2 180 Kč
Spolu: 1 853 Kč
Ušetříš: 327 Kč (15%)
```

**Strategy #3: Cross-sell in Cart**
"Zákazníci také koupili..." with quick add button

**Strategy #4: Quantity Discounts**
- 1 ks = 290 Kč
- 3 ks = 261 Kč/ks (ušetříš 10%)
- 5 ks = 247 Kč/ks (ušetříš 15%)

**OČEKÁVANÝ DOPAD:** +15-35% AOV

**A/B TEST:**
- Baseline: Current AOV
- Test one strategy at a time
- Measure: AOV, cart abandonment

**CHECKLIST:**
- [ ] Free shipping threshold calculated (1.5× avg shipping cost)
- [ ] Cross-sell relevant (not random)
- [ ] Bundles save min 10%
- [ ] Progress bars update real-time

---

## Summary

**4 E-commerce Practices:**
1. **Product photos** (+20-40%) - Min 3, ideal 5-8 with zoom
2. **Scale reference** (+15-25%) - Show size clearly
3. **Cart confirmation** (+10-20%) - Immediate feedback
4. **AOV strategies** (+15-35%) - Free shipping, bundles, cross-sell

**Total potential:** +60-120% improvement

**Priority (ICE):**
1. Product photos (high impact, medium effort)
2. Cart confirmation (medium impact, low effort)
3. AOV strategies (high impact, medium effort)
4. Scale reference (medium impact, low effort)

**Next:** See practices/design.md for design optimization
