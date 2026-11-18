import { defineCollection, defineContentConfig } from '@nuxt/content'

// Minimal config so the module builds. Typed collections (experience, pages)
// are defined in the "Typed content collections" task.
export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md'
    })
  }
})
