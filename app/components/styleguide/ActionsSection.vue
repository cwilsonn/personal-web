<script setup lang="ts">
const colors = ['primary', 'secondary', 'neutral', 'error'] as const
// Soft and subtle exist in Nuxt UI but aren't part of this look.
const variants = ['solid', 'outline', 'ghost', 'link'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <StyleguideSection
    id="actions"
    title="Actions"
    description="Solid and outline are the primary buttons. They press in on hover; outline fills with its color, and neutral flips to signal yellow. Reduced motion keeps the color change and drops the movement."
    source="app.config.ts › ui.button, ui.kbd, ui.link"
  >
    <StyleguideSpecimen label="UButton: color × variant">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[32rem] border-separate border-spacing-y-4 text-left">
          <thead>
            <tr>
              <th
                scope="col"
                class="w-28 font-mono text-sm font-normal text-muted"
              >
                color
              </th>
              <th
                v-for="variant in variants"
                :key="variant"
                scope="col"
                class="font-mono text-sm font-normal text-muted"
              >
                {{ variant }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="color in colors"
              :key="color"
            >
              <th
                scope="row"
                class="font-mono text-sm font-normal"
              >
                {{ color }}
              </th>
              <td
                v-for="variant in variants"
                :key="variant"
              >
                <UButton
                  :color="color"
                  :variant="variant"
                  label="Button"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StyleguideSpecimen>

    <div class="grid gap-6 lg:grid-cols-2">
      <StyleguideSpecimen label="Sizes">
        <div class="flex flex-wrap items-end gap-4">
          <UButton
            v-for="size in sizes"
            :key="size"
            :size="size"
            :label="size"
          />
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="Icons, states, groups">
        <div class="flex flex-wrap items-center gap-4">
          <UButton
            icon="i-lucide-download"
            color="neutral"
            variant="outline"
            label="Resume (PDF)"
          />
          <UButton
            trailing-icon="i-lucide-arrow-up-right"
            label="GitHub"
          />
          <UButton
            icon="i-lucide-mail"
            aria-label="Email Cody"
            color="secondary"
          />
          <UButton
            loading
            label="Sending"
          />
          <UButton
            disabled
            label="Disabled"
          />
          <UFieldGroup>
            <UButton
              color="neutral"
              variant="outline"
              label="List"
            />
            <UButton
              color="neutral"
              variant="outline"
              label="Grid"
            />
            <UButton
              color="neutral"
              variant="outline"
              label="Table"
            />
          </UFieldGroup>
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="Links">
        <p class="max-w-prose text-lg">
          Read the
          <ULink
            to="#data"
            class="text-primary underline"
          >
            work history
          </ULink>
          or jump to the
          <ULink
            to="#forms"
            class="text-primary underline"
          >
            contact form
          </ULink>.
          Links are underlined in body copy so color is never the only cue.
        </p>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UKbd">
        <div class="flex flex-wrap items-center gap-6">
          <span class="inline-flex items-center gap-1.5">
            <UKbd value="meta" />
            <UKbd value="C" />
            <span class="ms-2 text-sm text-muted">Copy</span>
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UKbd value="tab" />
            <span class="ms-2 text-sm text-muted">Next control</span>
          </span>
          <span class="inline-flex items-center gap-1.5">
            <UKbd value="escape" />
            <span class="ms-2 text-sm text-muted">Close a dialog</span>
          </span>
        </div>
      </StyleguideSpecimen>
    </div>
  </StyleguideSection>
</template>
