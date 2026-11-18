<script setup lang="ts">
import type { TableColumn, TimelineItem } from '@nuxt/ui'

interface Role {
  company: string
  role: string
  engagement: string
  start: string
  end: string
}

const roles: Role[] = [
  { company: 'Mirion Technologies', role: 'Senior Frontend Developer', engagement: 'Contract via Saragossa', start: '2026-06', end: 'now' },
  { company: 'Echo Software', role: 'Software Engineer', engagement: 'Full-time', start: '2025-07', end: '2026-06' },
  { company: 'Thermo Fisher Scientific', role: 'Software Engineer III', engagement: 'Contract to full-time', start: '2023-09', end: '2025-07' },
  { company: 'Sonar Software', role: 'Software Developer', engagement: 'Full-time', start: '2022-01', end: '2023-07' }
]

const columns: TableColumn<Role>[] = [
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'engagement', header: 'Engagement' },
  { id: 'dates', header: 'Dates' }
]

const timeline: TimelineItem[] = [
  { date: '2026-06', title: 'Mirion Technologies', description: 'Keycloak auth layers, device integrations, vue-query data layer.', icon: 'i-lucide-radiation' },
  { date: '2025-07', title: 'Echo Software', description: 'Design system on Nuxt UI, multi-tenant auth and RBAC.', icon: 'i-lucide-layers' },
  { date: '2023-09', title: 'Thermo Fisher Scientific', description: 'Vue 2 → 3 migration of 1,000+ components; WCAG component library.', icon: 'i-lucide-flask-conical' },
  { date: '2022-01', title: 'Sonar Software', description: 'Scheduling and dispatch UIs for a multi-tenant ISP platform.', icon: 'i-lucide-radio-tower' }
]
</script>

<template>
  <StyleguideSection
    id="data"
    title="Data"
    description="Tables get an ink header row and full-width rules. Dates and figures switch to mono so columns line up."
    source="app.config.ts › ui.table, ui.timeline, ui.user"
  >
    <UTable
      :data="roles"
      :columns="columns"
      caption="Recent roles"
    >
      <template #company-cell="{ row }">
        <span class="font-semibold">{{ row.original.company }}</span>
      </template>
      <template #engagement-cell="{ row }">
        <UBadge
          color="neutral"
          variant="outline"
          :label="row.original.engagement"
        />
      </template>
      <template #dates-cell="{ row }">
        <span class="font-mono text-sm">{{ row.original.start }} → {{ row.original.end }}</span>
      </template>
    </UTable>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <StyleguideSpecimen label="UTimeline">
        <UTimeline
          :items="timeline"
          :default-value="0"
          size="sm"
        />
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UUser">
        <div class="space-y-6">
          <UUser
            name="Cody Wilson"
            description="Senior frontend engineer, Seattle"
            :avatar="{ text: 'CW', alt: 'Cody Wilson' }"
            size="xl"
          />
          <UUser
            name="Cody Wilson"
            description="cwilsonn on GitHub"
            :avatar="{ icon: 'i-simple-icons-github', alt: '' }"
            to="https://github.com/cwilsonn"
            target="_blank"
          />
        </div>
      </StyleguideSpecimen>
    </div>
  </StyleguideSection>
</template>
