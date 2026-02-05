---
name: analytics-setup
description: Use when setting up Google Tag Manager and Google Analytics 4 for websites - includes automated setup via claude-in-chrome browser automation
---

# Analytics Setup (GTM + GA4)

**When to use this skill:**
- New website needs tracking setup from scratch
- Migrating to GTM/GA4
- Adding event tracking (clicks, forms, conversions)
- E-commerce tracking setup
- Debugging tracking issues

**When NOT to use:**
- Analyzing data/reports → use existing `google-analytics` MCP
- Keyword research → use `keyword-research`
- SEO optimization → use `seo-optimization`

---

## Quick Router

| User says... | Go to... |
|--------------|----------|
| "nastav GTM", "nový container" | Phase 1: GTM Setup |
| "nastav GA4", "analytics property" | Phase 2: GA4 Setup |
| "tracking plan", "jaké eventy" | Phase 3: Tracking Plan |
| "přidej event", "track click/form" | Phase 4: Implementation |
| "nefunguje tracking", "debug" | Phase 5: Debug |
| "kompletní setup od nuly" | All phases sequentially |

---

## Automated Setup (claude-in-chrome)

**Tento skill podporuje automatizovaný setup přes browser automation.**

Když uživatel řekne "nastav GTM/GA4 pro [web]", Claude:
1. Otevře příslušnou Google službu
2. Provede setup kroky
3. Pořídí screenshots pro dokumentaci
4. Vrátí snippety a checklist

**Prerekvizity:**
- [ ] Uživatel přihlášen v Chrome do Google účtu
- [ ] Chrome browser přístupný přes claude-in-chrome

---

## Phase 1: GTM Setup

### 1.1 Vytvoření GTM Account & Container

**Manuální kroky:**
```
1. Jdi na tagmanager.google.com
2. "Create Account"
3. Account Name: [Název firmy]
4. Country: Czech Republic
5. Container Name: [domain.com]
6. Target Platform: Web
7. Accept Terms
```

**Automated (claude-in-chrome):**
```
Řekni: "Vytvoř GTM container pro example.com"

Claude provede:
1. navigate → tagmanager.google.com
2. click → Create Account
3. fill → Account name, Container name
4. select → Web platform
5. screenshot → GTM snippet
6. return → Installation code
```

### 1.2 GTM Installation Code

Po vytvoření získáš dva snippety:

**Head snippet (před </head>):**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

**Body snippet (hned za <body>):**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 1.3 GTM Best Practices

| Pravidlo | Popis |
|----------|-------|
| **1 container per website** | Nikdy nesdílej container mezi weby |
| **Client owns container** | Klient vlastní, ne agentura |
| **Naming convention** | `[Typ] - [Nástroj] - [Akce]` např. `GA4 - Event - CTA Click` |
| **Use folders** | Organizuj podle: Analytics, Ads, Tracking |
| **Version notes** | Vždy popis co změna obsahuje |
| **Preview before publish** | Testuj každou změnu |

### 1.4 GTM Folder Structure

```
📁 Analytics
   ├── GA4 - Config
   ├── GA4 - Event - Page View
   └── GA4 - Event - Scroll

📁 Conversions
   ├── GA4 - Event - Form Submit
   ├── GA4 - Event - CTA Click
   └── GA4 - Event - Purchase

📁 Advertising
   ├── Google Ads - Conversion
   └── FB Pixel - Base

📁 Utilities
   ├── Consent Mode
   └── Data Layer Push
```

---

## Phase 2: GA4 Setup

### 2.1 Vytvoření GA4 Property

**Manuální kroky:**
```
1. Jdi na analytics.google.com
2. Admin → Create Property
3. Property Name: [Web Name]
4. Timezone: (GMT+01:00) Prague
5. Currency: CZK
6. Business Details → vyplň
7. Create → Web stream
8. URL: https://example.com
9. Stream name: [Web Name] - Web
```

**Automated (claude-in-chrome):**
```
Řekni: "Vytvoř GA4 property pro example.com"

Claude provede:
1. navigate → analytics.google.com
2. click → Admin → Create Property
3. fill → Property details
4. create → Web data stream
5. screenshot → Measurement ID
6. return → G-XXXXXXXXXX
```

### 2.2 GA4 Measurement ID

Po vytvoření získáš:
- **Measurement ID:** `G-XXXXXXXXXX`
- Použij v GTM pro Google Tag

### 2.3 GA4 + GTM Integration

**V GTM vytvoř Google Tag:**
```
1. Tags → New
2. Tag Type: Google Tag
3. Tag ID: G-XXXXXXXXXX
4. Trigger: All Pages
5. Save & Publish
```

### 2.4 Enhanced Measurement

GA4 automaticky trackuje (zapni v Data Stream settings):

