# Checkout Expert Review Template

**Duration:** ~30-45 minutes
**Sections:** 8 key elements (cart summary through mobile checkout)
**Outcome:** Prioritized action list with expected impact

**Reference data:** Baymard Institute research (avg 11.3 form fields, 22% abandon from complexity, 78% mobile checkouts rated poor)

---

## SETUP PHASE

**Expert asks these questions first:**

### 1. Business Context
- **"Jaky typ checkoutu pouzivas?"**
  - [ ] Single-page checkout
  - [ ] Multi-step checkout
  - [ ] One-click (returning customers)
  - [ ] Guest checkout available
  - [ ] Other: _______________

### 2. Current Metrics
- **"Jaka jsou tvoje cisla?"**
  - Cart-to-checkout rate: ____%
  - Checkout completion rate: ____%
  - Cart abandonment rate: ____%
  - Average order value: $____
  - Mobile vs desktop split: ____% / ____%

### 3. Payment & Shipping
- **"Jaky je tvuj payment a shipping setup?"**
  - Payment methods: [ ] Card  [ ] PayPal  [ ] Apple Pay  [ ] Google Pay  [ ] Bank transfer  [ ] Other
  - Shipping options: [ ] Free threshold  [ ] Flat rate  [ ] Real-time carrier  [ ] Local pickup
  - International shipping: [ ] Yes  [ ] No

### 4. Known Issues
- **"Kde vidis nejvetsi problemy?"**
  - Top drop-off point: _______________
  - Common support tickets: _______________
  - Return/refund reasons: _______________

**-> Expert loads checkout-specific checklist based on answers**

---

## SECTION-BY-SECTION REVIEW

### Section 1: Cart Summary

**User provides:**
```
Cart display: [ ] Sidebar  [ ] Full page  [ ] Inline accordion
Item info shown: [ ] Image  [ ] Name  [ ] Price  [ ] Quantity  [ ] Variant  [ ] Remove
Edit ability: [ ] Quantity change  [ ] Remove item  [ ] Change variant
```

**Expert evaluates:**

**Checklist:**
- [ ] Product thumbnail visible (min 60x60px)
- [ ] Item name links back to product page
- [ ] Price per item clearly shown
- [ ] Quantity editable inline (no page reload)
- [ ] Remove option visible (not hidden in dropdown)
- [ ] Variant details shown (size, color, etc.)
- [ ] Subtotal updates in real-time
- [ ] Empty cart state handled gracefully

**Challenge questions:**
1. "Muze uzivatel upravit objednavku BEZ opusteni checkoutu?"
2. "Co se stane kdyz zmeni mnozstvi - musi cekat na reload?"
3. "Vidi jasne CO kupuje vcetne varianty?"

