<script setup lang="ts">
useSeoMeta({
  description: 'Cody Wilson is a senior frontend engineer in Seattle with ten years of experience in Vue, Nuxt and TypeScript: design systems, auth and permissions, migrations, and accessibility.'
})

// Mock content for the homepage concept. The typed content collections task replaces this.
interface Role {
  company: string
  engagement: string
  role: string
  dates: string
  current?: boolean
  points: string[]
}

const roles: Role[] = [
  {
    company: 'Mirion Technologies',
    engagement: 'Contract via Saragossa',
    role: 'Senior Frontend Developer',
    dates: '2026-06 → now',
    current: true,
    points: [
      'Built the proof of concept that replaced a monolithic .NET auth app with a Keycloak API package and a reusable Nuxt auth layer.',
      'Moved data fetching from provide/inject chains to TanStack Query composables, cutting average page loads by 50%+.',
      'Integrated 4 radiation monitoring devices in under 2 months, to SRS in an NQA-1 environment.'
    ]
  },
  {
    company: 'Echo Software',
    engagement: 'Full-time',
    role: 'Software Engineer',
    dates: '2025-07 → 2026-06',
    points: [
      'Architected a design system on Nuxt UI for a healthcare SaaS platform.',
      'Built multi-tenant auth and RBAC with Nest.js, PostgreSQL and Stytch.',
      'Set up shared TypeScript types and Zod schemas across Vue frontends and Nest.js backends.'
    ]
  },
  {
    company: 'Thermo Fisher Scientific',
    engagement: 'Contract via Insight Global, then full-time',
    role: 'Software Engineer III',
    dates: '2023-09 → 2025-07',
    points: [
      'Led the migration of 1,000+ components from Vue 2 to Vue 3 and Vite: CI went from 60s to 5s, and 30K+ lines of legacy code were removed.',
      'Designed a WCAG-compliant component library with schema-driven forms and data tables.',
      'Co-built a generative AI product matching tool that placed 2nd of 100+ entries.'
    ]
  },
  {
    company: 'Sonar Software',
    engagement: 'Full-time',
    role: 'Software Developer',
    dates: '2022-01 → 2023-07',
    points: [
      'Built Vue and TypeScript UIs for a multi-tenant ISP management platform.',
      'Designed a technician scheduling calendar that cut dispatcher context switching by 25%.',
      'Raised end-to-end test coverage by 50%+ with Cypress, cutting production bugs by 30%.'
    ]
  }
]

const earlier = 'Elevated Third, Flows.ai and Tangent Digital, 2016–2022: Drupal, full-stack and agency work.'

const principles = [
  { icon: 'i-lucide-file-code', text: 'Clear, maintainable code with comments that explain why.' },
  { icon: 'i-lucide-component', text: 'Design systems, so consistency doesn’t depend on memory.' },
  { icon: 'i-lucide-accessibility', text: 'Semantic HTML, correct ARIA and WCAG by default, not as a later pass.' }
]
</script>

<template>
  <div>
    <UContainer class="py-10 md:py-14">
      <ExperienceHighlights heading-level="h1" />
    </UContainer>

    <section
      id="experience"
      aria-labelledby="experience-title"
      class="border-t-2 border-ink py-16 md:py-24"
    >
      <UContainer class="space-y-10">
        <div class="max-w-prose space-y-3">
          <h2
            id="experience-title"
            class="text-5xl md:text-6xl"
          >
            Experience
          </h2>
          <p class="text-lg text-toned">
            Recent roles, most recent first.
          </p>
        </div>

        <ol class="grid gap-6 md:grid-cols-2">
          <li
            v-for="item in roles"
            :key="item.company"
          >
            <UCard class="h-full">
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span>{{ item.dates }}</span>
                  <UBadge
                    v-if="item.current"
                    color="secondary"
                    variant="solid"
                    label="Current"
                  />
                </div>
              </template>

              <div class="space-y-4">
                <div>
                  <h3 class="text-2xl md:text-3xl">
                    {{ item.company }}
                  </h3>
                  <p class="mt-1 font-semibold">
                    {{ item.role }}
                  </p>
                  <p class="font-mono text-sm text-muted">
                    {{ item.engagement }}
                  </p>
                </div>
                <ul class="space-y-2">
                  <li
                    v-for="point in item.points"
                    :key="point"
                    class="flex gap-3"
                  >
                    <span
                      class="mt-2 size-2 shrink-0 bg-primary"
                      aria-hidden="true"
                    />
                    <span class="text-toned">{{ point }}</span>
                  </li>
                </ul>
              </div>
            </UCard>
          </li>
        </ol>

        <p class="font-mono text-sm text-muted">
          Earlier: {{ earlier }}
        </p>
      </UContainer>
    </section>

    <section
      id="about"
      aria-labelledby="about-title"
      class="border-t-2 border-ink py-16 md:py-24"
    >
      <UContainer class="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div class="max-w-prose space-y-5 text-lg">
          <h2
            id="about-title"
            class="text-5xl md:text-6xl"
          >
            About
          </h2>
          <p>
            I’m Cody, a self-taught frontend engineer in Seattle. For ten years I’ve shipped design systems and apps
            for early-stage startups through Fortune 500 teams, and these days I work mostly in Vue, Nuxt, TypeScript
            and Tailwind CSS.
          </p>
          <p>
            I care as much about how software is built as what it does. I like small teams that communicate clearly,
            trust people with ownership, and treat accessibility as part of the job.
          </p>
          <p class="text-toned">
            Away from the keyboard you’ll find me on trails around the Northwest, gaming, or looking for the best
            Seattle Dog in town.
          </p>
        </div>

        <UCard>
          <template #header>
            How I work
          </template>
          <ul class="space-y-4">
            <li
              v-for="item in principles"
              :key="item.text"
              class="flex gap-3"
            >
              <span class="grid size-10 shrink-0 place-items-center border-2 border-ink bg-secondary text-black">
                <UIcon
                  :name="item.icon"
                  class="size-5"
                />
              </span>
              <span class="pt-1.5">{{ item.text }}</span>
            </li>
          </ul>
        </UCard>
      </UContainer>
    </section>

    <section
      id="contact"
      aria-labelledby="contact-title"
      class="border-y-2 border-ink bg-secondary py-16 text-black md:py-24"
    >
      <!-- On the yellow slab, neutral buttons can't flip to yellow, so they invert instead. -->
      <UContainer class="space-y-8">
        <h2
          id="contact-title"
          class="max-w-3xl text-5xl md:text-7xl"
        >
          Hiring a senior frontend engineer?
        </h2>
        <p class="max-w-prose text-xl">
          Email is the fastest way to reach me. I’m looking for remote-first teams building with Vue and Nuxt.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton
            to="mailto:cody@codywilson.dev"
            color="neutral"
            size="xl"
            icon="i-lucide-mail"
            class="hover:bg-paper hover:text-black"
            label="cody@codywilson.dev"
          />
          <UButton
            to="https://www.linkedin.com/in/cody-wilson-764b77191/"
            target="_blank"
            color="neutral"
            variant="outline"
            size="xl"
            icon="i-simple-icons-linkedin"
            class="hover:bg-inverted hover:text-inverted"
            label="LinkedIn"
          />
          <UButton
            to="/files/cody-wilson-resume-2025.pdf"
            target="_blank"
            color="neutral"
            variant="outline"
            size="xl"
            icon="i-lucide-download"
            class="hover:bg-inverted hover:text-inverted"
            label="Resume (PDF)"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
