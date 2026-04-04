#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { ExpoSDKTool } from './tools/expo-sdk.js';
import { ReactNativeDocsTool } from './tools/react-native-docs.js';
import { ExpoRouterTool } from './tools/expo-router.js';
import { NpmDocsTool } from './tools/npm-docs.js';
import { IOSHIGTool } from './tools/ios-hig.js';
import { TamaguiDocsTool } from './tools/tamagui-docs.js';
import { LiquidGlassDocsTool } from './tools/liquid-glass-docs.js';
import { ReanimatedDocsTool } from './tools/reanimated-docs.js';

// Initialize tools
const expoSDKTool = new ExpoSDKTool();
const reactNativeDocsTool = new ReactNativeDocsTool();
const expoRouterTool = new ExpoRouterTool();
const npmDocsTool = new NpmDocsTool();
const iosHIGTool = new IOSHIGTool();
const tamaguiDocsTool = new TamaguiDocsTool();
const liquidGlassDocsTool = new LiquidGlassDocsTool();
const reanimatedDocsTool = new ReanimatedDocsTool();

// Create server
const server = new Server(
  {
    name: 'expo-mcp',
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
          name: 'fetch_expo_sdk',
          description:
            'Fetch Expo SDK module documentation from docs.expo.dev. Returns installation, usage, and API reference. MANDATORY to call before using any Expo module.',
          inputSchema: {
            type: 'object',
            properties: {
              module: {
                type: 'string',
                description:
                  'Expo module name (e.g., "expo-camera", "expo-image", "expo-video")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['module'],
          },
        },
        {
          name: 'fetch_rn_docs',
          description:
            'Fetch React Native core documentation from reactnative.dev. Returns component APIs, guides, and best practices. MANDATORY before using RN core components.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'Topic or component name (e.g., "View", "FlatList", "StyleSheet", "flexbox")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'fetch_expo_router',
          description:
            'Fetch Expo Router documentation for file-based navigation. Returns routing patterns, layouts, and navigation APIs. MANDATORY before implementing navigation.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'Router topic (e.g., "file-based-routing", "tabs", "stack", "navigation", "deep-linking", "hooks")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'fetch_npm_docs',
          description:
            'Fetch npm package documentation and README. Returns installation, usage, and API. MANDATORY before using any npm package.',
          inputSchema: {
            type: 'object',
            properties: {
              package_name: {
                type: 'string',
                description:
                  'npm package name (e.g., "zustand", "nativewind", "@tanstack/react-query")',
              },
              version: {
                type: 'string',
                description: 'Specific version (default: latest)',
                default: 'latest',
              },
            },
            required: ['package_name'],
          },
        },
        // iOS Premium UI Tools (Workflow 7)
        {
          name: 'fetch_ios_hig',
          description:
            'Fetch Apple Human Interface Guidelines for iOS design patterns. Returns design principles, best practices, and accessibility requirements. MANDATORY for iOS Premium UI (Workflow 7).',
          inputSchema: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string',
                description:
                  'HIG pattern or topic (e.g., "materials", "buttons", "haptics", "motion", "accessibility", "color", "typography")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include detailed examples (default: true)',
                default: true,
              },
            },
            required: ['pattern'],
          },
        },
        {
          name: 'fetch_tamagui_docs',
          description:
            'Fetch Tamagui documentation for design system, components, and theming. Returns configuration, tokens, themes, and component APIs. MANDATORY for iOS Premium UI (Workflow 7).',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'Tamagui topic (e.g., "configuration", "themes", "tokens", "animations", "Sheet", "Button", "styled")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'fetch_liquid_glass_docs',
          description:
            'Fetch Liquid Glass and blur effect documentation. Returns iOS 26+ Liquid Glass APIs and BlurView fallback patterns. MANDATORY when implementing glass effects.',
          inputSchema: {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                description:
                  'Component or topic (e.g., "LiquidGlassView", "LiquidGlassContainer", "BlurView", "all")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include implementation examples (default: true)',
                default: true,
              },
            },
            required: ['component'],
          },
        },
        {
          name: 'fetch_reanimated_docs',
          description:
            'Fetch React Native Reanimated documentation for animations. Returns hooks, animation functions, and gesture integration. MANDATORY when implementing animations.',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                description:
                  'Reanimated topic (e.g., "withSpring", "withTiming", "useAnimatedStyle", "gesture", "layout-animations")',
              },
              include_examples: {
                type: 'boolean',
                description: 'Include code examples (default: true)',
                default: true,
              },
            },
            required: ['topic'],
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
        case 'fetch_expo_sdk':
          result = await expoSDKTool.fetchExpoSDK(args as any);
          break;

        case 'fetch_rn_docs':
          result = await reactNativeDocsTool.fetchRNDocs(args as any);
          break;

        case 'fetch_expo_router':
          result = await expoRouterTool.fetchExpoRouter(args as any);
          break;

        case 'fetch_npm_docs':
          result = await npmDocsTool.fetchNpmDocs(args as any);
          break;

        // iOS Premium UI Tools (Workflow 7)
        case 'fetch_ios_hig':
          result = await iosHIGTool.fetchIOSHIG(args as any);
          break;

        case 'fetch_tamagui_docs':
          result = await tamaguiDocsTool.fetchTamaguiDocs(args as any);
          break;

        case 'fetch_liquid_glass_docs':
          result = await liquidGlassDocsTool.fetchLiquidGlassDocs(args as any);
          break;

        case 'fetch_reanimated_docs':
          result = await reanimatedDocsTool.fetchReanimatedDocs(args as any);
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

  console.error('Expo MCP Server running on stdio');
  console.error('Available tools: 8 tools');
  console.error('Core tools:');
  console.error('- fetch_expo_sdk: Expo SDK modules');
  console.error('- fetch_rn_docs: React Native core');
  console.error('- fetch_expo_router: File-based navigation');
  console.error('- fetch_npm_docs: npm packages');
  console.error('iOS Premium UI tools (Workflow 7):');
  console.error('- fetch_ios_hig: Apple Human Interface Guidelines');
  console.error('- fetch_tamagui_docs: Tamagui design system');
  console.error('- fetch_liquid_glass_docs: Liquid Glass effects');
  console.error('- fetch_reanimated_docs: React Native Reanimated');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
