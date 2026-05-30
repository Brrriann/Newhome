import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — no SSR/API in this app, so it ships as plain HTML/JS/CSS.
  // Cloudflare Pages serves the generated `out/` directory directly.
  output: 'export',
  reactCompiler: true,
};

export default nextConfig;
