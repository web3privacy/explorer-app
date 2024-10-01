<script setup lang="ts">
export interface SelectProps {
  label?: string
  hint?: string
  placeholder?: string
  required?: boolean
  modelValue?: any
  textarea?: boolean
  textareaRows?: number
  lgWidth?: string
  error?: string
}

defineProps<SelectProps>()

const model = defineModel<string>()
</script>

<template>
  <div
    class="w-full!"
    flex
    flex-col
    gap-8px
  >
    <label
      v-if="label"
      font-400
      text-14px
      lg:text-16px
      text-app-white
    >
      {{ label }}
      <span
        v-if="required"
        text-app-danger
        text-16px
      >*</span>
    </label>
    <div
      w-full
      flex
      flex-col
      gap-8px
      lg="flex flex-row gap-24px items-center"
      relative
    >
      <div v-bind="$attrs" shrink-0>
        <textarea
          v-if="textarea"
          v-model="model"
          :rows="textareaRows"
          :placeholder="placeholder"
          class="relative w-full p-8px text-left border-2px text-app-white bg-black sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-white"
          :class="error ? 'border-app-danger/50' : 'border-white/30'"
        />
        <input
          v-else
          v-model="model"
          :placeholder="placeholder"
          type="text"
          class="relative w-full p-8px text-left border-2px text-app-white bg-black sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-white"
          :class="error ? 'border-app-danger/50' : 'border-white/30'"
        >
      </div>
      <span
        v-if="hint"
        lg="left-1/2 self-center"
        v-bind="$attrs"
        font-400
        italic
        lg:text-14px
        text-12px
        text-app-white
        opacity-50
      >
        {{ hint }}
      </span>
    </div>
  </div>
</template>
