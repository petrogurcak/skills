import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface SearchTailwindUtilitiesParams {
  query: string;
  category?: 'layout' | 'spacing' | 'typography' | 'colors' | 'all';
}

export class SearchTailwindUtilitiesTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://tailwindcss.com/docs';

  private readonly categoryMap: Record<string, string[]> = {
    layout: [
      'display',
      'flex',
      'grid',
      'position',
      'float',
      'clear',
      'overflow',
      'z-index',
    ],
    spacing: ['padding', 'margin', 'space', 'gap'],
    typography: [
      'font-size',
      'font-weight',
      'text-align',
      'text-color',
      'text-decoration',
      'line-height',
      'letter-spacing',
    ],
    colors: [
      'background-color',
      'text-color',
      'border-color',
      'ring-color',
    ],
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async searchUtilities(
    params: SearchTailwindUtilitiesParams
  ): Promise<string> {
    const query = params.query.toLowerCase();
    const category = params.category || 'all';

    try {
      const results = await this.findUtilities(query, category);

      if (results.length === 0) {
        return this.formatNoResults(query, category);
      }

      return this.formatResults(query, category, results);
    } catch (error) {
      return this.formatError(query, error);
    }
  }

  private async findUtilities(
    query: string,
    category: string
  ): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    // Determine which categories to search
    const categories =
      category === 'all'
        ? Object.keys(this.categoryMap)
        : [category];

    for (const cat of categories) {
      const pages = this.categoryMap[cat] || [];

      for (const page of pages) {
        const url = `${this.baseUrl}/${page}`;

        try {
          const content = await this.fetcher.fetchDoc(url, {
            selector: 'article, .prose, main',
          });

          // Check if query matches this page
          if (
            content.toLowerCase().includes(query) ||
            page.includes(query)
          ) {
            results.push({
              category: cat,
              page,
              url,
              snippet: this.extractRelevantSnippet(
                content,
                query
              ),
            });
          }
        } catch (error) {
          // Skip failed pages
          console.error(
            `Failed to fetch ${page}: ${error}`
          );
        }
      }
    }

    return results;
  }

  private extractRelevantSnippet(
    content: string,
    query: string
  ): string {
    const lines = content.split('\n');
    const matchedLines: string[] = [];
    const context = 5;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes(query)) {
        const start = Math.max(0, i - context);
        const end = Math.min(lines.length, i + context + 1);
        const snippet = lines.slice(start, end).join('\n');

        matchedLines.push(snippet);

        // Only take first 2 matches per page
        if (matchedLines.length >= 2) break;
      }
    }

    return matchedLines.join('\n\n---\n\n');
  }

  private formatResults(
    query: string,
    category: string,
    results: SearchResult[]
  ): string {
    let response = `# Tailwind Utilities Search: "${query}"\n\n`;
    response += `Category: ${category}\n`;
    response += `Found ${results.length} result(s)\n\n`;
    response += `---\n\n`;

    for (const result of results) {
      response += `## ${result.page}\n\n`;
      response += `**Category:** ${result.category}\n`;
      response += `**URL:** ${result.url}\n\n`;
      response += `**Relevant Content:**\n\n`;
      response += result.snippet;
      response += `\n\n---\n\n`;
    }

    response += this.getSearchTips(query);

    return response;
  }

  private formatNoResults(
    query: string,
    category: string
  ): string {
    return `# No Results Found

**Query:** "${query}"
**Category:** ${category}

No Tailwind utilities found matching your search.

**Suggestions:**
- Try a broader search term
- Search in "all" categories
- Check spelling
- Try related terms:
  - Layout: display, flex, grid, position
  - Spacing: padding, margin, gap, space
  - Typography: font, text, line-height, letter-spacing
  - Colors: bg, text, border, ring

**Direct Search:**
Visit https://tailwindcss.com/docs and use the search bar for best results.

**Common Utilities:**

**Layout:**
- \`flex\`, \`grid\`, \`block\`, \`inline\`, \`hidden\`
- \`flex-row\`, \`flex-col\`, \`justify-center\`, \`items-center\`
- \`grid-cols-3\`, \`gap-4\`, \`auto-cols-auto\`

**Spacing:**
- \`p-4\`, \`px-4\`, \`py-2\`, \`pt-4\`, \`pr-2\`, \`pb-4\`, \`pl-2\`
- \`m-4\`, \`mx-auto\`, \`my-2\`, \`mt-4\`, \`-m-4\`
- \`space-x-4\`, \`space-y-2\`, \`gap-4\`

**Typography:**
- \`text-sm\`, \`text-base\`, \`text-lg\`, \`text-xl\`, \`text-2xl\`
- \`font-normal\`, \`font-medium\`, \`font-semibold\`, \`font-bold\`
- \`text-center\`, \`text-left\`, \`text-right\`
- \`text-gray-900\`, \`text-blue-500\`

**Colors:**
- \`bg-white\`, \`bg-gray-100\`, \`bg-blue-500\`
- \`text-gray-900\`, \`text-white\`
- \`border-gray-300\`, \`ring-blue-500\``;
  }

  private getSearchTips(query: string): string {
    return `**Search Tips:**

1. **Use specific utility names:**
   - Good: "flex-col", "grid-cols", "p-4"
   - Less specific: "flex", "grid", "padding"

2. **Search by CSS property:**
   - "display" → flex, block, grid, hidden
   - "padding" → p-*, px-*, py-*, pt-*
   - "margin" → m-*, mx-*, my-*, mt-*

3. **Search by category:**
   - layout → flex, grid, display, position
   - spacing → padding, margin, gap, space
   - typography → font, text, line-height
   - colors → bg, text, border, ring

4. **Use the category filter:**
   - \`category: "layout"\` for layout utilities only
   - \`category: "spacing"\` for spacing utilities only
   - \`category: "typography"\` for typography utilities only
   - \`category: "colors"\` for color utilities only
   - \`category: "all"\` (default) to search everything

**Quick Reference:**

**Responsive Design:**
- \`sm:*\` → Small screens (640px+)
- \`md:*\` → Medium screens (768px+)
- \`lg:*\` → Large screens (1024px+)
- \`xl:*\` → Extra large screens (1280px+)
- \`2xl:*\` → 2x extra large (1536px+)

**State Variants:**
- \`hover:*\` → Hover state
- \`focus:*\` → Focus state
- \`active:*\` → Active state
- \`disabled:*\` → Disabled state
- \`dark:*\` → Dark mode

**Example Usage:**
\`\`\`html
<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8">

<!-- Hover effects -->
<button class="bg-blue-500 hover:bg-blue-600">

<!-- Dark mode -->
<div class="bg-white dark:bg-gray-800">

<!-- Combined -->
<div class="flex flex-col md:flex-row gap-4 p-6">
\`\`\``;
  }

  private formatError(query: string, error: unknown): string {
    const message =
      error instanceof Error ? error.message : String(error);

    return `# Search Error

**Query:** "${query}"
**Error:** ${message}

**What to do:**
- Check your internet connection
- Try again in a moment
- Visit https://tailwindcss.com/docs directly

**Common Utilities Reference:**

See the "No Results" section above for a quick reference of common utilities.`;
  }
}

interface SearchResult {
  category: string;
  page: string;
  url: string;
  snippet: string;
}
