<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div
    w-full
    flex
    justify-between
    gap-8px
    my-40px
    lg="gap-32px"
  >
    <div
      flex
      items-center
      gap-8px
      text-16px
      font-700
      class="text-app-white/50"
    >
      <span text-nowrap>{{ title }}</span>
    </div>
    <div
      w-full
      flex
      items-center
    >
      <hr
        border="t-2px white/50"
        w-full
        shrink-1
      >
    </div>
  </div>
</template>
