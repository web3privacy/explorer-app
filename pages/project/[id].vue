<script lang="ts" setup>
import type { Project } from '~/types'

definePageMeta({
  layout: 'detail',
})

const route = useRoute()
const dataStore = useData()
const { getProjectById } = dataStore
const { projects } = storeToRefs(dataStore)
const project = ref<Project>()

await until(projects).toMatch(p => p?.length > 0)
project.value = getProjectById<Project>(route.params.id as string)
if (!project.value) {
  throw createError({
    statusCode: 404,
    message: 'Project not found',
    fatal: true,
  })
}
useHead({
  title: project.value.name,
})
useSeoMeta({
  ogTitle: project.value.name,
  ogDescription: project.value.description,
  ogImage: project.value?.logos?.at(0)?.url ?? '',
})
</script>

<template>
  <div v-if="project">
    <div app-container px-16px>
      <div
        flex
        flex-col
        gap-48px
        mt-54px
      >
        <div>
          <div>
            <ProjectHeading :project="project" />
            <ProjectOpeness :project="project" />
            <ProjectTechnology :project="project" />
            <ProjectPrivacy :project="project" />
            <ProjectSecurity :project="project" />
            <ProjectHistory :project="project" />
            <!-- <ProjectActivity :project="project" />
            <ProjectMarket /> -->
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
