<script lang="ts" setup>
defineProps<{
  text: string
  inverted?: boolean
}>()
const emits = defineEmits(['selected'])
</script>

<template>
  <div
    border-2px
    :class="[inverted ? 'border-app-black bg-app-white hover:bg-app-black text-app-black hover:text-app-white' : 'bg-app-black border-app-white hover:bg-app-white text-app-white hover:text-app-black']"
    flex items-center justify-center px-24px py-16px font-700 leading-40px cursor-pointer @click="emits('selected')"
  >
    {{ text }}
  </div>
</template>
