---
name: aso-optimization
description: Use when optimizing App Store or Google Play listings - keywords, screenshots, icons, descriptions, A/B testing. Based on Advanced ASO Book (Phiture + AppTweak).
---

# ASO Optimization Skill

## Overview

App Store Optimization (ASO) skill for maximizing app visibility and conversion in iOS App Store and Google Play. Based on the Advanced App Store Optimization Book by Phiture and AppTweak.

**Philosophy:**

```
ASO = SEO for apps
Visibility (keywords) + Conversion (creative assets) = Downloads

Unlike web SEO, you can A/B test everything.
```

**Announce:** "I'm using aso-optimization to improve your app store listing."

## When to Use

**USE this skill:**

- App not appearing in search results for target keywords
- Low conversion rate (impressions → downloads)
- Planning app store listing optimization
- Creating/updating screenshots, icons, descriptions
- Setting up A/B tests (PPO, Store Listing Experiments)
- Launching new app in App Store / Google Play

**DON'T use this skill:**

- Web SEO (use `seo-optimization` instead)
- In-app conversion (that's product, not ASO)
- App reviews/ratings management (separate discipline)

## ASO Stack Framework

ASO has 4 interconnected layers:

```
┌─────────────────────────────────────────────────────────┐
│  1. VISIBILITY LAYER                                     │
│  How users FIND the app                                  │
│  - Search (keywords)                                     │
│  - Browse & Explore (categories, similar apps)           │
│  - Featuring (editorial)                                 │
│  - Store Ads (Apple Search Ads, Google UAC)              │
├─────────────────────────────────────────────────────────┤
│  2. CONVERSION LAYER                                     │
│  How users DECIDE to download                            │
│  - Visual: Icon, Screenshots, Video                      │
│  - Text: Title, Subtitle, Description                    │
│  - Social: Ratings, Reviews                              │
│  - Technical: App size, update frequency                 │
├─────────────────────────────────────────────────────────┤
│  3. TOOLS LAYER                                          │
│  What you use to optimize                                │
│  - Keyword research: AppTweak, Sensor Tower, MobileAction│
│  - A/B testing: PPO (iOS), Store Listing Experiments     │
│  - Analytics: App Store Connect, Google Play Console     │
├─────────────────────────────────────────────────────────┤
│  4. SUPPORTING INSIGHTS LAYER                            │
│  Context for decisions                                   │
│  - Seasonality (holidays, events)                        │
│  - Organic uplift (correlation paid → organic)           │
│  - Cannibalization (brand vs generic keywords)           │
│  - Benchmarks (category averages)                        │
└─────────────────────────────────────────────────────────┘
```

## Standard Workflow

### Phase 1: Keyword Optimization (KWO)

**Goal:** Get found for the right search terms.

#### Step 1: Keyword Discovery

Sources for keywords:

- **Competitor metadata:** Analyze top 10 apps in category (titles, subtitles, descriptions)
- **Autocomplete:** Type partial queries in App Store/Play Store search
- **Apple Search Ads:** If running ads, Search Terms report shows exact queries
- **Long-tail keywords:** Multi-word phrases (lower volume, higher conversion)
- **Existing web SEO research:** Translate web keywords to mobile context

#### Step 2: Keyword Prioritization

Score each keyword on 3 metrics:

| Metric         | How to Measure                                     | Weight   |
| -------------- | -------------------------------------------------- | -------- |
| **Volume**     | Apple Search Popularity (5-100, exponential scale) | HIGH     |
| **Relevance**  | Manual score 0-5 (is this what our app does?)      | CRITICAL |
| **Difficulty** | Analyze top 10 results, ASO tool scores            | MEDIUM   |

**Selection Formula:**

```
Search Term Value = Volume × Relevance × (Max Competition / Your Competition Score)
```

**Rule:** Relevance is CRITICAL. Ranking for irrelevant keywords hurts conversion and wastes indexing slots.

#### Step 3: Keyword Targeting (Platform-Specific)

**iOS App Store:**

| Field             | Limit     | Weight      | Tactics                            |
| ----------------- | --------- | ----------- | ---------------------------------- |
| **Title**         | 30 chars  | HIGHEST     | Primary keyword + brand            |
| **Subtitle**      | 30 chars  | HIGH        | Secondary keywords + value prop    |
| **Keyword Field** | 100 chars | HIGH        | Hidden, comma-separated, NO spaces |
| Promotional Text  | 170 chars | NOT INDEXED | For announcements only             |
| Description       | Unlimited | NOT INDEXED | For conversion, not keywords       |

**iOS Keyword Field Tactics:**

- Separate with commas, NO SPACES: `fitness,sport,běh` not `fitness, sport, běh`
- Don't repeat words already in Title/Subtitle
- Don't use articles (the, a) or "app" (auto-indexed)
- Use singular forms (Apple indexes plurals automatically)
- **Cross-localization:** For US market, Apple indexes both US and UK localizations = 200 chars total

**Google Play:**

| Field                 | Limit      | Weight  | Tactics                                  |
| --------------------- | ---------- | ------- | ---------------------------------------- |
| **Title**             | 30 chars   | HIGHEST | Primary keyword + brand                  |
| **Short Description** | 80 chars   | HIGH    | Keywords + CTA                           |
| **Long Description**  | 4000 chars | MEDIUM  | Natural keyword density, HTML formatting |

**Google Play Tactics:**

- Description IS indexed (unlike iOS)
- Use HTML formatting: `<b>bold</b>`, bullet points
- Repeat keywords naturally 3-5x in description
- First 167 characters visible in search results

### Phase 2: Conversion Optimization (CRO)

**Goal:** Convert impressions into downloads.

#### CRO Loop (6 Steps)

```
┌────────────┐
│ 1. Research │ ──► Look inside (analytics), outside (competitors), up (seasonality)
└─────┬──────┘
      ▼
┌────────────┐
│ 2. Hypothesize │ ──► "Adding social proof to first screenshot will increase trust"
└─────┬──────┘
      ▼
┌────────────┐
│ 3. Prioritize │ ──► RICE model: Reach × Impact × Confidence / Effort
└─────┬──────┘
      ▼
┌────────────┐
│ 4. Create │ ──► Design assets based on hypothesis
└─────┬──────┘
      ▼
┌────────────┐
│ 5. Test │ ──► A/B test (PPO, Store Listing Experiments)
└─────┬──────┘
      ▼
┌────────────┐
│ 6. Measure │ ──► Track conversion rate, organic uplift
└─────┴──────┘
      │
      └──────► Repeat
```

#### PET-ASO Model (Psychology)

Apply these 3 psychological layers to all creative assets:

**P - Persuasion (Cialdini Principles)**

| Principle        | App Store Application                       |
| ---------------- | ------------------------------------------- |
| **Authority**    | Awards, press mentions, "Featured by Apple" |
| **Social Proof** | "10M+ downloads", user testimonials         |
| **Scarcity**     | "Limited offer", seasonal content           |
| **Reciprocity**  | Free features highlighted                   |
| **Consistency**  | Design matches brand expectations           |
| **Liking**       | Relatable screenshots, friendly tone        |

**E - Emotion**

| Emotion         | How to Trigger                       |
| --------------- | ------------------------------------ |
| **Joy/Delight** | Happy imagery, humor, achievements   |
| **Aesthetic**   | Beautiful, polished design           |
| **Fresh Start** | "New you", transformation messaging  |
| **FOMO**        | What they're missing without the app |
| **Relief**      | Pain point solved                    |

**T - Trust**

| Trust Signal        | Implementation                 |
| ------------------- | ------------------------------ |
| **Privacy**         | "Your data stays on device"    |
| **Quality Content** | Recent screenshots, current UI |
| **Testimonials**    | Real user quotes               |
| **Certifications**  | Security badges, compliance    |
| **Design Quality**  | Professional, polished assets  |

### Phase 3: Visual Asset Optimization

#### Screenshots

**Critical Rules:**

1. **First 3 are key:** Most users don't scroll. Value prop must be in first 3 screenshots.
2. **Visual Word Recognition:** Display searched keyword prominently in screenshot titles.
3. **Connected Style:** Graphics flow between screenshots for storytelling.
4. **Readability:** Text must be readable on small search result thumbnails.

**Screenshot Checklist:**

- [ ] First screenshot shows primary value proposition
- [ ] Target keyword visible in text overlay
- [ ] Consistent visual style across all screenshots
- [ ] Device frames appropriate for platform
- [ ] Text readable at thumbnail size
- [ ] Localized for target markets

**Screenshot Structure (recommended):**

1. **Hero:** Primary benefit + social proof
2. **Feature 1:** Key differentiator
3. **Feature 2:** Secondary benefit
4. **Social Proof:** Reviews/testimonials
5. **CTA:** Call to download

#### App Icon

**Best Practices:**

- **Brand + Function:** Logo combined with element showing what app does
- **Simplicity:** Must be recognizable at 29×29px
- **No text:** Unreadable at small sizes
- **Test colors:** Small color changes can yield 20%+ conversion lift

**Icon Checklist:**

- [ ] Recognizable at small sizes
- [ ] Stands out in category
- [ ] No text or fine details
- [ ] Consistent with brand
- [ ] Tested against competitors

#### App Preview Video

**iOS Requirements:**

- 15-30 seconds
- Must show actual app footage (no lifestyle)
- Autoplays muted in search results
- First frame = poster image

**Video Checklist:**

- [ ] Shows core value in first 5 seconds
- [ ] Demonstrates actual app UI
- [ ] Works without sound (captions if needed)
- [ ] Strong opening frame (poster)

### Phase 4: A/B Testing

#### iOS: Product Page Optimization (PPO)

**What you can test:**

- Icon
- Screenshots
- App Preview video

**What you CANNOT test:**

- Title, Subtitle, Keywords
- Description
- Promotional Text

**Setup:**

1. App Store Connect → App → Product Page Optimization
2. Create treatment (variant)
3. Upload alternative assets
4. Submit for review (adds delay!)
5. Set traffic split (recommend 50/50)
6. Run minimum 7 days

**Limitations:**

- Requires App Review approval
- Cannot test text elements
- Conversions include direct-from-search (no page view)

#### Google Play: Store Listing Experiments

**What you can test:**

- Icon
- Screenshots
- Feature Graphic
- Promo Video
- Short Description
- Long Description (including HTML)

**Advantages over iOS:**

- No review process
- Can test descriptions
- Faster iteration
- 90% confidence interval (not 95%)

**Setup:**

1. Google Play Console → Store presence → Store listing experiments
2. Create experiment
3. Upload variants
4. Set traffic allocation
5. Launch (immediate)

#### A/B Testing Best Practices

1. **Hypothesis first:** "Changing X will improve Y because Z"
2. **Bold vs Incremental:**
   - Bold: Completely different concept (faster results, riskier)
   - Incremental: Small changes (safer, slower significance)
3. **Duration:** Minimum 7 days (ideally 14) to cover weekly patterns
4. **Isolation:** Don't change keywords or run new campaigns during test
5. **Statistical significance:** Wait for 95% confidence before declaring winner

## iOS vs Android Differences Summary

| Aspect                     | iOS App Store              | Google Play            |
| -------------------------- | -------------------------- | ---------------------- |
| **Description indexed?**   | NO                         | YES                    |
| **Keyword field?**         | YES (100 chars, hidden)    | NO                     |
| **A/B test descriptions?** | NO                         | YES                    |
| **A/B test approval**      | Requires review            | Instant                |
| **Video format**           | App Preview (strict rules) | YouTube link           |
| **Conversion tracking**    | Impressions → Downloads    | Page views → Downloads |
| **HTML in description?**   | NO                         | YES                    |

## Metrics to Track

| Metric                 | What it Measures                  | Target                      |
| ---------------------- | --------------------------------- | --------------------------- |
| **Impressions**        | How often app appears             | Volume indicator            |
| **Product Page Views** | Clicks to detail page             | Interest indicator          |
| **Conversion Rate**    | Views → Downloads                 | > 30% good, > 50% excellent |
| **Keyword Rankings**   | Position for target keywords      | Top 10 for priority terms   |
| **Organic Uplift**     | Organic growth after optimization | 10-30% typical              |

## Tools Recommendations

| Purpose                      | Tool                            | Notes                                       |
| ---------------------------- | ------------------------------- | ------------------------------------------- |
| **Keyword Research**         | AppTweak                        | Keyword Relevancy Score, accurate estimates |
| **Keyword Research**         | Sensor Tower                    | Competition alerts                          |
| **Competitor Analysis**      | Asodesk                         | Organic attribution                         |
| **A/B Testing (pre-launch)** | SplitMetrics, Storemaven        | Fake landing pages                          |
| **Analytics**                | App Store Connect, Play Console | Native, free                                |

## Anti-Patterns

**Keyword Optimization:**

- ❌ Stuffing irrelevant high-volume keywords
- ❌ Repeating keywords across Title/Subtitle/Keyword field
- ❌ Using spaces in iOS keyword field
- ❌ Ignoring long-tail keywords

**Screenshot Optimization:**

- ❌ Generic screenshots without text overlays
- ❌ Text too small to read in search results
- ❌ Inconsistent visual style
- ❌ Features before benefits

**A/B Testing:**

- ❌ Testing without hypothesis
- ❌ Ending tests before statistical significance
- ❌ Changing multiple variables at once
- ❌ Running campaigns during tests (noise)

**General:**

- ❌ Copy-pasting web SEO keywords without validation
- ❌ Ignoring platform differences (iOS vs Android)
- ❌ Set-and-forget approach (ASO is ongoing)
- ❌ Optimizing for rankings without conversion

## Quick Start Checklist

### New App Launch

- [ ] Research 50+ keywords from competitors and autocomplete
- [ ] Prioritize top 15-20 by Volume × Relevance
- [ ] Write Title (30 chars) with primary keyword
- [ ] Write Subtitle (30 chars) with secondary keywords
- [ ] Fill Keyword field (100 chars, comma-separated, no spaces)
- [ ] Create 5-8 screenshots following structure
- [ ] Design icon (test 2-3 variants if time allows)
- [ ] Set up App Store Connect / Play Console analytics

### Existing App Optimization

- [ ] Audit current keyword rankings
- [ ] Identify keyword gaps vs competitors
- [ ] Analyze current conversion rate
- [ ] Create hypothesis for improvement
- [ ] Design A/B test variant
- [ ] Run test for 14+ days
- [ ] Implement winner, repeat

## Integration with Other Skills

| Skill              | When to Use Together                         |
| ------------------ | -------------------------------------------- |
| `product-copy`     | Writing App Store descriptions               |
| `keyword-research` | Initial keyword discovery (adapt for mobile) |
| `seo-optimization` | Cross-reference web SEO keywords             |
| `ux-optimization`  | Screenshot UX principles                     |

## Sources

- Advanced App Store Optimization Book (Phiture + AppTweak)
- Apple App Store Guidelines
- Google Play Console Documentation
