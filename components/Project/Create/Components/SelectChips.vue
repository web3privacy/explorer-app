<script setup lang="ts">
interface OptionItem<T> {
  label: string
  value: T
}

export interface SelectProps {
  options: OptionItem<any>[]
  label?: string
  hint?: string
  placeholder?: string
  required?: boolean
  multiple?: boolean
  canAddNew?: boolean
  modelValue?: any
  error?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  multiple: true,
})

const emits = defineEmits(['update:modelValue'])

const modelValue = useVModel(props, 'modelValue', emits)

const query = ref('')
const newOptions = ref<OptionItem<any>[]>([])

const options = computed(() => {
  return [...props.options, ...newOptions.value]
})

const filteredOptions = computed(() =>
  query.value === ''
    ? options.value
    : options.value.filter(o => o.label.toLowerCase().includes(query.value.toLowerCase())),
)

// const modelValue = ref(props.modelValue || (props.multiple ? [] : null))

const selectedOptions = computed(() => props.multiple ? options.value.filter(o => modelValue.value?.includes(o.value)) : [])

function deleteOption(value: string) {
  const index = modelValue.value.indexOf(value)
  if (index !== -1)
    modelValue.value.splice(index, 1)

  newOptions.value = newOptions.value.filter((o: any) => o.value !== value)
}

function addOption() {
  if (query.value === '' || !props.canAddNew) return

  if (!options.value.some(o => o.value === query.value)) {
    newOptions.value.push({ label: query.value, value: query.value })
  }

  if (props.multiple) {
    if (!modelValue.value) modelValue.value = []
    modelValue.value.push(query.value)
  }
  else {
    modelValue.value = query.value
  }

  query.value = ''
}
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
      <HeadlessCombobox
        v-model="modelValue"
        :multiple="props.multiple"
      >
        <HeadlessComboboxLabel
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
        </HeadlessComboboxLabel>
        <div class="relative font-700 mt-2 bg-app-black">
          <HeadlessComboboxButton
            as="div"
            class="relative w-full cursor-pointer p-8px text-left border-2px text-app-white bg-black sm:text-sm sm:leading-6"
            :class="error ? 'border-app-danger/50' : 'border-white/30'"
          >
            <div class="flex flex-wrap gap-8px">
              <span
                v-for="option in selectedOptions"
                :key="option.value"
                class="font-700 text-14px leading-20px flex gap-8px items-center bg-app-white text-black px-8px py-4px"
                lg="text-16px"
              >
                {{ option.label }}
                <button
                  type="button"
                  class="ml-1 text-black"
                  @click.stop="deleteOption(option.value)"
                >
                  <UnoIcon
                    i-heroicons-solid-x
                    text-16px
                    text-black
                  />
                </button>
              </span>
              <HeadlessComboboxInput
                class="text-14px font-400 leading-20px ml-8px w-fit bg-transparent border-none focus:ring-0 focus:outline-none"
                lg="16px"
                :placeholder="placeholder"
                @keyup.enter="addOption"
                @change="query = $event.target.value"
              />
            </div>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
              <UnoIcon
                i-heroicons-solid-chevron-down
                class="text-app-white"
                aria-hidden="true"
              />
            </span>
          </HeadlessComboboxButton>
        </div>
        <Transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @after-leave="query = ''"
        >
          <HeadlessComboboxOptions
            lg="w-1/2"
            class="w-full absolute z-100 max-h-60 divide-y-2px border-2px border-t-0 overflow-auto bg-app-black text-app-white focus:outline-none sm:text-sm border-white/30"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== '' && props.canAddNew"
              class="gap-4px flex items-center relative cursor-default select-none px-4 py-2 text-app-white"
              @click="addOption"
            >
              <UnoIcon
                i-heroicons-solid-plus
                class="text-app-white"
              />
              <span>Add</span>
            </div>
            <div
              v-else-if="filteredOptions.length === 0 && query !== '' && !props.canAddNew"
              class="relative cursor-default select-none px-4 py-2 text-app-white opacity-50"
            >
              Nothing found.
            </div>
            <HeadlessComboboxOption
              v-for="option in filteredOptions"
              :key="option.value"
              v-slot="{ selected, active }"
              class="border-white/30"
              as="template"
              :value="option.value"
            >
              <li
                class="w-full relative cursor-pointer select-none py-8px p-16px"
                :class="[active ? 'bg-#ffffff1a' : 'text-white']"
              >
                <span
                  class="block truncate"
                  :class="[selected ? 'font-semibold' : 'font-normal']"
                >{{ option.label }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
                >
                  <UnoIcon
                    i-heroicons-solid-check
                    text-20px
                    aria-hidden="true"
                  />
                </span>
              </li>
            </HeadlessComboboxOption>
          </HeadlessComboboxOptions>
        </Transition>
      </HeadlessCombobox>
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
