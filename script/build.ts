import { build } from "esbuild";
import { execSync } from "child_process";

// Build the Vite frontend
execSync("npx vite build", { stdio: "inherit" });

// Bundle the Express server
await build({
  entryPoints: ["server/index.ts"],
  outfile: "dist/index.cjs",
  platform: "node",
  format: "cjs",
  bundle: true,
  packages: "external",
});
