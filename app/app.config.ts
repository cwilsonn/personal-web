/**
 * Neo-brutalist overrides for Nuxt UI. Tokens live in app/assets/css/main.css;
 * this file only reshapes component slots.
 *
 * Rules of the system:
 * - Corners are square everywhere (--ui-radius: 0 drives Nuxt UI's radius scale).
 * - Edges are 2px ink borders; small inline things (badges) get 1px so they sit below cards.
 * - Every card-like surface gets a hard offset shadow (controls -sm, cards default, overlays -lg).
 * - Mono is the label voice: card and table headers, form labels, numbers, dates, keys, tags.
 * - Signal yellow means "you're on this": hover and keyboard highlight on anything interactive
 *   that sits on the base background. Fills never fade on hover (that drops text contrast).
 * - Solid and outline are the primary variants. Soft and subtle exist but aren't part of the look.
 */
const edge = 'border-2 border-ink'
const hairline = 'border border-ink'
const raised = `${edge} shadow-brutal-sm brutal-press`
const sheet = `bg-paper ${edge} shadow-brutal`
const overlay = `bg-paper ring-0 ${edge} shadow-brutal-lg`
const field = 'bg-paper ring-2 ring-inset ring-ink focus:shadow-brutal-sm'
const monoLabel = 'font-mono text-sm font-medium'

/** Hover / press fill used across buttons, triggers and cards. */
const signalHover = 'hover:bg-secondary hover:text-black active:bg-secondary active:text-black'
/** Keyboard + pointer highlight for menu-like items (Reka sets data-highlighted for both). */
const signalItem = 'data-highlighted:not-data-disabled:text-black data-highlighted:not-data-disabled:before:bg-secondary'
const signalItemIcon = 'group-data-highlighted:not-group-data-disabled:text-black'

