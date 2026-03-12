import { readFileSync, readdirSync, existsSync } from "fs";
import { join, relative } from "path";
import { parse as parseYaml } from "yaml";

export interface LawMeta {
  name: string;
  number: string;
  effective_from: string;
  last_amendment?: string;
  amendment_name?: string;
  source_url?: string;
  corpus_updated: string;
}

export interface Block {
  law: string;
  lawNumber: string;
  section: string;
  heading: string;
  text: string;
  file: string;
  line: number;
  annotation?: string;
}

/**
 * Parse a markdown file into blocks. Each `## § XX` or `## Článek XX` heading
 * starts a new block. Everything until the next `##` is the block body.
 */
export function parseMarkdown(
  content: string,
  file: string,
  lawMeta: LawMeta
): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let current: Block | null = null;
  const sectionPattern = /^##\s+(§\s*\d+|Článek\s*\d+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(sectionPattern);

    if (match) {
      if (current) {
        current.text = current.text.trimEnd();
        blocks.push(current);
      }
      const heading = line.replace(/^##\s+/, "").trim();
      const section = match[1].replace(/\s+/g, " ");
      current = {
        law: lawMeta.name,
        lawNumber: lawMeta.number,
        section,
        heading,
        text: "",
        file,
        line: i + 1,
      };
    } else if (current) {
      current.text += line + "\n";
    }
  }

  if (current) {
    current.text = current.text.trimEnd();
    blocks.push(current);
  }

  return blocks;
}

/**
 * Load annotations from annotations.md. Returns a map of section number to annotation text.
 */
export function loadAnnotations(
  annotationsPath: string
): Map<string, string> {
  const annotations = new Map<string, string>();
  if (!existsSync(annotationsPath)) return annotations;

  const content = readFileSync(annotationsPath, "utf-8");
  const lines = content.split("\n");
  const sectionPattern = /^##\s+(§\s*(\d+)|Článek\s*(\d+))/;
  let currentKey: string | null = null;
  let currentText = "";

  for (const line of lines) {
    const match = line.match(sectionPattern);
    if (match) {
      if (currentKey) {
        annotations.set(currentKey, currentText.trim());
      }
      // Normalize key: "§ 34" -> "§ 34", "Článek 5" -> "Článek 5"
      currentKey = match[1].replace(/\s+/g, " ");
      currentText = "";
    } else if (currentKey) {
      currentText += line + "\n";
    }
  }

  if (currentKey) {
    annotations.set(currentKey, currentText.trim());
  }

  return annotations;
}

/**
 * Load all law corpus from a directory. Expects subdirectories with meta.yaml + .md files.
 */
export function loadCorpus(corpusDir: string): {
  blocks: Block[];
  laws: LawMeta[];
} {
  const blocks: Block[] = [];
  const laws: LawMeta[] = [];

  if (!existsSync(corpusDir)) return { blocks, laws };

  const dirs = readdirSync(corpusDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const dir of dirs) {
    const lawDir = join(corpusDir, dir);
    const metaPath = join(lawDir, "meta.yaml");

    if (!existsSync(metaPath)) continue;

    const meta = parseYaml(
      readFileSync(metaPath, "utf-8")
    ) as LawMeta;
    laws.push(meta);

    // Load annotations
    const annotationsPath = join(lawDir, "annotations.md");
    const annotations = loadAnnotations(annotationsPath);

    // Load all .md files (except annotations.md)
    const mdFiles = readdirSync(lawDir)
      .filter((f) => f.endsWith(".md") && f !== "annotations.md")
      .sort();

    for (const mdFile of mdFiles) {
      const filePath = join(lawDir, mdFile);
      const content = readFileSync(filePath, "utf-8");
      const relPath = relative(corpusDir, filePath);
      const parsed = parseMarkdown(content, relPath, meta);

      // Attach annotations
      for (const block of parsed) {
        const ann = annotations.get(block.section);
        if (ann) block.annotation = ann;
      }

      blocks.push(...parsed);
    }
  }

  return { blocks, laws };
}
