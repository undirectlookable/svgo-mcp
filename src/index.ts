#!/usr/bin/env node

import { McpServer, ResourceTemplate} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { handleOptimizeSvg, OptimizeSvgArgs } from "./optimize.js";

async function main(): Promise<void> {
  const server = new McpServer({
    name: "SvgOptimizerServer",
    version: "0.1.1",
    description: "A MCP server to call svgo."
  });

  server.registerTool(
    "optimize_svg",
    {
      title: "SVG Optimizer",
      description: "Optimize an SVG file using SVGO with default settings to reduce file size while maintaining quality",
      inputSchema: {
        content: z.string().describe("The SVG file content to optimize"),
        filename: z.string().optional().describe("Optional filename for context and reporting"),
      },
    },
    async (args) => {
      return await handleOptimizeSvg(args as OptimizeSvgArgs) as any;
    }
  );
  
  const transport = new StdioServerTransport();

  try {
    await server.connect(transport);
    console.error('Svg Optimizer MCP Server connected');
  } catch (error) {
    console.error('Error connecting MCP server:', error);
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
