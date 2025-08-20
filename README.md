# SVG Optimizer MCP Server

A Model Context Protocol (MCP) server that provides SVG optimization capabilities using [SVGO](https://github.com/svg/svgo). This server allows AI assistants and other MCP clients to optimize SVG files to reduce their file size while maintaining visual quality.

## Features

- **Simple SVG Optimization**: Optimize SVG files using SVGO's proven default settings
- **File Size Analytics**: Get detailed statistics about optimization results
- **Error Handling**: Clear error messages for invalid SVG content
- **Zero Configuration**: Works out of the box with sensible defaults
- **NPX Compatible**: Can be run directly via npx without installation

## Installation

Add this configuration to your MCP client's `mcp.json`:

```json
{
  "mcpServers": {
    "svg-optimizer": {
      "command": "npx",
      "args": ["svgo-mcp"]
    }
  }
}
```

## Usage

The server provides a single tool: `optimize_svg`

### Tool: optimize_svg

Optimizes an SVG file using SVGO with default settings.

**Parameters:**
- `content` (required): The SVG file content as a string
- `filename` (optional): Filename for context and reporting

**Example Usage:**

```javascript
{
  "name": "optimize_svg",
  "arguments": {
    "content": "<svg ... /></svg>",
    "filename": "icon.svg"
  }
}
```

**Response:**

```json
{
  "success": true,
  "filename": "icon.svg",
  "optimization": {
    "originalSize": 85,
    "optimizedSize": 65,
    "savings": 20,
    "savingsPercent": "23.5%",
    "compressionRatio": "0.765"
  },
  "optimizedContent": "<svg ... /></svg>"
}
```

## Response Format

The server returns a JSON object with the following structure:

- `success`: Boolean indicating if optimization was successful
- `filename`: The provided filename or "untitled.svg" if not specified
- `optimization`: Object containing size statistics
  - `originalSize`: Original file size in bytes
  - `optimizedSize`: Optimized file size in bytes
  - `savings`: Bytes saved through optimization
  - `savingsPercent`: Percentage of size reduction
  - `compressionRatio`: Ratio of optimized size to original size
- `optimizedContent`: The optimized SVG content


## Use Cases

- **Web Development**: Optimize SVG icons and graphics for faster loading
- **Asset Processing**: Batch optimize SVG files in build pipelines
- **Content Management**: Reduce storage requirements for SVG assets
- **Performance Optimization**: Minimize bandwidth usage for SVG delivery