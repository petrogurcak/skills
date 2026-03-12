#!/usr/bin/env node
/**
 * Corpus seeder for legal-mcp
 * Downloads Czech labor code from zakonyprolidi.cz and GDPR from eur-lex.europa.eu
 * Parses HTML into markdown files matching the corpus format.
 *
 * Usage: node scripts/seed-corpus.mjs [--labor-code] [--gdpr] [--all]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORPUS_DIR = join(__dirname, "..", "corpus");

// --- HTML fetching ---

async function fetchHTML(url) {
  console.log(`Fetching ${url}...`);
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok && res.status !== 202)
    throw new Error(`HTTP ${res.status} for ${url}`);
  const text = await res.text();
  if (!text || text.length < 1000) {
    throw new Error(
      `Empty or WAF-blocked response from ${url}. ` +
        `For eur-lex.europa.eu, download the HTML manually in a browser and ` +
        `save to corpus/ directory, then use --gdpr-file <path>.`,
    );
  }
  return text;
}

// --- Labor Code Parser (zakonyprolidi.cz) ---

function parseLaborCode(html) {
  // Structure:
  //   <p class="PARA L3"><a ...><i id="pXX"></i></a>§ XX</p>  → paragraph header
  //   <p class="L4"><a ...><i id="pXX-Y"></i></a><var>(Y)</var> text</p>  → subsection
  //   <p class="L5"><a ...><i id="pXX-Y-z"></i></a><var>z)</var> text</p> → letter
  //   Part headers have id="castN"

  const parts = [];
  let currentPart = null;
  let currentSection = null;

  // Split into meaningful lines
  // We process the HTML tag by tag using regex
  const tagPattern =
    /<(?:p|h[1-6])\s+class="([^"]*)"[^>]*>(.*?)<\/(?:p|h[1-6])>/gs;

  for (const match of html.matchAll(tagPattern)) {
    const classes = match[1];
    const innerHtml = match[2];
    const text = stripHtml(innerHtml).trim();

    if (!text) continue;

    // Part header (ČÁST)
    if (
      text.match(/^ČÁST\s+/i) ||
      (classes.includes("NADPIS") &&
        classes.includes("L1") &&
        text.match(/ČÁST/i))
    ) {
      if (currentPart) parts.push(currentPart);
      currentPart = { title: text, heading: "", sections: [] };
      currentSection = null;
      continue;
    }

    // Part subtitle (e.g. "VŠEOBECNÁ USTANOVENÍ")
    if (
      classes.includes("NADPIS") &&
      classes.includes("L1") &&
      currentPart &&
      !currentPart.subtitle
    ) {
      currentPart.subtitle = text;
      continue;
    }

    // Hlava header
    if (text.match(/^HLAVA\s+/i)) {
      if (currentPart) currentPart.heading = text;
      continue;
    }

    // Hlava subtitle / section heading (NADPIS that isn't a § header)
    if (classes.includes("NADPIS") && !text.startsWith("§")) {
      continue;
    }

    // Paragraph header (§ XX) — can be PARA L2 or PARA L3 depending on nesting
    if (classes.includes("PARA")) {
      const paraMatch = text.match(/§\s*(\d+\w*)/);
      if (paraMatch && currentPart) {
        currentSection = { number: paraMatch[1], title: text, lines: [] };
        currentPart.sections.push(currentSection);
      }
      continue;
    }

    // Content lines — any L2-L7 text after a § header
    if (
      currentSection &&
      /\bL[2-7]\b/.test(classes) &&
      !classes.includes("NADPIS") &&
      !classes.includes("PARA")
    ) {
      currentSection.lines.push(text);
    }
  }

  if (currentPart) parts.push(currentPart);
  return parts;
}

function stripHtml(html) {
  // Remove footnote references like <sup>1</sup>)
  let text = html.replace(/<a\s+class="linknote"[^>]*>.*?<\/a>/g, "");
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, "");
  // Decode HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
  return text;
}

function laborCodeToMarkdown(parts) {
  const files = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const partNum = String(i + 1).padStart(2, "0");
    const fileName = `part-${partNum}.md`;

    let md = `# ${part.title}`;
    if (part.subtitle) md += ` — ${part.subtitle}`;
    md += "\n\n";

    for (const section of part.sections) {
      md += `## § ${section.number}\n\n`;
      for (const line of section.lines) {
        md += `${line}\n\n`;
      }
    }

    files.push({ name: fileName, content: md.trimEnd() + "\n" });
  }

  return files;
}

// --- GDPR Parser (eur-lex.europa.eu) ---

function parseGDPR(html) {
  // Structure:
  //   <p class="oj-ti-art">Článek X</p>
  //   <p class="oj-sti-art">Title</p>
  //   <p class="oj-normal">1. text...</p>
  //   <table> for letter lists in some articles

  const chapters = [];
  let currentChapter = null;
  let currentArticle = null;

  // GDPR has 11 chapters (KAPITOLA I-XI)
  // We'll detect chapter breaks from the HTML

  const lines = html.split(/(?=<)/);

  // Use a simpler approach: extract all articles sequentially
  const articles = [];
  const articlePattern =
    /<p[^>]*class="oj-ti-art"[^>]*>\s*Článek\s+(\d+)\s*<\/p>/g;
  const positions = [];

  for (const m of html.matchAll(articlePattern)) {
    positions.push({ num: parseInt(m[1]), index: m.index });
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : html.length;
    const chunk = html.substring(start, end);

    // Extract title
    const titleMatch = chunk.match(
      /<p[^>]*class="oj-sti-art"[^>]*>(.*?)<\/p>/s,
    );
    const title = titleMatch ? stripHtml(titleMatch[1]).trim() : "";

    // Extract content paragraphs
    const contentLines = [];
    const paraPattern =
      /<p[^>]*class="(?:oj-normal|oj-ti-grseq-1)"[^>]*>(.*?)<\/p>/gs;
    for (const pm of chunk.matchAll(paraPattern)) {
      const text = stripHtml(pm[1]).trim();
      if (text) contentLines.push(text);
    }

    // Also get list items from tables (GDPR uses tables for lettered lists)
    const tdPattern = /<td[^>]*>\s*<p[^>]*>(.*?)<\/p>\s*<\/td>/gs;
    // Skip — tables are complex, let's get the text from all <p> tags inside the article chunk
    const allParagraphs = [];
    const allPPattern = /<p[^>]*>(.*?)<\/p>/gs;
    for (const pm of chunk.matchAll(allPPattern)) {
      const cls = pm[0].match(/class="([^"]*)"/);
      const className = cls ? cls[1] : "";
      // Skip the article header and title themselves
      if (className.includes("oj-ti-art") || className.includes("oj-sti-art"))
        continue;
      const text = stripHtml(pm[1]).trim();
      if (text) allParagraphs.push(text);
    }

    articles.push({
      number: positions[i].num,
      title,
      lines: allParagraphs,
    });
  }

  // Group into chapters based on article numbers
  // GDPR chapters: I(1-4), II(5-11), III(12-23), IV(24-43), V(44-50),
  // VI(51-59), VII(60-76), VIII(77-84), IX(85-91), X(92-93), XI(94-99)
  const chapterRanges = [
    { name: "Kapitola I — Obecná ustanovení", start: 1, end: 4 },
    { name: "Kapitola II — Zásady", start: 5, end: 11 },
    { name: "Kapitola III — Práva subjektu údajů", start: 12, end: 23 },
    { name: "Kapitola IV — Správce a zpracovatel", start: 24, end: 43 },
    {
      name: "Kapitola V — Předávání osobních údajů do třetích zemí",
      start: 44,
      end: 50,
    },
    { name: "Kapitola VI — Nezávislé dozorové úřady", start: 51, end: 59 },
    { name: "Kapitola VII — Spolupráce a jednotnost", start: 60, end: 76 },
    {
      name: "Kapitola VIII — Právní ochrana, odpovědnost a sankce",
      start: 77,
      end: 84,
    },
    { name: "Kapitola IX — Zvláštní situace zpracování", start: 85, end: 91 },
    {
      name: "Kapitola X — Akty v přenesené pravomoci a prováděcí akty",
      start: 92,
      end: 93,
    },
    { name: "Kapitola XI — Závěrečná ustanovení", start: 94, end: 99 },
  ];

  const files = [];
  for (let i = 0; i < chapterRanges.length; i++) {
    const ch = chapterRanges[i];
    const chapterArticles = articles.filter(
      (a) => a.number >= ch.start && a.number <= ch.end,
    );
    const chNum = String(i + 1).padStart(2, "0");

    let md = `# ${ch.name}\n\n`;
    for (const art of chapterArticles) {
      md += `## Článek ${art.number}`;
      if (art.title) md += ` - ${art.title}`;
      md += "\n\n";
      for (const line of art.lines) {
        md += `${line}\n\n`;
      }
    }

    files.push({ name: `chapter-${chNum}.md`, content: md.trimEnd() + "\n" });
  }

  return files;
}

// --- File writing ---

function writeCorpusFiles(lawDir, files) {
  const dir = join(CORPUS_DIR, lawDir);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  // Preserve meta.yaml and annotations.md
  for (const file of files) {
    const path = join(dir, file.name);
    writeFileSync(path, file.content, "utf-8");
    console.log(
      `  Written: ${path} (${file.content.length} bytes, ${countSections(file.content)} sections)`,
    );
  }
}

function countSections(md) {
  return (md.match(/^## /gm) || []).length;
}

// --- Main ---

async function main() {
  const args = process.argv.slice(2);
  const doAll = args.includes("--all") || args.length === 0;
  const doLaborCode = doAll || args.includes("--labor-code");
  const doGDPR = doAll || args.includes("--gdpr");

  if (doLaborCode) {
    console.log("\n=== Zákoník práce (262/2006 Sb.) ===");
    const html = await fetchHTML("https://www.zakonyprolidi.cz/cs/2006-262");
    const parts = parseLaborCode(html);
    console.log(
      `Parsed ${parts.length} parts, ${parts.reduce((s, p) => s + p.sections.length, 0)} sections`,
    );
    const files = laborCodeToMarkdown(parts);
    writeCorpusFiles("labor-code", files);
    console.log(`Labor code: ${files.length} files written`);
  }

  if (doGDPR) {
    console.log("\n=== GDPR (Nařízení EU 2016/679) ===");
    const gdprFileIdx = args.indexOf("--gdpr-file");
    let html;
    if (gdprFileIdx > -1 && args[gdprFileIdx + 1]) {
      const filePath = args[gdprFileIdx + 1];
      console.log(`Reading from local file: ${filePath}`);
      html = readFileSync(filePath, "utf-8");
    } else {
      try {
        html = await fetchHTML(
          "https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=CELEX:32016R0679",
        );
      } catch (e) {
        console.error(
          `Cannot fetch GDPR from eur-lex (WAF protection). Use:\n` +
            `  1. Open https://eur-lex.europa.eu/legal-content/CS/TXT/HTML/?uri=CELEX:32016R0679 in browser\n` +
            `  2. Save as HTML (Cmd+S)\n` +
            `  3. Run: node scripts/seed-corpus.mjs --gdpr --gdpr-file /path/to/saved.html`,
        );
        return;
      }
    }
    const files = parseGDPR(html);
    writeCorpusFiles("gdpr", files);
    console.log(`GDPR: ${files.length} files written`);
  }

  console.log(
    "\nDone! Run `npm run build && npm start` to test the MCP server.",
  );
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
