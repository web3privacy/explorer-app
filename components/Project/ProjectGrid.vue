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
</script>

<template>
  <div
    flex
    flex-col
    items-start
  >
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
