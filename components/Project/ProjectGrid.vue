<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  projects: { title: string, projects: ProjectShallow[] }[]
}>()
const { switcher, filter } = storeToRefs(useData())

const totalProjectsCount = props.projects.map(g => g.projects.length).reduce((a, b) => a + b, 0)

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
    flex
    flex-col
    items-start
  >
    <template
      v-for="group in projects"
      :key="group.title"
    >
      <div

        flex
        items-center
        gap-x-12px
        w-full
        mb="8px lg:16px"
        mt-22px
      >
        <h2
          text="app-white 16px lg:24px"
          font-700
          leading="24px lg:32px"
          whitespace-nowrap
        >
          {{ group.projects.length }} {{ group.title }}
        </h2>
        <div
          h-2px
          w-full
          bg-app-text-grey
        />
        <button
          type="button"
          i-ic-baseline-arrow-drop-down
          text="app-text-grey 24px"
        />
      </div>
      <div
        grid
        grid-cols="2 lg:10"
        w-full
        mb-16px
      >
        <div
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
          >
            Project name
          </p>
          <button
            type="button"
            :class="['title' === filter.sortby ? filter.sortDirection === 'desc' ? 'i-ic-baseline-arrow-drop-up'
              : 'i-ic-baseline-arrow-drop-down'
              : 'i-ic-baseline-arrow-drop-down']"
            text="20px"
          />
        </div>
        <div
          flex
          items-center
          justify-end
          gap-4px
          lg:hidden
        >
          <p
            text="12px lg:14px app-text-grey"
            leading="16px lg:24px"
          >
            Sort by:
          </p>
          <p
            text="12px lg:14px"
            leading="16px lg:24px"
            font-700
          >
            Score
          </p>
          <button
            type="button"
            i-ic-baseline-arrow-drop-down
            text="app-text-grey 20px"
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
          >
            {{ title.label }}
          </p>
          <button
            v-if="title.togglable"
            type="button"
            :class="[title.sortKey === filter.sortby ? filter.sortDirection === 'desc' ? 'i-ic-baseline-arrow-drop-up'
              : 'i-ic-baseline-arrow-drop-down'
              : 'i-ic-baseline-arrow-drop-down']"
            text=" 20px"
          />
        </div>
      </div>
      <div
        grid
        :class="switcher ? 'grid-cols-1 lg:grid-cols-1' : 'xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'"
        gap-16px
        text-white
        w-full
      >
        <Card
          v-for="project in group.projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </template>
    <div v-if="totalProjectsCount === 0">
      <h3>No Projects found...</h3>
    </div>
  </div>
</template>
