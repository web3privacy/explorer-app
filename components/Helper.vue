<script lang="ts" setup>
defineProps<{
  info: string
}>()
</script>

<template>
  <div relative>
    <button
      class="peer"
      type="button"
    >
      <UnoIcon
        i-heroicons-solid-information-circle
        class="w-20px h-20px opacity-50 hover:opacity-100 text-app-white"
      />
    </button>
    <div
      class="peer-hover:visible top-20px left-20px absolute invisible z-100 inline-block px-3 py-2 text-sm font-medium text-app-black bg-app-white"
    >
      {{ info }}
    </div>
  </div>
</template>
