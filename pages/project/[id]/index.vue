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

const isOpen = ref(false)

onMounted(() => {
  if (route.query.status === 'success')
    isOpen.value = true
})
</script>

<template>
  <div v-if="project">
    <Dialog
      v-model="isOpen"
      heading="Pull Request Submitted for Approval"
      desc="Your pull request has been submitted! It will need to be manually reviewed and approved by a team member before merging. You can track its status on GitHub."
      cta="View on GitHub"
      :to="route.query.pr as string"
    />
    <div
      app-container
    >
      <div
        flex
        flex-col
        gap-48px
        mt-32px
      >
        <div>
          <div>
            <ProjectHeading :project="project" />
            <ProjectOpeness :project="project" />
            <ProjectTechnology :project="project" />
            <ProjectPrivacy :project="project" />
            <ProjectSecurity :project="project" />
            <ProjectHistory
              v-if="project.history"
              :project="project"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
