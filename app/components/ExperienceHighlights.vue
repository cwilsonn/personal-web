<script setup lang="ts">
/**
 * Bento grid of career highlights. Every figure comes from the experience content
 * (see mdpm plan-rewrite > Content facts); don't add numbers that aren't sourced there.
 *
 * Layout: 6 columns at lg, 4 at md, 2 at sm, 1 below. Spans are set per tile and
 * grid-flow-dense backfills gaps, so tiles can be reordered without hand-placing them.
 * Surfaces come from <BentoTile>; this file only decides content and spans.
 */
withDefaults(defineProps<{
  /** The intro tile's heading level: h1 on the home page, lower when embedded elsewhere. */
  headingLevel?: 'h1' | 'h2' | 'h3'
}>(), {
  headingLevel: 'h2'
})

const resumeUrl = '/files/cody-wilson-resume-2025.pdf'

const stack = ['Vue 3', 'Nuxt', 'TypeScript', 'Nuxt UI', 'Tailwind CSS', 'TanStack Query', 'Vitest', 'Keycloak']

// Decorative logo row for the stack tile; deliberately not paired with the badges.
const stackLogos = [
  'i-simple-icons-vuedotjs', 'i-simple-icons-nuxt', 'i-simple-icons-typescript',
  'i-simple-icons-tailwindcss', 'i-simple-icons-tanstack', 'i-simple-icons-vitest'
]

const ci = { before: 60, after: 5 }

const a11y = ['Semantic HTML first', 'Correct ARIA roles and attributes', 'Text contrast checked to AA']

// ---- Play-once motion (see the Motion block in main.css). Final state is the default. ----

// CI bar: starts level with the Vue 2 bar, then shrinks while the figure counts 60s → 5s.
const ciFigure = ref<HTMLElement | null>(null)
const ciPending = ref(false)
const ciReady = ref(false)

// Seattle photo. At lg+ it's a hover reveal, so it's only requested once a pointer enters the
// grid. Below lg there's no hover: it's always shown (lazy-loaded) and rises in on scroll.
const photoWanted = ref(false)
onMounted(() => {
  if (matchMedia('(max-width: 1023.98px)').matches) photoWanted.value = true
})

// Device marks: pop in one after another.
const devices = ref<HTMLElement | null>(null)
const { shown: devicesIn, ready: devicesReady } = usePlayOnce(devices)

onMounted(() => {
  if (motionAllowed()) {
    ciPending.value = true
  }
  ciReady.value = true
})

useInViewOnce(ciFigure, () => (ciPending.value = false), { threshold: 0.6 })
</script>

