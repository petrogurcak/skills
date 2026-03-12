import { describe, it, expect } from "vitest";
import { searchLaw } from "../search.js";
import type { Block } from "../corpus.js";

const testBlocks: Block[] = [
  {
    law: "Zákoník práce",
    lawNumber: "262/2006 Sb.",
    section: "§ 1",
    heading: "§ 1 - Předmět úpravy",
    text: "(1) Tento zákon upravuje pracovněprávní vztahy.",
    file: "labor-code/part-01.md",
    line: 3,
  },
  {
    law: "Zákoník práce",
    lawNumber: "262/2006 Sb.",
    section: "§ 2",
    heading: "§ 2 - Zkušební doba",
    text: "(1) Zkušební doba nesmí být delší než 3 měsíce.\n(2) U vedoucích zaměstnanců nesmí být delší než 6 měsíců.",
    file: "labor-code/part-01.md",
    line: 7,
    annotation: "POZOR: Nově až 4 měsíce.",
  },
  {
    law: "GDPR",
    lawNumber: "2016/679",
    section: "Článek 6",
    heading: "Článek 6 - Zákonnost zpracování",
    text: "(1) Zpracování osobních údajů je zákonné pouze pokud je splněna podmínka.",
    file: "gdpr/chapter-02.md",
    line: 15,
  },
  {
    law: "Zákoník práce",
    lawNumber: "262/2006 Sb.",
    section: "§ 52",
    heading: "§ 52 - Výpovědní důvody",
    text: "Zaměstnavatel může dát zaměstnanci výpověď pouze z důvodů: organizační změny, nadbytečnost zaměstnance, zdravotní nezpůsobilost.",
    file: "labor-code/part-02.md",
    line: 100,
  },
];

describe("searchLaw", () => {
  it("finds matching blocks by keyword", () => {
    const results = searchLaw(testBlocks, "zkušební doba");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].section).toBe("§ 2");
  });

  it("is diacritics-insensitive", () => {
    const results = searchLaw(testBlocks, "zkusebni doba");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].section).toBe("§ 2");
  });

  it("searches with diacritics in query against diacritics-free text conceptually", () => {
    // "výpověď" should match "výpověď" and "vypoved"
    const results = searchLaw(testBlocks, "výpověď");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].section).toBe("§ 52");
  });

  it("filters by scope", () => {
    const results = searchLaw(testBlocks, "zpracování", "gdpr");

    expect(results).toHaveLength(1);
    expect(results[0].law).toBe("GDPR");
  });

  it("returns empty for no matches", () => {
    const results = searchLaw(testBlocks, "cryptocurrency blockchain");
    expect(results).toHaveLength(0);
  });

  it("returns empty for empty query", () => {
    const results = searchLaw(testBlocks, "");
    expect(results).toHaveLength(0);
  });

  it("returns empty for whitespace-only query", () => {
    const results = searchLaw(testBlocks, "   ");
    expect(results).toHaveLength(0);
  });

  it("respects limit", () => {
    const results = searchLaw(testBlocks, "zákon", undefined, 1);
    expect(results).toHaveLength(1);
  });

  it("includes annotations in results", () => {
    const results = searchLaw(testBlocks, "zkušební");

    const withAnnotation = results.find((r) => r.annotation);
    expect(withAnnotation).toBeDefined();
    expect(withAnnotation!.annotation).toContain("4 měsíce");
  });

  it("weights heading matches higher", () => {
    // "zkušební" appears in heading of §2 and nowhere in §52
    const results = searchLaw(testBlocks, "zkušební");

    expect(results[0].section).toBe("§ 2");
  });

  it("ranks by score descending", () => {
    const results = searchLaw(testBlocks, "zaměstnanec");

    for (let i = 1; i < results.length; i++) {
      expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
    }
  });

  it("truncates long text at sentence boundary", () => {
    const longBlock: Block = {
      law: "Test",
      lawNumber: "1/2026",
      section: "§ 1",
      heading: "§ 1 - Dlouhý",
      text:
        "A".repeat(200) + ". " + "B".repeat(200) + ". " + "C".repeat(200) + ".",
      file: "test.md",
      line: 1,
    };

    const results = searchLaw([longBlock], "dlouhy");
    expect(results[0].text.length).toBeLessThanOrEqual(510); // some margin for sentence end
  });
});
