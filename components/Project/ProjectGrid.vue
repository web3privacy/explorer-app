<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  projects: { title: string, projects: ProjectShallow[] }[]
}>()
const { switcher } = storeToRefs(useData())

const displayCount = ref(100)
const displayedProjects = computed(() => props.projects.slice(0, displayCount.value))
function showMoreProjects() {
  displayCount.value += 50
}

const cardTitles = ref< { label: string, togglable?: boolean, toggled?: boolean }[]>([
  { label: 'Usecase' },
  { label: 'Openess', togglable: true },
  { label: 'Technology', togglable: true },
  { label: 'Privacy', togglable: true },
  { label: 'Ecosystem' },
  { label: 'Links' },
  { label: 'W3PN Score', togglable: true },
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
          col-span="1 lg:3"
        >
          <p
            text="12px lg:14px app-text-grey"
            leading="16px lg:24px"
            whitespace-nowrap
          >
            Project name
          </p>
          <button
            type="button"
            i-ic-baseline-arrow-drop-down
            text="app-text-grey 20px"
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
          v-for="title in cardTitles"
          :key="title.label"
          lg:flex
          items-center
          justify-start
          last:justify-end
          gap-4px
          hidden
        >
          <p
            text="12px lg:14px app-text-grey"
            leading="16px lg:24px"
            whitespace-nowrap
          >
            {{ title.label }}
          </p>
          <button
            v-if="title.togglable"
            type="button"
            :class="[title.toggled
              ? 'i-ic-baseline-arrow-drop-up'
              : 'i-ic-baseline-arrow-drop-down']"
            text="app-text-grey 20px"
            @click="title.toggled = !title.toggled"
          />
        </div>
      </div>
      <div
        v-if="displayedProjects.length"
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
      <div v-else>
        <h3>No Projects found...</h3>
      </div>
      <button
        v-if="displayedProjects.length < projects.length"
        mt-29px
        text="14px"
        leading-24px
        font-700
        px-12px
        py-4px
        border-2px
        border-app-white
        @click="showMoreProjects"
      >
        Load more projects
      </button>
    </template>
  </div>
</template>
