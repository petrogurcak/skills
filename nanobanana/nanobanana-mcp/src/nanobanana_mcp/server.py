import asyncio
import base64
import io
import os
import sys

from dotenv import load_dotenv
from mcp.server import Server, NotificationOptions
from mcp.server.models import InitializationOptions
import mcp.types as types
import mcp.server.stdio

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment.", file=sys.stderr)

server = Server("nanobanana-mcp")

ASPECT_RATIOS = ["1:1", "3:4", "4:3", "9:16", "16:9"]


@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="banana_generate",
            description="Generate an image using Google Imagen 3 (via Gemini API). Best for artistic textures, watercolor/sketch styles, and rapid prototyping.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Text description of the image to generate"},
                    "aspect_ratio": {
                        "type": "string",
                        "enum": ASPECT_RATIOS,
                        "default": "1:1",
                        "description": "Image aspect ratio"
                    },
                    "num_images": {
                        "type": "integer",
                        "default": 1,
                        "description": "Number of images to generate (1-4)"
                    },
                    "output_dir": {
                        "type": "string",
                        "description": "Directory to save generated images. Defaults to /tmp/nanobanana/"
                    },
                    "filename_prefix": {
                        "type": "string",
                        "default": "banana",
                        "description": "Prefix for saved filenames"
                    }
                },
                "required": ["prompt"]
            }
        ),
        types.Tool(
            name="banana_edit",
            description="Edit an existing image using Imagen 3 editing capabilities. Supports inpainting (add/remove objects), background swap, and outpainting. Requires Vertex AI for full editing features.",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Description of the desired edit"},
                    "image_path": {"type": "string", "description": "Absolute path to the source image"},
                    "mask_path": {"type": "string", "description": "Absolute path to mask image (white=edit area, black=keep). Optional for some edit modes."},
                    "edit_mode": {
                        "type": "string",
                        "enum": ["inpaint_insertion", "inpaint_removal", "bgswap", "outpaint"],
                        "default": "inpaint_insertion",
                        "description": "Type of edit to perform"
                    },
                    "output_dir": {
                        "type": "string",
                        "description": "Directory to save edited images. Defaults to /tmp/nanobanana/"
                    }
                },
                "required": ["prompt", "image_path"]
            }
        )
    ]


@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    if not GEMINI_API_KEY:
        return [types.TextContent(type="text", text="Error: GEMINI_API_KEY is not configured. Set GEMINI_API_KEY or GOOGLE_API_KEY.")]

    try:
        if name == "banana_generate":
            return await _handle_generate(arguments)
        elif name == "banana_edit":
            return await _handle_edit(arguments)
        else:
            raise ValueError(f"Unknown tool: {name}")
    except Exception as e:
        return [types.TextContent(type="text", text=f"Nanobanana MCP Error: {str(e)}")]


async def _handle_generate(arguments: dict) -> list[types.TextContent]:
    from google import genai
    from google.genai import types as genai_types

    client = genai.Client(api_key=GEMINI_API_KEY)

    prompt = arguments.get("prompt")
    aspect_ratio = arguments.get("aspect_ratio", "1:1")
    num_images = min(arguments.get("num_images", 1), 4)
    output_dir = arguments.get("output_dir", "/tmp/nanobanana")
    prefix = arguments.get("filename_prefix", "banana")

    os.makedirs(output_dir, exist_ok=True)

    response = client.models.generate_images(
        model="imagen-3.0-generate-002",
        prompt=prompt,
        config=genai_types.GenerateImagesConfig(
            number_of_images=num_images,
            aspect_ratio=aspect_ratio,
            output_mime_type="image/png",
        )
    )

    results = []
    for i, img in enumerate(response.generated_images):
        filename = f"{prefix}_{i+1}.png"
        filepath = os.path.join(output_dir, filename)
        img.image.save(filepath)
        results.append(f"Image {i+1}: {filepath}")

    return [types.TextContent(
        type="text",
        text=f"Generated {len(results)} image(s):\n\n" + "\n".join(results)
    )]


async def _handle_edit(arguments: dict) -> list[types.TextContent]:
    from google import genai
    from google.genai import types as genai_types
    from PIL import Image

    client = genai.Client(api_key=GEMINI_API_KEY)

    prompt = arguments.get("prompt")
    image_path = arguments.get("image_path")
    mask_path = arguments.get("mask_path")
    edit_mode = arguments.get("edit_mode", "inpaint_insertion")
    output_dir = arguments.get("output_dir", "/tmp/nanobanana")

    if not os.path.exists(image_path):
        return [types.TextContent(type="text", text=f"Image not found: {image_path}")]

    os.makedirs(output_dir, exist_ok=True)

    # Load source image
    source_image = Image.open(image_path)

    # Map edit modes
    mode_map = {
        "inpaint_insertion": "EDIT_MODE_INPAINT_INSERTION",
        "inpaint_removal": "EDIT_MODE_INPAINT_REMOVAL",
        "bgswap": "EDIT_MODE_BGSWAP",
        "outpaint": "EDIT_MODE_OUTPAINT",
    }

    edit_config = {
        "edit_mode": mode_map.get(edit_mode, "EDIT_MODE_INPAINT_INSERTION"),
    }

    # Build reference images
    ref_images = [
        genai_types.RawReferenceImage(
            reference_image=source_image,
            reference_id=0,
        )
    ]

    if mask_path and os.path.exists(mask_path):
        mask_image = Image.open(mask_path)
        ref_images.append(
            genai_types.MaskReferenceImage(
                reference_image=mask_image,
                reference_id=1,
                config=genai_types.MaskReferenceConfig(
                    mask_mode="MASK_MODE_USER_PROVIDED",
                    mask_dilation=0.0,
                ),
            )
        )

    try:
        response = client.models.edit_image(
            model="imagen-3.0-capability-001",
            prompt=prompt,
            reference_images=ref_images,
            config=genai_types.EditImageConfig(**edit_config),
        )

        results = []
        for i, img in enumerate(response.generated_images):
            filename = f"edited_{i+1}.png"
            filepath = os.path.join(output_dir, filename)
            img.image.save(filepath)
            results.append(f"Edited {i+1}: {filepath}")

        return [types.TextContent(
            type="text",
            text=f"Edited {len(results)} image(s):\n\n" + "\n".join(results)
        )]

    except Exception as e:
        if "Vertex AI" in str(e) or "vertexai" in str(e).lower():
            return [types.TextContent(
                type="text",
                text=f"Edit mode '{edit_mode}' requires Vertex AI (not available with API key). Use banana_generate instead, or configure Vertex AI credentials."
            )]
        raise


async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="nanobanana-mcp",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
