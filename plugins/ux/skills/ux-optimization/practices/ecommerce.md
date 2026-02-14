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

| Position | Photo Type               | Purpose                                 |
| -------- | ------------------------ | --------------------------------------- |
| 1        | Hero (white background)  | Professional trust, "what is it"        |
| 2        | Lifestyle                | Emotional connection, "why I want it"   |
| 3        | Video OR 360°            | "How it works", comprehensive view      |
| 4-6      | Detail shots             | Quality verification, texture/materials |
| 7        | Before/After OR Callouts | Benefit visualization without reading   |
| 8+       | UGC OR Variants          | Social proof, real-world validation     |

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
    icon: "✅",
    title: "Přidáno do košíku",
    message: product.name,
    actions: [
      { label: "Pokračovat", action: "close" },
      { label: "Košík", action: () => (window.location = "/kosik") },
    ],
    duration: 5000,
  });

  // Animate cart icon
  cartIcon.classList.add("pulse");
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
  <p>
    Přidej zboží za <strong>147 Kč</strong> a získáš
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

## Practice #76: Money Back Guarantee & Risk Reversal

**PROBLEM:** Users hesitate at checkout due to purchase anxiety. Fear of making a wrong decision is a top conversion killer.

**RESENI:** Prominently display guarantee near CTA and in cart. Remove risk from the buyer's decision.

**Reference:** GoodUI pattern #103, tested on Reverb.com

### Types of Risk Reversal

