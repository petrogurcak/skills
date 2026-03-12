import { describe, it, expect } from "vitest";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  parseMarkdown,
  loadAnnotations,
  loadCorpus,
  type LawMeta,
} from "../corpus.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(__dirname, "..", "..", "corpus", "test-fixture");
const corpusDir = join(__dirname, "..", "..", "corpus");

const testMeta: LawMeta = {
  name: "Testovací zákon",
  number: "999/2026 Sb.",
  effective_from: "2026-01-01",
  corpus_updated: "2026-03-12",
};

describe("parseMarkdown", () => {
  it("parses § sections", () => {
    const content = `## § 1 - Předmět\n\nObsah paragrafu.\n\n## § 2 - Druhý\n\nDalší obsah.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(2);
    expect(blocks[0].section).toBe("§ 1");
    expect(blocks[0].heading).toBe("§ 1 - Předmět");
    expect(blocks[0].text).toContain("Obsah paragrafu");
    expect(blocks[1].section).toBe("§ 2");
  });

  it("parses Článek sections", () => {
    const content = `## Článek 1 - Předmět\n\nObsah článku.\n\n## Článek 2 - Druhý\n\nDalší obsah.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(2);
    expect(blocks[0].section).toBe("Článek 1");
    expect(blocks[0].heading).toBe("Článek 1 - Předmět");
  });

  it("handles mixed § and Článek formats", () => {
    const content = `## § 1 - Para\n\nA\n\n## Článek 2 - Art\n\nB`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(2);
    expect(blocks[0].section).toBe("§ 1");
    expect(blocks[1].section).toBe("Článek 2");
  });

  it("handles empty sections", () => {
    const content = `## § 1 - Prázdný\n\n## § 2 - S obsahem\n\nObsah.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(2);
    expect(blocks[0].text).toBe("");
    expect(blocks[1].text).toContain("Obsah");
  });

  it("ignores content before first section heading", () => {
    const content = `# Hlavní nadpis\n\nÚvod.\n\n## § 1 - První\n\nObsah.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(1);
    expect(blocks[0].section).toBe("§ 1");
  });

  it("ignores headings that don't match pattern", () => {
    const content = `## Obecně\n\nÚvod.\n\n## § 1 - První\n\nObsah.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks).toHaveLength(1);
  });

  it("tracks correct line numbers", () => {
    const content = `Intro\n\n## § 1 - A\n\nText\n\n## § 2 - B\n\nMore`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks[0].line).toBe(3);
    expect(blocks[1].line).toBe(7);
  });

  it("preserves law metadata", () => {
    const content = `## § 1 - Test\n\nContent.`;
    const blocks = parseMarkdown(content, "test.md", testMeta);

    expect(blocks[0].law).toBe("Testovací zákon");
    expect(blocks[0].lawNumber).toBe("999/2026 Sb.");
  });
});

describe("loadAnnotations", () => {
  it("loads § annotations", () => {
    const annotations = loadAnnotations(join(fixtureDir, "annotations.md"));

    expect(annotations.has("§ 2")).toBe(true);
    expect(annotations.get("§ 2")).toContain("flexinovela");
  });

  it("loads Článek annotations", () => {
    const annotations = loadAnnotations(join(fixtureDir, "annotations.md"));

    expect(annotations.has("Článek 4")).toBe(true);
    expect(annotations.get("Článek 4")).toContain("DPIA");
  });

  it("returns empty map for missing file", () => {
    const annotations = loadAnnotations("/nonexistent/annotations.md");
    expect(annotations.size).toBe(0);
  });
});

describe("loadCorpus", () => {
  it("loads test fixture corpus", () => {
    const { blocks, laws } = loadCorpus(corpusDir);

    expect(laws.length).toBeGreaterThanOrEqual(1);
    expect(blocks.length).toBeGreaterThanOrEqual(4);

    const testLaw = laws.find((l) => l.number === "999/2026 Sb.");
    expect(testLaw).toBeDefined();
    expect(testLaw!.name).toBe("Testovací zákon");
  });

  it("attaches annotations to matching blocks", () => {
    const { blocks } = loadCorpus(corpusDir);

    // Find blocks specifically from the test-fixture law
    const fixtureBlocks = blocks.filter((b) => b.lawNumber === "999/2026 Sb.");
    const para2 = fixtureBlocks.find((b) => b.section === "§ 2");
    expect(para2?.annotation).toContain("flexinovela");

    const art4 = fixtureBlocks.find((b) => b.section === "Článek 4");
    expect(art4?.annotation).toContain("DPIA");
  });

  it("blocks without annotations have no annotation field", () => {
    const { blocks } = loadCorpus(corpusDir);

    const fixtureBlocks = blocks.filter((b) => b.lawNumber === "999/2026 Sb.");
    const para1 = fixtureBlocks.find((b) => b.section === "§ 1");
    expect(para1?.annotation).toBeUndefined();
  });

  it("returns empty for nonexistent dir", () => {
    const { blocks, laws } = loadCorpus("/nonexistent");
    expect(blocks).toEqual([]);
    expect(laws).toEqual([]);
  });
});
