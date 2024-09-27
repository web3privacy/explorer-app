<script setup lang="ts">
import type { InputOption } from '~/types'

defineProps<{ placeholder?: string, includeSort?: boolean }>()

const { filter, switcher } = storeToRefs(useData())
const options: InputOption[] = [
  { label: 'A to Z', value: 'atoz' },
  { label: 'Score', value: 'score' },
  { label: 'Anonymity', value: 'anonymity' },
]

const isSearchFocused = ref(false)
</script>

<template>
  <div
    flex
    justify-between
    gap-16px
    items-centeer
  >
    <div
      border-2px
      flex
      items-center
      w-full
      h-40px
      hover:opacity-100
      md:max-w-470px

      :class="isSearchFocused ? 'opacity-100' : 'opacity-25'"
    >
      <div
        px-12px
        py-0px
        flex
        w-fit
      >
        <UnoIcon
          i-heroicons-solid-magnifying-glass
          text-16px
          :class="isSearchFocused ? 'opacity-100' : 'opacity-50' "
          class="uno-icon"
        />
      </div>
      <input
        v-model="filter.query"
        :placeholder="placeholder"
        type="text"
        bg-transparent
        border-transparent
        focus:border-transparent
        focus:ring-0
        h-full
        w-full
        outline-none
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
      >
    </div>
    <div v-if="includeSort">
      <div
        flex
        gap-24px
        items-center
        w-full
      >
        <div
          gap-12px
          items-center
          xl:flex
          hidden
          invisible
        >
          <UnoIcon
            i-web-list
            text-16px
            cursor-pointer
            hover:opacity-100
            :class="switcher ? 'opacity-100' : 'opacity-50'"
            @click="switcher = true"
          />
          <UnoIcon
            i-web-blocks
            text-16px
            cursor-pointer
            hover:opacity-100
            :class="!switcher ? 'opacity-100' : 'opacity-50'"
            @click="switcher = false"
          />
        </div>
        <div
          flex
          gap-12px
          items-center
          w-full
        >
          <h4
            xl:block
            hidden
            text-16px
            opacity-50
            w-fit
          >
            Sort by
          </h4>
          <SelectBox
            v-model="filter.sortby"
            :black-and-white="false"
            :options="options"
            w-99px
            sm:w-162px
            text-black
            :is-margin-top="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div:hover .uno-icon {
  opacity: 1;
}
</style>
