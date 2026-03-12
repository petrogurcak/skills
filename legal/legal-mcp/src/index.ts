import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadCorpus, type Block, type LawMeta } from "./corpus.js";
import { searchLaw } from "./search.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const corpusDir = join(__dirname, "..", "corpus");

const { blocks, laws } = loadCorpus(corpusDir);
console.error(
  `[legal-mcp] Loaded ${blocks.length} sections from ${laws.length} laws`
);

const server = new McpServer({
  name: "legal-mcp",
  version: "1.0.0",
});

server.tool(
  "list_laws",
  "List all available laws in the corpus with metadata",
  {},
  async () => {
    const now = new Date();
    const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;

    const lawList = laws.map((law) => {
      const updated = new Date(law.corpus_updated);
      const stale = now.getTime() - updated.getTime() > sixMonths;
      return {
        ...law,
        stale_warning: stale
          ? `Corpus updated ${law.corpus_updated} — over 6 months ago, may be outdated`
          : undefined,
      };
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(lawList, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "search_law",
  "Search Czech legal corpus for relevant paragraphs. Returns matching sections with exact citations.",
  {
    query: z.string().describe("Search query — Czech legal terms, paragraph numbers, or topic description"),
    scope: z
      .string()
      .optional()
      .describe('Filter to specific law: "labor-code", "gdpr", "zoou"'),
    limit: z
      .number()
      .optional()
      .default(5)
      .describe("Max results to return (default 5)"),
  },
  async ({ query, scope, limit }) => {
    const results = searchLaw(blocks, query, scope, limit);
    return {
      content: [
        {
          type: "text" as const,
          text:
            results.length === 0
              ? "No matching sections found. Try different keywords or broaden scope."
              : JSON.stringify(results, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[legal-mcp] Server running on stdio");
}

main().catch((err) => {
  console.error("[legal-mcp] Fatal error:", err);
  process.exit(1);
});