// Signal yellow only works as a fill. As text or a tint, use its dark end.
const yellowText = 'text-signal-800'
const tinted = ['outline', 'soft', 'subtle', 'ghost', 'link'] as const
const yellowTints = (slot?: string) => (['secondary', 'warning'] as const).flatMap(color =>
  tinted.map(variant => ({ color, variant, class: slot ? { [slot]: yellowText } : yellowText }))
)

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'ferry',
      secondary: 'signal',
      success: 'ferry',
      info: 'blue',
      warning: 'signal',
      error: 'red',
      neutral: 'fog'
    },

    // Teach tailwind-merge that shadow-brutal* are shadows, so they replace Nuxt UI's shadow-lg.
    tv: {
      twMergeConfig: {
        extend: {
          theme: {
            shadow: ['brutal-sm', 'brutal', 'brutal-lg']
          }
        }
      }
    },

    // ---- Actions ----
    button: {
      slots: { base: 'font-semibold' },
      variants: {
        variant: {
          solid: raised,
          outline: `${raised} bg-paper`
        }
      },
      compoundVariants: [
        ...yellowTints(),
        { color: 'primary', variant: 'solid', class: 'hover:bg-primary active:bg-primary' },
        { color: 'secondary', variant: 'solid', class: 'text-black hover:bg-secondary active:bg-secondary' },
        { color: 'warning', variant: 'solid', class: 'text-black hover:bg-warning active:bg-warning' },
        { color: 'error', variant: 'solid', class: 'hover:bg-error active:bg-error' },
        { color: 'info', variant: 'solid', class: 'hover:bg-info active:bg-info' },
        // Neutral's "color" is signal: ink buttons flip to yellow on hover.
        { color: 'neutral', variant: 'solid', class: signalHover },
        { color: 'neutral', variant: 'outline', class: `ring-0 bg-paper ${signalHover}` },
        { color: 'neutral', variant: 'ghost', class: signalHover },
        // Outline buttons fill with their own color on hover (literal classes so Tailwind can see them).
        { color: 'primary', variant: 'outline', class: 'ring-0 bg-paper hover:bg-primary hover:text-inverted active:bg-primary active:text-inverted' },
        { color: 'error', variant: 'outline', class: 'ring-0 bg-paper hover:bg-error hover:text-inverted active:bg-error active:text-inverted' },
        { color: 'info', variant: 'outline', class: 'ring-0 bg-paper hover:bg-info hover:text-inverted active:bg-info active:text-inverted' },
        { color: 'secondary', variant: 'outline', class: `ring-0 bg-paper ${signalHover}` },
        { color: 'primary', variant: 'ghost', class: signalHover }
      ]
    },
    kbd: {
      base: `font-mono normal-case font-medium bg-paper ${edge} shadow-[2px_2px_0_0_var(--brutal-shadow)]`
    },
    link: {
      base: 'underline-offset-4 decoration-2'
    },

    // ---- Surfaces ----
    card: {
      // Outline is the card: paper, ink edge, hard shadow. A bare <UCard> gets it.
      defaultVariants: { variant: 'outline' },
      slots: {
        // Header is the ink label bar, same as the kitchen sink specimens.
        header: `bg-inverted text-inverted ${monoLabel} px-4 py-2 sm:px-6`,
        title: `${monoLabel} text-inverted`,
        description: 'text-inverted/80'
      },
      variants: {
        variant: {
          outline: { root: `${sheet} ring-0 divide-y-2 divide-ink` },
          solid: { root: `${edge} shadow-brutal` },
          subtle: { root: `bg-paper ring-0 ${edge} divide-y-2 divide-ink` }
        }
      }
    },
    pageCard: {
      defaultVariants: { variant: 'outline' },
      slots: {
        title: 'font-display font-[850] text-lg',
        leadingIcon: 'size-6'
      },
      variants: {
        variant: {
          outline: { root: `${sheet} ring-0` },
          solid: { root: `${edge} shadow-brutal` }
        }
      }
    },
    alert: {
      slots: {
        root: `${edge} shadow-brutal-sm`,
        title: 'text-base font-semibold',
        description: 'text-sm opacity-100'
      },
      compoundVariants: [
        { color: 'secondary', variant: 'solid', class: { root: 'text-black' } },
        { color: 'warning', variant: 'solid', class: { root: 'text-black' } },
        ...yellowTints('root').filter(v => v.variant !== 'ghost' && v.variant !== 'link')
      ]
    },
    separator: {
      slots: { label: 'font-mono text-xs' }
    },

    // ---- Badges and indicators ----
    badge: {
      // Most badges are tags: neutral outline. Pass variant="solid" for a filled callout.
      defaultVariants: { color: 'neutral', variant: 'outline' },
      slots: { base: 'font-mono font-medium' },
      variants: {
        variant: {
          solid: hairline,
          outline: `ring-0 ${hairline} bg-paper`
        }
      },
      compoundVariants: [
        { color: 'secondary', variant: 'solid', class: 'text-black' },
        { color: 'warning', variant: 'solid', class: 'text-black' },
        ...yellowTints().filter(v => v.variant !== 'ghost' && v.variant !== 'link')
      ]
    },
    chip: {
      slots: { base: 'ring-2 ring-ink font-mono' }
    },
    avatar: {
      slots: {
        root: `rounded-none ${edge} bg-secondary`,
        fallback: 'font-display font-[850] text-black'
      }
    },
    progress: {
      slots: {
        base: `rounded-none ${edge} bg-paper`,
        indicator: 'rounded-none',
        status: 'font-mono font-medium text-default'
      }
    },
    skeleton: {
      base: 'bg-fog-300'
    },

    // ---- Forms ----
    formField: {
      slots: {
        label: monoLabel,
        help: 'text-muted',
        error: 'font-medium'
      }
    },
    input: {
      variants: { variant: { outline: field } }
    },
    inputNumber: {
      slots: { base: 'font-mono' },
      variants: { variant: { outline: field } }
    },
    textarea: {
      variants: { variant: { outline: field } }
    },
    select: {
      slots: {
        content: overlay,
        item: signalItem,
        itemLeadingIcon: signalItemIcon
      },
      variants: { variant: { outline: `${field} hover:bg-paper` } }
    },
    selectMenu: {
      slots: {
        content: overlay,
        input: 'border-b-2 border-ink',
        item: signalItem,
        itemLeadingIcon: signalItemIcon
      },
      variants: { variant: { outline: `${field} hover:bg-paper` } }
    },
    checkbox: {
      slots: { base: 'rounded-none ring-2 ring-ink bg-paper' },
      variants: {
        variant: {
          card: {
            root: [
              `rounded-none ${edge} bg-paper`,
              'hover:not-has-disabled:bg-signal-100 hover:not-has-disabled:**:text-black',
              'has-data-[state=checked]:shadow-brutal-sm'
            ]
          }
        }
      }
    },
    radioGroup: {
      slots: {
        base: 'ring-2 ring-ink bg-paper',
        legend: `${monoLabel} mb-2`
      },
      variants: {
        variant: {
          card: {
            item: [
              `rounded-none ${edge} bg-paper`,
              'hover:not-has-disabled:bg-signal-100 hover:not-has-disabled:**:text-black',
              'has-data-[state=checked]:shadow-brutal-sm'
            ]
          }
        }
      }
    },
    switch: {
      slots: {
        base: `rounded-none ${edge} data-[state=unchecked]:bg-paper`,
        thumb: 'rounded-none bg-ink shadow-none data-[state=checked]:bg-paper'
      }
    },
    slider: {
      slots: {
        track: `rounded-none h-3 ${edge} bg-paper`,
        range: 'rounded-none',
        thumb: `rounded-none ${edge} bg-secondary ring-0 shadow-[2px_2px_0_0_var(--brutal-shadow)]`
      }
    },

    // ---- Navigation ----
    tabs: {
      slots: {
        trigger: 'font-semibold',
        content: 'pt-4'
      },
      variants: {
        variant: {
          pill: {
            list: `bg-paper ${edge} shadow-brutal-sm p-1`,
            trigger: 'hover:data-[state=inactive]:not-disabled:bg-secondary hover:data-[state=inactive]:not-disabled:text-black'
          },
          // "link" becomes folder tabs: the active tab joins the panel below it.
          link: {
            // No gap between the tab row and the panel, so the active tab joins it.
            root: 'gap-0',
            list: 'border-b-2 border-ink gap-1 p-0 items-end',
            indicator: 'hidden',
            trigger: [
              'border-2 border-b-0 border-ink px-4 py-2',
              'data-[state=inactive]:bg-fog-200',
              'data-[state=active]:bg-paper data-[state=active]:relative data-[state=active]:top-0.5 data-[state=active]:pb-2.5',
              'hover:data-[state=inactive]:not-disabled:bg-secondary hover:data-[state=inactive]:not-disabled:text-black'
            ],
            content: 'border-2 border-t-0 border-ink bg-paper p-4'
          }
        }
      }
    },
    accordion: {
      slots: {
        root: sheet,
        item: 'border-b-2 border-ink last:border-b-0',
        trigger: `px-4 py-4 text-base font-semibold ${signalHover}`,
        body: 'px-4 pb-4 text-base text-toned'
      }
    },
    breadcrumb: {
      slots: { link: 'font-mono text-sm' }
    },
    stepper: {
      slots: {
        trigger: `${edge} bg-paper font-mono hover:bg-secondary hover:text-black`,
        separator: 'rounded-none bg-ink h-0.5',
        title: 'font-semibold'
      }
    },
    timeline: {
      slots: {
        separator: 'rounded-none bg-ink',
        date: 'font-mono text-xs text-muted',
        title: 'font-semibold text-base',
        description: 'text-toned'
      }
    },
    navigationMenu: {
      slots: { link: 'font-semibold' }
    },

    // ---- Overlays ----
    modal: {
      slots: {
        content: 'bg-paper divide-y-2 divide-ink',
        title: 'font-display font-[850] text-xl'
      },
      variants: {
        fullscreen: {
          false: { content: `ring-0 ${edge} shadow-brutal-lg` }
        },
        overlay: {
          true: { overlay: 'bg-fog-950/60' }
        }
      }
    },
    slideover: {
      slots: {
        content: `bg-paper divide-y-2 divide-ink ${edge} sm:ring-0 sm:shadow-brutal-lg`,
        title: 'font-display font-[850] text-xl'
      }
    },
    drawer: {
      slots: {
        content: `bg-paper ring-0 ${edge}`,
        title: 'font-display font-[850] text-xl'
      }
    },
    popover: {
      slots: { content: overlay }
    },
    tooltip: {
      slots: { content: `bg-inverted text-inverted ring-0 ${edge} font-mono text-xs h-auto py-1.5` }
    },
    dropdownMenu: {
      slots: {
        content: overlay,
        viewport: 'divide-y-2 divide-ink',
        item: `font-medium ${signalItem}`,
        itemLeadingIcon: signalItemIcon,
        itemTrailingKbds: 'font-mono'
      }
    },
    toast: {
      slots: {
        root: overlay,
        title: 'text-base font-semibold'
      }
    },

    // ---- Data ----
    table: {
      slots: {
        root: sheet,
        thead: 'bg-inverted',
        th: `${monoLabel} text-inverted`,
        tbody: 'divide-y-2 divide-ink',
        td: 'text-default',
        separator: 'hidden'
      }
    },

    // ---- Layout ----
    header: {
      slots: { root: 'bg-default backdrop-blur-none border-b-2 border-ink' }
    },
    footer: {
      slots: { root: 'border-t-2 border-ink' }
    }
  }
})
