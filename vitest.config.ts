import { defineConfig } from 'vitest/config'

// Plain Node-environment unit tests (schemas, utils, composables without Nuxt context).
// Add @nuxt/test-utils when component tests are needed.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/unit/**/*.test.ts'],
    // No tests yet; the first real ones arrive with the content schemas
    passWithNoTests: true
  }
})
