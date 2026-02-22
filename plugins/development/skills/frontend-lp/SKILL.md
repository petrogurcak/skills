---
name: frontend-lp
description: Docs-first development workflow for landing pages, marketing websites, and product showcases using React/Vite/Tailwind/shadcn/Magic UI with animated components and premium UI. Use when building static marketing pages, product showcases, or conversion-focused landing pages. Trigger phrases - "landing page", "marketing site", "product showcase", "LP", "homepage", "sales page", "launch page". NOT for web applications with auth/state/CRUD (use frontend-app instead) or mobile apps (use expo-workflow/flutter-workflow).
metadata:
  author: Petr
  version: 1.0.0
hooks:
  PostToolUse:
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/ts-check.sh"
          timeout: 30
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/auto-prettier.sh"
          timeout: 10
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/console-log-check.sh"
          timeout: 5
---

# Frontend Landing Page Skill

## Router

```
What are you building?
├─ Web application (dashboard, CRUD, auth, state management)
│  └─ Use: frontend-app (or frontend-workflow for non-React)
├─ Landing page / Marketing website / Product showcase
│  └─ Use: THIS SKILL (frontend-lp)
├─ Mobile app
│  └─ Use: expo-workflow or flutter-workflow
└─ API backend
   └─ Use: fastapi-workflow
```

## CRITICAL PRINCIPLE

**DOCS FIRST, CODE SECOND**

You MUST NEVER generate React/Tailwind/shadcn/Magic UI code without first fetching relevant documentation via MCP tools.

This is NON-NEGOTIABLE for all landing page development tasks.

**Available MCP Tools (use these at every step marked with MANDATORY):**

1. `mcp__expo-mcp__fetch_npm_docs(package_name)` - Fetch npm package docs (shadcn, framer-motion, etc.)
2. `mcp__expo-mcp__fetch_rn_docs(topic)` - React patterns reference
3. Web search for Tailwind 4.x, shadcn/ui, Magic UI docs

## When to Use This Skill

Use this skill for:

- Product landing pages (SaaS, apps, physical products)
- Marketing websites with animated sections
- Launch pages (pre-launch, coming soon)
- Product showcases with premium UI
- One-page sites with scroll-based sections

Do NOT use for:

- Web applications with routing, auth, state management (use frontend-app)
- E-commerce with cart/checkout logic (use frontend-workflow)
- Mobile apps (use expo-workflow or flutter-workflow)

## Tech Stack

| Layer      | Technology            | Purpose                                                       |
| ---------- | --------------------- | ------------------------------------------------------------- |
| Build      | Vite 6.x              | Fast dev server, optimized builds                             |
| Framework  | React 19 + TypeScript | Component architecture                                        |
| Styling    | Tailwind CSS 4.x      | Utility-first CSS                                             |
| Components | shadcn/ui             | 70+ accessible base components (copy-paste, you own the code) |
| Animations | Magic UI              | 150+ animated components built on shadcn                      |
| Motion     | Framer Motion         | Custom animations and transitions                             |

---

## Workflow 1: Project Setup

**Use for:** Starting a new landing page project from scratch

**MANDATORY CHECKLIST:**

