<script setup lang="ts">
import type { InputOption } from '~/types'

const props = withDefaults(defineProps<SelectProps>(), {
  isMarginTop: true,
  blackAndWhite: true,
  borderOpacity: 100,
})
const emits = defineEmits(['update:modelValue'])

interface SelectProps {
  options: InputOption[]
  label?: string
  modelValue: any
  isMarginTop?: boolean
  blackAndWhite?: boolean
  borderOpacity?: number
  placeholder?: string
}

const selectedValue = useVModel(props, 'modelValue', emits)
</script>

<template>
  <HeadlessListbox
    v-model="selectedValue"
    as="div"
  >
    <div
      class="relative font-700"
      :class="[isMarginTop ? 'mt-2' : 'mt-0', blackAndWhite ? 'bg-app-black' : 'bg-app-white']"
    >
      <HeadlessListboxButton
        class="relative w-full cursor-pointer py-8px p-16px text-left border-2px sm:text-sm sm:leading-6"
        :class="[blackAndWhite ? 'text-app-white' : 'text-app-black', `border-white/${borderOpacity}`]"
      >
        <span
          class="block truncate mr-8px"
          :class="[selectedValue ? 'text-app-white' : 'font-400 text-white/50']"
        >
          {{ props.options.find(option => option.value === selectedValue)?.label || props.placeholder }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <UnoIcon
            i-heroicons-solid-chevron-down
            :class="[blackAndWhite ? 'text-app-white' : 'text-app-black']"
          />
        </span>
      </HeadlessListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          :class="`border-white/${borderOpacity}`"
          class="absolute z-100 max-h-60 w-full divide-y-2px border-2px border-t-0 overflow-auto bg-app-black text-app-white focus:outline-none sm:text-sm"
        >
          <HeadlessListboxOption
            v-for="option in props.options"
            :key="option.value"
            v-slot="{ selected }"
            as="template"
            :value="option.value"
            class="py-8px p-16px cursor-pointer"
            :class="`border-white/${borderOpacity}`"
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
</template>
