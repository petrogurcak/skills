---
name: ai-ready
description: Use when making websites discoverable by AI agents (ChatGPT, Perplexity, Claude, Gemini) - llms.txt, robots.txt for AI crawlers, markdown serving, structured data for AI citations
---

# AI-Ready Website

Make your website discoverable and citable by AI search engines and agents.

**When to use:**
- Launching new website and want AI discoverability
- Existing site not appearing in AI search results (ChatGPT, Perplexity)
- Want to optimize for AI citations and referral traffic
- Setting up a SaaS marketing site

**When NOT to use:**
- Traditional Google SEO → use `seo-optimization`
- Technical performance audit → use `technical-seo`
- Keyword research → use `keyword-research`

**Context:**
- AI referral traffic grows 357% YoY
- 80% of AI-cited sources don't rank in Google top 100 — AI picks different sources
- Pages with FAQPage schema get 3.4x more Perplexity citations
- AI engines favor information-dense, structured, frequently updated content

---

## Quick Router

| User says... | Go to... |
|---|---|
| "chci byt v ChatGPT", "AI search" | Full Audit (all phases) |
| "llms.txt", "jak na llms.txt" | Phase 1: llms.txt |
| "robots.txt pro AI", "AI crawlers" | Phase 2: robots.txt |
| "markdown pro agenty", "Accept header" | Phase 3: Markdown Serving |
| "structured data pro AI", "schema" | Phase 4: Structured Data |
| "jak merit AI traffic" | Phase 5: Monitoring |

---

## Phase 1: llms.txt

**What:** Markdown file at `/llms.txt` — curated map of your site for AI agents.
**Spec:** https://llmstxt.org/
**Adoption:** 844,000+ websites (Anthropic, Cloudflare, Stripe use it).

### Format

```markdown
# [Project Name]

> [One-sentence description with key info]

## Docs
- [Page Name](https://example.com/page): Short description
- [Another Page](https://example.com/other): Short description

## API
- [Endpoint Docs](https://example.com/api): API reference

## Optional
- [Blog](https://example.com/blog): Articles and updates
- [About](https://example.com/about): Company info
```

**Rules:**
1. H1 = project name (required)
2. Blockquote = short summary (optional but recommended)
3. H2 sections with link lists
4. Each link: `[name](url): description`
5. `## Optional` section = can be skipped for shorter context
6. Keep it curated — only your best/most important pages

### Template for SaaS Marketing Site

```markdown
# [Product Name]

> [What it does, for whom, key differentiator]

## Product
- [Features](https://product.com/features): Complete feature overview
- [Pricing](https://product.com/pricing): Plans and pricing
- [How It Works](https://product.com/how-it-works): Step-by-step guide

## Resources
- [FAQ](https://product.com/faq): Frequently asked questions
- [Getting Started](https://product.com/docs/getting-started): Quick start guide

## Optional
- [Blog](https://product.com/blog): Industry articles and updates
- [About](https://product.com/about): Company information
- [Contact](https://product.com/contact): Contact details
```

### llms-full.txt

Optional companion file at `/llms-full.txt` — complete content of your site in one markdown file. Useful for agents that want full context in one request. Generate from your key pages.

### HTTP Headers to Advertise

Add to ALL page responses (nginx):

```nginx
add_header Link '</llms.txt>; rel="llms-txt"';
```

This lets agents discover your llms.txt from any page without inspecting the body.

---

## Phase 2: robots.txt for AI Crawlers

### AI Crawler Reference

| Crawler | Company | Purpose | Allow? |
|---|---|---|---|
| GPTBot | OpenAI | Model training | Your choice |
| ChatGPT-User | OpenAI | Real-time browsing for users | YES |
| OAI-SearchBot | OpenAI | Search indexing | YES |
| ClaudeBot | Anthropic | Model training | Your choice |
| Claude-User | Anthropic | Real-time user access | YES |
| Claude-SearchBot | Anthropic | Search indexing | YES |
| Google-Extended | Google | Gemini training | Your choice |
| Gemini-Deep-Research | Google | Research agent | YES |
| PerplexityBot | Perplexity | Answer engine | YES |
| Perplexity-User | Perplexity | Real-time browsing | YES |
| Meta-ExternalAgent | Meta | LLM training (Llama) | Your choice |
| Bytespider | ByteDance | TikTok LLM training | NO (aggressive) |
| CCBot | Common Crawl | Open archive | Your choice |
| DuckAssistBot | DuckDuckGo | Search indexing | YES |
| Amazonbot | Amazon | Alexa/AI services | Your choice |

### Recommended robots.txt

**Strategy:** Allow search/browsing bots (they drive traffic). Training bots = your choice.

```
# AI Search & Browsing — ALLOW (drives referral traffic)
User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Gemini-Deep-Research
Allow: /

User-agent: DuckAssistBot
Allow: /

# AI Training — BLOCK (optional, no traffic benefit)
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

# Sitemap
Sitemap: https://example.com/sitemap.xml
```

**Note:** Blocking training bots does NOT prevent your site from appearing in AI search results. Search bots and training bots are separate.

---

## Phase 3: Markdown Serving (Self-Hosted)

Serve markdown versions of your pages when AI agents request them via `Accept: text/markdown` header.

### Step 1: Generate Markdown Versions

At build/deploy time, convert HTML pages to markdown:

