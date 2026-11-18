/** The id of the home page section currently crossing the reading band, shared with the header nav. */
export const useActiveSection = () => useState<string | null>('active-section', () => null)

/**
 * Scroll-spy for in-page sections. Call it from the page that owns the sections, so it observes
 * the elements that page actually rendered (and re-observes after HMR or a route change back).
 */
export function useSectionSpy(ids: string[]) {
  const active = useActiveSection()
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
        else if (active.value === entry.target.id) active.value = null
      }
    }, { rootMargin: '-40% 0px -55% 0px' })

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    active.value = null
  })
}
