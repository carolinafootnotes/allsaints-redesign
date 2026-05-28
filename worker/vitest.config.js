import { defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";
import fs from "node:fs";

const htmlAsString = {
  name: "html-as-string",
  enforce: "pre",
  load(id) {
    if (id.endsWith(".html")) {
      return `export default ${JSON.stringify(fs.readFileSync(id, "utf-8"))};`;
    }
  },
};

export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations(path.resolve(__dirname, "./schema"));

  return {
    plugins: [htmlAsString],
    test: {
      setupFiles: ["./tests/apply-migrations.js"],
      poolOptions: {
        workers: {
          singleWorker: true,
          main: "./src/index.js",
          miniflare: {
            compatibilityDate: "2024-10-01",
            compatibilityFlags: ["nodejs_compat"],
            d1Databases: ["DB"],
            bindings: {
              ADMIN_KEY: "test-admin-key",
              TEST_MIGRATIONS: migrations,
            },
          },
        },
      },
    },
  };
});
