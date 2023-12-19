<script setup lang="ts">
defineProps<{
  title: string
  badgeText: string
}>()
</script>

<template>
  <div w-full flex justify-between gap-8px lg:gap-32px mt-36px>
    <div flex items-center gap-8px text-16px font-700 lg:max-w-320px lg:w-full lg:justify-end>
      <slot />
      {{ title }}
    </div>
    <div w-full flex items-center>
      <hr border-t-2px border-white w-full>
      <!-- <Badge text-16px h-32px :text="badgeText" /> -->
    </div>
  </div>
</template>
