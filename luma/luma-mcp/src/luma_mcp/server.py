import asyncio
import os
import sys
from typing import Optional, Literal

from dotenv import load_dotenv
from lumaai import LumaAI
from mcp.server import Server, NotificationOptions
from mcp.server.models import InitializationOptions
import mcp.types as types
import mcp.server.stdio

load_dotenv()

# Initialize Luma AI Client
api_key = os.getenv("LUMAAI_API_KEY")
if not api_key:
    # We allow running without key to avoid crashing, but tools will fail
    print("Warning: LUMAAI_API_KEY not found in environment.", file=sys.stderr)

client = LumaAI(auth_token=api_key) if api_key else None

server = Server("luma-mcp")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available Luma AI tools."""
    return [
        types.Tool(
            name="luma_generate_video",
            description="Create a video from text or image. Essential for character reference (turnarounds).",
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {"type": "string", "description": "Text description of the video"},
                    "frame0_url": {"type": "string", "description": "Start frame image URL (Image-to-Video)"},
                    "aspect_ratio": {
                        "type": "string", 
                        "enum": ["1:1", "16:9", "9:16", "4:3", "3:4", "21:9"],
                        "default": "16:9"
                    },
                    "loop": {"type": "boolean", "default": False, "description": "Create a seamless loop"}
                },
                "required": ["prompt"]
            }
        ),
        types.Tool(
            name="luma_get_generation",
            description="Check the status and get the URL of a video generation.",
            inputSchema={
                "type": "object",
                "properties": {
                    "generation_id": {"type": "string", "description": "The unique ID of the generation"}
                },
                "required": ["generation_id"]
            }
        ),
        types.Tool(
            name="luma_list_generations",
            description="List recent video generations.",
            inputSchema={
                "type": "object",
                "properties": {
                    "limit": {"type": "integer", "default": 10},
                    "offset": {"type": "integer", "default": 0}
                }
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    """Handle tool calls."""
    if not client:
        return [types.TextContent(type="text", text="Error: LUMAAI_API_KEY is not configured.")]

    try:
        if name == "luma_generate_video":
            prompt = arguments.get("prompt")
            frame0_url = arguments.get("frame0_url")
            aspect_ratio = arguments.get("aspect_ratio", "16:9")
            loop = arguments.get("loop", False)

            # Build generation request
            gen_params = {
                "prompt": prompt,
                "aspect_ratio": aspect_ratio,
                "loop": loop
            }
            if frame0_url:
                gen_params["keyframes"] = {"frame0": {"url": frame0_url}}

            generation = client.generations.create(**gen_params)
            
            return [types.TextContent(
                type="text", 
                text=f"Generation started successfully.\nID: {generation.id}\nStatus: {generation.state}\nCheck progress using luma_get_generation(generation_id='{generation.id}')"
            )]

        elif name == "luma_get_generation":
            gen_id = arguments.get("generation_id")
            gen_status = client.generations.get(id=gen_id)
            
            response_text = f"Generation ID: {gen_status.id}\nState: {gen_status.state}\n"
            if gen_status.state == "completed":
                response_text += f"Video URL: {gen_status.assets.video}\n"
                if hasattr(gen_status.assets, 'image'):
                    response_text += f"Thumbnail: {gen_status.assets.image}\n"
            elif gen_status.state == "failed":
                response_text += f"Failure reason: {getattr(gen_status, 'failure_reason', 'Unknown error')}\n"
            
            return [types.TextContent(type="text", text=response_text)]

        elif name == "luma_list_generations":
            limit = arguments.get("limit", 10)
            offset = arguments.get("offset", 0)
            
            generations = client.generations.list(limit=limit, offset=offset)
            
            output = [f"Found {len(generations)} generations:"]
            for g in generations:
                output.append(f"- ID: {g.id} | State: {g.state} | Prompt: {g.prompt[:30]}...")
            
            return [types.TextContent(type="text", text="\n".join(output))]

        else:
            raise ValueError(f"Unknown tool: {name}")

    except Exception as e:
        return [types.TextContent(type="text", text=f"Luma AI API Error: {str(e)}")]

async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="luma-mcp",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