```
[1] Create Vite + React + TypeScript project
    pnpm create vite@latest project-name --template react-ts
    cd project-name && pnpm install

[2] Install Tailwind CSS 4.x
    pnpm install tailwindcss @tailwindcss/vite
    Add Tailwind plugin to vite.config.ts:
      import tailwindcss from '@tailwindcss/vite'
      plugins: [react(), tailwindcss()]
    Replace CSS with: @import "tailwindcss";

[3] Initialize shadcn/ui
    pnpm dlx shadcn@latest init
    Select: New York style, Zinc base color, CSS variables: yes

[4] Install common shadcn components
    pnpm dlx shadcn@latest add button card badge separator

[5] Install Magic UI components (as needed)
    pnpm dlx shadcn@latest add "https://magicui.design/r/globe"
    pnpm dlx shadcn@latest add "https://magicui.design/r/marquee"
    pnpm dlx shadcn@latest add "https://magicui.design/r/particles"
    (Magic UI uses same shadcn CLI - components go to src/components/magicui/)

[6] Install Framer Motion
    pnpm install framer-motion

[7] Project structure
    src/
    ├── components/
    │   ├── ui/              # shadcn/ui components (auto-generated)
    │   ├── magicui/         # Magic UI components (auto-generated)
    │   ├── sections/        # Landing page sections
    │   │   ├── Hero.tsx
    │   │   ├── Features.tsx
    │   │   ├── SocialProof.tsx
    │   │   ├── Pricing.tsx
    │   │   ├── CTA.tsx
    │   │   └── Footer.tsx
    │   └── shared/          # Reusable custom components
    ├── lib/
    │   └── utils.ts         # shadcn cn() utility
    ├── App.tsx              # Main layout - assembles sections
    ├── main.tsx
    └── index.css            # Tailwind imports + custom CSS vars

[8] Configure TypeScript strict mode
    tsconfig.json: "strict": true, "noImplicitAny": true

[9] VERIFY setup:
    pnpm dev → page loads without errors
    shadcn Button renders correctly
    Tailwind utilities apply
```

---

## Workflow 2: Landing Page Layout

**Use for:** Building the complete landing page section by section

**MANDATORY CHECKLIST:**

```
[1] Plan page sections in order:
    - Navigation (sticky, transparent → solid on scroll)
    - Hero (above the fold, primary CTA)
    - Social proof (logos, testimonials, stats)
    - Features (what it does, bento grid)
    - How it works (steps, process)
    - Pricing (tiers, comparison)
    - FAQ (accordion)
    - Final CTA (repeat primary CTA)
    - Footer (links, legal, social)

[2] MANDATORY: Fetch documentation before implementing
    - Fetch Tailwind docs for layout patterns
    - Fetch shadcn/ui docs for components you plan to use
    - Fetch Magic UI docs for animated components

[3] Implement Hero section:
    - Full viewport height (min-h-screen or min-h-[80vh])
    - Headline: clear value proposition (text-4xl md:text-6xl font-bold)
    - Subheadline: supporting text (text-lg md:text-xl text-muted-foreground)
    - Primary CTA button (shadcn Button, size="lg")
    - Optional: secondary CTA (variant="outline")
    - Background: Magic UI component (Particles, Grid Pattern, Dot Pattern)
    - Animated entrance (Framer Motion fade-in + slide-up)

[4] Implement Features section:
    - Section heading + description
    - Bento Grid layout (Magic UI BentoGrid or CSS grid)
    - Feature cards with icons, title, description
    - Responsive: 1 col mobile, 2 cols tablet, 3-4 cols desktop

[5] Implement Social Proof section:
    - Logo marquee (Magic UI Marquee for client logos)
    - Testimonial cards (shadcn Card)
    - Stats/numbers (Magic UI NumberTicker for animated counters)
    - Trust badges

[6] Implement Pricing section:
    - Pricing cards (shadcn Card with Badge for "Popular")
    - Feature comparison list
    - CTA button per tier
    - Monthly/yearly toggle (shadcn Switch or Tabs)
    - Highlight recommended tier (ring-2 ring-primary)

[7] Implement CTA section:
    - Compelling headline
    - Single focused action
    - Optional: urgency element (limited time, spots left)
    - Background contrast (bg-primary text-primary-foreground)

[8] Implement Footer:
    - Link columns (Product, Company, Resources, Legal)
    - Social media links
    - Copyright
    - Responsive grid: stacked on mobile, columns on desktop

[9] VERIFY layout:
    ✓ All sections render correctly
    ✓ Responsive on mobile, tablet, desktop
    ✓ Navigation works (scroll to section)
    ✓ CTAs are prominent and clickable
    ✓ Consistent spacing between sections (py-16 md:py-24)
    ✓ Max content width constrained (max-w-7xl mx-auto px-4)
```

