import asyncio
import base64
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

IDEOGRAM_API_KEY = os.getenv("IDEOGRAM_API_KEY")
BASE_URL = "https://api.ideogram.ai/v1"

if not IDEOGRAM_API_KEY:
    print("Warning: IDEOGRAM_API_KEY not found in environment.", file=sys.stderr)

server = Server("ideogram-mcp")

ASPECT_RATIOS = ["1x1", "2x1", "1x2", "2x3", "3x2", "3x4", "4x3", "4x5", "5x4", "9x16", "16x9", "10x16", "16x10", "1x3", "3x1"]

STYLE_PRESETS = [
    "AUTO", "ANIME", "CARTOON", "CINEMATIC", "COMIC_BOOK", "DESIGN", "DIGITAL_ART",
    "FANTASY", "FASHION", "FLAT_DESIGN", "FOOD_PHOTOGRAPHY", "GAME_ART", "GRAPHIC_NOVEL",
    "ILLUSTRATION", "IMPRESSIONISM", "ISOMETRIC", "LINE_ART", "LOW_POLY", "MANGA",
    "MINIMALISM", "NEON", "OIL_PAINTING", "ORIGAMI", "PATTERN", "PENCIL_DRAWING",
    "PIXEL_ART", "POP_ART", "PRODUCT_PHOTOGRAPHY", "RETRO", "SCULPTURE", "SKETCH",
    "STAINED_GLASS", "STEAMPUNK", "STICKER", "SURREALISM", "VECTOR", "VOXEL",
    "WATERCOLOR", "WOODCUT"
]


@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="ideogram_generate",
            description="Generate an image using Ideogram 3.0. Supports character/style references, color palettes, negative prompts, and style presets.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Text description of the image to generate"},
                    "aspect_ratio": {
                        "type": "string",
                        "enum": ASPECT_RATIOS,
                        "default": "1x1",
                        "description": "Image aspect ratio"
                    },
                    "style_type": {
                        "type": "string",
                        "enum": ["REALISTIC", "DESIGN", "GENERAL", "FICTION", "AUTO"],
                        "default": "AUTO"
                    },
                    "rendering_speed": {
                        "type": "string",
                        "enum": ["QUALITY", "BALANCED", "TURBO", "FLASH"],
                        "default": "QUALITY"
                    },
                    "num_images": {
                        "type": "integer",
                        "default": 1,
                        "description": "Number of images to generate (1-4)"
                    },
                    "seed": {
                        "type": "integer",
                        "description": "Seed for reproducibility. Use a previously returned seed to get similar results."
                    },
                    "negative_prompt": {
                        "type": "string",
                        "description": "What to exclude from the image (e.g. 'blurry, text errors, extra fingers')"
                    },
                    "magic_prompt": {
                        "type": "string",
                        "enum": ["AUTO", "ON", "OFF"],
                        "default": "AUTO",
                        "description": "Let Ideogram enhance your prompt. OFF = use prompt exactly as written."
                    },
                    "style_preset": {
                        "type": "string",
                        "enum": STYLE_PRESETS,
                        "description": "Predefined visual style (e.g. WATERCOLOR, OIL_PAINTING, PRODUCT_PHOTOGRAPHY)"
                    },
                    "color_palette_hex": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of hex colors to use in the image (e.g. ['#1C2B3A', '#4A2035', '#F7F4EF'])"
                    },
                    "character_reference_image_url": {
                        "type": "string",
                        "description": "URL of character reference image — maintains identity across generations"
                    },
                    "style_reference_image_url": {
                        "type": "string",
                        "description": "URL of style reference image — copies artistic style"
                    }
                },
                "required": ["prompt"]
            }
        ),
        types.Tool(
            name="ideogram_edit",
            description="Edit parts of an existing image using a mask. Black regions in the mask are edited, white regions are kept. Provide a local file path for both image and mask.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Description of what should appear in the masked (black) region"},
                    "image_path": {"type": "string", "description": "Absolute path to the source image (PNG/JPEG/WebP, max 10MB)"},
                    "mask_path": {"type": "string", "description": "Absolute path to the mask image (same dimensions as source, black=edit, white=keep)"},
                    "rendering_speed": {
                        "type": "string",
                        "enum": ["QUALITY", "BALANCED", "TURBO", "FLASH"],
                        "default": "QUALITY"
                    },
                    "magic_prompt": {
                        "type": "string",
                        "enum": ["AUTO", "ON", "OFF"],
                        "default": "AUTO"
                    },
                    "seed": {"type": "integer", "description": "Seed for reproducibility"},
                    "style_type": {
                        "type": "string",
                        "enum": ["REALISTIC", "DESIGN", "GENERAL", "FICTION", "AUTO"],
                        "default": "AUTO"
                    }
                },
                "required": ["prompt", "image_path", "mask_path"]
            }
        )
    ]


