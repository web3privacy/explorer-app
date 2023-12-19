<script setup lang="ts">
defineProps<{
  auditName: string
  auditUrl?: string
  date?: string
}>()
</script>

<template>
  <div flex items-center gap-16px>
    <slot />
    <div flex flex-col text-14px font-700 leading-24px>
      <NuxtLink hover:underline flex items-center gap-8px :to="auditUrl">
        {{ auditName }}
        <UnoIcon v-if="auditUrl" i-web-openinnew text-16px />
      </NuxtLink>
      <span text-14px font-400 leading-24px>{{ date }}</span>
    </div>
  </div>
</template>
