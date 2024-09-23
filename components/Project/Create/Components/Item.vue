<script setup lang="ts">
const emits = defineEmits(['remove'])
</script>

<template>
  <div
    flex
    justify-between
    items-center
    py-12px
    px-16px
    bg-app-white
  >
    <slot name="label" />
    <div
      flex
      items-center
      gap-16px
    >
      <slot
        class="text-app-black/50"
        name="desc"
      />
      <button @click="emits('remove')">
        <UnoIcon
          i-heroicons-solid-x
          text-12px
          text-app-black
        />
      </button>
    </div>
  </div>
</template>
