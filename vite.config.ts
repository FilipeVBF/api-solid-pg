import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    pool: "forks",
    isolate: false,
    dir: "src",
    reporters: ["default", "html"],
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["use-cases/**/*.spec.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["http/controllers/**/*.spec.ts"],
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});
