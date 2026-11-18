<script setup lang="ts">
import type { AccordionItem, BreadcrumbItem, StepperItem, TabsItem } from '@nuxt/ui'

const tabs: TabsItem[] = [
  { label: 'Frontend', icon: 'i-lucide-layout-template', slot: 'frontend' as const },
  { label: 'Tooling', icon: 'i-lucide-wrench', slot: 'tooling' as const },
  { label: 'Backend', icon: 'i-lucide-server', slot: 'backend' as const }
]

const skills = {
  frontend: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Nuxt UI', 'TanStack Query', 'Pinia'],
  tooling: ['Vite', 'Vitest', 'Cypress', 'ESLint', 'GitHub Actions', 'Claude Code'],
  backend: ['Node', 'Nest.js', 'PostgreSQL', 'Keycloak', 'GraphQL', 'PHP']
}

const breadcrumb: BreadcrumbItem[] = [
  { label: 'Home', icon: 'i-lucide-house', to: '/' },
  { label: 'Experience', to: '#data' },
  { label: 'Mirion Technologies' }
]

const faq: AccordionItem[] = [
  {
    label: 'What do you work on day to day?',
    content: 'Vue and Nuxt frontends: design systems, auth and permissions UI, data fetching, and accessibility.'
  },
  {
    label: 'Do you work remotely?',
    content: 'Yes. I’m based in Seattle and look for remote-first teams.'
  },
  {
    label: 'Which stack do you prefer?',
    content: 'Vue 3 with Nuxt and TypeScript, Tailwind CSS for styling, and Vitest for tests.'
  }
]

const steps: StepperItem[] = [
  { title: 'Intro call', description: '30 minutes', icon: 'i-lucide-phone' },
  { title: 'Technical', description: 'Pairing or take-home', icon: 'i-lucide-code' },
  { title: 'Team', description: 'Meet the people', icon: 'i-lucide-users' },
  { title: 'Offer', icon: 'i-lucide-handshake' }
]

const step = ref(1)
const page = ref(3)
</script>

<template>
  <StyleguideSection
    id="navigation"
    title="Navigation"
    description="Tabs, breadcrumbs, pagination, accordion and stepper. The current item is marked with a fill or a thick rule, not color alone."
    source="app.config.ts › ui.tabs, ui.breadcrumb, ui.accordion, ui.stepper"
  >
    <div class="grid gap-6 lg:grid-cols-2">
      <StyleguideSpecimen label="UTabs: pill">
        <UTabs :items="tabs">
          <template
            v-for="key in (['frontend', 'tooling', 'backend'] as const)"
            :key="key"
            #[key]
          >
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="skill in skills[key]"
                :key="skill"
                color="neutral"
                variant="outline"
                :label="skill"
              />
            </div>
          </template>
        </UTabs>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UTabs: link">
        <UTabs
          :items="tabs"
          variant="link"
        >
          <template
            v-for="key in (['frontend', 'tooling', 'backend'] as const)"
            :key="key"
            #[key]
          >
            <p class="text-toned">
              {{ skills[key].join(', ') }}
            </p>
          </template>
        </UTabs>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UBreadcrumb + UPagination">
        <div class="space-y-6">
          <UBreadcrumb :items="breadcrumb" />
          <UPagination
            v-model:page="page"
            :total="60"
            :items-per-page="10"
          />
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UStepper">
        <UStepper
          v-model="step"
          :items="steps"
          size="sm"
        />
      </StyleguideSpecimen>
    </div>

    <UAccordion :items="faq" />
  </StyleguideSection>
</template>
