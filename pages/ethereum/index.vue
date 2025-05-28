<template>
  <div>
    <ProjectGrid :projects="groupedProjects" />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/ethereum',
  name: 'ethereum',
  alias: ['/ethereum'],
})

const dataStore = useData()
const { selectedEcosystemId, groupedProjectsPerCategory } = storeToRefs(dataStore)

// Set Ethereum as the selected ecosystem
selectedEcosystemId.value = 'ethereum'

// Use the store's grouped projects
const groupedProjects = computed(() => groupedProjectsPerCategory.value)
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
