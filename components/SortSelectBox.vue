<script setup lang="ts">
import type { InputOption } from '~/types'

const props = withDefaults(defineProps<SelectProps>(), {
  isMarginTop: true,
  blackAndWhite: true,
})
const emits = defineEmits(['update:modelValue'])

interface SelectProps {
  name: string
  options: InputOption[]
  modelValue: string
  isMarginTop?: boolean
  blackAndWhite?: boolean
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
        :id="`headless-listbox-button-${name}`"
        class="cursor-pointer py-8px  text-left  text-xs sm:text-sm sm:leading-6 flex items-center justify-end gap-4px"
        :class="[blackAndWhite ? ' text-app-white' : 'text-app-black']"
      >
        <div
          text="12px lg:14px app-text-grey"
          leading="16px lg:24px"
        >
          Sort by:
        </div>
        <div class="truncate">
          {{ props.options.find(option => option.value === selectedValue)?.label }}
        </div>
        <UnoIcon
          i-ic-baseline-arrow-drop-down
          :class="[blackAndWhite ? ' text-app-white' : 'text-app-black']"
          text="18px lg:20px"
        />
      </HeadlessListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute md: left--12 z-100 max-h-60 w-150px divide-y-2px border-2px  overflow-auto bg-app-black text-app-white focus:outline-none sm:text-sm"
        >
          <HeadlessListboxOption
            v-for="option in props.options"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
          >
            <li
              class="w-full relative cursor-pointer select-none py-8px p-16px text-sm"
              :class="[active ? 'bg-#ffffff1a' : 'text-white']"
            >
              <span
                class="block truncate"
                :class="[selected ? 'font-semibold' : 'font-normal']"
              >{{ option.label }}</span>
            </li>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </div>
  </HeadlessListbox>
</template>
