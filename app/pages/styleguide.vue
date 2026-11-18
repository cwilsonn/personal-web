<script setup lang="ts">
// Kitchen sink for the neo-brutalist theme. Not linked from navigation yet.
useSeoMeta({
  title: 'Kitchen sink',
  robots: 'noindex, nofollow'
})

const sections = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'actions', label: 'Actions' },
  { id: 'forms', label: 'Forms' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data', label: 'Data' },
  { id: 'cards', label: 'Cards' }
]

const stackLogos = ['i-simple-icons-vuedotjs', 'i-simple-icons-nuxt', 'i-simple-icons-typescript', 'i-simple-icons-tailwindcss', 'i-simple-icons-vite']

const stack = ['Vue 3', 'Nuxt 4', 'TypeScript', 'Nuxt UI', 'Tailwind CSS', 'Vite', 'Vitest', 'TanStack Query', 'Keycloak', 'WCAG 2.2 AA']
</script>

<template>
  <div class="overflow-x-clip">
    <header class="border-b-2 border-ink">
      <UContainer class="grid gap-10 py-16 md:py-24 lg:grid-cols-[1fr_auto] lg:items-end">
        <div class="space-y-6">
          <h1 class="text-6xl leading-[0.92] sm:text-7xl lg:text-display">
            Kitchen sink
          </h1>
          <p class="max-w-prose text-xl text-toned">
            Every Nuxt UI component this site uses, in the neo-brutalist theme: square corners, ink edges,
            hard shadows, Archivo for words and IBM Plex Mono for numbers.
          </p>
        </div>
        <dl class="grid grid-cols-2 gap-x-8 gap-y-3 border-2 border-ink bg-paper p-5 font-mono text-sm shadow-brutal">
          <dt class="text-muted">
            theme
          </dt>
          <dd>neo-brutalist</dd>
          <dt class="text-muted">
            ui
          </dt>
          <dd>@nuxt/ui 4</dd>
          <dt class="text-muted">
            radius
          </dt>
          <dd>0</dd>
          <dt class="text-muted">
            contrast
          </dt>
          <dd>AA</dd>
        </dl>
      </UContainer>
    </header>

    <TechMarquee
      :items="stack"
      :logos="stackLogos"
      label="Stack"
    />

    <UContainer class="grid gap-12 py-16 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <nav
        aria-label="Kitchen sink sections"
        class="lg:sticky lg:top-[calc(var(--ui-header-height)+2rem)] lg:self-start"
      >
        <ul class="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-2 lg:border-ink lg:bg-paper lg:shadow-brutal-sm">
          <li
            v-for="section in sections"
            :key="section.id"
            class="lg:border-b-2 lg:border-ink lg:last:border-b-0"
          >
            <ULink
              :to="`#${section.id}`"
              class="block border-2 border-ink bg-paper px-3 py-1.5 font-mono text-sm shadow-brutal-sm hover:bg-secondary hover:text-black lg:border-0 lg:shadow-none lg:px-4 lg:py-2.5"
            >
              {{ section.label }}
            </ULink>
          </li>
        </ul>
      </nav>

      <div class="min-w-0 space-y-24">
        <StyleguideHighlightsSection />
        <StyleguideFoundationsSection />
        <StyleguideActionsSection />
        <StyleguideFormsSection />
        <StyleguideFeedbackSection />
        <StyleguideOverlaysSection />
        <StyleguideNavigationSection />
        <StyleguideDataSection />
        <StyleguideCardsSection />
      </div>
    </UContainer>
  </div>
</template>
