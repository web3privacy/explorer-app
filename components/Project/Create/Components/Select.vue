<script setup lang="ts">
import type { InputOption } from '~/types'

const props = defineProps<SelectProps>()
const emits = defineEmits(['update:modelValue'])

interface SelectProps {
  options: InputOption[]
  label?: string
  modelValue: string
  placeholder?: string
  required?: boolean
  hint?: string
}

const selectedValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div
    flex
    flex-col
    gap-8px
    lg="flex flex-row gap-24px"
    relative
  >
    <div lg="w-1/2">
      <HeadlessListbox
        v-model="selectedValue"
        as="div"
      >
        <HeadlessListboxLabel
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
        </HeadlessListboxLabel>
        <div
          class="relative font-700 mt-2 bg-app-black"
        >
          <HeadlessListboxButton
            as="div"
            class="relative w-full cursor-pointer p-8px text-left border-2px text-app-white bg-black border-white/30 sm:text-sm sm:leading-6"
          >
            <span
              class="block truncate mr-8px"
              :class="[selectedValue ? 'text-app-white' : 'font-400 text-white/50']"
            >
              {{ props.options.find(option => option.value === selectedValue)?.label || props.placeholder }}
            </span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
              <UnoIcon
                i-heroicons-solid-chevron-down
                class="text-app-white"
                aria-hidden="true"
              />
            </span>
          </HeadlessListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <HeadlessListboxOptions
              class="absolute z-100 max-h-60 w-full divide-y-2px border-2px border-t-0 overflow-auto bg-app-black text-app-white focus:outline-none sm:text-sm border-white/30"
            >
              <HeadlessListboxOption
                v-for="option in props.options"
                :key="option.value"
                v-slot="{ selected }"
                as="template"
                :value="option.value"
                class="w-full relative cursor-pointer select-none py-8px p-16px border-white/30"
              >
                <span
                  class="block truncate"
                  :class="[selected ? 'font-semibold' : 'font-normal']"
                >{{ option.label }}</span>
              </HeadlessListboxOption>
            </HeadlessListboxOptions>
          </transition>
        </div>
      </HeadlessListbox>
    </div>
    <span
      v-if="hint"
      lg="mt-28px left-1/2 self-center"
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
</template>
