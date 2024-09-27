<script lang="ts" setup>
const { filter } = storeToRefs(useData())

function onChangeSort(sortKey: string) {
  if (filter.value.sortby === sortKey) {
    if (filter.value.sortDirection === 'desc' && filter.value.sortby !== 'score') {
      filter.value.sortby = 'score'
      filter.value.sortDirection = 'desc'
      return
    }
    filter.value.sortDirection = filter.value.sortDirection === 'asc' ? 'desc' : 'asc'
    return
  }
  filter.value.sortby = sortKey
  filter.value.sortDirection = sortKey === 'score' ? 'desc' : 'asc'
}

const cardTitles = ref< { label: string, sortKey: string, togglable?: boolean }[]>([
  { label: 'Usecase', sortKey: 'usecase' },
  { label: 'Openess', sortKey: 'openess', togglable: true },
  { label: 'Technology', sortKey: 'technology', togglable: true },
  { label: 'Privacy', sortKey: 'privacy', togglable: true },
  { label: 'Ecosystem', sortKey: 'ecosystem' },
  { label: 'Links', sortKey: 'links' },
  { label: 'W3PN Score', sortKey: 'score', togglable: true },
])
</script>

<template>
  <div
    grid
    grid-cols="2 lg:10"
    w-full
    mb-16px
  >
    <div
      py-8px

      flex
      items-center
      gap-4px
      col-span="1 lg:2"
      :class="['title' === filter.sortby ? 'text-app-white' : 'text-app-text-grey', 'cursor-pointer']"
      @click="onChangeSort('title')"
    >
      <p
        text="12px lg:14px"
        leading="16px lg:24px"
        whitespace-nowrap
        md:mt-0px
        mt-4px
      >
        Project name
      </p>
      <button
        hidden
        lg:block
        type="button"
        :class="['title' === filter.sortby ? filter.sortDirection === 'desc' ? 'i-ic-baseline-arrow-drop-up'
          : 'i-ic-baseline-arrow-drop-down'
          : 'i-ic-baseline-arrow-drop-down']"
        text-24px
      />
    </div>
    <div
      flex
      items-center
      justify-end
      gap-4px
      lg:hidden
    >
      <SortSelectBox
        v-model="filter.sortby"
        name="sort"
        :options="['title', 'openess', 'technology', 'privacy', 'score'].map((o) => ({ label: capitalize(o), value: o }))"
      />
    </div>
    <div
      v-for="(title, index) in cardTitles"
      :key="title.label"
      lg:flex
      items-center
      justify-start
      last:justify-end
      gap-4px
      hidden
      :class="[title.sortKey === filter.sortby ? 'text-app-white' : 'text-app-text-grey', { 'cursor-pointer': title.togglable, 'col-span-1 lg:col-span-2': index === 0 }]"
      @click="onChangeSort(title.sortKey)"
    >
      <p
        text="12px lg:14px "
        leading="16px lg:24px"
        whitespace-nowrap
        hover="text-app-white"
        transition-all
        duration-250
      >
        {{ title.label }}
      </p>
      <button
        v-if="title.togglable"
        type="button"
        :class="[title.sortKey === filter.sortby ? filter.sortDirection === 'desc' ? 'i-ic-baseline-arrow-drop-up'
          : 'i-ic-baseline-arrow-drop-down'
          : 'i-ic-baseline-arrow-drop-down']"
        text-24px
      />
    </div>
  </div>
</template>
