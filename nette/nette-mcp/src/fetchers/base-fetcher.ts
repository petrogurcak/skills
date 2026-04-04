import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { docCache } from '../cache/doc-cache.js';

export interface FetchOptions {
  useCache?: boolean;
  selector?: string;
  baseUrl?: string;
}

export class BaseFetcher {
  private turndown: TurndownService;

  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });

    // Configure turndown for better code handling
    this.turndown.addRule('code', {
      filter: ['pre'],
      replacement: (content) => {
        return '\n```\n' + content + '\n```\n';
      },
    });
  }

  /**
   * Fetch and parse documentation from URL
   */
  async fetchDoc(
    url: string,
    options: FetchOptions = {}
  ): Promise<string> {
    const { useCache = true, selector, baseUrl } = options;

    // Generate cache key
    const cacheKey = `fetch:${url}:${selector || 'full'}`;

    // Check cache first
    if (useCache && docCache.has(cacheKey)) {
      const cached = docCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      // Fetch the page
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NetteMCP/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract relevant content
      let content: string;
      if (selector) {
        const selected = $(selector);
        if (selected.length === 0) {
          throw new Error(`Selector "${selector}" not found in page`);
        }
        content = selected.html() || '';
      } else {
        content = $('body').html() || '';
      }

      // Convert to markdown
      const markdown = this.htmlToMarkdown(content, baseUrl || url);

      // Cache the result
      if (useCache) {
        docCache.set(cacheKey, markdown);
      }

      return markdown;
    } catch (error) {
      // Try to return stale cache if available
      if (docCache.has(cacheKey)) {
        const stale = docCache.get(cacheKey);
        if (stale) {
          console.error(
            `Fetch failed, returning stale cache: ${error}`
          );
          return stale;
        }
      }

      throw error;
    }
  }

  /**
   * Search for content in HTML
   */
  async searchInPage(
    url: string,
    searchQuery: string,
    selector?: string
  ): Promise<string> {
    const content = await this.fetchDoc(url, { selector });

    // Simple search - could be enhanced with fuzzy matching
    const lines = content.split('\n');
    const matchedLines: string[] = [];
    const context = 3; // Lines before and after match

    for (let i = 0; i < lines.length; i++) {
      if (
        lines[i].toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        const start = Math.max(0, i - context);
        const end = Math.min(lines.length, i + context + 1);
        matchedLines.push(
          ...lines.slice(start, end),
          '---'
        );
      }
    }

    return matchedLines.length > 0
      ? matchedLines.join('\n')
      : `No results found for "${searchQuery}"`;
  }

  /**
   * Convert HTML to clean markdown
   */
  private htmlToMarkdown(html: string, baseUrl: string): string {
    // Clean up the HTML first
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, .advertisement').remove();

    // Fix relative URLs
    $('a[href]').each((_, elem) => {
      const href = $(elem).attr('href');
      if (href && !href.startsWith('http')) {
        const absoluteUrl = new URL(
          href,
          baseUrl
        ).toString();
        $(elem).attr('href', absoluteUrl);
      }
    });

    // Convert to markdown
    const cleaned = $.html();
    let markdown = this.turndown.turndown(cleaned);

    // Clean up excessive newlines
    markdown = markdown.replace(/\n{3,}/g, '\n\n');

    return markdown.trim();
  }

  /**
   * Extract specific section from documentation
   */
  extractSection(
    markdown: string,
    sectionTitle: string
  ): string {
    const lines = markdown.split('\n');
    const result: string[] = [];
    let inSection = false;
    let sectionLevel = 0;

    for (const line of lines) {
      // Check if this is a heading
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

      if (headingMatch) {
        const [, hashes, title] = headingMatch;
        const level = hashes.length;

        // Check if this is our target section
        if (
          title
            .toLowerCase()
            .includes(sectionTitle.toLowerCase())
        ) {
          inSection = true;
          sectionLevel = level;
          result.push(line);
          continue;
        }

        // If we're in the section and hit a same/higher level heading, we're done
        if (inSection && level <= sectionLevel) {
          break;
        }
      }

      if (inSection) {
        result.push(line);
      }
    }

    return result.length > 0
      ? result.join('\n')
      : `Section "${sectionTitle}" not found`;
  }
}