**Example - Hero Section:**

```tsx
// src/components/sections/Hero.tsx
// WORKFLOW: 1. Fetched shadcn Button docs  2. Fetched Magic UI Particles docs
// 3. Fetched Framer Motion fade-in pattern  4. Implementing:

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Particles from "@/components/magicui/particles";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#000000"
        refresh
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Ship your product
          <span className="text-primary"> 10x faster</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground md:text-xl"
        >
          The modern stack for building landing pages that convert. React,
          Tailwind, and beautiful animated components.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="min-w-[200px]">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="min-w-[200px]">
            View Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

**Example - Features Bento Grid:**

```tsx
// src/components/sections/Features.tsx
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    name: "Lightning Fast",
    description:
      "Built on Vite for instant HMR and optimized production builds.",
    className: "col-span-1 md:col-span-2",
  },
  {
    name: "Beautiful Components",
    description:
      "70+ accessible components from shadcn/ui, ready to customize.",
    className: "col-span-1",
  },
  {
    name: "Animated UI",
    description: "150+ animated components from Magic UI for premium feel.",
    className: "col-span-1",
  },
  {
    name: "Mobile First",
    description: "Responsive by default with Tailwind CSS utilities.",
    className: "col-span-1 md:col-span-2",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Everything you need</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A complete toolkit for shipping landing pages fast.
        </p>
      </div>
      <BentoGrid>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
```

---

## Workflow 3: Animated Components

**Use for:** Adding animations and Magic UI components

**Decision Tree - When to Animate:**

```
Component type?
├─ Hero section
│  └─ YES animate: entrance animations, background effects (Particles, Grid)
├─ Feature cards
│  └─ SUBTLE: scroll-triggered fade-in, hover lift
├─ Social proof / logos
│  └─ YES: Marquee for logos, NumberTicker for stats
├─ Pricing cards
│  └─ SUBTLE: hover effects only, no distracting motion
├─ CTA section
│  └─ SUBTLE: pulsing button glow, shine border
├─ Footer
│  └─ NO: static, no animations
└─ Navigation
   └─ NO: functional only (smooth scroll, backdrop blur)
```

**Magic UI Component Reference:**

| Component              | Use Case                                          | Install                                                                        |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Globe                  | Hero background for global/international products | `pnpm dlx shadcn@latest add "https://magicui.design/r/globe"`                  |
| Marquee                | Scrolling logos, testimonials, social proof       | `pnpm dlx shadcn@latest add "https://magicui.design/r/marquee"`                |
| Particles              | Hero/section backgrounds with floating particles  | `pnpm dlx shadcn@latest add "https://magicui.design/r/particles"`              |
| Bento Grid             | Feature showcase in asymmetric grid               | `pnpm dlx shadcn@latest add "https://magicui.design/r/bento-grid"`             |
| Animated Beam          | Connection/flow visualizations                    | `pnpm dlx shadcn@latest add "https://magicui.design/r/animated-beam"`          |
| Meteor                 | Decorative falling meteor effect                  | `pnpm dlx shadcn@latest add "https://magicui.design/r/meteors"`                |
| Ripple                 | Button/click ripple effects                       | `pnpm dlx shadcn@latest add "https://magicui.design/r/ripple"`                 |
| Orbiting Circles       | Orbiting icons around a central element           | `pnpm dlx shadcn@latest add "https://magicui.design/r/orbiting-circles"`       |
| Number Ticker          | Animated counting numbers for stats               | `pnpm dlx shadcn@latest add "https://magicui.design/r/number-ticker"`          |
| Animated Gradient Text | Gradient text with animation                      | `pnpm dlx shadcn@latest add "https://magicui.design/r/animated-gradient-text"` |
| Shine Border           | Shining border effect on cards                    | `pnpm dlx shadcn@latest add "https://magicui.design/r/shine-border"`           |
| Border Beam            | Moving light beam around card borders             | `pnpm dlx shadcn@latest add "https://magicui.design/r/border-beam"`            |
| Cool Mode              | Confetti/emoji explosion on click                 | `pnpm dlx shadcn@latest add "https://magicui.design/r/cool-mode"`              |
| Sparkles               | Sparkle effect on text or elements                | `pnpm dlx shadcn@latest add "https://magicui.design/r/sparkles-text"`          |
| Dock                   | macOS-style dock navigation                       | `pnpm dlx shadcn@latest add "https://magicui.design/r/dock"`                   |
| Blur Fade              | Blur-to-focus scroll reveal                       | `pnpm dlx shadcn@latest add "https://magicui.design/r/blur-fade"`              |
| Word Rotate            | Rotating words in headlines                       | `pnpm dlx shadcn@latest add "https://magicui.design/r/word-rotate"`            |
| Typing Animation       | Typewriter text effect                            | `pnpm dlx shadcn@latest add "https://magicui.design/r/typing-animation"`       |

**Framer Motion Patterns for Landing Pages:**

```tsx
// Fade-in on scroll (reusable wrapper)
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
export function StaggerContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
```

**Performance Rules for Animations:**

```
MANDATORY animation performance rules:
[1] Use viewport={{ once: true }} - animate only on first scroll into view
[2] Prefer transform/opacity animations (GPU-accelerated)
[3] Lazy load heavy components (Globe, Particles) with React.lazy()
[4] Respect prefers-reduced-motion:
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
[5] Limit simultaneous animations to 3-4 per viewport
[6] Use will-change sparingly (only on actively animating elements)
[7] Debounce scroll-triggered animations
```

---

## Workflow 4: Responsive & Mobile

**Use for:** Ensuring landing page works across all devices

**MANDATORY CHECKLIST:**

```
[1] Mobile-first implementation:
    - Write base styles for mobile (no prefix)
    - Add tablet overrides (md:)
    - Add desktop overrides (lg:)
    - Add large screen overrides (xl:, 2xl:)

[2] Tailwind 4.x breakpoints:
    - Default: 0-639px (mobile)
    - sm: 640px+
    - md: 768px+
    - lg: 1024px+
    - xl: 1280px+
    - 2xl: 1536px+

[3] Typography scaling:
    - Hero headline: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    - Section headings: text-2xl md:text-3xl lg:text-4xl
    - Body text: text-base md:text-lg
    - Small text: text-sm

[4] Layout patterns:
    - Sections: px-4 sm:px-6 lg:px-8 (horizontal padding)
    - Content width: max-w-7xl mx-auto
    - Section spacing: py-12 md:py-16 lg:py-24
    - Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

[5] Navigation:
    - Mobile: hamburger menu (sheet/drawer)
    - Desktop: horizontal nav bar
    - Sticky: sticky top-0 z-50 backdrop-blur

[6] Touch-friendly interactions:
    - Minimum tap target: 44x44px (min-h-11 min-w-11)
    - Adequate spacing between tap targets (gap-3 minimum)
    - No hover-only interactions on mobile
    - Swipe support for carousels/testimonials

[7] Images:
    - Responsive: w-full h-auto
    - Art direction: different crops for mobile/desktop if needed
    - Lazy loading: loading="lazy" on below-fold images

[8] VERIFY responsive:
    ✓ Test at 375px (iPhone SE)
    ✓ Test at 768px (iPad)
    ✓ Test at 1024px (laptop)
    ✓ Test at 1440px (desktop)
    ✓ No horizontal scroll on any breakpoint
    ✓ Text readable without zooming
    ✓ CTAs visible and tappable on mobile
    ✓ Animations not janky on mobile
```

---

## Workflow 5: SEO & Performance

**Use for:** Optimizing landing page for search engines and Core Web Vitals

**MANDATORY CHECKLIST:**

```
[1] Meta tags (in index.html or React Helmet):
    <title>Primary Keyword - Brand Name</title>
    <meta name="description" content="150-160 chars with value prop">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="https://yourdomain.com/">

[2] Open Graph tags:
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Description">
    <meta property="og:image" content="https://yourdomain.com/og-image.jpg">
    <meta property="og:url" content="https://yourdomain.com/">
    <meta property="og:type" content="website">

    Twitter Card:
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Description">
    <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg">

[3] OG Image:
    - Size: 1200x630px
    - Include brand logo + value proposition
    - Test with: https://www.opengraph.xyz/

[4] Structured data (JSON-LD):
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Product Name",
      "description": "...",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
    </script>

[5] Core Web Vitals optimization:
    LCP (Largest Contentful Paint) < 2.5s:
    - Preload hero image/font: <link rel="preload">
    - Inline critical CSS (Vite handles this)
    - Avoid layout shifts in hero section

    FID (First Input Delay) < 100ms:
    - Defer non-critical JS
    - Code split with React.lazy()
    - Keep main bundle < 200KB

    CLS (Cumulative Layout Shift) < 0.1:
    - Set explicit width/height on images
    - Reserve space for dynamic content
    - No content injection above fold

[6] Image optimization:
    - Use WebP/AVIF formats (with fallback)
    - Responsive images: srcSet + sizes
    - Lazy load below-fold: loading="lazy"
    - Compress: target < 100KB per image
    - Hero image: preload, no lazy load

[7] Font optimization:
    - Use system font stack OR
    - Preload custom fonts: <link rel="preload" as="font" crossorigin>
    - font-display: swap (prevent FOIT)
    - Limit to 2 font families max
    - Subset fonts (latin only if applicable)

[8] Build optimization (vite.config.ts):
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
            'react-vendor': ['react', 'react-dom'],
          }
        }
      },
      cssMinify: true,
      minify: 'terser',
    }

