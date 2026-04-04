#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration from environment
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const IMAGE_OUTPUT_DIR = process.env.IMAGE_OUTPUT_DIR || path.join(process.cwd(), 'outputs');
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-pro-exp-02-05';

if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is required.');
  process.exit(1);
}

// Ensure output directory exists
await fs.mkdir(IMAGE_OUTPUT_DIR, { recursive: true });

// Initialize Google AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Create server
const server = new Server(
  {
    name: 'banana-mcp',
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
          name: 'generate_image',
          description:
            'Generate a new image using Gemini (Imagen 3). Supports various aspect ratios and styles. Use for creating book illustrations, character designs, or any visual asset.',
          inputSchema: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'Detailed description of the image to generate. Include style, lighting, and composition details.',
              },
              aspect_ratio: {
                type: 'string',
                enum: ['1:1', '4:3', '16:9', '21:9', '3:4', '9:16'],
                description: 'Aspect ratio of the generated image (default: 1:1)',
                default: '1:1',
              },
              filename: {
                type: 'string',
                description: 'Optional filename for the generated image (without extension). If not provided, a timestamped name will be used.',
              },
              style: {
                type: 'string',
                description: 'Optional style override (e.g., "watercolor", "pencil sketch", "oil painting")',
              }
            },
            required: ['prompt'],
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
    if (request.params.name === 'generate_image') {
      try {
        const { prompt, aspect_ratio = '1:1', filename, style } = request.params.arguments as {
          prompt: string;
          aspect_ratio?: string;
          filename?: string;
          style?: string;
        };

        const model = genAI.getGenerativeModel({
          model: DEFAULT_MODEL,
        });

        // Enhancing prompt with style if provided
        const finalPrompt = style ? `${prompt} in ${style} style` : prompt;
        
        // Constructing the request for image generation
        // Gemini 2.0 API handles image generation as a tool call or response part
        // Note: The specific implementation might vary based on the model's image generation support.
        // For Gemini 2.0 Pro/Flash, we use the image generation tool capability.
        
        console.error(`Generating image for prompt: ${finalPrompt}`);

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: `Generate an image with this prompt: ${finalPrompt}. Aspect ratio: ${aspect_ratio}.` }] }],
            // For models that support imagen as a tool, they will return it in the parts
        });

        const response = result.response;
        
        // Finding image data in the response
        const parts = response.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));

        if (imagePart && imagePart.inlineData) {
          const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
          const finalFilename = filename ? `${filename}.png` : `banana_${Date.now()}.png`;
          const filePath = path.join(IMAGE_OUTPUT_DIR, finalFilename);
          
          await fs.writeFile(filePath, buffer);
          
          return {
            content: [
              {
                type: 'text',
                text: `Successfully generated image and saved to: ${filePath}`,
              },
            ],
          };
        } else {
          // If the model didn't return image data directly, it might have called a tool or just described it.
          // This depends on the exact API version and model behavior.
          return {
            content: [
              {
                type: 'text',
                text: `Model response did not contain image data. Response text: ${response.text()}`,
              },
            ],
            isError: true,
          };
        }
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error generating image: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  }
);

// Run the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Banana MCP server running on stdio');
