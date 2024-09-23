<script setup lang="ts">
defineProps<{
  buttonLabel: string
}>()

const emits = defineEmits(['add'])
</script>

<template>
  <div
    flex
    flex-col
    w-full
    border-2
    border-app-white
    p-24px
  >
    <slot name="content" />
    <Button
      mt-16px
      lg="w-fit mt-24px"
      border
      inverted-color
      @click="emits('add')"
    >
      <span
        px-24px
      >{{ buttonLabel }}</span>
    </Button>
  </div>
</template>