[9] VERIFY performance:
    ✓ Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
    ✓ LCP < 2.5s
    ✓ FID < 100ms
    ✓ CLS < 0.1
    ✓ Total bundle size < 500KB (gzipped)
    ✓ All images optimized
    ✓ No render-blocking resources
```

---

## Code Quality Requirements

### TypeScript Strict Mode (MANDATORY)

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "types": ["vite/client"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### Component Structure (MANDATORY)

```
Rules:
[1] One component per file
[2] Named exports (not default)
[3] Props interface defined and exported
[4] File name matches component name (PascalCase)
[5] Sections in src/components/sections/
[6] Shared components in src/components/shared/
[7] shadcn components untouched in src/components/ui/
[8] Magic UI components untouched in src/components/magicui/
```

```tsx
// CORRECT: src/components/sections/Pricing.tsx
export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingProps {
  tiers: PricingTier[];
}

export function Pricing({ tiers }: PricingProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* ... */}
    </section>
  );
}
```

### shadcn/ui Theming & Customization

```css
/* src/index.css - Custom theme via CSS variables */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.21 0.006 285.88);
  --color-primary-foreground: oklch(0.985 0 0);
  --color-secondary: oklch(0.967 0.001 286.38);
  --color-secondary-foreground: oklch(0.21 0.006 285.88);
  --color-accent: oklch(0.967 0.001 286.38);
  --color-accent-foreground: oklch(0.21 0.006 285.88);
  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);
}
```

```
Customization rules:
- Modify CSS variables for brand colors, NOT component source
- Extend shadcn components by wrapping, not editing ui/ files
- Use cn() utility for conditional class merging
- Keep dark mode support (shadcn includes it by default)
```

### Tailwind 4.x Best Practices

```
[1] CSS-first configuration (no tailwind.config.js)
    - Use @theme directive in CSS for custom values
    - Use @import "tailwindcss" (not @tailwind directives)

