import { optimize } from "svgo";

export async function handleOptimizeSvg(args: OptimizeSvgArgs) {
  const { content, filename } = args;

  // Validate SVG content
  const trimmedContent = content.trim();
  if (!trimmedContent.startsWith('<svg') && !trimmedContent.startsWith('<?xml')) {
    throw new Error("Invalid SVG content. Content must be a valid SVG file starting with <svg> or <?xml>");
  }

  // Optimize the SVG with default SVGO settings
  const result = optimize(content);
  
  // Calculate size statistics
  const originalSize = Buffer.byteLength(content, 'utf8');
  const optimizedSize = Buffer.byteLength(result.data, 'utf8');
  const savings = originalSize - optimizedSize;
  const savingsPercent = originalSize > 0 ? ((savings / originalSize) * 100).toFixed(1) : "0.0";

  // Format the response
  const response = {
    success: true,
    filename: filename || "untitled.svg",
    optimization: {
      originalSize,
      optimizedSize,
      savings,
      savingsPercent: `${savingsPercent}%`,
      compressionRatio: originalSize > 0 ? (optimizedSize / originalSize).toFixed(3) : "1.000",
    },
    optimizedContent: result.data,
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
}

export type OptimizeSvgArgs = {
  content: string;
  filename?: string;
}