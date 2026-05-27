import { defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations(path.resolve(__dirname, "./schema"));

  return {
    test: {
      setupFiles: ["./tests/apply-migrations.js"],
      poolOptions: {
        workers: {
          singleWorker: true,
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
