<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" flex items-center gap-12px>
    <div flex justify-center items-center w-32px h-32px text-32px>
      <slot name="prefix" />
    </div>
    <div flex flex-col justify-center>
      <div text="14px sm:16px app-white" font-400 leading-24px hover:underline>
        <slot />
      </div>
    </div>
  </NuxtLink>
</template>