[2] Utility-first (no @apply in components)
    - Use className with Tailwind utilities
    - cn() for conditional classes

[3] Mobile-first responsive (no max-width breakpoints)

[4] Use semantic color tokens from shadcn theme:
    - text-foreground, text-muted-foreground
    - bg-background, bg-card, bg-muted
    - border-border, border-input
    - text-primary, bg-primary
```

---

## Decision Trees

### "Which component library for this element?"

```
Need a UI element?
├─ Basic form control (button, input, select, checkbox)
│  └─ shadcn/ui (accessible, keyboard-navigable)
├─ Card, badge, separator, dialog, sheet
│  └─ shadcn/ui
├─ Animated background (particles, grid, dots)
│  └─ Magic UI
├─ Animated text (gradient, typing, rotating words)
│  └─ Magic UI
├─ Scrolling content (logos, testimonials)
│  └─ Magic UI Marquee
├─ Animated numbers/counters
│  └─ Magic UI NumberTicker
├─ Custom entrance/exit animations
│  └─ Framer Motion
├─ Scroll-triggered animations
│  └─ Framer Motion (whileInView)
└─ Complex gesture animations
   └─ Framer Motion
```

### "Custom CSS or Tailwind?"

```
Can Tailwind utilities handle it?
├─ YES → Use Tailwind utilities (always prefer)
└─ NO → What kind of styling?
    ├─ Brand colors/spacing → Add to @theme in CSS
    ├─ Complex gradient → @theme or inline style
    ├─ Keyframe animation → @keyframes in CSS (or Framer Motion)
    └─ One-off override → inline style="" (rare)
