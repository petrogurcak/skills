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

    // Configure for React Native/TypeScript code blocks
    this.turndown.addRule('code', {
      filter: ['pre'],
      replacement: (content, node) => {
        // Detect language from class or content
        const element = node as unknown as Element;
        const className = element.className || '';
        let lang = 'tsx';

        if (className.includes('javascript') || className.includes('js')) {
          lang = 'javascript';
        } else if (className.includes('typescript') || className.includes('ts')) {
          lang = 'typescript';
        } else if (className.includes('json')) {
          lang = 'json';
        } else if (className.includes('bash') || className.includes('shell')) {
          lang = 'bash';
        }

        return '\n```' + lang + '\n' + content + '\n```\n';
      },
    });
  }

  /**
   * Fetch and parse Expo/React Native documentation
   */
  async fetchDoc(
    url: string,
    options: FetchOptions = {}
  ): Promise<string> {
    const { useCache = true, selector, baseUrl } = options;

    const cacheKey = `fetch:${url}:${selector || 'full'}`;

    // Check cache
    if (useCache && docCache.has(cacheKey)) {
      const cached = docCache.get(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ExpoMCP/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract content
      let content: string;
      if (selector) {
        const selected = $(selector);
        if (selected.length === 0) {
          throw new Error(
            `Selector "${selector}" not found`
          );
        }
        content = selected.html() || '';
      } else {
        content = $('body').html() || '';
      }

      // Convert to markdown
      const markdown = this.htmlToMarkdown(
        content,
        baseUrl || url
      );

      // Cache
      if (useCache) {
        docCache.set(cacheKey, markdown);
      }

      return markdown;
    } catch (error) {
      // Try stale cache
      if (docCache.has(cacheKey)) {
        const stale = docCache.get(cacheKey);
        if (stale) {
          console.error(
            `Fetch failed, returning stale: ${error}`
          );
          return stale;
        }
      }
      throw error;
    }
  }

  /**
   * Search in page content
   */
  async searchInPage(
    url: string,
    searchQuery: string,
    selector?: string
  ): Promise<string> {
    const content = await this.fetchDoc(url, { selector });

    const lines = content.split('\n');
    const matchedLines: string[] = [];
    const context = 3;

    for (let i = 0; i < lines.length; i++) {
      if (
        lines[i]
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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
  private htmlToMarkdown(
    html: string,
    baseUrl: string
  ): string {
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $(
      'script, style, nav, footer, .sidebar, .header, .nav-menu'
    ).remove();

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
   * Extract section from markdown
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
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

      if (headingMatch) {
        const [, hashes, title] = headingMatch;
        const level = hashes.length;

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
