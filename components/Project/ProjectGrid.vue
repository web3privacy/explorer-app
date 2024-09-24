<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  projects: { title: string, projects: ProjectShallow[] }[]
}>()

const totalProjectsCount = props.projects.map(g => g.projects.length).reduce((a, b) => a + b, 0)
</script>

<template>
  <div
    flex
    flex-col
    items-start
  >
    <ProjectGridGroup
      v-for="group in projects"
      :key="group.title"
      :group="group"
    />
    <div v-if="totalProjectsCount === 0">
      <h3>No Projects found...</h3>
    </div>
  </div>
</template>