@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    if not IDEOGRAM_API_KEY:
        return [types.TextContent(type="text", text="Error: IDEOGRAM_API_KEY is not configured.")]

    headers = {
        "Api-Key": IDEOGRAM_API_KEY,
    }

    try:
        if name == "ideogram_generate":
            return await _handle_generate(arguments, headers)
        elif name == "ideogram_edit":
            return await _handle_edit(arguments, headers)
        else:
            raise ValueError(f"Unknown tool: {name}")
    except Exception as e:
        return [types.TextContent(type="text", text=f"Ideogram MCP Error: {str(e)}")]


async def _handle_generate(arguments: dict, headers: dict) -> list[types.TextContent]:
    payload = {
        "prompt": arguments.get("prompt"),
        "aspect_ratio": arguments.get("aspect_ratio", "1x1"),
        "style_type": arguments.get("style_type", "AUTO"),
        "rendering_speed": arguments.get("rendering_speed", "QUALITY"),
        "magic_prompt": arguments.get("magic_prompt", "AUTO"),
    }

    if arguments.get("num_images"):
        payload["num_images"] = min(arguments["num_images"], 4)
    if arguments.get("seed") is not None:
        payload["seed"] = arguments["seed"]
    if arguments.get("negative_prompt"):
        payload["negative_prompt"] = arguments["negative_prompt"]
    if arguments.get("style_preset"):
        payload["style_preset"] = arguments["style_preset"]

    # Color palette
    hex_colors = arguments.get("color_palette_hex")
    if hex_colors:
        payload["color_palette"] = {
            "members": [{"color_hex": c if c.startswith("#") else f"#{c}", "color_weight": round(1.0 / len(hex_colors), 2)} for c in hex_colors]
        }

    # References
    char_ref = arguments.get("character_reference_image_url")
    if char_ref:
        payload["character_reference"] = {"image_url": char_ref}

    style_ref = arguments.get("style_reference_image_url")
    if style_ref:
        payload["style_reference"] = {"image_url": style_ref}

    headers["Content-Type"] = "application/json"

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{BASE_URL}/ideogram-v3/generate",
            headers=headers,
            json=payload
        )

        if response.status_code != 200:
            return [types.TextContent(type="text", text=f"Ideogram API Error ({response.status_code}): {response.text}")]

        data = response.json()
        results = []
        for img in data.get("data", []):
            url = img.get("url", "")
            seed = img.get("seed", "")
            resolution = img.get("resolution", "")
            results.append(f"URL: {url}\nSeed: {seed}\nResolution: {resolution}")

        return [types.TextContent(
            type="text",
            text=f"Generated {len(results)} image(s):\n\n" + "\n\n---\n\n".join(results)
        )]


async def _handle_edit(arguments: dict, headers: dict) -> list[types.TextContent]:
    image_path = arguments.get("image_path")
    mask_path = arguments.get("mask_path")

    if not os.path.exists(image_path):
        return [types.TextContent(type="text", text=f"Image not found: {image_path}")]
    if not os.path.exists(mask_path):
        return [types.TextContent(type="text", text=f"Mask not found: {mask_path}")]

    # Multipart form upload
    files = {
        "image": ("image.png", open(image_path, "rb"), "image/png"),
        "mask": ("mask.png", open(mask_path, "rb"), "image/png"),
    }

    form_data = {
        "prompt": arguments.get("prompt"),
        "rendering_speed": arguments.get("rendering_speed", "QUALITY"),
        "magic_prompt": arguments.get("magic_prompt", "AUTO"),
        "style_type": arguments.get("style_type", "AUTO"),
    }

    if arguments.get("seed") is not None:
        form_data["seed"] = str(arguments["seed"])

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{BASE_URL}/ideogram-v3/edit",
            headers=headers,
            files=files,
            data=form_data
        )

        if response.status_code != 200:
            return [types.TextContent(type="text", text=f"Ideogram Edit Error ({response.status_code}): {response.text}")]

        data = response.json()
        results = []
        for img in data.get("data", []):
            url = img.get("url", "")
            seed = img.get("seed", "")
            resolution = img.get("resolution", "")
            results.append(f"URL: {url}\nSeed: {seed}\nResolution: {resolution}")

        return [types.TextContent(
            type="text",
            text=f"Edited image(s):\n\n" + "\n\n---\n\n".join(results)
        )]


async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="ideogram-mcp",
                server_version="0.3.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
