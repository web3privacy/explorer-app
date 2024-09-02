<script lang="ts" setup>

</script>

<template>
  <NuxtLink
    w-fit
    px-16px
    py-8px
    flex
    items-center
    gap-12px
    text-app-white
    hover:text-app-black
    hover:bg-app-white
    uppercase
    cursor-pointer
  >
    <UnoIcon
      i-heroicons-solid-arrow-left
      text-24px
    />
    <div
      text="16px"
      leading-24px
      font-400
    >
      <slot />
    </div>
  </NuxtLink>
</template>