<template>
  <div
    class="grid grid-flow-dense auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
    @pointerenter.once="photoWanted = true"
  >
    <!-- Intro: the one big moment -->
    <BentoTile
      tone="primary"
      lead
      space="xl"
      class="justify-between sm:col-span-2 md:col-span-4 md:p-8 lg:col-span-3 lg:row-span-2"
    >
      <p class="font-mono text-sm font-medium">
        Cody Wilson, senior frontend engineer
      </p>
      <div class="space-y-5">
        <component
          :is="headingLevel"
          class="text-5xl leading-[0.95] md:text-6xl"
        >
          Ten years building for the web.
        </component>
        <p class="max-w-md text-lg">
          Vue, Nuxt and TypeScript. Design systems, auth and permissions, and the migrations that keep large apps moving.
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UButton
          to="/#contact"
          color="neutral"
          size="lg"
          label="Get in touch"
          icon="i-lucide-mail"
        />
        <UButton
          :to="resumeUrl"
          target="_blank"
          color="neutral"
          variant="outline"
          size="lg"
          label="Resume (PDF)"
          icon="i-lucide-download"
        />
      </div>
    </BentoTile>

    <!-- CI before/after: two values, so two labelled bars instead of a chart -->
    <BentoTile
      space="lg"
      class="sm:col-span-2 md:col-span-4 lg:col-span-3"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="font-mono text-sm font-medium text-muted">
            CI build time
          </p>
          <p class="mt-1 font-mono text-4xl font-semibold tracking-tight md:text-5xl">
            60s → <CountUp
              :from="ci.before"
              :to="ci.after"
              suffix="s"
            />
          </p>
        </div>
        <span class="grid size-11 shrink-0 place-items-center border-2 border-ink bg-secondary text-black">
          <UIcon
            name="i-lucide-timer"
            class="size-6"
          />
        </span>
      </div>
      <figure
        ref="ciFigure"
        class="space-y-3"
      >
        <figcaption class="sr-only">
          CI build took {{ ci.before }} seconds on Vue 2 and {{ ci.after }} seconds after the move to Vue 3 and Vite.
        </figcaption>
        <div
          class="grid grid-cols-[6.5rem_1fr] items-center gap-3"
          aria-hidden="true"
        >
          <span class="text-sm text-muted">Vue 2</span>
          <div class="flex items-center gap-2">
            <span
              class="h-4 border-2 border-ink bg-fog-400"
              :style="{ width: '100%' }"
            />
            <span class="shrink-0 font-mono text-sm">{{ ci.before }}s</span>
          </div>
          <span class="text-sm text-muted">Vue 3 + Vite</span>
          <div class="flex items-center gap-2">
            <span
              data-motion
              :data-ready="ciReady || undefined"
              :class="['h-4 border-2 border-ink bg-primary', !ciPending && ciReady && 'transition-[width] duration-[1200ms] ease-out']"
              :style="{ width: ciPending ? '100%' : `${(ci.after / ci.before) * 100}%` }"
            />
            <span class="shrink-0 font-mono text-sm">{{ ci.after }}s</span>
          </div>
        </div>
      </figure>
      <p class="mt-auto text-sm text-toned">
        After migrating 1,000+ components to Vue 3. Thermo Fisher Scientific.
      </p>
    </BentoTile>

    <!-- Lines removed -->
    <BentoTile
      tone="signal"
      class="justify-between md:col-span-2 lg:col-span-2"
    >
      <UIcon
        name="i-lucide-scissors"
        class="size-7"
      />
      <div>
        <p class="font-mono text-5xl font-semibold tracking-tight">
          <CountUp
            :to="-30"
            suffix="K"
          />
        </p>
        <p class="mt-2">
          Lines of legacy code removed in the Vue 3 migration.
        </p>
      </div>
    </BentoTile>

    <!-- Award -->
    <BentoTile
      tone="ink"
      class="justify-between"
    >
      <UIcon
        name="i-lucide-trophy"
        class="size-7"
      />
      <div>
        <p class="font-mono text-4xl font-semibold tracking-tight">
          2nd
        </p>
        <p class="mt-2 text-sm">
          Of 100+ entries in a company-wide generative AI challenge, 2024.
        </p>
      </div>
    </BentoTile>

    <!-- Devices: a count shown as four marks -->
    <BentoTile
      space="lg"
      class="justify-between sm:col-span-2"
    >
      <div
        ref="devices"
        data-motion
        :data-ready="devicesReady || undefined"
        class="flex gap-2"
        aria-hidden="true"
      >
        <span
          v-for="n in 4"
          :key="n"
          :class="[
            'grid size-11 place-items-center border-2 border-ink bg-secondary text-black transition-[opacity,scale] duration-300 ease-out',
            !devicesIn && 'scale-50 opacity-0'
          ]"
          :style="{ transitionDelay: `${(n - 1) * 90}ms` }"
        >
          <UIcon
            name="i-lucide-radiation"
            class="size-6"
          />
        </span>
      </div>
      <div>
        <p class="font-display text-2xl leading-tight">
          4 radiation monitors integrated in under 2 months
        </p>
        <p class="mt-2 text-sm text-toned">
          Built from device manuals and protocol definitions, to SRS in an NQA-1 quality environment. Mirion.
        </p>
      </div>
    </BentoTile>

    <!-- Page loads -->
    <BentoTile class="justify-between">
      <UIcon
        name="i-lucide-gauge"
        class="size-7 text-primary"
      />
      <div>
        <p class="font-mono text-4xl font-semibold tracking-tight">
          <CountUp
            :to="50"
            suffix="%+"
          />
        </p>
        <p class="mt-2 text-sm text-toned">
          Faster average page loads with TanStack Query. Mirion.
        </p>
      </div>
    </BentoTile>

    <!-- Consolidation -->
    <BentoTile class="justify-between border-t-10 border-t-primary">
      <UIcon
        name="i-lucide-git-merge"
        class="size-7"
      />
      <div>
        <p class="font-mono text-4xl font-semibold tracking-tight">
          <CountUp
            :to="-10"
            suffix="K"
          />
        </p>
        <p class="mt-2 text-sm text-toned">
          Lines removed by merging duplicate paths into one. Mirion.
        </p>
      </div>
    </BentoTile>

    <!-- Stack -->
    <BentoTile class="sm:col-span-2">
      <div class="flex items-center justify-between gap-3">
        <p class="font-mono text-sm font-medium text-muted">
          Daily stack
        </p>
        <div
          class="flex gap-2"
          aria-hidden="true"
        >
          <UIcon
            v-for="logo in stackLogos"
            :key="logo"
            :name="logo"
            class="size-5"
          />
        </div>
      </div>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tool in stack"
          :key="tool"
        >
          <UBadge
            size="lg"
            :label="tool"
          />
        </li>
      </ul>
    </BentoTile>

    <!-- Accessibility -->
    <BentoTile class="sm:col-span-2">
      <div class="flex items-center gap-3">
        <span class="grid size-11 place-items-center border-2 border-ink bg-primary text-inverted">
          <UIcon
            name="i-lucide-accessibility"
            class="size-6"
          />
        </span>
        <p class="font-display text-2xl">
          WCAG 2.2 AA
        </p>
      </div>
      <ul class="space-y-2">
        <li
          v-for="item in a11y"
          :key="item"
          class="flex items-start gap-2"
        >
          <UIcon
            name="i-lucide-check"
            class="mt-0.5 size-5 shrink-0 text-primary"
          />
          <span>{{ item }}</span>
        </li>
      </ul>
    </BentoTile>

    <!-- Currently -->
    <BentoTile class="justify-between sm:col-span-2">
      <div class="flex items-center justify-between gap-3">
        <p class="font-mono text-sm font-medium text-muted">
          Currently
        </p>
        <UBadge
          color="secondary"
          variant="solid"
          label="Open to roles"
        />
      </div>
      <div>
        <p class="font-display text-2xl">
          Mirion Technologies
        </p>
        <p class="text-toned">
          Senior Frontend Developer, contract via Saragossa
        </p>
        <p class="mt-2 font-mono text-sm text-muted">
          2026-06 → now
        </p>
      </div>
    </BentoTile>

    <!-- Hours saved -->
    <BentoTile class="justify-between">
      <UIcon
        name="i-lucide-clock"
        class="size-7 text-primary"
      />
      <div>
        <p class="font-mono text-4xl font-semibold tracking-tight">
          <CountUp
            :to="500"
            suffix="+"
          />
        </p>
        <p class="mt-2 text-sm text-toned">
          Staff hours saved a year by a bulk SKU lookup tool.
        </p>
      </div>
    </BentoTile>

    <!--
      Location: a photo of the Space Needle and downtown from Kerry Park behind the text.
      lg+: fades in on hover with a gentle settle. Below lg: always shown, rising in on scroll.
      Reduced motion drops the movement. Decorative, so alt="".
      Photo (converted to black and white): "Downtown seattle from Kerry Park" by Symi81, public domain, via Wikimedia Commons
      https://commons.wikimedia.org/wiki/File:Downtown_seattle_from_Kerry_Park.JPG
    -->
    <BentoTile class="group relative justify-between overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 max-lg:reveal-photo-on-scroll lg:opacity-0 lg:transition-opacity lg:duration-500 lg:ease-out lg:group-hover:opacity-100"
        aria-hidden="true"
      >
        <NuxtImg
          v-if="photoWanted"
          src="/images/seattle-kerry-park.jpg"
          alt=""
          width="960"
          height="720"
          sizes="100vw sm:50vw md:25vw lg:240px"
          format="webp"
          quality="70"
          loading="lazy"
          class="absolute inset-x-0 top-[-40%] h-[160%] w-full object-cover lg:scale-110 lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-100 motion-reduce:scale-100 motion-reduce:transition-none"
        />
        <!-- The image is taller than the tile and shifted up, so the Needle's saucer sits above the label.
             The fade keeps the label readable over the busy lower half. -->
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-paper via-paper/85 to-transparent" />
      </div>
      <UIcon
        name="i-lucide-map-pin"
        class="relative size-7 text-primary transition-colors lg:group-hover:text-black"
      />
      <div class="relative">
        <p class="font-display text-xl">
          Seattle, WA
        </p>
        <p class="mt-1 text-sm text-toned">
          Remote, Pacific time
        </p>
      </div>
    </BentoTile>
  </div>
</template>
