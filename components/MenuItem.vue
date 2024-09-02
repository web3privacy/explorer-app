<script lang="ts" setup>
defineProps<{
  title: string
  selected?: boolean
}>()
</script>

<template>
  <NuxtLink
    text-14px
    hover:text-app-white
    leading-32px
    uppercase
    cursor-pointer
    :class="[selected ? 'text-app-white  font-700 underline underline-offset-4px hover:no-underline' : 'text-app-text-grey font-500']"
  >
    {{ title }}
  </NuxtLink>
</template>
