#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { TailwindDocsTool } from './tools/tailwind-docs.js';
import { AlpinePatternsTool } from './tools/alpine-patterns.js';
import { ViteConfigTool } from './tools/vite-config.js';
import { TypeScriptConfigTool } from './tools/typescript-config.js';
import { SearchTailwindUtilitiesTool } from './tools/search-tailwind-utilities.js';
import { EcommercePatternsTool } from './tools/ecommerce-patterns.js';
import { CapsizeTypographyTool } from './tools/capsize-typography.js';

// Initialize tools
const tailwindDocs = new TailwindDocsTool();
const alpinePatterns = new AlpinePatternsTool();
const viteConfig = new ViteConfigTool();
const typescriptConfig = new TypeScriptConfigTool();
const searchTailwind = new SearchTailwindUtilitiesTool();
const ecommercePatterns = new EcommercePatternsTool();
const capsizeTypography = new CapsizeTypographyTool();

// Create server
const server = new Server(
  {
    name: 'frontend-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'fetch_tailwind_docs',
        description:
          'Fetch Tailwind CSS documentation for specific topics (grid, flex, responsive, padding, colors, etc.). Returns documentation with examples and quick tips.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description:
                'Topic to fetch (e.g., "grid", "flex", "responsive", "padding", "margin", "colors", "dark-mode")',
            },
            include_examples: {
              type: 'boolean',
              description:
                'Include code examples (default: true)',
              default: true,
            },
          },
          required: ['topic'],
        },
      },
      {
        name: 'fetch_alpine_patterns',
        description:
          'Fetch Alpine.js patterns and examples for specific directives (x-data, x-model, x-show, x-if, x-for, @event, x-transition, x-init). Returns documentation with code examples and best practices.',
        inputSchema: {
          type: 'object',
          properties: {
            directive: {
              type: 'string',
              description:
                'Alpine.js directive to fetch (x-data, x-model, x-show, x-if, x-for, @event, x-transition, x-init, general)',
              enum: [
                'x-data',
                'x-model',
                'x-show',
                'x-if',
                'x-for',
                '@event',
                'x-transition',
                'x-init',
                'general',
              ],
            },
            use_case: {
              type: 'string',
              description:
                'Optional: Specific use case or context',
            },
          },
          required: ['directive'],
        },
      },
      {
        name: 'fetch_vite_config',
        description:
          'Fetch Vite configuration documentation for specific topics (plugins, optimization, env, build, dev-server, general). Returns configuration examples and best practices.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description:
                'Vite configuration topic',
              enum: [
                'plugins',
                'optimization',
                'env',
                'build',
                'dev-server',
                'general',
              ],
            },
          },
          required: ['topic'],
        },
      },
      {
        name: 'fetch_typescript_config',
        description:
          'Fetch TypeScript configuration documentation for specific topics (strict-mode, path-aliases, module-resolution, general). Returns tsconfig.json examples optimized for Vite.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description:
                'TypeScript configuration topic',
              enum: [
                'strict-mode',
                'path-aliases',
                'module-resolution',
                'general',
              ],
            },
          },
          required: ['topic'],
        },
      },
      {
        name: 'search_tailwind_utilities',
        description:
          'Search for specific Tailwind CSS utilities across documentation. Returns matching utilities with examples and usage tips.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description:
                'Search query (e.g., "flex-col", "grid-cols", "p-4")',
            },
            category: {
              type: 'string',
              description:
                'Optional: Filter by category',
              enum: [
                'layout',
                'spacing',
                'typography',
                'colors',
                'all',
              ],
              default: 'all',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_ecommerce_ui_pattern',
        description:
          'Get e-commerce UI patterns with complete implementations (product-grid, product-card, cart-item, checkout-form, add-to-cart, etc.). Returns production-ready code with Alpine.js or vanilla JavaScript.',
        inputSchema: {
          type: 'object',
          properties: {
            pattern: {
              type: 'string',
              description: 'E-commerce UI pattern to get',
              enum: [
                'product-grid',
                'product-card',
                'cart-item',
                'checkout-form',
                'price-display',
                'quantity-selector',
                'add-to-cart',
                'filter-sidebar',
                'search-bar',
                'breadcrumbs',
              ],
            },
            framework: {
              type: 'string',
              description:
                'Framework preference (default: alpine)',
              enum: ['alpine', 'vanilla'],
              default: 'alpine',
            },
          },
          required: ['pattern'],
        },
      },
      {
        name: 'fetch_capsize_typography',
        description:
          'Fetch Capsize typography documentation for baseline-aligned text. Topics: getting-started, metrics, createStyleObject, createStyleString, fontFaceString, vertical-rhythm, tailwind-integration.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description: 'Capsize topic to fetch',
              enum: [
                'getting-started',
                'metrics',
                'createStyleObject',
                'createStyleString',
                'fontFaceString',
                'vertical-rhythm',
                'tailwind-integration',
              ],
            },
            font_family: {
              type: 'string',
              description:
                'Optional: Font family to get metrics for (e.g., "Inter", "Roboto", "Arial")',
            },
          },
          required: ['topic'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: string;

      switch (name) {
        case 'fetch_tailwind_docs':
          result = await tailwindDocs.fetchDocs(args as any);
          break;

        case 'fetch_alpine_patterns':
          result = await alpinePatterns.fetchPattern(
            args as any
          );
          break;

        case 'fetch_vite_config':
          result = await viteConfig.fetchConfig(args as any);
          break;

        case 'fetch_typescript_config':
          result = await typescriptConfig.fetchConfig(
            args as any
          );
          break;

        case 'search_tailwind_utilities':
          result = await searchTailwind.searchUtilities(
            args as any
          );
          break;

        case 'get_ecommerce_ui_pattern':
          result = await ecommercePatterns.getPattern(
            args as any
          );
          break;

        case 'fetch_capsize_typography':
          result = await capsizeTypography.fetchDocs(
            args as any
          );
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
      const errorMsg =
        error instanceof Error
          ? error.message
          : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${errorMsg}`,
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
  console.error('Frontend MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
