<script setup lang="ts">
defineProps<{
  id: string
  title: string
  description: string
  /** Where the treatment lives, e.g. "app.config.ts › ui.button" */
  source?: string
}>()
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="`${id}-title`"
    class="space-y-8 border-t-2 border-ink pt-10"
  >
    <header class="max-w-prose space-y-3">
      <h2
        :id="`${id}-title`"
        class="text-4xl md:text-5xl"
      >
        {{ title }}
      </h2>
      <p class="text-lg text-toned">
        {{ description }}
      </p>
      <p
        v-if="source"
        class="font-mono text-sm text-muted"
      >
        {{ source }}
      </p>
    </header>
    <slot />
  </section>
</template>
