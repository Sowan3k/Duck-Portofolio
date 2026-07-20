import { defineConfig } from 'vitest/config';

// Unit/data tests (dialogue & scene schema validation, engine logic in later
// phases). Playwright owns browser E2E and lives outside this config.
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
