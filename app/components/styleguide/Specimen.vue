<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <!-- A plain UCard: the theme's default card supplies the edge, shadow and mono header bar. -->
  <UCard>
    <template #header>
      {{ label }}
    </template>
    <slot />
  </UCard>
</template>
