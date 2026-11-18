<script setup lang="ts">
import type { FormError, RadioGroupItem } from '@nuxt/ui'

const state = reactive({
  name: '',
  email: '',
  company: '',
  roleType: 'Senior frontend engineer',
  stack: ['Vue 3', 'Nuxt', 'TypeScript'],
  teamSize: 6,
  engagement: 'full-time',
  remote: true,
  overlap: [4],
  message: '',
  consent: false
})

const roleTypes = ['Senior frontend engineer', 'Staff frontend engineer', 'Design systems engineer', 'Frontend lead']
const stackOptions = ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vitest', 'Playwright', 'Pinia', 'TanStack Query']
const engagements: RadioGroupItem[] = [
  { value: 'full-time', label: 'Full-time', description: 'Salaried role on your team' },
  { value: 'contract', label: 'Contract', description: 'Fixed term or hourly' },
  { value: 'contract-to-hire', label: 'Contract to hire', description: 'Starts as a contract' }
]

function validate(values: typeof state): FormError[] {
  const errors: FormError[] = []
  if (!values.name) errors.push({ name: 'name', message: 'Enter your name.' })
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.push({ name: 'email', message: 'Enter an email address like name@company.com.' })
  if (values.message.length < 20) errors.push({ name: 'message', message: 'Add a few details about the role (20 characters or more).' })
  return errors
}

const toast = useToast()
function onSubmit() {
  toast.add({ title: 'Form is valid', description: 'This demo doesn’t send anything.', icon: 'i-lucide-check', color: 'success' })
}
</script>

<template>
  <StyleguideSection
    id="forms"
    title="Forms"
    description="Fields sit on paper with a 2px ink edge. Errors appear in text next to the field, not only in red, and submit runs validation so you can see every state."
    source="app.config.ts › ui.input, ui.select, ui.checkbox, ui.switch, ui.slider"
  >
    <UCard
      variant="outline"
      :ui="{ body: 'p-6 sm:p-8' }"
    >
      <template #header>
        UForm: hiring inquiry
      </template>

      <UForm
        :state="state"
        :validate="validate"
        class="grid gap-6 md:grid-cols-2"
        @submit="onSubmit"
      >
        <UFormField
          label="Name"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            icon="i-lucide-user"
            autocomplete="name"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Work email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            icon="i-lucide-at-sign"
            autocomplete="email"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Role"
          name="roleType"
        >
          <USelect
            v-model="state.roleType"
            :items="roleTypes"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Stack"
          name="stack"
          help="Pick everything the role uses."
        >
          <USelectMenu
            v-model="state.stack"
            :items="stackOptions"
            multiple
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Frontend team size"
          name="teamSize"
        >
          <UInputNumber
            v-model="state.teamSize"
            :min="1"
            :max="50"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="`Hours of overlap with US Pacific: ${state.overlap[0]}`"
          name="overlap"
        >
          <USlider
            v-model="state.overlap"
            :min="0"
            :max="8"
            class="py-2"
          />
        </UFormField>

        <UFormField
          name="engagement"
          class="md:col-span-2"
        >
          <URadioGroup
            v-model="state.engagement"
            legend="Engagement"
            variant="card"
            orientation="horizontal"
            :items="engagements"
          />
        </UFormField>

        <UFormField
          label="About the role"
          name="message"
          required
          class="md:col-span-2"
        >
          <UTextarea
            v-model="state.message"
            :rows="4"
            class="w-full"
          />
        </UFormField>

        <div class="flex flex-wrap items-center gap-6 md:col-span-2">
          <USwitch
            v-model="state.remote"
            label="Fully remote"
          />
          <UCheckbox
            v-model="state.consent"
            label="Send me a copy"
          />
        </div>

        <div class="flex flex-wrap gap-4 md:col-span-2">
          <UButton
            type="submit"
            size="lg"
            label="Send message"
          />
          <UButton
            type="reset"
            size="lg"
            color="neutral"
            variant="outline"
            label="Clear"
          />
        </div>
      </UForm>
    </UCard>

    <div class="grid gap-6 md:grid-cols-3">
      <StyleguideSpecimen label="Error state">
        <UFormField
          label="Work email"
          error="Enter an email address like name@company.com."
        >
          <UInput
            model-value="cody@"
            class="w-full"
          />
        </UFormField>
      </StyleguideSpecimen>
      <StyleguideSpecimen label="Disabled">
        <UFormField label="Location">
          <UInput
            model-value="Seattle, WA"
            disabled
            class="w-full"
          />
        </UFormField>
      </StyleguideSpecimen>
      <StyleguideSpecimen label="Checkbox card">
        <UCheckbox
          variant="card"
          label="Open to relocation"
          description="Seattle area preferred"
          :default-value="false"
        />
      </StyleguideSpecimen>
    </div>
  </StyleguideSection>
</template>
