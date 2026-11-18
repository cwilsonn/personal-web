/**
 * Whether play-once motion is allowed: JS is running and the visitor hasn't asked for
 * reduced motion. The head script in nuxt.config.ts sets `motion-ok` on <html> before
 * first paint, so CSS can hold animated elements in their start state without a flash.
 */
export function motionAllowed(): boolean {
  return import.meta.client && document.documentElement.classList.contains('motion-ok')
}

/**
 * Calls `onEnter` once, the first time `target` is at least `threshold` visible.
 * Does nothing on the server, and calls nothing when motion isn't allowed: callers
 * render their final state by default and only opt in to animating.
 */
export function useInViewOnce(
  target: Ref<HTMLElement | null | undefined>,
  onEnter: () => void,
  { threshold = 0.5 }: { threshold?: number } = {}
) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!motionAllowed() || !target.value) return
    observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer?.disconnect()
        onEnter()
      }
    }, { threshold })
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())
}

/**
 * State for a play-once entrance: `shown` is true on the server and under reduced motion (final
 * state), false on the client until `target` scrolls into view. Bind `ready` to [data-ready] on an
 * element marked [data-motion] so the start state is applied before anything is visible.
 */
export function usePlayOnce(target: Ref<HTMLElement | null | undefined>, { threshold = 0.6 } = {}) {
  const shown = ref(true)
  const ready = ref(false)

  onMounted(() => {
    if (motionAllowed()) shown.value = false
    ready.value = true
  })

  useInViewOnce(target, () => (shown.value = true), { threshold })

  return { shown, ready }
}
