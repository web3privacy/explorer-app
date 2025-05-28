<template>
  <div>
    <ProjectGrid :projects="[{ title: 'Ethereum Projects', projects: ethereumProjects }]" />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/ethereum',
  name: 'ethereum',
  alias: ['/ethereum'],
})

const dataStore = useData()
const { selectedEcosystemId } = storeToRefs(dataStore)

// Set Ethereum as the selected ecosystem
selectedEcosystemId.value = 'ethereum'

// Use the store's filtered projects
const ethereumProjects = computed(() => dataStore.filteredProjects)
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
