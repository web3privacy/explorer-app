<script setup lang="ts">
interface OptionItem<T> {
  label: string
  value: T
}

export interface SelectProps {
  options: OptionItem<string>[]
}

defineProps<SelectProps>()

const selected = defineModel<string>()
</script>

<template>
  <div w-full>
    <div w-full>
      <HeadlessRadioGroup v-model="selected">
        <div class="flex flex-wrap gap-20px">
          <HeadlessRadioGroupOption
            v-for="option in options"
            :key="option.label"
            v-slot="{ checked }"
            as="template"
            :value="option.value"
          >
            <div class="cursor-pointer w-49% flex items-center gap-22px">
              <div
                rounded-full
                p-6px
                flex
                items-center
                justify-centerě
                :class="checked ? 'bg-app-white text-app-black' : 'outline outline-2px outline-offset--2 outline-app-white text-app-white'"
              >
                <UnoIcon
                  v-if="checked"
                  i-heroicons-solid-check
                  text-20px
                />
                <div
                  v-else
                  w-20px
                  h-20px
                />
              </div>
              <HeadlessRadioGroupLabel
                as="p"
                :class="checked ? 'text-app-white' : 'text-app-white/50'"
                class="font-medium"
              >
                {{ option.label }}
              </HeadlessRadioGroupLabel>
            </div>
          </HeadlessRadioGroupOption>
        </div>
      </HeadlessRadioGroup>
    </div>
  </div>
</template>
