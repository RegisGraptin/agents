import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"],
    external: [
        // Core dependencies
        "@elizaos/core",
                
        // Built-in Node.js modules
        "dotenv",
        "fs",
        "path",
        "https",
        "http",
        "events",
        
        // Third-party dependencies
        "@reflink/reflink",
        "@node-llama-cpp",
        "agentkeepalive",
        "viem",
        "node-cache",
        "zod"
    ],
    dts: {
        resolve: true,
        entry: {
            index: "src/index.ts"
        }
    },
    treeshake: true,
    splitting: false,
    bundle: true
});