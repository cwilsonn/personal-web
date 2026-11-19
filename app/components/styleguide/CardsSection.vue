<script setup lang="ts">
const stats = [
  { value: '60s → 5s', label: 'Local dev server build time after moving 1,000+ components from Vue 2 to Vue 3 and Vite', where: 'Thermo Fisher' },
  { value: '25%+', label: 'Faster data loading after moving data fetching to TanStack Query', where: 'Mirion' },
  { value: '-20K', label: 'Lines of code removed by merging duplicate solution paths into one', where: 'Mirion' },
  { value: '500+', label: 'Staff hours saved per year by a bulk SKU lookup tool', where: 'Thermo Fisher' }
]

const capabilities = [
  { icon: 'i-lucide-component', title: 'Design systems', description: 'Component libraries on Nuxt UI and custom Vue, with WCAG requirements built in from the start.' },
  { icon: 'i-lucide-git-merge', title: 'Migrations', description: 'Large Vue 2 → 3 and webpack → Vite moves without stopping feature work.' },
  { icon: 'i-lucide-shield-check', title: 'Auth and permissions', description: 'Keycloak and Stytch integrations, RBAC, and the UI to manage roles.' },
  { icon: 'i-lucide-accessibility', title: 'Accessibility', description: 'Semantic HTML, keyboard support, and screen reader testing as part of done.' }
]
</script>

<template>
  <StyleguideSection
    id="cards"
    title="Cards"
    description="Three card types: a figure with its context, a capability, and a case study. Every card sits on paper with an ink edge and a hard shadow."
    source="app.config.ts › ui.card, ui.pageCard"
  >
    <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="stat in stats"
        :key="stat.value"
        class="flex flex-col border-2 border-ink bg-paper shadow-brutal"
      >
        <p class="border-b-2 border-ink bg-secondary px-4 py-5 font-mono text-4xl font-semibold tracking-tight text-black">
          {{ stat.value }}
        </p>
        <div class="flex flex-1 flex-col gap-3 p-4">
          <p class="text-toned">
            {{ stat.label }}
          </p>
          <p class="mt-auto font-mono text-sm text-muted">
            {{ stat.where }}
          </p>
        </div>
      </article>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <UPageCard
        v-for="item in capabilities"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
        variant="outline"
      />
    </div>

    <UCard
      variant="outline"
      :ui="{ body: 'grid gap-8 md:grid-cols-[1.4fr_1fr]' }"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <span>Case study</span>
          <UBadge
            color="secondary"
            variant="solid"
            label="Mirion"
          />
        </div>
      </template>

      <h3 class="text-2xl md:col-span-2 md:text-3xl">
        Replacing a monolithic auth app with Nuxt layers
      </h3>

      <div class="space-y-4 text-lg">
        <p>
          Built the proof of concept that replaced a C#/.NET Duende auth app with a Keycloak-based API package
          and a reusable Nuxt auth layer, including login and self-serve account screens.
        </p>
        <p>
          Then added server-side authorization middleware and a permissions layer with composables and admin UI
          for roles and fine-grained permissions.
        </p>
      </div>

      <dl class="grid content-start gap-4 border-2 border-ink p-4">
        <div>
          <dt class="font-mono text-sm text-muted">
            Stack
          </dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <UBadge
              v-for="tool in ['Nuxt layers', 'Keycloak', '@sidebase/nuxt-auth', 'TypeScript']"
              :key="tool"
              color="neutral"
              variant="outline"
              :label="tool"
            />
          </dd>
        </div>
        <div>
          <dt class="font-mono text-sm text-muted">
            Outcome
          </dt>
          <dd class="mt-1">
            Became the base of the internal team’s long-term auth platform.
          </dd>
        </div>
      </dl>

      <template #footer>
        <UButton
          label="Read the case study"
          trailing-icon="i-lucide-arrow-right"
          disabled
        />
      </template>
    </UCard>
  </StyleguideSection>
</template>