**Common mistakes:**
- No product image (user uncertainty +23% abandonment)
- Quantity change requires page reload (friction)
- Hidden remove button (frustration)
- No link back to product (can't verify details)
- Missing variant info (wrong size shipped = return)

**Data to cite:**
- Baymard: 18% abandon because "I couldn't see/calculate total order cost up-front"
- Cart with thumbnails: +8% completion rate (UXPin study)
- Real-time cart updates: +12% checkout initiation (Shopify data)

**Expected impact of fixing:** +8-18% checkout completion

---

### Section 2: Form Fields

**User provides:**
```
Total field count: ____
Required fields: ____
Fields list: _________________
Autofill support: [ ] Yes  [ ] Partial  [ ] No
```

**Expert evaluates:**

**Checklist:**
- [ ] Minimum fields necessary (target: 7-8, Baymard optimal)
- [ ] Single column layout (not side-by-side)
- [ ] Labels above fields (not placeholder-only)
- [ ] Autofill attributes present (autocomplete="given-name" etc.)
- [ ] Name as single field OR first/last with clear labels
- [ ] Phone field has country code auto-detected
- [ ] Address autocomplete (Google Places or similar)
- [ ] Optional fields clearly marked (not required marked)
- [ ] Tab order logical
- [ ] Smart defaults (country from IP, etc.)

**Challenge questions:**
1. "Kolik poli je OPRAVDU nutnych pro prvni objednavku?"
2. "Pouzivas autofill atributy? Baymard rika ze 60% uzivatelu ocekava autofill"
3. "Proc potrebujes [specific field]? Muzes to ziskat pozdeji?"

**Common mistakes:**
- Too many fields (avg 11.3, optimal 7-8 = 22% abandon from complexity)
- Placeholder-only labels (disappear on focus)
- Missing autofill attributes (60% users expect it)
- Phone field without explanation WHY (14% abandon - Baymard)
- Side-by-side fields on mobile (touch targets too small)
- Required marking instead of optional marking

**Data to cite:**
- Baymard Institute: Average checkout has 11.3 fields, optimal is 7-8
- Each additional field: -5-10% conversion
- 22% abandon because checkout process was too long/complicated
- 14% abandon when phone field has no explanation
- Autofill reduces form time by 30% (Google Chrome data)

**If too many fields:**
"Mas [N] poli. Baymard optimum je 7-8. Kazde dalsi pole = -5-10% konverze.

**Quick wins:**
1. Remove company name (unless B2B) -> +5%
2. Single address line + autocomplete -> +8%
3. Remove phone OR explain why needed -> +14%

**Expected impact:** +15-25% from field reduction alone."

**Expected impact of fixing:** +15-25% checkout completion

---

### Section 3: Trust & Security

**User provides:**
```
Trust signals present: [ ] SSL badge  [ ] Payment icons  [ ] Money-back guarantee  [ ] Security text
Location of trust signals: _________________
```

**Expert evaluates:**

**Checklist:**
- [ ] SSL/security badge near payment form
- [ ] Payment method icons visible (Visa, MC, PayPal, etc.)
- [ ] Money-back guarantee prominent
- [ ] "Secure checkout" text/icon in header
- [ ] Privacy reassurance near email field
- [ ] Trust badges from known providers (Norton, McAfee, etc.)
- [ ] Return policy visible or linked
- [ ] Contact info accessible (phone, chat)

**Challenge questions:**
1. "Vidim duvod proc ti verit se svymi penezi?"
2. "Kde presne jsou trust signaly ve vztahu k payment formu?"
3. "Ma uzivatel moznost se na neco zeptat kdyz si neni jisty?"

**Common mistakes:**
- Trust badges in footer (too far from decision point)
- Generic "safe & secure" without visual badge
- No money-back guarantee visible during checkout
- Missing payment icons (user doesn't know if their card works)
- No live chat/phone for hesitant buyers

**Data to cite:**
- Baymard: 18% abandon because "I didn't trust the site with my credit card information"
- Trust badge near payment form: +42% conversion (Blue Fountain Media)
- Money-back guarantee: +32% willingness to purchase (ConversionXL)
- Visible phone number: +52% trust (KoMarketing)

**If trust signals missing/misplaced:**
"18% uzivatelu opusti checkout protoze NEDUVERI webu s kreditni kartou (Baymard).

**Fix priority:**
1. SSL badge VEDLE payment formu (ne ve footeru) -> +42%
2. Payment icons above form fields -> immediate trust
3. Money-back guarantee badge -> +32%
4. Live chat widget -> safety net for hesitant buyers

**Proximity rule:** Trust signals must be within visual proximity of the payment form. Footer placement = invisible."

**Expected impact of fixing:** +18-42% conversion

---

### Section 4: Shipping & Delivery

**User provides:**
```
Shipping options: _________________
Delivery time shown: [ ] Yes  [ ] No
Free shipping: [ ] Yes, threshold $____  [ ] No  [ ] All orders
Shipping cost visible: [ ] Before checkout  [ ] During checkout  [ ] After address entry
```

**Expert evaluates:**

**Checklist:**
- [ ] Shipping costs visible BEFORE checkout (no surprises)
- [ ] Expected delivery dates shown (not just "3-5 business days")
- [ ] Free shipping threshold clearly communicated
- [ ] Multiple shipping options with clear price/speed trade-off
- [ ] Progress toward free shipping shown ("$12 more for free shipping")
- [ ] International shipping clearly handled
- [ ] Local pickup option (if applicable)
- [ ] Real-time carrier rates (if variable)

**Challenge questions:**
1. "Kdy presne uzivatel zjisti cenu dopravy? Pred nebo PO vyplneni formulare?"
2. "Ukazujes konkretni datum doruceni nebo jen 'do 5 dnu'?"
3. "Jak komunikujes free shipping threshold? Vidi uzivatel kolik mu chybi?"

**Common mistakes:**
- Hidden shipping costs (revealed late = #1 abandonment reason)
- Vague delivery times ("3-5 business days" vs "Arrives by Thursday, Feb 20")
- No free shipping progress indicator
- Shipping cost surprise at final step
- Missing expedited option for urgent buyers

**Data to cite:**
- Baymard: 48% abandon because "extra costs too high" (shipping, tax, fees)
- Hidden shipping costs = #1 reason for cart abandonment globally
- Free shipping threshold indicator: +26% AOV (UPS study)
- Concrete delivery dates: +22% conversion vs vague timeframes (Amazon data)

**If shipping costs hidden:**
"Skryte naklady na dopravu jsou CISLO JEDNA duvod pro opusteni kosiku (48% - Baymard).

**Fix immediately:**
1. Show shipping estimate on product page or cart
2. Show concrete delivery date ('Doruceno do ctvrtka 20.2.')
3. Free shipping progress bar ('Jeste $12 do dopravy zdarma')

**Math:**
- 48% abandonment from hidden costs
- Even showing $5 shipping upfront is better than surprising with $5 at checkout
- Users accept shipping cost when EXPECTED, not when SURPRISED"

**Expected impact of fixing:** +22-48% checkout completion

---

### Section 5: Payment

**User provides:**
```
Payment methods: [ ] Credit card  [ ] PayPal  [ ] Apple Pay  [ ] Google Pay  [ ] Bank transfer  [ ] BNPL  [ ] Other
Saved cards: [ ] Yes  [ ] No
Express checkout: [ ] Above fold  [ ] Below fold  [ ] Not available
```

**Expert evaluates:**

**Checklist:**
- [ ] Credit/debit card (baseline - must have)
- [ ] PayPal (26% of online payments globally)
- [ ] Apple Pay / Google Pay (express checkout)
- [ ] Express checkout buttons above the fold
- [ ] Saved card for returning customers
- [ ] Buy Now Pay Later option (Klarna, Afterpay)
- [ ] Card number field auto-formats (spaces every 4 digits)
- [ ] Card type auto-detected from first digits
- [ ] CVV field has tooltip explaining where to find it
- [ ] Expiry date uses MM/YY format with auto-slash

**Challenge questions:**
1. "Nabizis express checkout (Apple Pay, Google Pay)? Baymard: -40% checkout time"
2. "Muze se vracejici zakaznik zaplatit jednim klikem?"
3. "Mas BNPL? Pro orders >$100 zvysuje konverzi o 20-30%"

**Common mistakes:**
- No express checkout (Apple Pay, Google Pay)
- PayPal missing (26% prefer it)
- Card fields not auto-formatting
- CVV without explanation (user confused = abandoned)
- No saved card for returning customers
- BNPL missing for higher-priced items

**Data to cite:**
- Express checkout (Apple Pay): -40% checkout time, +12% conversion (Shopify)
- PayPal availability: +24% checkout conversion (PayPal merchant data)
- Buy Now Pay Later: +20-30% conversion for orders >$100 (Klarna data)
- Saved cards for returning customers: +45% repeat purchase rate
- Card auto-detection: +7% form completion (Stripe UX research)

**If limited payment options:**
"Kazda chybejici platebni metoda = ztraceni zakaznici.

**Priority additions:**
1. Apple Pay / Google Pay -> -40% checkout time, +12% conversion
2. PayPal -> +24% conversion (26% global preference)
3. BNPL (if AOV >$100) -> +20-30% conversion
4. Saved cards -> +45% repeat purchases

**Rule:** Nabidni minimalne 3 platebni metody. Kazda dalsi metoda snizuje abandonment."

**Expected impact of fixing:** +12-30% conversion

---

### Section 6: Order Summary

**User provides:**
```
Summary visible: [ ] Sticky sidebar  [ ] Collapsible  [ ] Separate step  [ ] Not visible during checkout
Shown: [ ] Items  [ ] Subtotal  [ ] Shipping  [ ] Tax  [ ] Discount  [ ] Total
Discount code: [ ] Field visible  [ ] Hidden behind link  [ ] Not supported
```

**Expert evaluates:**

**Checklist:**
- [ ] Order summary always visible (sticky sidebar or collapsible)
- [ ] Line-item breakdown (subtotal, shipping, tax, total)
- [ ] Tax calculated and shown before final click
- [ ] Discount code field present but not distracting
- [ ] Applied discount clearly shown with savings amount
- [ ] Final total prominent and unmissable
- [ ] Edit capability from summary (link back to cart)
- [ ] Item count shown

**Challenge questions:**
1. "Vidi uzivatel FINALNI cenu vcetne dani PRED kliknutim na 'Zaplatit'?"
2. "Jak prominentni je slevovy kod? Neodhani to uzivatele hledat kupony?"
3. "Muze uzivatel z order summary upravit objednavku?"

**Common mistakes:**
- Tax surprise at final step (hidden costs = abandonment)
- Discount field too prominent (sends users to Google for coupons)
- No line-item breakdown (user doesn't trust the total)
- Summary hidden on mobile (user can't verify order)
- No edit link from summary

**Data to cite:**
- Baymard: 48% abandon from unexpected extra costs (tax is part of this)
- Prominent coupon field: +8% coupon searches, -5% conversion for non-coupon users (CXL)
- Visible order summary: +16% checkout confidence (UXPin)
- Tax transparency: +12% trust in final step

**If no visible summary:**
"Uzivatel MUSI videt co kupuje a za kolik BEHEM celeho checkoutu.

**Fix:**
1. Sticky sidebar (desktop) / collapsible header (mobile) s order summary
2. Line-item breakdown: subtotal + shipping + tax = TOTAL
3. Discount field za linkem 'Mam slevovy kod' (ne prominentni)
4. Edit link u kazde polozky

**Hidden summary = user uncertainty = abandonment.**"

**Expected impact of fixing:** +12-16% checkout completion

---

### Section 7: Error Handling

**User provides:**
```
Validation type: [ ] Inline (real-time)  [ ] On submit  [ ] After page reload
Error display: [ ] Above form  [ ] Below field  [ ] Modal/alert
Payment failure: [ ] Clear message  [ ] Generic error  [ ] Silent fail
Recovery: [ ] Fields preserved  [ ] Form cleared  [ ] Redirected
```

**Expert evaluates:**

**Checklist:**
- [ ] Inline validation (real-time, not on submit)
- [ ] Error messages below the specific field
- [ ] Error text is specific and actionable ("Card number must be 16 digits")
- [ ] Error fields highlighted (red border + icon)
- [ ] Valid fields confirmed (green checkmark)
- [ ] Payment failure message specific and helpful
- [ ] Form data preserved on payment failure (not cleared)
- [ ] Retry mechanism without re-entering all data
- [ ] Card decline suggests trying different card
- [ ] Network error offers retry button

**Challenge questions:**
1. "Co se stane kdyz platba selze? Musi uzivatel znovu vyplnit vsechno?"
2. "Jsou error messages specificke nebo generic 'Neco se pokazilo'?"
3. "Mas inline validaci nebo uzivatel zjisti chyby az po odeslani?"

**Common mistakes:**
- Validation only on submit (user fills everything, then sees 5 errors)
- Generic error messages ("Error occurred" - useless)
- Form data cleared on payment failure (rage quit)
- Error summary at top instead of inline (user can't find which field)
- No positive feedback for correct fields
- Payment decline without suggestion to try another method

**Data to cite:**
- Inline validation: +22% completion rate vs submit-only (Luke Wroblewski research)
- Specific error messages: +15% error recovery vs generic (Baymard)
- Form data preservation on error: +28% retry rate (UXMovement)
- Positive inline feedback (green check): +10% form confidence

**If generic errors:**
"Generic error 'Neco se pokazilo' je UX fail.

**Fix:**
1. Inline validation for KAZDE pole (real-time)
2. Error message POD polem (ne nahore) - specificky: 'Cislo karty musi mit 16 cislic'
3. Payment failure: zachovej data + nabidni 'Zkusit jinou kartu'
4. Green checkmark pro spravne vyplnena pole (pozitivni feedback)

**Expected:** +22% completion rate jen z inline validace."

**Expected impact of fixing:** +15-28% checkout completion

---

### Section 8: Mobile Checkout

**User provides:**
```
Mobile traffic share: ____%
Mobile-specific features: [ ] Sticky CTA  [ ] Numeric keyboard  [ ] Simplified layout  [ ] Express checkout prominent
Mobile completion rate vs desktop: ____%
```

**Expert evaluates:**

**Checklist:**
- [ ] Sticky "Pay" CTA button at bottom (always visible)
- [ ] Numeric keyboard for card/phone/zip fields (inputmode="numeric")
- [ ] Email keyboard for email field (inputmode="email")
- [ ] Large touch targets (min 44x44px)
- [ ] Single column layout (no side-by-side fields)
- [ ] Collapsible order summary (saves screen space)
- [ ] Express checkout (Apple Pay) above fold
- [ ] Auto-advancing between fields
- [ ] No pinch-to-zoom needed (font min 16px)
- [ ] Progress indicator (step 1 of 3)

**Challenge questions:**
1. "Jaky je tvuj mobilni completion rate vs desktop? Prumerny gap je 50%"
2. "Pouzivas spravne klavesnice? inputmode='numeric' pro cisla?"
3. "Je CTA button vzdy viditelny bez scrollovani?"

**Common mistakes:**
- Desktop checkout on mobile (not optimized)
- Wrong keyboard types (QWERTY for phone number)
- CTA below fold (user must scroll to pay)
- Tiny touch targets (mis-taps = frustration)
- Font too small (<16px triggers iOS zoom)
- No progress indicator (user doesn't know how many steps)
- Side-by-side fields (can't read on small screens)

**Data to cite:**
- Baymard: 78% of mobile checkout experiences rated "poor" or "mediocre"
- Mobile checkout completion: 50% lower than desktop average
- Sticky CTA on mobile: +15% completion (Shopify checkout study)
- Correct keyboard type: +20% mobile form speed (Google UX research)
- Font <16px triggers iOS auto-zoom: instant frustration

**If mobile not optimized:**
"78% mobilnich checkoutu je hodnoceno jako 'poor' (Baymard). Mobilni konverze je prumerne o 50% nizsi nez desktop.

**Quick wins:**
1. Sticky CTA button -> +15% completion
2. inputmode='numeric' na vsechna ciselna pole -> +20% speed
3. Single column layout -> eliminace mis-tapu
4. Express checkout (Apple Pay) nad foldem -> -40% checkout time

**Rule:** Mobilni checkout NENI zmenseny desktop. Je to JINY produkt."

**Expected impact of fixing:** +15-50% mobile completion

---

## SUMMARY PHASE

**After reviewing all 8 sections, expert provides:**

### Issue Summary

```
Identifikoval jsem celkem [N] problemu:

HIGH-PRIORITY (ocekavany impact >30%):
1. [ ] Hidden shipping costs - Expected impact: +22-48%
2. [ ] Missing trust signals near payment - Expected impact: +18-42%
3. [ ] Too many form fields - Expected impact: +15-25%
...

MEDIUM-PRIORITY (impact 10-30%):
4. [ ] No express checkout (Apple/Google Pay) - Expected impact: +12-30%
5. [ ] Generic error handling - Expected impact: +15-28%
6. [ ] No visible order summary - Expected impact: +12-16%
...

LOW-PRIORITY (impact <10% nebo nice-to-have):
7. [ ] Cart thumbnail missing - Expected impact: +8%
8. [ ] No discount code field - Expected impact: +5-8%
...
```

---

### Prioritization Matrix

| Issue | Current Impact | Fix Complexity | Expected Gain | Priority |
|-------|----------------|----------------|---------------|----------|
| Show shipping early | -48% abandonment | Low (1 day) | +22-48% | **1** |
| Trust badges at payment | -18% trust | Low (2 hours) | +18-42% | **2** |
| Reduce form fields | -22% completion | Medium (3-5 days) | +15-25% | **3** |
| Add express checkout | Missing conversions | Medium (2-3 days) | +12-30% | **4** |
| Mobile optimization | -50% vs desktop | High (1-2 weeks) | +15-50% | **5** |

---

### Quick Wins (Week 1)

**Do these first (low effort, high impact):**
1. Show shipping costs on product/cart page (1 day)
2. Add trust badges next to payment form (2 hours)
3. Add inline validation to all fields (1 day)

**Expected combined impact:** +40-80% checkout completion

---

### Medium Effort (Week 2-3)

1. Reduce form fields to 7-8 optimal
2. Add Apple Pay / Google Pay
3. Optimize mobile checkout layout

**Expected combined impact:** +25-50% additional improvement

---

### Testing Plan

**Priority #1 A/B Test:**
- **Element:** Shipping cost visibility
- **Control:** Shipping shown at final step
- **Variant:** Shipping estimate on product/cart page
- **Metric:** Checkout completion rate
- **Duration:** 2 weeks minimum
- **Traffic needed:** 2,000 visitors minimum per variant
- **Expected:** +22-48% completion improvement

**Setup:** Google Optimize / VWO / Optimizely
**See:** `ux-optimization` practices/ab-testing.md for detailed protocol

---

## NEXT STEPS

1. **Immediate (this week):**
   - [ ] Fix shipping transparency (#1)
   - [ ] Add trust signals at payment (#2)
   - [ ] Set up A/B test

2. **Short-term (2-3 weeks):**
   - [ ] Reduce form fields
   - [ ] Add express checkout
   - [ ] Run A/B test to completion

3. **Long-term (month 2+):**
   - [ ] Full mobile checkout redesign
   - [ ] Implement saved cards for returning users
   - [ ] Continuous A/B testing program

---

**Session complete.** Issues identified, prioritized, and actioned. Ready to implement?
