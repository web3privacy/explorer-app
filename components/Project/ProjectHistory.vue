<script lang="ts" setup>
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="HISTORY"
    badge-text="3/10"
  >
    <UnoIcon
      i-material-symbols-calendar-month
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.history?.time"
        title="Date of creation"
      >
        {{ formatDate(project.history!.time!) }}
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
