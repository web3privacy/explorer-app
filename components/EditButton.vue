<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" flex gap-12px target="_blank">
    <UnoIcon i-heroicons-solid-pencil text-24px />
    <slot />
  </NuxtLink>
</template>
