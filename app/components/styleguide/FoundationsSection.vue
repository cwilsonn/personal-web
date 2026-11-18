<script setup lang="ts">
const core = [
  { name: 'Ink', hex: '#000000', role: 'Borders, text, shadows', className: 'bg-inverted' },
  { name: 'Fog', hex: '#E5F0EA', role: 'Page background', className: 'bg-default' },
  { name: 'Paper', hex: '#FFFFFF', role: 'Raised surfaces', className: 'bg-paper' },
  { name: 'Ferry', hex: '#007543', role: 'Primary actions, links', className: 'bg-primary' },
  { name: 'Signal', hex: '#FFDC3D', role: 'Highlights, one per view', className: 'bg-secondary' }
]

const status = [
  { name: 'Success', token: 'ferry-700', className: 'bg-success' },
  { name: 'Info', token: 'blue-700', className: 'bg-info' },
  { name: 'Warning', token: 'signal-300', className: 'bg-warning' },
  { name: 'Error', token: 'red-700', className: 'bg-error' }
]

const scale = [
  { label: 'Display / 96', sample: 'Ten years of Vue', className: 'font-display text-display' },
  { label: 'H1 / 72', sample: 'Ten years of Vue', className: 'font-display text-5xl md:text-7xl leading-none' },
  { label: 'H2 / 48', sample: 'Frontend architecture', className: 'font-display text-4xl md:text-5xl leading-tight' },
  { label: 'H3 / 36', sample: 'Design systems', className: 'font-display text-3xl md:text-4xl leading-tight' },
  { label: 'Lead / 24', sample: 'I build Vue and Nuxt frontends that stay fast and accessible as they grow.', className: 'text-2xl' },
  { label: 'Body / 18', sample: 'Body copy stays at normal width and regular weight so long passages read easily.', className: 'text-lg' },
  { label: 'Mono / 16', sample: 'ci: 60s → 5s  |  -30K lines  |  2025-07-23', className: 'font-mono text-base' }
]

const shadows = [
  { label: 'shadow-brutal-sm', use: 'Controls', className: 'shadow-brutal-sm' },
  { label: 'shadow-brutal', use: 'Cards, sheets', className: 'shadow-brutal' },
  { label: 'shadow-brutal-lg', use: 'Overlays', className: 'shadow-brutal-lg' }
]
</script>

<template>
  <StyleguideSection
    id="foundations"
    title="Foundations"
    description="Five core colors, one variable sans with a width axis, one mono for accents, and three hard shadows. Everything else is built from these."
    source="app/assets/css/main.css"
  >
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <div
        v-for="color in core"
        :key="color.name"
        class="border-2 border-ink bg-paper shadow-brutal"
      >
        <div :class="['h-28 border-b-2 border-ink', color.className]" />
        <div class="space-y-1 p-3">
          <p class="font-display text-lg">
            {{ color.name }}
          </p>
          <p class="font-mono text-sm">
            {{ color.hex }}
          </p>
          <p class="text-sm text-muted">
            {{ color.role }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <div
        v-for="color in status"
        :key="color.name"
        class="flex items-center gap-3 border-2 border-ink bg-paper py-2 pr-4 pl-2 shadow-brutal-sm"
      >
        <span :class="['size-8 border-2 border-ink', color.className]" />
        <span class="font-semibold">{{ color.name }}</span>
        <span class="font-mono text-sm text-muted">{{ color.token }}</span>
      </div>
    </div>

    <StyleguideSpecimen label="Type scale: Archivo (wdth 100–125) + IBM Plex Mono">
      <dl class="divide-y-2 divide-ink">
        <div
          v-for="step in scale"
          :key="step.label"
          class="grid gap-2 py-5 first:pt-0 last:pb-0 md:grid-cols-[9rem_1fr] md:items-baseline"
        >
          <dt class="font-mono text-sm text-muted">
            {{ step.label }}
          </dt>
          <dd :class="['min-w-0 break-words', step.className]">
            {{ step.sample }}
          </dd>
        </div>
      </dl>
    </StyleguideSpecimen>

    <div class="grid gap-10 sm:grid-cols-3">
      <div
        v-for="shadow in shadows"
        :key="shadow.label"
        :class="['flex h-32 flex-col justify-end border-2 border-ink bg-paper p-4', shadow.className]"
      >
        <p class="font-mono text-sm">
          {{ shadow.label }}
        </p>
        <p class="text-sm text-muted">
          {{ shadow.use }}
        </p>
      </div>
    </div>
  </StyleguideSection>
</template>