| Event | Popis |
|-------|-------|
| `page_view` | Zobrazení stránky |
| `scroll` | 90% scroll depth |
| `click` | Outbound links |
| `view_search_results` | Site search |
| `video_start/progress/complete` | YouTube embeds |
| `file_download` | PDF, docs, etc. |

**Doporučení:** Zapni vše, vypni co nepotřebuješ.

### 2.5 Data Retention

```
Admin → Data Settings → Data Retention
- Event data retention: 14 months (max)
- Reset on new activity: ON
```

---

## Phase 3: Tracking Plan

### 3.1 Co trackovat?

**Universal Events (každý web):**

| Event | Trigger | Parametry |
|-------|---------|-----------|
| `page_view` | All pages | page_title, page_location |
| `scroll` | 25%, 50%, 75%, 90% | percent_scrolled |
| `click` | CTA buttons | link_text, link_url |
| `form_submit` | Form submission | form_id, form_name |
| `file_download` | PDF/doc click | file_name, file_extension |

**E-commerce Events:**

| Event | Kdy | Parametry |
|-------|-----|-----------|
| `view_item` | Product page | item_id, item_name, price |
| `add_to_cart` | Add to cart click | items[], value |
| `begin_checkout` | Checkout start | items[], value |
| `purchase` | Order complete | transaction_id, value, items[] |

**Lead Gen Events:**

| Event | Kdy | Parametry |
|-------|-----|-----------|
| `generate_lead` | Contact form submit | form_name, lead_type |
| `sign_up` | Registration complete | method |
| `login` | User login | method |

**SaaS Events:**

| Event | Kdy | Parametry |
|-------|-----|-----------|
| `sign_up` | Trial/registration | plan_type |
| `tutorial_complete` | Onboarding done | step_count |
| `subscription` | Plan purchase | plan_name, value |

### 3.2 Tracking Plan Template

```markdown
## [Web Name] Tracking Plan

### Business Goals
1. [Goal 1]
2. [Goal 2]

### Key Events (Conversions)
| Event | Description | Value |
|-------|-------------|-------|
| purchase | Completed order | order_value |
| generate_lead | Contact form | $50 (estimated) |

### Engagement Events
| Event | Description | Trigger |
|-------|-------------|---------|
| cta_click | Main CTA clicked | Button class .cta-main |
| scroll_depth | 90% page scroll | Scroll trigger |

### Custom Dimensions
| Dimension | Scope | Values |
|-----------|-------|--------|
| user_type | User | free, premium |
| content_type | Event | blog, product, landing |
```

---

## Phase 4: Implementation

### 4.1 GTM Tag Types

**Google Tag (Base):**
```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Trigger: All Pages
```

**GA4 Event Tag:**
```
Tag Type: Google Analytics: GA4 Event
Configuration Tag: [Google Tag]
Event Name: [event_name]
Event Parameters:
  - parameter_name: {{variable}}
Trigger: [Custom trigger]
```

### 4.2 Common Triggers

**Click - All CTA Buttons:**
```
Trigger Type: Click - All Elements
Trigger fires on: Some Clicks
Conditions:
  Click Classes contains "cta"
  OR Click Classes contains "btn-primary"
```

**Form Submit:**
```
Trigger Type: Form Submission
Trigger fires on: Some Forms
Conditions:
  Form ID equals "contact-form"
```

**Scroll Depth:**
```
Trigger Type: Scroll Depth
Vertical Scroll Depths: 25, 50, 75, 90
Percentages: checked
```

**YouTube Video:**
```
Trigger Type: YouTube Video
Capture: Start, Complete, Pause, Progress
Progress: 25%, 50%, 75%
```

### 4.3 Useful Variables

**Built-in Variables (Enable these):**
- Click Classes, Click ID, Click URL, Click Text
- Form ID, Form Classes, Form URL
- Page URL, Page Path, Page Hostname
- Scroll Depth Threshold

**Custom Variables:**

**Data Layer Variable:**
```
Variable Type: Data Layer Variable
Data Layer Variable Name: ecommerce.value
```

**JavaScript Variable:**
```
Variable Type: Custom JavaScript
function() {
  return document.title;
}
```

**Lookup Table:**
```
Variable Type: Lookup Table
Input: {{Page Path}}
/contact → Contact Page
/pricing → Pricing Page
Default: Other Page
```

### 4.4 Automated Implementation (claude-in-chrome)

```
Řekni: "Přidej GA4 event pro click na CTA button s třídou .cta-main"

Claude provede:
1. navigate → GTM container
2. create → New Trigger (Click - Some Elements)
3. configure → Click Classes contains "cta-main"
4. create → New Tag (GA4 Event)
5. configure → Event name: cta_click
6. link → Trigger to Tag
7. screenshot → Preview mode test
8. return → Confirmation + test instructions
```

---

## Phase 5: Debug & QA

### 5.1 GTM Preview Mode