```bash
# Using html-to-markdown CLI
mkdir -p /var/www/site/markdown
find /var/www/site/html -type f -name "*.html" | while read -r file; do
    relative="${file#/var/www/site/html/}"
    dest="/var/www/site/markdown/${relative%.html}.md"
    mkdir -p "$(dirname "$dest")"
    npx @wcj/html-to-markdown-cli "$file" --stdout > "$dest"
done
```

Or for PHP sites (Nette), create a simple script/command that renders pages and converts to markdown.

### Step 2: Nginx Content Negotiation

```nginx
# Detect Accept: text/markdown header
map $http_accept $is_markdown_request {
    default         0;
    "~text/markdown" 1;
}

server {
    # ... existing config ...

    # Markdown for AI agents
    location / {
        if ($is_markdown_request) {
            rewrite ^/(.*)$ /markdown/$1.md last;
        }

        # Normal HTML serving
        # ... existing rules ...
    }

    # Serve markdown files
    location /markdown/ {
        alias /var/www/site/markdown/;
        types { text/markdown md; }
        default_type text/markdown;
        add_header X-Markdown-Tokens $upstream_http_x_markdown_tokens;
        add_header Content-Signal "ai-input=yes, search=yes";
    }
}
```

### Step 3: Content-Signal Header

Tell AI agents what they can do with your content:

```nginx
# On all responses
add_header Content-Signal "search=yes, ai-input=yes";

# If you DON'T want training:
add_header Content-Signal "search=yes, ai-input=yes, ai-train=no";
```

Signals:
- `search=yes` — appear in AI search results
- `ai-input=yes` — agents can use content for user queries
- `ai-train=no` — don't use for model training

---

## Phase 4: Structured Data for AI

AI engines strongly prefer structured content. GPT-4 accuracy jumps from 16% to 54% with proper structured data.

### Priority Schemas for SaaS

**1. SoftwareApplication** (product pages):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Editor.menu",
  "description": "Digital menu editor for restaurants",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CZK"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "120"
  }
}
```

**2. FAQPage** (3.4x more Perplexity citations):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a digital menu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sign up at editor.menu, upload your dishes, and publish. Takes under 5 minutes."
      }
    }
  ]
}
```

**3. Organization** (Knowledge Panel):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://instagram.com/company",
    "https://linkedin.com/company/company"
  ]
}
```

**4. HowTo** (tutorial/guide pages):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to set up a digital menu",
  "step": [
    {"@type": "HowToStep", "name": "Sign up", "text": "Create account at editor.menu"},
    {"@type": "HowToStep", "name": "Add dishes", "text": "Upload your menu items"},
    {"@type": "HowToStep", "name": "Publish", "text": "Share QR code with customers"}
  ]
}
```

### Implementation

Place JSON-LD in `<script type="application/ld+json">` in `<head>`. Use Google's Rich Results Test to validate: https://search.google.com/test/rich-results

---

## Phase 5: Monitoring AI Traffic

### UTM Patterns from AI Sources

AI search engines add referrer data. Track these in Google Analytics:

| Source | Referrer Pattern |
|---|---|
| ChatGPT | `chatgpt.com`, `chat.openai.com` |
| Perplexity | `perplexity.ai` |
| Google AI | Shows as organic with AI-related queries |
| Claude | `claude.ai` |
| Bing Copilot | `bing.com` (with copilot parameter) |

### GA4 Setup

Create a custom channel group for "AI Referral":
1. GA4 → Admin → Channel Groups
2. Add new group: "AI Search"
3. Rules: Source matches `chatgpt.com|perplexity.ai|claude.ai|you.com`

### What to Track

- **AI referral sessions** — how much traffic comes from AI
- **Conversion rate from AI referrals** — ChatGPT: 15.9%, Perplexity: 10.5% (higher than organic!)
- **Which pages get cited** — check in Perplexity by searching your brand/product

---

## Audit Checklist

Run this for each website:

### Must Have (1 evening)
- [ ] `/llms.txt` exists and is well-structured
- [ ] `robots.txt` allows AI search bots (ChatGPT-User, PerplexityBot, Claude-SearchBot)
- [ ] `robots.txt` blocks aggressive training bots (Bytespider)
- [ ] FAQPage schema on marketing pages
- [ ] Organization schema on homepage
- [ ] SoftwareApplication schema on product pages (SaaS)
- [ ] Link header advertising llms.txt

### Should Have (next sprint)
- [ ] Content-Signal headers set
- [ ] Markdown serving via nginx (Accept header negotiation)
- [ ] GA4 "AI Search" channel group configured
- [ ] `/llms-full.txt` with complete site content
- [ ] HowTo schema on tutorial pages

### Content Principles for AI
- [ ] Information-dense copy (facts, numbers, concrete data)
- [ ] Content updated regularly (AI favors 48-72h freshness)
- [ ] Clear structure (headings, lists, tables)
- [ ] Third-party mentions (industry blogs, forums, reviews)

---

## Sources

- https://llmstxt.org/ — llms.txt specification
- https://blog.cloudflare.com/markdown-for-agents/ — Cloudflare Markdown for Agents
- https://www.skeptrune.com/posts/use-the-accept-header-to-serve-markdown-instead-of-html-to-llms/ — Self-hosted markdown serving
- https://www.searchenginejournal.com/ai-crawler-user-agents-list/558130/ — AI crawler user agents
