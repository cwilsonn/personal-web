<script setup lang="ts">
const toast = useToast()

const badgeColors = ['primary', 'secondary', 'neutral', 'info', 'error'] as const
const badgeVariants = ['solid', 'outline'] as const

const progress = ref(64)

function showToast(color: 'success' | 'error' | 'info') {
  const content = {
    success: { title: 'Message sent', description: 'Cody will reply to the email you entered.', icon: 'i-lucide-check' },
    error: { title: 'Message not sent', description: 'Check your connection and try again.', icon: 'i-lucide-triangle-alert' },
    info: { title: 'Resume updated', description: 'The PDF now includes the current role.', icon: 'i-lucide-file-text' }
  }[color]
  toast.add({ ...content, color })
}
</script>

<template>
  <StyleguideSection
    id="feedback"
    title="Feedback"
    description="Alerts, badges, progress and toasts. Status always comes with an icon or words, so it reads the same without color."
    source="app.config.ts › ui.alert, ui.badge, ui.progress, ui.toast"
  >
    <div class="grid gap-6 lg:grid-cols-2">
      <UAlert
        color="primary"
        variant="solid"
        icon="i-lucide-briefcase"
        title="Open to senior frontend roles"
        description="Remote-first teams working in Vue and Nuxt."
      />
      <UAlert
        color="secondary"
        variant="solid"
        icon="i-lucide-sparkles"
        title="New: auth and permissions work"
        description="Keycloak auth API, Nuxt layers, and fine-grained permissions UI."
      />
      <UAlert
        color="info"
        variant="outline"
        icon="i-lucide-info"
        title="Resume available as a PDF"
        description="Same content as this site, formatted for applicant tracking systems."
        :actions="[{ label: 'Download', color: 'info', variant: 'outline' }]"
      />
      <UAlert
        color="error"
        variant="outline"
        icon="i-lucide-circle-x"
        title="Message not sent"
        description="Check your connection and try again."
        close
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <StyleguideSpecimen label="UBadge: color × variant">
        <div class="space-y-3">
          <div
            v-for="variant in badgeVariants"
            :key="variant"
            class="flex flex-wrap items-center gap-2"
          >
            <span class="w-16 font-mono text-xs text-muted">{{ variant }}</span>
            <UBadge
              v-for="color in badgeColors"
              :key="color"
              :color="color"
              :variant="variant"
              :label="color"
            />
          </div>
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UProgress">
        <div class="space-y-6">
          <UProgress
            v-model="progress"
            status
            size="lg"
          />
          <UProgress
            :model-value="null"
            color="secondary"
            size="lg"
            aria-label="Loading"
          />
          <div class="flex gap-3">
            <UButton
              size="sm"
              color="neutral"
              variant="outline"
              label="-10"
              @click="progress = Math.max(0, progress - 10)"
            />
            <UButton
              size="sm"
              color="neutral"
              variant="outline"
              label="+10"
              @click="progress = Math.min(100, progress + 10)"
            />
          </div>
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UToast">
        <div class="flex flex-wrap gap-4">
          <UButton
            color="primary"
            label="Success toast"
            @click="showToast('success')"
          />
          <UButton
            color="error"
            label="Error toast"
            @click="showToast('error')"
          />
          <UButton
            color="neutral"
            variant="outline"
            label="Info toast"
            @click="showToast('info')"
          />
        </div>
      </StyleguideSpecimen>

      <StyleguideSpecimen label="UChip, UAvatar, USkeleton">
        <div class="flex flex-wrap items-center gap-8">
          <UChip
            color="primary"
            size="3xl"
            inset
          >
            <UAvatar
              text="CW"
              size="xl"
              alt="Cody Wilson"
            />
          </UChip>
          <UChip
            text="3"
            size="3xl"
            color="error"
          >
            <UButton
              icon="i-lucide-bell"
              color="neutral"
              variant="outline"
              aria-label="Notifications, 3 unread"
            />
          </UChip>
          <div
            class="flex items-center gap-3"
            aria-hidden="true"
          >
            <USkeleton class="size-12" />
            <div class="space-y-2">
              <USkeleton class="h-4 w-40" />
              <USkeleton class="h-4 w-28" />
            </div>
          </div>
        </div>
      </StyleguideSpecimen>
    </div>
  </StyleguideSection>
</template>
