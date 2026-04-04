import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface CapsizeTypographyParams {
  topic:
    | 'getting-started'
    | 'metrics'
    | 'createStyleObject'
    | 'createStyleString'
    | 'fontFaceString'
    | 'vertical-rhythm'
    | 'tailwind-integration';
  font_family?: string;
}

interface FontMetrics {
  capHeight: number;
  ascent: number;
  descent: number;
  lineGap: number;
  unitsPerEm: number;
}

export class CapsizeTypographyTool {
  private fetcher: BaseFetcher;

  // Common font metrics for quick reference
  private readonly commonMetrics: Record<string, FontMetrics> = {
    'system-ui': {
      capHeight: 1443,
      ascent: 1950,
      descent: -494,
      lineGap: 0,
      unitsPerEm: 2048,
    },
    arial: {
      capHeight: 1467,
      ascent: 1854,
      descent: -434,
      lineGap: 67,
      unitsPerEm: 2048,
    },
    roboto: {
      capHeight: 1456,
      ascent: 1900,
      descent: -500,
      lineGap: 0,
      unitsPerEm: 2048,
    },
    inter: {
      capHeight: 1490,
      ascent: 1984,
      descent: -494,
      lineGap: 0,
      unitsPerEm: 2048,
    },
    'open-sans': {
      capHeight: 1462,
      ascent: 2189,
      descent: -600,
      lineGap: 0,
      unitsPerEm: 2048,
    },
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchDocs(params: CapsizeTypographyParams): Promise<string> {
    const { topic, font_family } = params;

    switch (topic) {
      case 'getting-started':
        return this.getGettingStarted();

      case 'metrics':
        return this.getMetricsInfo(font_family);

      case 'createStyleObject':
        return this.getCreateStyleObjectDocs();

      case 'createStyleString':
        return this.getCreateStyleStringDocs();

      case 'fontFaceString':
        return this.getFontFaceStringDocs();

      case 'vertical-rhythm':
        return this.getVerticalRhythmGuide();

      case 'tailwind-integration':
        return this.getTailwindIntegration();

      default:
        return this.getGettingStarted();
    }
  }

  private getGettingStarted(): string {
    return `# Capsize Typography - Getting Started

## What is Capsize?

Capsize makes the sizing and layout of text as predictable as every other element on the screen. Using font metadata, text can be sized according to the height of its capital letters while trimming the space above capitals and below the baseline.

## Installation

\`\`\`bash
npm install @capsizecss/core @capsizecss/metrics
\`\`\`

## Basic Usage

\`\`\`typescript
import { createStyleObject } from '@capsizecss/core';
import arialMetrics from '@capsizecss/metrics/arial';

// Option 1: Using capHeight + lineGap
const styles = createStyleObject({
  capHeight: 24,        // Height of capital letters in px
  lineGap: 16,          // Gap between lines in px
  fontMetrics: arialMetrics,
});

// Option 2: Using fontSize + leading
const styles2 = createStyleObject({
  fontSize: 18,         // Font size in px
  leading: 28,          // Line height measured from baseline
  fontMetrics: arialMetrics,
});
\`\`\`

## Output

Capsize generates CSS that includes:
- \`fontSize\` - Calculated font size
- \`lineHeight\` - Calculated line height
- \`::before\` pseudo-element - Trims space above cap height
- \`::after\` pseudo-element - Trims space below baseline

## Key Concepts

1. **Cap Height** - The height of capital letters (not font-size!)
2. **Leading** - Line height measured from baseline to baseline
3. **Line Gap** - Space between descender of one line and cap height of next
4. **Font Metrics** - Measurements extracted from the font file itself

## Why Use Capsize?

- **Predictable spacing** - No more guessing with magic numbers
- **Optical alignment** - Text aligns perfectly with other elements
- **Cross-font consistency** - Different fonts look harmonious
- **Design system friendly** - Define spacing in meaningful units

## Resources

- Playground: https://seek-oss.github.io/capsize/
- GitHub: https://github.com/seek-oss/capsize
- npm: https://www.npmjs.com/package/@capsizecss/core
`;
  }

  private getMetricsInfo(fontFamily?: string): string {
    let metricsSection = '';

    if (fontFamily) {
      const normalizedFont = fontFamily.toLowerCase().replace(/\s+/g, '-');
      const metrics = this.commonMetrics[normalizedFont];

      if (metrics) {
        metricsSection = `
## Metrics for "${fontFamily}"

\`\`\`typescript
import ${normalizedFont.replace(/-/g, '')}Metrics from '@capsizecss/metrics/${normalizedFont}';

// Metrics:
const metrics = {
  capHeight: ${metrics.capHeight},
  ascent: ${metrics.ascent},
  descent: ${metrics.descent},
  lineGap: ${metrics.lineGap},
  unitsPerEm: ${metrics.unitsPerEm},
};
\`\`\`
`;
      } else {
        metricsSection = `
## Metrics for "${fontFamily}"

Font not in quick reference. Import from @capsizecss/metrics:

\`\`\`typescript
// For Google Fonts:
import metrics from '@capsizecss/metrics/${normalizedFont}';

// For custom fonts, extract metrics:
// 1. Use the Capsize playground: https://seek-oss.github.io/capsize/
// 2. Or use fontkit directly
\`\`\`
`;
      }
    }

    return `# Capsize Font Metrics

## What are Font Metrics?

Font metrics are measurements extracted from the font file that describe the font's geometry:

- **capHeight** - Height of capital letters
- **ascent** - Maximum height above baseline
- **descent** - Maximum depth below baseline (negative)
- **lineGap** - Additional line spacing defined by font
- **unitsPerEm** - Font's internal grid size (usually 1000 or 2048)

## Available Metrics Package

\`\`\`bash
npm install @capsizecss/metrics
\`\`\`

This package includes metrics for:
- All Google Fonts
- System fonts (Arial, Times New Roman, etc.)
- Common web fonts

## Usage

\`\`\`typescript
// Import specific font metrics
import arialMetrics from '@capsizecss/metrics/arial';
import robotoMetrics from '@capsizecss/metrics/roboto';
import interMetrics from '@capsizecss/metrics/inter';

// Use with createStyleObject
import { createStyleObject } from '@capsizecss/core';

const styles = createStyleObject({
  capHeight: 24,
  lineGap: 16,
  fontMetrics: arialMetrics,
});
\`\`\`

${metricsSection}

## Common Font Metrics Reference

| Font | capHeight | ascent | descent | lineGap | unitsPerEm |
|------|-----------|--------|---------|---------|------------|
| Arial | 1467 | 1854 | -434 | 67 | 2048 |
| Roboto | 1456 | 1900 | -500 | 0 | 2048 |
| Inter | 1490 | 1984 | -494 | 0 | 2048 |
| Open Sans | 1462 | 2189 | -600 | 0 | 2048 |
| System UI | 1443 | 1950 | -494 | 0 | 2048 |

## Custom Font Metrics

For fonts not in the metrics package:

1. **Use the Capsize Playground** - Drag & drop your font file
2. **Use fontkit** - Extract metrics programmatically
3. **Manual calculation** - Use font editor or online tools
`;
  }

  private getCreateStyleObjectDocs(): string {
    return `# createStyleObject()

Returns a CSS-in-JS style object for use with React, Emotion, styled-components, etc.

## Import

\`\`\`typescript
import { createStyleObject } from '@capsizecss/core';
\`\`\`

## Parameters

Two modes of specifying size:

### Mode 1: capHeight + lineGap

\`\`\`typescript
const styles = createStyleObject({
  capHeight: 24,      // Height of capital letters in px
  lineGap: 16,        // Gap between lines in px
  fontMetrics: {
    capHeight: 1467,
    ascent: 1854,
    descent: -434,
    lineGap: 67,
    unitsPerEm: 2048,
  },
});
\`\`\`

### Mode 2: fontSize + leading

\`\`\`typescript
const styles = createStyleObject({
  fontSize: 18,       // Traditional font-size in px
  leading: 28,        // Line height from baseline to baseline
  fontMetrics: arialMetrics,
});
\`\`\`

## Output Structure

\`\`\`typescript
{
  fontSize: '18px',
  lineHeight: '28px',
  '::before': {
    content: '""',
    marginBottom: '-0.1234em',
    display: 'table',
  },
  '::after': {
    content: '""',
    marginTop: '-0.1234em',
    display: 'table',
  },
}
\`\`\`

## React Example

\`\`\`tsx
import { createStyleObject } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

const headingStyles = createStyleObject({
  capHeight: 32,
  lineGap: 24,
  fontMetrics: interMetrics,
});

function Heading({ children }) {
  return <h1 style={headingStyles}>{children}</h1>;
}
\`\`\`

## With Emotion/styled-components

\`\`\`tsx
import styled from '@emotion/styled';
import { createStyleObject } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

const Heading = styled.h1({
  fontFamily: 'Inter, sans-serif',
  ...createStyleObject({
    capHeight: 32,
    lineGap: 24,
    fontMetrics: interMetrics,
  }),
});
\`\`\`
`;
  }

  private getCreateStyleStringDocs(): string {
    return `# createStyleString()

Returns a CSS string for use in stylesheets, style tags, or vanilla CSS.

## Import

\`\`\`typescript
import { createStyleString } from '@capsizecss/core';
\`\`\`

## Parameters

Same as createStyleObject - supports both modes:

\`\`\`typescript
// Mode 1: capHeight + lineGap
const cssString = createStyleString('heading', {
  capHeight: 32,
  lineGap: 24,
  fontMetrics: interMetrics,
});

// Mode 2: fontSize + leading
const cssString = createStyleString('body-text', {
  fontSize: 16,
  leading: 24,
  fontMetrics: interMetrics,
});
\`\`\`

## Output

\`\`\`css
.heading {
  font-size: 36.5714px;
  line-height: 56px;
}

.heading::before {
  content: "";
  margin-bottom: -0.4286em;
  display: table;
}

.heading::after {
  content: "";
  margin-top: -0.3810em;
  display: table;
}
\`\`\`

## Usage in Vanilla CSS/HTML

\`\`\`typescript
import { createStyleString } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

// Generate styles
const headingCSS = createStyleString('heading', {
  capHeight: 32,
  lineGap: 24,
  fontMetrics: interMetrics,
});

const bodyCSS = createStyleString('body-text', {
  fontSize: 16,
  leading: 24,
  fontMetrics: interMetrics,
});

// Inject into page
const styleTag = document.createElement('style');
styleTag.textContent = headingCSS + bodyCSS;
document.head.appendChild(styleTag);
\`\`\`

## Build-time Generation

\`\`\`typescript
// generate-typography.ts
import { createStyleString } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';
import fs from 'fs';

const typographyStyles = [
  createStyleString('h1', { capHeight: 48, lineGap: 32, fontMetrics: interMetrics }),
  createStyleString('h2', { capHeight: 36, lineGap: 24, fontMetrics: interMetrics }),
  createStyleString('h3', { capHeight: 28, lineGap: 20, fontMetrics: interMetrics }),
  createStyleString('body', { fontSize: 16, leading: 24, fontMetrics: interMetrics }),
  createStyleString('small', { fontSize: 14, leading: 20, fontMetrics: interMetrics }),
].join('\\n');

fs.writeFileSync('typography.css', typographyStyles);
\`\`\`
`;
  }

  private getFontFaceStringDocs(): string {
    return `# createFontStack() - Font Fallback Alignment

Creates @font-face declarations for fallback fonts that match the metrics of your primary font. This dramatically improves Cumulative Layout Shift (CLS).

## Import

\`\`\`typescript
import { createFontStack } from '@capsizecss/core';
\`\`\`

## The Problem

When a web font loads, it often causes layout shift because fallback fonts have different metrics:

\`\`\`
Before: Arial (fallback) - different cap height, x-height
After:  Roboto (loaded) - text shifts, layout breaks
\`\`\`

## The Solution

\`\`\`typescript
import { createFontStack } from '@capsizecss/core';
import robotoMetrics from '@capsizecss/metrics/roboto';
import arialMetrics from '@capsizecss/metrics/arial';

const { fontFamily, fontFaces } = createFontStack([
  robotoMetrics,   // Primary font
  arialMetrics,    // Fallback - will be adjusted
]);

// fontFamily = '"Roboto", "Roboto Fallback: Arial", Arial'
// fontFaces = '@font-face { font-family: "Roboto Fallback: Arial"; ... }'
\`\`\`

## Output

\`\`\`css
/* Generated @font-face */
@font-face {
  font-family: "Roboto Fallback: Arial";
  src: local("Arial");
  size-adjust: 100.234%;
  ascent-override: 92.345%;
  descent-override: 23.456%;
  line-gap-override: 0%;
}
\`\`\`

## Usage in CSS

\`\`\`typescript
import { createFontStack } from '@capsizecss/core';
import robotoMetrics from '@capsizecss/metrics/roboto';
import arialMetrics from '@capsizecss/metrics/arial';
import timesMetrics from '@capsizecss/metrics/times-new-roman';

const { fontFamily, fontFaces } = createFontStack([
  robotoMetrics,
  arialMetrics,
  timesMetrics,  // Can have multiple fallbacks
]);

// Inject font-faces
const style = document.createElement('style');
style.textContent = fontFaces;
document.head.appendChild(style);

// Use font-family
document.body.style.fontFamily = fontFamily;
\`\`\`

## Benefits

1. **Reduced CLS** - Fallback fonts match primary font metrics
2. **Better perceived performance** - Text looks right immediately
3. **No JavaScript required** - Pure CSS solution after generation
`;
  }

  private getVerticalRhythmGuide(): string {
    return `# Vertical Rhythm with Capsize

## What is Vertical Rhythm?

Vertical rhythm is a typographic practice that ensures consistent vertical spacing throughout a design. All vertical measurements are multiples of a base unit (the "baseline").

## Traditional Problem

In traditional CSS:
- Font metrics add unpredictable space above/below text
- "half-leading" creates invisible spacing
- Margins/paddings don't align text to baseline grid
- Different fonts have different built-in spacing

## Capsize Solution

Capsize trims the "half-leading" so text boxes contain ONLY the text:

\`\`\`
Traditional:    [---padding---][cap + half-leading][---padding---]
With Capsize:   [---padding---][cap height only][---padding---]
\`\`\`

## Implementing Vertical Rhythm

### Step 1: Define Baseline Unit

\`\`\`typescript
const BASELINE = 8; // 8px grid (common in design systems)
\`\`\`

### Step 2: Create Typography Scale

\`\`\`typescript
import { createStyleObject } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

const typography = {
  h1: createStyleObject({
    capHeight: BASELINE * 5,  // 40px cap height
    lineGap: BASELINE * 3,    // 24px between lines
    fontMetrics: interMetrics,
  }),

  h2: createStyleObject({
    capHeight: BASELINE * 4,  // 32px
    lineGap: BASELINE * 2,    // 16px
    fontMetrics: interMetrics,
  }),

  body: createStyleObject({
    capHeight: BASELINE * 2,  // 16px
    lineGap: BASELINE * 2,    // 16px
    fontMetrics: interMetrics,
  }),

  small: createStyleObject({
    capHeight: BASELINE * 1.5,  // 12px
    lineGap: BASELINE * 1.5,    // 12px
    fontMetrics: interMetrics,
  }),
};
\`\`\`

### Step 3: Define Spacing

\`\`\`typescript
const spacing = {
  xs: BASELINE,           // 8px
  sm: BASELINE * 2,       // 16px
  md: BASELINE * 3,       // 24px
  lg: BASELINE * 4,       // 32px
  xl: BASELINE * 6,       // 48px
};
\`\`\`

### Step 4: Apply Consistently

\`\`\`tsx
<article>
  <h1 style={{ ...typography.h1, marginBottom: spacing.md }}>
    Heading
  </h1>
  <p style={{ ...typography.body, marginBottom: spacing.sm }}>
    Body text paragraph.
  </p>
</article>
\`\`\`

## Debug Grid Overlay

\`\`\`css
/* Add to body for debugging */
body {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 0, 0, 0.1) 1px,
    transparent 1px
  );
  background-size: 100% 8px; /* Match your BASELINE */
}
\`\`\`

## Benefits

1. **Visual harmony** - All elements align to grid
2. **Predictable spacing** - No magic numbers
3. **Easier maintenance** - Change BASELINE, everything scales
4. **Design system friendly** - Tokens map directly to grid
`;
  }

  private getTailwindIntegration(): string {
    return `# Capsize + Tailwind CSS Integration

## Option 1: Generate Utility Classes (Recommended)

Create a script that generates Tailwind-compatible CSS:

\`\`\`typescript
// scripts/generate-typography.ts
import { createStyleString } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';
import fs from 'fs';

const BASELINE = 4; // 4px grid for Tailwind compatibility

const sizes = {
  'xs': { capHeight: BASELINE * 2.5, lineGap: BASELINE * 2 },    // 10px/8px
  'sm': { capHeight: BASELINE * 3, lineGap: BASELINE * 2.5 },    // 12px/10px
  'base': { capHeight: BASELINE * 3.5, lineGap: BASELINE * 3 },  // 14px/12px
  'lg': { capHeight: BASELINE * 4, lineGap: BASELINE * 3.5 },    // 16px/14px
  'xl': { capHeight: BASELINE * 5, lineGap: BASELINE * 4 },      // 20px/16px
  '2xl': { capHeight: BASELINE * 6, lineGap: BASELINE * 5 },     // 24px/20px
  '3xl': { capHeight: BASELINE * 7.5, lineGap: BASELINE * 6 },   // 30px/24px
  '4xl': { capHeight: BASELINE * 9, lineGap: BASELINE * 7 },     // 36px/28px
};

let css = '/* Generated by Capsize - DO NOT EDIT */\\n\\n';

for (const [name, config] of Object.entries(sizes)) {
  css += createStyleString(\`text-cap-\${name}\`, {
    ...config,
    fontMetrics: interMetrics,
  });
  css += '\\n';
}

fs.writeFileSync('src/styles/capsize-typography.css', css);
console.log('Generated capsize-typography.css');
\`\`\`

### Usage

\`\`\`html
<!-- Import generated CSS -->
<link rel="stylesheet" href="/styles/capsize-typography.css">

<!-- Use classes -->
<h1 class="text-cap-4xl font-bold">Heading</h1>
<p class="text-cap-base">Body text</p>
\`\`\`

## Option 2: Tailwind Plugin

\`\`\`typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { createStyleObject } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

const capsizePlugin = plugin(({ addUtilities }) => {
  const BASELINE = 4;

  const utilities = {
    '.text-cap-sm': createStyleObject({
      capHeight: BASELINE * 3,
      lineGap: BASELINE * 2.5,
      fontMetrics: interMetrics,
    }),
    '.text-cap-base': createStyleObject({
      capHeight: BASELINE * 3.5,
      lineGap: BASELINE * 3,
      fontMetrics: interMetrics,
    }),
    '.text-cap-lg': createStyleObject({
      capHeight: BASELINE * 4,
      lineGap: BASELINE * 3.5,
      fontMetrics: interMetrics,
    }),
    // Add more sizes...
  };

  addUtilities(utilities);
});

export default {
  plugins: [capsizePlugin],
} satisfies Config;
\`\`\`

## Option 3: CSS Variables Approach

\`\`\`typescript
// Generate CSS custom properties
import { createStyleObject } from '@capsizecss/core';
import interMetrics from '@capsizecss/metrics/inter';

const baseStyles = createStyleObject({
  capHeight: 14,
  lineGap: 12,
  fontMetrics: interMetrics,
});

// Extract values for CSS variables
console.log(\`
:root {
  --cap-base-size: \${baseStyles.fontSize};
  --cap-base-height: \${baseStyles.lineHeight};
  --cap-base-before: \${baseStyles['::before'].marginBottom};
  --cap-base-after: \${baseStyles['::after'].marginTop};
}
\`);
\`\`\`

## Spacing Alignment

Ensure Tailwind spacing aligns with your baseline:

\`\`\`typescript
// tailwind.config.ts
export default {
  theme: {
    spacing: {
      '0': '0',
      'px': '1px',
      '0.5': '2px',
      '1': '4px',    // BASELINE
      '2': '8px',    // 2 * BASELINE
      '3': '12px',   // 3 * BASELINE
      '4': '16px',   // 4 * BASELINE
      '5': '20px',
      '6': '24px',
      '8': '32px',
      '10': '40px',
      '12': '48px',
      // ...
    },
  },
};
\`\`\`

## Best Practice

1. **Choose baseline** - 4px (Tailwind default) or 8px (Material)
2. **Generate CSS at build time** - Not runtime
3. **Use consistent font** - One set of metrics per font-family
4. **Combine with Tailwind spacing** - Keep rhythm across layout
`;
  }
}
