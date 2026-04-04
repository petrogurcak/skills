#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { NetteDocsTool } from './tools/nette-docs.js';
import { LatteSyntaxTool } from './tools/latte-syntax.js';
import { TracyFeatureTool } from './tools/tracy-feature.js';
import { DIPatternTool } from './tools/di-pattern.js';
import { ApiSearchTool } from './tools/api-search.js';

// Validation tools
import { ValidateNeonTool } from './tools/validate-neon.js';
import { LintLatteTool } from './tools/lint-latte.js';
import { CheckPresenterTool } from './tools/check-presenter.js';
import { AnalyzeDITool } from './tools/analyze-di.js';

// Initialize documentation tools
const netteDocsTool = new NetteDocsTool();
const latteSyntaxTool = new LatteSyntaxTool();
const tracyFeatureTool = new TracyFeatureTool();
const diPatternTool = new DIPatternTool();
const apiSearchTool = new ApiSearchTool();

// Initialize validation tools
const validateNeonTool = new ValidateNeonTool();
const lintLatteTool = new LintLatteTool();
const checkPresenterTool = new CheckPresenterTool();
const analyzeDITool = new AnalyzeDITool();

// Create server
const server = new Server(
  {
    name: 'nette-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: 'fetch_nette_documentation',
          description:
            'Fetch specific Nette Framework documentation. Retrieves docs for components like framework, database, forms, mail, utils, or security.',
          inputSchema: {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                enum: [
                  'framework',
                  'database',
                  'forms',
                  'mail',
                  'utils',
                  'security',
                ],
                description:
                  'The Nette component to get documentation for',
              },
              topic: {
                type: 'string',
                description:
                  'The specific topic (e.g., "presenter", "routing", "validation")',
              },
              language: {
                type: 'string',
                enum: ['en', 'cs'],
                description:
                  'Documentation language (default: en)',
                default: 'en',
              },
            },
            required: ['component', 'topic'],
          },
        },
        {
          name: 'search_latte_syntax',
          description:
            'Search Latte template syntax and features. Find documentation for n:attributes, macros, filters, custom tags, and more.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description:
                  'What to search for (e.g., "n:if", "filters", "custom macros", "blocks")',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'get_tracy_feature',
          description:
            'Get documentation for Tracy debugger features. Learn about bar-dump, logger, bluescreen, custom panels, and production mode.',
          inputSchema: {
            type: 'object',
            properties: {
              feature: {
                type: 'string',
                enum: [
                  'bar-dump',
                  'logger',
                  'bluescreen',
                  'custom-panel',
                  'production-mode',
                  'debugger',
                  'email',
                ],
                description:
                  'The Tracy feature to get documentation for',
              },
            },
            required: ['feature'],
          },
        },
        {
          name: 'lookup_di_pattern',
          description:
            'Look up Nette DI container patterns and configuration. Get examples for services, factories, decorators, extensions, and autowiring.',
          inputSchema: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string',
                enum: [
                  'services',
                  'factories',
                  'decorators',
                  'extensions',
                  'autowiring',
                  'configuration',
                ],
                description:
                  'The DI pattern to get documentation for',
              },
            },
            required: ['pattern'],
          },
        },
        {
          name: 'search_nette_api',
          description:
            'Full-text search across all Nette documentation. Use for edge cases or when specific topic is unknown. Can search in specific scopes.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Free-text search query',
              },
              scope: {
                type: 'string',
                enum: ['all', 'framework', 'latte', 'tracy', 'di'],
                description: 'Scope to search in (default: all)',
                default: 'all',
              },
            },
            required: ['query'],
          },
        },

        // ===== VALIDATION TOOLS =====

        {
          name: 'validate_neon',
          description:
            'Validate NEON configuration syntax and structure. Detects syntax errors, missing services, undefined parameters, and common mistakes. Use AFTER writing NEON config.',
          inputSchema: {
            type: 'object',
            properties: {
              content: {
                type: 'string',
                description: 'The NEON configuration content to validate',
              },
            },
            required: ['content'],
          },
        },
        {
          name: 'lint_latte',
          description:
            'Lint Latte template for syntax errors and security issues. Detects unclosed tags, href instead of n:href, |noescape usage, and deprecated macros. Use AFTER writing templates.',
          inputSchema: {
            type: 'object',
            properties: {
              template: {
                type: 'string',
                description: 'The Latte template content to lint',
              },
            },
            required: ['template'],
          },
        },
        {
          name: 'check_presenter_structure',
          description:
            'Validate Nette Presenter PHP code structure. Checks for strict_types, type hints, naming conventions, modern PHP patterns, and Nette best practices. Use AFTER writing presenter code.',
          inputSchema: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description: 'The PHP presenter code to validate',
              },
            },
            required: ['code'],
          },
        },
        {
          name: 'analyze_di_config',
          description:
            'Analyze Nette DI configuration for issues. Detects circular dependencies, missing services, unused services, and anti-patterns. Use AFTER writing DI config.',
          inputSchema: {
            type: 'object',
            properties: {
              neonContent: {
                type: 'string',
                description: 'The NEON DI configuration to analyze',
              },
            },
            required: ['neonContent'],
          },
        },
      ],
    };
  }
);

// Handle tool calls
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: string;

      switch (name) {
        case 'fetch_nette_documentation':
          result = await netteDocsTool.fetchDocumentation(
            args as any
          );
          break;

        case 'search_latte_syntax':
          result = await latteSyntaxTool.searchSyntax(
            args as any
          );
          break;

        case 'get_tracy_feature':
          result = await tracyFeatureTool.getFeature(
            args as any
          );
          break;

        case 'lookup_di_pattern':
          result = await diPatternTool.lookupPattern(
            args as any
          );
          break;

        case 'search_nette_api':
          result = await apiSearchTool.search(args as any);
          break;

        // Validation tools
        case 'validate_neon':
          result = await validateNeonTool.validate(args as any);
          break;

        case 'lint_latte':
          result = await lintLatteTool.lint(args as any);
          break;

        case 'check_presenter_structure':
          result = await checkPresenterTool.check(args as any);
          break;

        case 'analyze_di_config':
          result = await analyzeDITool.analyze(args as any);
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      return {
        content: [
          {
            type: 'text',
            text: `Error: ${message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Nette MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
