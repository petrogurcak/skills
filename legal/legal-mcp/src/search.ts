import type { Block } from "./corpus.js";

export interface SearchResult {
  law: string;
  lawNumber: string;
  section: string;
  heading: string;
  text: string;
  annotation?: string;
  file: string;
  line: number;
  score: number;
}

/**
 * Remove diacritics from a string for matching.
 * Handles all Czech characters: áčďéěíňóřšťúůýž
 */
function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Truncate text at sentence boundary if over maxLength.
 */
function truncateAtSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Find last sentence end before maxLength
  const truncated = text.slice(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf(". "),
    truncated.lastIndexOf(".\n"),
    truncated.lastIndexOf(".)"),
  );

  if (lastSentenceEnd > maxLength * 0.5) {
    return text.slice(0, lastSentenceEnd + 1);
  }

  // Fallback: truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  return text.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
}

/**
 * Keyword search over corpus blocks.
 * Diacritics-insensitive, heading matches weighted 2x.
 */
export function searchLaw(
  blocks: Block[],
  query: string,
  scope?: string,
  limit: number = 5
): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = removeDiacritics(query.toLowerCase());
  const keywords = normalizedQuery
    .split(/\s+/)
    .filter((k) => k.length > 1);

  if (keywords.length === 0) return [];

  const scored: SearchResult[] = [];

  for (const block of blocks) {
    // Filter by scope (directory name)
    if (scope && !block.file.startsWith(scope)) continue;

    const normalizedHeading = removeDiacritics(block.heading.toLowerCase());
    const normalizedText = removeDiacritics(block.text.toLowerCase());

    let score = 0;
    for (const keyword of keywords) {
      // Count occurrences in heading (2x weight)
      const headingMatches = countOccurrences(normalizedHeading, keyword);
      score += headingMatches * 2;

      // Count occurrences in text
      const textMatches = countOccurrences(normalizedText, keyword);
      score += textMatches;
    }

    if (score > 0) {
      scored.push({
        law: block.law,
        lawNumber: block.lawNumber,
        section: block.section,
        heading: block.heading,
        text: truncateAtSentence(block.text, 500),
        annotation: block.annotation,
        file: block.file,
        line: block.line,
        score,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

function countOccurrences(text: string, keyword: string): number {
  let count = 0;
  let pos = 0;
  while ((pos = text.indexOf(keyword, pos)) !== -1) {
    count++;
    pos += keyword.length;
  }
  return count;
}
