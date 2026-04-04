import asyncio
import os
import sys
import json
import httpx
from typing import Optional, List, Dict, Any

from dotenv import load_dotenv
from mcp.server import Server, NotificationOptions
from mcp.server.models import InitializationOptions
import mcp.types as types
import mcp.server.stdio

load_dotenv()

# Initialize API settings
IDEOGRAM_API_KEY = os.getenv("IDEOGRAM_API_KEY")
BASE_URL = "https://api.ideogram.ai/v1"

if not IDEOGRAM_API_KEY:
    print("Warning: IDEOGRAM_API_KEY not found in environment.", file=sys.stderr)

server = Server("ideogram-mcp")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available Ideogram 3.0 tools."""
    return [
        types.Tool(
            name="ideogram_generate",
            description="Generate an image using Ideogram 3.0. Supports Character and Style reference.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Text description of the image"},
                    "aspect_ratio": {
                        "type": "string",
                        "enum": ["ASPECT_10_16", "ASPECT_16_10", "ASPECT_1_1", "ASPECT_4_3", "ASPECT_3_4"],
                        "default": "ASPECT_1_1"
                    },
                    "style_type": {
                        "type": "string",
                        "enum": ["REALISTIC", "DESIGN", "GENERAL", "FICTION"],
                        "default": "GENERAL"
                    },
                    "character_reference_image_url": {"type": "string", "description": "URL of the character reference image"},
                    "style_reference_image_url": {"type": "string", "description": "URL of the style reference image"},
                    "rendering_speed": {
                        "type": "string",
                        "enum": ["QUALITY", "BALANCED", "TURBO", "FLASH"],
                        "default": "QUALITY"
                    }
                },
                "required": ["prompt"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    """Handle tool calls."""
    if not IDEOGRAM_API_KEY:
        return [types.TextContent(type="text", text="Error: IDEOGRAM_API_KEY is not configured.")]

    try:
        if name == "ideogram_generate":
            prompt = arguments.get("prompt")
            aspect_ratio = arguments.get("aspect_ratio", "ASPECT_1_1")
            style_type = arguments.get("style_type", "GENERAL")
            char_ref = arguments.get("character_reference_image_url")
            style_ref = arguments.get("style_reference_image_url")
            speed = arguments.get("rendering_speed", "QUALITY")

            payload = {
                "image_request": {
                    "prompt": prompt,
                    "aspect_ratio": aspect_ratio,
                    "style_type": style_type,
                    "rendering_speed": speed
                }
            }

            # Ideogram API structure for references might vary slightly, following common patterns:
            if char_ref:
                payload["image_request"]["character_reference_image_url"] = char_ref
            if style_ref:
                payload["image_request"]["style_reference_image_url"] = style_ref

            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{BASE_URL}/ideogram-v3/generate",
                    headers={
                        "Api-Key": IDEOGRAM_API_KEY,
                        "Content-Type": "application/json"
                    },
                    json=payload
                )
                
                if response.status_code != 200:
                    return [types.TextContent(type="text", text=f"Ideogram API Error ({response.status_code}): {response.text}")]
                
                data = response.json()
                # Ideogram typically returns an array of images in 'data'
                image_urls = [img.get("url") for img in data.get("data", [])]
                
                return [types.TextContent(
                    type="text", 
                    text=f"Image(s) generated successfully:\n" + "\n".join(image_urls)
                )]

        else:
            raise ValueError(f"Unknown tool: {name}")

    except Exception as e:
        return [types.TextContent(type="text", text=f"Ideogram MCP Error: {str(e)}")]

async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="ideogram-mcp",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
