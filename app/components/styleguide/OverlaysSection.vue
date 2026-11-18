<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const menu: DropdownMenuItem[][] = [
  [
    { label: 'Copy email', icon: 'i-lucide-copy', kbds: ['meta', 'c'] },
    { label: 'Download resume', icon: 'i-lucide-download' }
  ],
  [
    { label: 'GitHub', icon: 'i-simple-icons-github', to: 'https://github.com/cwilsonn', target: '_blank' },
    { label: 'LinkedIn', icon: 'i-simple-icons-linkedin', disabled: true }
  ]
]
</script>

<template>
  <StyleguideSection
    id="overlays"
    title="Overlays"
    description="Anything that floats above the page gets the largest shadow, so it reads as the top layer. Focus moves into dialogs and returns to the trigger when they close."
    source="app.config.ts › ui.modal, ui.slideover, ui.drawer, ui.popover, ui.tooltip, ui.dropdownMenu"
  >
    <StyleguideSpecimen label="Triggers">
      <div class="flex flex-wrap items-center gap-4">
        <UModal
          title="Contact Cody"
          description="Opens your email app with the address filled in."
        >
          <UButton label="Modal" />

          <template #body>
            <p class="text-lg">
              Email is the fastest way to reach me.
            </p>
          </template>

          <template #footer="{ close }">
            <UButton
              label="Write an email"
              icon="i-lucide-mail"
            />
            <UButton
              label="Cancel"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </template>
        </UModal>

        <USlideover
          title="Work history"
          description="Most recent first."
        >
          <UButton
            label="Slideover"
            color="neutral"
            variant="outline"
          />

          <template #body>
            <ol class="space-y-4">
              <li>
                <p class="font-semibold">
                  Mirion Technologies
                </p>
                <p class="font-mono text-sm text-muted">
                  2026-06 → now
                </p>
              </li>
              <li>
                <p class="font-semibold">
                  Echo Software
                </p>
                <p class="font-mono text-sm text-muted">
                  2025-07 → 2026-06
                </p>
              </li>
              <li>
                <p class="font-semibold">
                  Thermo Fisher Scientific
                </p>
                <p class="font-mono text-sm text-muted">
                  2023-09 → 2025-07
                </p>
              </li>
            </ol>
          </template>
        </USlideover>

        <UDrawer
          title="Quick links"
          description="Swipe down or press Escape to close."
        >
          <UButton
            label="Drawer"
            color="neutral"
            variant="outline"
          />

          <template #body>
            <div class="flex flex-wrap gap-4 pb-4">
              <UButton
                label="Resume"
                icon="i-lucide-download"
              />
              <UButton
                label="GitHub"
                icon="i-simple-icons-github"
                color="neutral"
                variant="outline"
              />
            </div>
          </template>
        </UDrawer>

        <UPopover>
          <UButton
            label="Popover"
            color="secondary"
          />

          <template #content>
            <div class="max-w-xs space-y-2 p-4">
              <p class="font-semibold">
                Based in Seattle
              </p>
              <p class="text-sm text-toned">
                Working remotely with US teams. Pacific time.
              </p>
            </div>
          </template>
        </UPopover>

        <UTooltip
          text="Copy email address"
          :kbds="['meta', 'c']"
        >
          <UButton
            icon="i-lucide-copy"
            color="neutral"
            variant="outline"
            aria-label="Copy email address"
          />
        </UTooltip>

        <UDropdownMenu :items="menu">
          <UButton
            label="Dropdown"
            trailing-icon="i-lucide-chevron-down"
            color="neutral"
            variant="outline"
          />
        </UDropdownMenu>
      </div>
    </StyleguideSpecimen>
  </StyleguideSection>
</template>
