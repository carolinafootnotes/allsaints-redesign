import { defineWorkersConfig, readD1Migrations } from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations(path.resolve(__dirname, "./schema"));

  return {
    test: {
      poolOptions: {
        workers: {
          singleWorker: true,
          miniflare: {
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