```

### "Animate or not?"

```
Section type?
├─ Hero → YES: entrance animations, background effects
├─ Features → SUBTLE: scroll fade-in, hover effects
├─ Social proof → YES: marquee, number tickers
├─ Pricing → SUBTLE: hover lift on cards only
├─ CTA → SUBTLE: shine border or pulsing button
├─ Footer → NO: completely static
├─ Navigation → NO: functional transitions only (backdrop-blur)
└─ Loading states → YES: skeleton shimmer (shadcn Skeleton)
```

---

### Workflow 6: Scenario Testing (Interactive Sections)

**Use for:** Any section with user interaction (CTA, forms, pricing toggle)

**MANDATORY CHECKLIST:**

```
☐ 1. Identify interactive sections:
     - Hero CTA button (primary action)
     - Pricing toggle (monthly/yearly)
     - Contact/signup form
     - Navigation scroll-to-section
     - FAQ accordion

☐ 2. Define scenario for each:
     "User clicks 'Start Free Trial' → navigates to signup page"
     "User toggles pricing to yearly → prices update with discount"
     "User fills contact form → submits → sees success message"

☐ 3. Implement sections (Workflows 1-5)

☐ 4. Verify each scenario manually:
     - Click each CTA, verify destination
     - Test each form submission
     - Test each toggle/interactive element
     - Test on mobile (touch targets, responsive)

☐ 5. Optional: Write Playwright tests for critical paths
     Priority: signup/purchase CTAs > forms > toggles > navigation
