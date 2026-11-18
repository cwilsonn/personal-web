<script setup lang="ts">
/**
 * A tilted signal-yellow band of scrolling labels, used as a section divider.
 *
 * Accessibility: UMarquee repeats its content, so the moving band is hidden from assistive tech
 * and the items are exposed once as a visually hidden list. A visible Pause/Play control covers
 * WCAG 2.2.2, and the band stops (and the control hides) under reduced motion.
 */
const props = defineProps<{
  items: string[]
  /** Accessible name for the list, e.g. "Also worked with". */
  label: string
  /**
   * Iconify names (e.g. 'i-simple-icons-vuedotjs') sprinkled between the labels. Decorative and
   * not paired with any label, so they're in the hidden moving band only.
   */
  logos?: string[]
  /** Send the occasional Seattle traveler across the band (see MarqueeTraveler). */
  easterEgg?: boolean
}>()

// One logo after every second label, cycling through the logos.
const sequence = computed(() => props.items.flatMap((item, i) => {
  const parts: { kind: 'label' | 'logo', value: string }[] = [{ kind: 'label', value: item }]
  const logo = props.logos?.length && i % 2 === 1 ? props.logos[((i - 1) / 2) % props.logos.length] : undefined
  if (logo) parts.push({ kind: 'logo', value: logo })
  return parts
}))

const paused = ref(false)
</script>

<template>
  <div class="relative">
    <p class="sr-only">
      {{ label }}:
    </p>
    <ul class="sr-only">
      <li
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>

    <div
      aria-hidden="true"
      :class="[
        'relative -mx-4 -rotate-1 border-y-2 border-ink bg-secondary py-3 text-black',
        'motion-reduce:**:data-[slot=content]:animate-none',
        paused && '**:data-[slot=content]:[animation-play-state:paused]'
      ]"
    >
      <UMarquee
        pause-on-hover
        :ui="{
          // Edge fades in the band's own yellow (not the page fog, which washed the words out),
          // and narrow, so most of the band stays fully legible.
          root: '[--gap:--spacing(10)] [--duration:40s] before:w-16 before:from-secondary after:w-16 after:from-secondary'
        }"
      >
        <template
          v-for="(part, i) in sequence"
          :key="i"
        >
          <span
            v-if="part.kind === 'label'"
            class="font-display text-2xl whitespace-nowrap"
          >
            {{ part.value }}
          </span>
          <UIcon
            v-else
            :name="part.value"
            class="size-7 shrink-0"
          />
        </template>
      </UMarquee>
      <MarqueeTraveler
        v-if="easterEgg"
        :paused="paused"
      />
    </div>

    <!-- Positioned by a wrapper: the button's own translate is used by the press-in effect. -->
    <div class="absolute inset-y-0 right-4 flex items-center motion-reduce:hidden">
      <UButton
        size="xs"
        color="neutral"
        :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
        :label="paused ? 'Play' : 'Pause'"
        @click="paused = !paused"
      />
    </div>
  </div>
</template>
