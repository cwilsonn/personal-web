<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: title => title ? `${title} | Cody Wilson` : 'Cody Wilson | Senior Frontend Engineer'
})

const nav: NavigationMenuItem[] = [
  { label: 'Experience', to: '/#experience' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' }
]

const links = {
  github: 'https://github.com/cwilsonn',
  linkedin: 'https://www.linkedin.com/in/cody-wilson-764b77191/',
  email: 'mailto:cody@codywilson.dev',
  resume: '/files/cody-wilson-resume-2025.pdf'
}
</script>

<template>
  <UApp>
    <a
      href="#main"
      class="sr-only z-100 border-2 border-ink bg-secondary px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Skip to content
    </a>

    <UHeader :toggle="{ color: 'neutral', variant: 'ghost' }">
      <template #title>
        <span class="font-display text-xl">Cody Wilson</span>
      </template>

      <UNavigationMenu
        :items="nav"
        variant="link"
      />

      <template #right>
        <UButton
          :to="links.resume"
          target="_blank"
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-lucide-download"
          label="Resume"
          class="hidden sm:inline-flex"
        />
        <UButton
          :to="links.github"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Cody Wilson on GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="nav"
          orientation="vertical"
        />
      </template>
    </UHeader>

    <UMain id="main">
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="font-mono text-sm">
          © {{ new Date().getFullYear() }} Cody Wilson. Built with Nuxt and Nuxt UI.
        </p>
      </template>

      <template #right>
        <UButton
          :to="links.email"
          icon="i-lucide-mail"
          aria-label="Email Cody"
          color="neutral"
          variant="ghost"
        />
        <UButton
          :to="links.linkedin"
          target="_blank"
          icon="i-simple-icons-linkedin"
          aria-label="Cody Wilson on LinkedIn"
          color="neutral"
          variant="ghost"
        />
        <UButton
          :to="links.github"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Cody Wilson on GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