```

## Common Mistakes to Avoid

**DON'T:**

- Use too many Magic UI animations on one page (max 3-4 animated sections)
- Animate everything - footer, nav links, body text should be static
- Forget `prefers-reduced-motion` media query
- Use Magic UI where plain shadcn/ui would suffice (e.g., a simple card)
- Build desktop-first and add mobile breakpoints after
- Skip OG image and meta tags
- Use custom CSS where Tailwind utilities exist
- Put all components in one file
- Disable TypeScript strict mode
- Ignore Core Web Vitals (especially CLS from animations)
- Lazy load hero/above-fold content
- Use more than 2 font families
- Forget to set explicit dimensions on images (causes CLS)

**DO:**

- ALWAYS fetch documentation before implementing
- Follow workflows step-by-step
- Use shadcn/ui for all base components (buttons, cards, inputs)
- Use Magic UI only for premium animated effects
- Use Framer Motion for custom scroll/entrance animations
- Mobile-first responsive design (no prefix = mobile)
- Add `viewport={{ once: true }}` to scroll animations
- Lazy load below-fold Magic UI components (Globe, Particles)
- Preload hero fonts and images
- Test with Lighthouse before shipping
- Keep bundle under 500KB gzipped
- Support dark mode via shadcn theme variables

---

## Integration with MCP Tools

**Before implementing ANY component, fetch docs:**

```
Step 1: Identify what you need
Step 2: Fetch relevant docs via MCP:
  - shadcn component → mcp__expo-mcp__fetch_npm_docs("shadcn")
  - Framer Motion → mcp__expo-mcp__fetch_npm_docs("framer-motion")
  - Specific Magic UI component → web search "magicui.design [component]"
  - Tailwind patterns → web search "tailwindcss.com v4 [topic]"
Step 3: Review the fetched docs
Step 4: Implement based on current docs (not memory)
Step 5: Verify implementation matches docs
```

**Call MCP tools at every step marked with MANDATORY in workflows above.**

---

## Verification Before Completion

Before considering any landing page implementation complete:

```
FINAL VERIFICATION CHECKLIST:

Code Quality:
☐ TypeScript strict mode, no type errors
☐ One component per file, named exports
☐ No console.log statements
☐ Prettier formatted

Layout & Design:
☐ All planned sections implemented
☐ Consistent spacing (py-16 md:py-24 between sections)
☐ Max content width constrained (max-w-7xl mx-auto)
☐ Visual hierarchy clear (headings, subtext, CTAs)

Responsive:
☐ Mobile (375px) - no horizontal scroll, readable text
☐ Tablet (768px) - proper grid layout
☐ Desktop (1440px) - full layout, no stretching
☐ Touch targets >= 44px on mobile

Animations:
☐ Hero has entrance animation
☐ Scroll animations use viewport={{ once: true }}
☐ prefers-reduced-motion respected
☐ No more than 3-4 animated sections
☐ Heavy components (Globe, Particles) lazy loaded

Performance:
☐ Lighthouse Performance > 90
☐ LCP < 2.5s, FID < 100ms, CLS < 0.1
☐ Images optimized (WebP/AVIF, lazy loaded)
☐ Bundle < 500KB gzipped
☐ Fonts preloaded with display:swap

SEO:
☐ Title tag with primary keyword
☐ Meta description (150-160 chars)
☐ OG image (1200x630)
☐ Open Graph + Twitter Card meta tags
☐ Structured data (JSON-LD)
☐ Canonical URL set

Accessibility:
☐ Semantic HTML (section, nav, main, footer)
☐ Alt text on all images
☐ Keyboard navigation works
☐ Focus states visible (focus-visible:)
☐ Color contrast ratio >= 4.5:1
☐ ARIA labels on interactive elements
☐ Skip-to-content link
```

---

## Summary

This skill enforces **DOCS-FIRST** development for landing pages and marketing websites:

1. **Route** - Confirm this is a landing page (not a web app)
2. **Setup** - Vite + React + TypeScript + Tailwind + shadcn + Magic UI
3. **Build sections** - Hero, Features, Social Proof, Pricing, CTA, Footer
4. **Animate** - Magic UI for premium effects, Framer Motion for custom animations
5. **Responsive** - Mobile-first, test all breakpoints
6. **Optimize** - SEO meta tags, Core Web Vitals, bundle size
7. **Verify** - Run through final checklist before shipping

**NEVER skip fetching docs.** Use MCP tools at every MANDATORY step. Current docs prevent outdated patterns and ensure you use the latest APIs.
