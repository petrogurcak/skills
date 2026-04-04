# Luma AI MCP Server

This MCP server provides integration with Luma AI's Dream Machine (Ray-2) for high-quality video generation. It's specifically designed to help maintain character consistency in children's book projects using Image-to-Video turnarounds.

## Tools

- `luma_generate_video`: Start a text-to-video or image-to-video generation.
- `luma_get_generation`: Check status and get the final video URL.
- `luma_list_generations`: List recent generations.

## Setup

1. Get an API key from [Luma AI API Dashboard](https://lumalabs.ai/dream-machine/api).
2. Create a `.env` file in this directory with `LUMAAI_API_KEY=your_key`.
3. Install dependencies: `pip install -e .`

## Usage in Gemini CLI / Claude Code

Add this server to your config:

```json
{
  "mcpServers": {
    "luma": {
      "command": "python",
      "args": ["/Users/petrogurcak/Projects/skills/luma/luma-mcp/src/luma_mcp/server.py"],
      "env": {
        "LUMAAI_API_KEY": "your_actual_key_here"
      }
    }
  }
}
```