1. **Money-back guarantee** - Full refund within X days (30 days standard, 60-90 for premium)
2. **Free returns** - No-cost return shipping (reduces #1 purchase barrier)
3. **Satisfaction guarantee** - "Love it or your money back"
4. **Try before you buy** - Ship now, charge later (Warby Parker model)
5. **Price match guarantee** - "Find it cheaper, we'll match"

### Placement Guidelines

**Near CTA (most critical):**

- Directly below or beside "Add to Cart" / "Buy Now"
- Small badge or text line, not a full paragraph
- Visible without scrolling on product page

**In cart:**

- Below order summary
- Reinforces decision before payment

**Checkout page:**

- Near payment form (reduces "entering credit card" anxiety)
- Small trust badge row: guarantee + secure payment + reviews

### Research Data

- **+17% paid accounts** (GoodUI data story #20, Reverb.com test)
- **General: +10-20% conversion** across e-commerce studies
- **Baymard:** 17% of users abandon cart due to trust/security concerns
- **Returns rarely increase** - guarantee increases purchases more than it increases returns

### KOD

```html
<!-- Guarantee badge component -->
<div class="guarantee-badge">
  <svg class="guarantee-icon" viewBox="0 0 24 24">
    <path
      d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
    />
    <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#fff" />
  </svg>
  <div class="guarantee-text">
    <strong>30denni garance vraceni penez</strong>
    <span>Nejste spokojeni? Vracime penize bez otazek.</span>
  </div>
</div>
```

```css
.guarantee-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  margin-top: 12px;
}

.guarantee-icon {
  width: 32px;
  height: 32px;
  fill: #16a34a;
  flex-shrink: 0;
}

.guarantee-text strong {
  display: block;
  font-size: 14px;
  color: #15803d;
}

.guarantee-text span {
  font-size: 13px;
  color: #166534;
}
```

### OCEKAVANY DOPAD

- **Conversion:** +10-20%
- **Cart abandonment:** -10-15%
- **Trust perception:** significant increase
- **Return rate:** minimal change (< 2% increase typical)

### CHECKLIST

- [ ] Guarantee badge visible near primary CTA on product page
- [ ] Guarantee mentioned in cart / checkout
- [ ] Clear terms (duration, conditions) linked but not blocking
- [ ] Trust badge row at checkout (guarantee + secure + reviews)
- [ ] A/B test: with vs without guarantee badge
- [ ] Monitor return rate post-implementation (should stay stable)

---

## Practice #77: Sticky/Floating Buy Box

**PROBLEM:** On long product pages, "Add to Cart" scrolls out of view. Users who decide to buy mid-page must scroll back up.

**RESENI:** Keep "Add to Cart" visible at all times while scrolling product page.

**Reference:** GoodUI #41 (Sticky CTA), Amazon tests floating product nav

### Implementation Patterns

**Mobile: Bottom sticky bar**

- Fixed bar at bottom of screen
- Shows: product price + "Add to Cart" button
- Appears when original CTA scrolls out of viewport
- Hides when original CTA is visible (avoid duplication)

**Desktop: Sidebar that follows scroll**

- Product info box (image thumbnail, title, price, CTA) sticks to top of sidebar
- Uses `position: sticky` with `top: 20px`
- Natural feel, not intrusive

**Desktop alternative: Top sticky bar**

- Thin bar at top with product name + price + CTA
- Appears on scroll past original CTA
- Similar to Amazon's approach

### KOD

```css
/* Mobile: Bottom sticky bar */
.sticky-buy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.sticky-buy-bar.visible {
  transform: translateY(0);
}

.sticky-buy-bar .price {
  font-size: 20px;
  font-weight: 700;
}

.sticky-buy-bar .btn-add-to-cart {
  padding: 12px 24px;
  background: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
}

/* Desktop: Sticky sidebar */
.product-sidebar {
  position: sticky;
  top: 20px;
  align-self: flex-start;
}
```

```javascript
// Show/hide sticky bar based on original CTA visibility
const originalCTA = document.querySelector(".product-cta-section");
const stickyBar = document.querySelector(".sticky-buy-bar");

const observer = new IntersectionObserver(
  ([entry]) => {
    stickyBar.classList.toggle("visible", !entry.isIntersecting);
  },
  { threshold: 0 },
);

observer.observe(originalCTA);
```

### OCEKAVANY DOPAD

- **Add-to-cart:** +10-25% (especially on long product pages)
- **Mobile impact:** higher than desktop (more scrolling)
- **Time to purchase:** -15-20% (less scrolling back)

### CHECKLIST

- [ ] Sticky bar appears only when original CTA is out of view
- [ ] Price clearly visible in sticky bar
- [ ] CTA button large enough for thumb (min 48px height)
- [ ] Does not cover important content
- [ ] Smooth show/hide transition (no jarring pop-in)
- [ ] Test on both mobile and desktop
- [ ] Ensure it doesn't conflict with cookie banners or chat widgets

---

## Practice #78: In-Stock / Out-of-Stock Display

**PROBLEM:** Users don't know if product is available. Unclear stock status causes frustration and abandonment.

**RESENI:** Clear stock status indicators with appropriate urgency cues and alternatives for unavailable items.

**Reference:** GoodUI #90

### Display Patterns

**In stock (abundant):**

- Green badge: "Skladem" / "In Stock"
- Optional: estimated delivery date
- Clean, simple, no urgency needed

**Low stock (real urgency):**

- Orange/amber: "Posledni 3 kusy" / "Only 3 left"
- MUST be real data (fake urgency destroys trust permanently)
- Show only when stock < threshold (e.g., < 5 units)

**Out of stock:**

- Red/gray: "Vyprodano" / "Out of Stock"
- Replace CTA with "Back-in-stock notification" signup
- Show alternatives: "Similar products" or "Other sizes available"

**Pre-order:**

- Blue badge: "Predprodej" / "Pre-order"
- Expected availability date
- Clear that payment is now, delivery later

### Back-in-Stock Notification

```html
<div class="out-of-stock-section">
  <span class="stock-badge stock-out">Vyprodano</span>
  <div class="notify-form">
    <p>Chcete vedet, az bude opet skladem?</p>
    <form class="notify-signup">
      <input type="email" placeholder="vas@email.cz" required />
      <button type="submit">Upozornit me</button>
    </form>
  </div>
</div>
```

```css
.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
}

.stock-in {
  background: #f0fdf4;
  color: #16a34a;
}
.stock-low {
  background: #fffbeb;
  color: #d97706;
}
.stock-out {
  background: #fef2f2;
  color: #dc2626;
}
.stock-preorder {
  background: #eff6ff;
  color: #2563eb;
}
```

### OCEKAVANY DOPAD

- **Conversion with stock visibility:** +5-15%
- **Low-stock urgency (real):** +10-20% purchase speed
- **Back-in-stock emails:** 10-15% conversion rate (high intent)
- **Reduced frustration:** fewer "add to cart" attempts on unavailable items

### CHECKLIST

- [ ] Stock status visible on product page near CTA
- [ ] Color-coded badges (green/orange/red)
- [ ] Low stock threshold defined and uses REAL data
- [ ] Out-of-stock shows alternatives + notification signup
- [ ] Stock status visible in search results / category pages
- [ ] Real-time stock updates (no stale cache showing "in stock" for sold-out items)

---

## Practice #79: Cart Reminder & Recently Viewed

**PROBLEM:** Users leave and forget what they were looking at. Cart contents lost between sessions.

**RESENI:** Persistent cart state and "recently viewed" sections to bring users back to products they showed interest in.

**Reference:** GoodUI #26

### Implementation Patterns

**Persistent cart:**

- Save cart to localStorage + server-side (logged-in users)
- Cart survives browser close, device switch (if logged in)
- Show "You have X items in your cart" on return visit

**Recently viewed section:**

- Track last 10-20 viewed products
- Display on: homepage, category pages, cart page, 404 page
- Horizontal scrollable row with product cards
- Store in localStorage (or server for logged-in)

**Abandoned cart recovery:**

- On-site: "You left items in your cart" banner on return visit
- Email: Send reminder after 1h, 24h, 72h (3-email sequence)
- Include product images + direct "Return to cart" link

### KOD

```javascript
// Recently viewed - localStorage approach
const RECENTLY_VIEWED_KEY = "recently_viewed";
const MAX_ITEMS = 20;

function addToRecentlyViewed(product) {
  const items = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");

  // Remove if already exists (move to front)
  const filtered = items.filter((item) => item.id !== product.id);

  // Add to beginning
  filtered.unshift({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    url: product.url,
    viewedAt: Date.now(),
  });

  // Keep max items
  localStorage.setItem(
    RECENTLY_VIEWED_KEY,
    JSON.stringify(filtered.slice(0, MAX_ITEMS)),
  );
}

function getRecentlyViewed(limit = 10) {
  const items = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
  return items.slice(0, limit);
}
```

### OCEKAVANY DOPAD

- **Return purchase rate:** +10-20%
- **Abandoned cart email recovery:** 5-15% of abandoned carts recovered
- **Recently viewed clicks:** 3-8% CTR (high-intent traffic)
- **Session continuity:** +15-25% return visit engagement

### CHECKLIST

- [ ] Cart persists across sessions (localStorage + server)
- [ ] "Recently viewed" section on homepage and category pages
- [ ] Recently viewed shows max 10 items, most recent first
- [ ] Abandoned cart email sequence set up (1h, 24h, 72h)
- [ ] Return visit banner: "You have X items in your cart"
- [ ] Works across devices for logged-in users

---

## Practice #80: Smart Search & Auto-Suggest

**PROBLEM:** Site search is often broken: no results for typos, no suggestions, poor ranking. Yet searchers convert 2-3x more than browsers.

**RESENI:** Instant search with auto-suggestions, typo tolerance, and product thumbnails in dropdown.

**Reference:** GoodUI #98 (Auto Suggest)

### Key Features

1. **Instant results as you type** - Show results after 2-3 characters
2. **Product thumbnails in dropdown** - Image + title + price
3. **Typo tolerance** - "iphne" finds "iPhone"
4. **Synonyms** - "laptop" also finds "notebook"
5. **Popular/trending searches** - Show on empty focus
6. **Category suggestions** - "shoes" suggests "Men's shoes", "Running shoes"
7. **Zero-results page** - Never a dead end: show popular products, categories, search tips

### KOD

```html
<div class="search-container">
  <input
    type="search"
    class="search-input"
    placeholder="Hledat produkty..."
    autocomplete="off"
    role="combobox"
    aria-expanded="false"
    aria-controls="search-results"
  />
  <div id="search-results" class="search-dropdown" role="listbox">
    <!-- Populated by JS -->
  </div>
</div>
```

```css
.search-container {
  position: relative;
  max-width: 600px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #3b82f6;
  outline: none;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  display: none;
  z-index: 200;
}

.search-dropdown.active {
  display: block;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-result-item:hover {
  background: #f9fafb;
}

.search-result-item img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}
```

```javascript
// Debounced search input
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".search-dropdown");
let debounceTimer;

searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  const query = e.target.value.trim();

  if (query.length < 2) {
    dropdown.classList.remove("active");
    return;
  }

  debounceTimer = setTimeout(async () => {
    const results = await fetchSearchResults(query);
    renderDropdown(results, dropdown);
    dropdown.classList.add("active");
  }, 200); // 200ms debounce
});
```

### OCEKAVANY DOPAD

- **Search conversion:** +15-30% (searchers already have high intent)
- **Search usage:** +20-40% when auto-suggest is present
- **Zero-results rate:** -50% with typo tolerance + synonyms
- **Key insight:** Searchers convert 2-3x more than browsers -- invest in search

### CHECKLIST

- [ ] Auto-suggest appears after 2-3 characters
- [ ] Product thumbnails + prices in dropdown
- [ ] Typo tolerance enabled
- [ ] Synonym mapping for common terms
- [ ] Popular searches shown on empty focus
- [ ] Zero-results page has suggestions (not dead end)
- [ ] Debounced input (200-300ms)
- [ ] Mobile-friendly (full-width dropdown, large touch targets)
- [ ] Keyboard navigation (arrow keys + Enter)
- [ ] Analytics: track search queries, zero-result queries, search-to-purchase

---

## Practice #81: Recommending (Choice Architecture)

**PROBLEM:** Too many options cause choice paralysis (Hick's Law). Users can't decide which product/plan to pick and leave.

**RESENI:** Guide users with "Recommended" / "Most Popular" / "Best Value" badges and limit visible options.

**Reference:** GoodUI #7

### Principles

1. **Highlight one option** as recommended (social proof + default effect)
2. **Limit visible choices** - Max 3-4 options side by side (Hick's Law)
3. **Use anchoring** - Show expensive option first to make middle feel reasonable
4. **Label clearly** - "Most Popular" (social proof), "Best Value" (savings), "Recommended" (authority)

### Implementation Patterns

**Pricing page:**

- 3 tiers: Basic / Pro (recommended) / Enterprise
- "Most Popular" badge on middle tier
- Middle tier visually elevated (larger card, border highlight)

**Product listing:**

- "Best Seller" badge on top-selling items
- "Staff Pick" or "Editor's Choice" for curated recommendations
- Sort by "Recommended" as default (not "Newest")

**Category page:**

- Limit initial display to top 3-4 products
- "Show more" for full catalog
- Default sort = "Recommended" (not alphabetical)

### KOD

```html
<!-- Recommended badge on pricing card -->
<div class="pricing-card recommended">
  <span class="badge-recommended">Nejoblibenejsi</span>
  <h3>Pro</h3>
  <div class="price">499 Kc/mes</div>
  <ul class="features">
    ...
  </ul>
  <button class="btn-primary">Vybrat Pro</button>
</div>
```

```css
.pricing-card {
  padding: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
}

.pricing-card.recommended {
  border: 2px solid #ff6b00;
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(255, 107, 0, 0.15);
  position: relative;
}

.badge-recommended {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff6b00;
  color: #fff;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
```

### OCEKAVANY DOPAD

- **Selection speed:** +15-25% (users decide faster)
- **Conversion on recommended item:** +10-20%
- **Decision abandonment:** -20-30% (fewer "I'll decide later" exits)
- **Hick's Law:** Reducing from 8 to 3 options can double conversion

### CHECKLIST

- [ ] One option clearly marked as "Recommended" / "Most Popular"
- [ ] Max 3-4 options visible at once
- [ ] Recommended option visually elevated (border, size, position)
- [ ] Badge text uses social proof ("Most Popular") not just "Recommended"
- [ ] Default sort = "Recommended" (not newest/alphabetical)
- [ ] A/B test: with vs without recommendation badge

---

## Practice #82: Product Comparison

**PROBLEM:** Users comparing products across tabs waste time and often abandon. Complex products need side-by-side comparison to build purchase confidence.

**RESENI:** Built-in comparison tool with limited key attributes, difference highlighting, and "Best for..." labels.

**Reference:** GoodUI #57 (Friendly Comparisons)

### Design Principles

1. **Limit attributes** - Show 5-7 key differentiators, not 30+ specs
2. **Highlight differences** - Bold or color-code what's different between products
3. **"Best for..." labels** - "Best for beginners", "Best for professionals", "Best value"
4. **Don't overwhelm** - Max 3-4 products in comparison at once
5. **Pre-select popular comparison** - "Compare with similar" auto-fills common comparisons

### Implementation Patterns

**Comparison table:**

- Sticky header with product names/images
- Rows = attributes, columns = products
- Highlight cells where products differ
- "Remove" button per product, "Add product" to fill empty slot

**Mobile-friendly comparison:**

- Swipeable columns (1-2 visible at a time)
- Sticky first column (attribute names)
- Collapsible attribute groups

### KOD

```html
<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>
          <img src="product-a.jpg" alt="Product A" />
          <span>Product A</span>
          <span class="comp-badge">Nejlepsi hodnota</span>
          <span class="comp-price">1 290 Kc</span>
        </th>
        <th>
          <img src="product-b.jpg" alt="Product B" />
          <span>Product B</span>
          <span class="comp-badge best-for">Pro profi</span>
          <span class="comp-price">2 490 Kc</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Baterie</td>
        <td>8 hodin</td>
        <td class="highlight">12 hodin</td>
      </tr>
      <tr>
        <td>Hmotnost</td>
        <td class="highlight">180 g</td>
        <td>250 g</td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.comparison-table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
}

.comparison-table th {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.comparison-table td:first-child {
  text-align: left;
  font-weight: 500;
  color: #6b7280;
  position: sticky;
  left: 0;
  background: #fff;
}

.highlight {
  background: #f0fdf4;
  font-weight: 600;
  color: #16a34a;
}

.comp-badge {
  display: block;
  background: #ff6b00;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 4px;
}

.comp-badge.best-for {
  background: #3b82f6;
}
```

### OCEKAVANY DOPAD

- **Purchase confidence:** +10-15%
- **Time on site:** +20-30% (engaged comparison vs tab switching)
- **Conversion (complex products):** +5-15%
- **Return rate:** -5-10% (better informed decisions)

### CHECKLIST

- [ ] Comparison limited to 5-7 key attributes
- [ ] Differences highlighted (color/bold)
- [ ] "Best for..." label on each product
- [ ] Max 3-4 products in comparison
- [ ] Mobile-friendly (swipeable columns)
- [ ] Sticky header with product images
- [ ] "Add to cart" button accessible from comparison view
- [ ] Pre-suggested comparisons ("Compare with similar products")

---

## Summary

**11 E-commerce Practices:**

1. **Product photos** (+20-40%) - Min 3, ideal 5-8 with zoom
2. **Scale reference** (+15-25%) - Show size clearly
3. **Cart confirmation** (+10-20%) - Immediate feedback
4. **AOV strategies** (+15-35%) - Free shipping, bundles, cross-sell
5. **Money back guarantee** (+10-20%) - Risk reversal near CTA
6. **Sticky buy box** (+10-25%) - Keep CTA visible while scrolling
7. **Stock display** (+5-15%) - Clear in-stock/out-of-stock indicators
8. **Cart reminder & recently viewed** (+10-20%) - Persistent state, return engagement
9. **Smart search** (+15-30%) - Auto-suggest, typo tolerance, thumbnails
10. **Recommending** (+10-20%) - Choice architecture, "Most Popular" badges
11. **Product comparison** (+10-15%) - Side-by-side with key differences

**Total potential:** +135-265% improvement

**Priority (ICE):**

1. Product photos (high impact, medium effort)
2. Cart confirmation (medium impact, low effort)
3. AOV strategies (high impact, medium effort)
4. Scale reference (medium impact, low effort)
5. Money back guarantee (high impact, low effort)
6. Smart search (high impact, high effort)
7. Sticky buy box (medium impact, low effort)
8. Recommending (medium impact, low effort)
9. Stock display (medium impact, low effort)
10. Cart reminder & recently viewed (medium impact, medium effort)
11. Product comparison (medium impact, high effort)

**Next:** See practices/design.md for design optimization
