import { build } from "esbuild";
import { execSync } from "child_process";

// Build the Vite frontend
execSync("npx vite build", { stdio: "inherit" });

// Bundle the Express server
await build({
  entryPoints: ["server/index.ts"],
  outfile: "dist/index.mjs",
  platform: "node",
  format: "esm",
  bundle: true,
  packages: "external",
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});
