<script setup lang="ts">
import type { InputOption } from '~/types'

const props = defineProps<{
  options: InputOption[]
  modelValue: string
  count?: number
}>()

const emits = defineEmits(['update:modelValue', 'selected'])

const selectedValue = useVModel(props, 'modelValue', emits)
const isOptionSelected = computed(() => {
  return props.options.find(option => option.value === selectedValue.value)
})
function onOptionSelected(value: string) {
  emits('selected', value)
}
</script>

<template>
  <HeadlessListbox
    v-model="selectedValue"
    as="div"
  >
    <div class="relative mt-2 font-700 font-24px">
      <HeadlessListboxButton
        class="relative w-full cursor-pointer py-8px p-16px text-left border-2px text-app-white sm:text-sm sm:leading-6"
      >
        <span class="block truncate mr-8px">{{ isOptionSelected?.label }} <span opacity-50>({{ isOptionSelected?.count }})</span></span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <UnoIcon
            i-heroicons-solid-chevron-down
            text-app-white
          />
        </span>
      </HeadlessListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute z-100 max-h-60 w-full divide-y-2px border-2px border-t-0 overflow-auto bg-app-black text-app-white focus:outline-none sm:text-sm"
        >
          <HeadlessListboxOption
            v-for="option in props.options"
            :key="option.value"
            v-slot="{ active, selected }"
            as="template"
            :value="option.value"
            @click="onOptionSelected(option.value)"
          >
            <li
              class="w-full relative cursor-pointer select-none py-8px p-16px"
              :class="[active ? 'bg-#ffffff1a' : 'text-white']"
            >
              <span
                class="block truncate"
                :class="[selected ? 'font-semibold' : 'font-normal']"
              >
                {{ option.label }}
                <span opacity-50>({{ option.count }})</span>
              </span>
            </li>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </div>
  </HeadlessListbox>
</template>
