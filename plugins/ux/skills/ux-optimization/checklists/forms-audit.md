# Forms Audit Checklist

Use this to audit any form (registration, checkout, contact).

## Field Count
- [ ] Only essential fields (can you remove any?)
- [ ] Max 5 fields for registration
- [ ] Max 7 fields for checkout
- [ ] Each field has clear purpose

## Validation
- [ ] Inline validation (onBlur, not onSubmit)
- [ ] Concrete error messages (not just "Invalid")
- [ ] Green checkmark on success
- [ ] Scroll to first error on submit

## Password
- [ ] Requirements shown upfront
- [ ] Real-time validation
- [ ] Toggle visibility (eye icon)
- [ ] Min 6 chars for normal, 8+ for sensitive

## Social Login
- [ ] Google, Facebook, Apple options
- [ ] Positioned based on audience age
- [ ] OAuth properly implemented

## Mobile
- [ ] Font size ≥ 16px (prevents zoom)
- [ ] Correct inputmode (email, tel, numeric)
- [ ] Touch targets ≥ 48px
- [ ] Labels above fields (not inside)
- [ ] Tested on real device

## Autocomplete
- [ ] All fields have autocomplete attribute
- [ ] Correct values (email, given-name, tel, etc.)
- [ ] Works on both desktop and mobile

## Accessibility
- [ ] Labels for all inputs
- [ ] Keyboard navigable (Tab through)
- [ ] Visible focus states
- [ ] ARIA labels where needed
- [ ] Contrast ratios meet WCAG (4.5:1)

## Expected Impact
- Minimizing fields: +10-30%
- Inline validation: +15-25%
- Social login: +20-40%
- Mobile optimization: +15-30%

Total potential: +60-125% conversion improvement
