<script lang="ts" setup>
import type { InputOption } from '~/types'

const props = defineProps<{
  options: InputOption[]
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])

const selectedValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div flex items-center gap-16px>
    <div v-for="option in options" :key="option.value" :class="[selectedValue === option.value ? 'font-700 text-app-black bg-app-white' : 'font-400 text-app-white  border-app-white']" text-24px leading-32px px-16px py-8px border-2px cursor-pointer @click="selectedValue = option.value">
      {{ option.label }}
    </div>
  </div>
</template>
