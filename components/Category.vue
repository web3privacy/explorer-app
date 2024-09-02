<script lang="ts" setup>
defineProps<{
  title: string
  count: number
  selected?: boolean
}>()
</script>

<template>
  <div
    hover:bg-app-bg-grey
    :class="[selected ? 'bg-app-white' : 'bg-transparent']"
    flex
    items-center
    gap-8px
    py-10px
    px-16px
    text-18px
    font-400
    leading-24px
    cursor-pointer
  >
    <h1
      hover:text-app-white
      :class="[selected ? 'text-app-black font-700 opacity-100' : 'text-app-white opacity-50']"
    >
      {{ title }}
    </h1>
    <p text-app-text-grey>
      ({{ count }})
    </p>
  </div>
</template>
