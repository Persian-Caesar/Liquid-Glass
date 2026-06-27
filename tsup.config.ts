import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    target: "es2018",
    external: ["react", "react-dom"],
    treeshaking: true
});