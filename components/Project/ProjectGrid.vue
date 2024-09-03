<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  projects: ProjectShallow[]
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
    <div
      v-if="displayedProjects.length"
      flex
      items-center
      gap-x-12px
      w-full
      mb="8px md:16px"
    >
      <h2
        text="app-white 16px md:24px"
        font-700
        leading="24px md:32px"
        whitespace-nowrap
      >
        24 Defi
      </h2>
      <div
        h-2px
        w-full
        bg-app-white
      />
      <button
        type="button"
        i-heroicons-solid-chevron-down
        text="app-white 24px"
      />
    </div>
    <div
      v-if="displayedProjects.length"
      flex
      items-center
      justify-between
      w-full
      mb-16px
    >
      <div
        flex
        items-center
        gap-4px
      >
        <p
          text="12px md:14px"
          leading="16px md:24px"
          whitespace-nowrap
        >
          Project name
        </p>
        <button
          type="button"
          i-heroicons-solid-chevron-down
          text="app-white 20px"
        />
      </div>
      <div
        hidden
        md:flex
        items-center
        justify-end
        gap-48px
        w-full
      >
        <div
          v-for="title in cardTitles"
          :key="title.label"
          flex
          items-center
          gap-4px
        >
          <p
            text="12px md:14px"
            leading="16px md:24px"
            whitespace-nowrap
          >
            {{ title.label }}
          </p>
          <button
            v-if="title.togglable"
            type="button"
            :class="[title.toggled
              ? 'i-heroicons-solid-chevron-up'
              : 'i-heroicons-solid-chevron-down']"
            text="app-white 20px"
            @click="title.toggled = !title.toggled"
          />
        </div>
      </div>
      <div
        flex
        items-center
        gap-4px
        md:hidden
      >
        <p
          text="12px md:14px"
          leading="16px md:24px"
        >
          Sort by:
        </p>
        <p
          text="12px md:14px"
          leading="16px md:24px"
          font-700
        >
          Score
        </p>
        <button
          type="button"
          i-heroicons-solid-chevron-down
          text="app-white 20px"
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
        v-for="project in displayedProjects"
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
  </div>
</template>
