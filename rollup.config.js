import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

const isLocal = process.env.BUILD_ENV === "local";

export default {
  plugins: [
    alias({
      entries: [
        {
          find: "appsettings.json",
          replacement: isLocal ? "appsettings.local.json" : "appsettings.json",
        },
      ],
    }),
    json(),
    typescript(),
  ],
  input: "plugin.ts",
  output: [
    { file: "./dist/plugin.cjs", format: "cjs", exports: "named" },
    { file: "./dist/plugin.mjs", format: "esm", exports: "named" },
    {
      file: "./dist/plugin.umd.js",
      format: "umd",
      name: "FeedbackFocal",
      exports: "named",
    },
  ],
};