```
1. V GTM klikni "Preview"
2. Zadej URL webu
3. Otevře se debug panel
4. Proveď akce na webu
5. Zkontroluj:
   - Tags Fired
   - Tags Not Fired
   - Data Layer
   - Variables
```

### 5.2 GA4 DebugView

```
1. V GA4: Admin → DebugView
2. Na webu: Otevři s GTM Preview NEBO
3. Přidej parametr: ?debug_mode=true
4. Sleduj events v reálném čase
```

### 5.3 Common Issues

| Problém | Příčina | Řešení |
|---------|---------|--------|
| Tag se nespouští | Špatný trigger | Zkontroluj trigger podmínky |
| Duplikátní events | Více triggerů | Zkombinuj triggery |
| Chybí parametry | Variable nenastavená | Zkontroluj variable hodnotu |
| GA4 neukazuje data | Consent mode | Zkontroluj consent status |
| Preview nefunguje | Blocker extension | Vypni AdBlock |

### 5.4 Debug Checklist

- [ ] GTM snippet je na všech stránkách
- [ ] GTM Preview ukazuje Tags Fired
- [ ] GA4 Realtime ukazuje uživatele
- [ ] GA4 DebugView ukazuje events
- [ ] Event parametry mají správné hodnoty
- [ ] Conversion events jsou označeny jako Key Events

---

## Consent Mode

### Setup pro GDPR

**V GTM:**
```
1. Přidej Consent Mode template (např. Cookiebot, Usercentrics)
2. Nastav default consent state:
   - analytics_storage: denied
   - ad_storage: denied
3. Po souhlasu: granted
```

**Google Tag s Consent:**
```
Tag Configuration:
  Consent Settings:
    - Require consent for: Analytics
    - Additional Consent Checks: [dle potřeby]
```

---

## Naming Conventions

### Tags
```
[Platform] - [Type] - [Description]

GA4 - Config - Base Tag
GA4 - Event - CTA Click
GA4 - Event - Form Submit
GAds - Conversion - Purchase
FB - Event - Lead
```

### Triggers
```
[Type] - [Description]

Click - CTA Buttons
Form - Contact Submit
Scroll - 90 Percent
Page View - Thank You Page
```

### Variables
```
[Type] - [Description]

DLV - Transaction ID
JS - Page Category
Const - GA4 Measurement ID
LT - Page Type Lookup
```

---

## Quick Setup Checklist

### Nový web (15 min setup)

- [ ] **GTM**
  - [ ] Vytvořit account + container
  - [ ] Nainstalovat snippet na web
  - [ ] Vytvořit folder strukturu

- [ ] **GA4**
  - [ ] Vytvořit property
  - [ ] Vytvořit web data stream
  - [ ] Zapnout Enhanced Measurement
  - [ ] Nastavit data retention na 14 měsíců

- [ ] **Integration**
  - [ ] Přidat Google Tag do GTM
  - [ ] Otestovat v Preview mode
  - [ ] Ověřit v GA4 Realtime
  - [ ] Publish GTM container

- [ ] **Basic Events**
  - [ ] CTA click tracking
  - [ ] Form submission tracking
  - [ ] Scroll depth tracking

---

## Official Documentation

| Téma | URL |
|------|-----|
| GTM Guide | [support.google.com/tagmanager/answer/12811173](https://support.google.com/tagmanager/answer/12811173) |
| GTM Setup | [support.google.com/tagmanager/answer/14842164](https://support.google.com/tagmanager/answer/14842164) |
| Google Tag in GTM | [support.google.com/tagmanager/answer/15756616](https://support.google.com/tagmanager/answer/15756616) |
| GA4 Events | [support.google.com/analytics/answer/9322688](https://support.google.com/analytics/answer/9322688) |
| GA4 Recommended Events | [support.google.com/analytics/answer/9267735](https://support.google.com/analytics/answer/9267735) |
| GA4 Ecommerce | [support.google.com/analytics/answer/12200568](https://support.google.com/analytics/answer/12200568) |
| Events in GTM | [support.google.com/tagmanager/answer/13034206](https://support.google.com/tagmanager/answer/13034206) |

---

## Expert Resources

- [Analytics Mania - GTM Best Practices](https://www.analyticsmania.com/post/google-tag-manager-best-practices/)
- [MeasureSchool - GA4 Event Tracking](https://measureschool.com/google-analytics-4-event-tracking/)
- [Stape - GTM 2025 Guide](https://stape.io/blog/gtm-best-practices-and-tracking-tags)
- [GitHub GTM Guidelines](https://github.com/justusbluemer/gtm-guidelines)

---

## Integration

- **Před analytics:** `keyword-research` pro SEO strategii
- **Po analytics:** `seo-optimization` pro on-page SEO
- **Pro reporting:** Použij `google-analytics` MCP pro čtení dat
