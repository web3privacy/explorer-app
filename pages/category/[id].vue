<script lang="ts" setup>
const dataStore = useData()
const { selectedCategoryId, categories, filteredProjects } = storeToRefs(dataStore)

const route = useRoute()

onMounted(() => {
  if (route.params.id)
    selectedCategoryId.value = route.params.id as string
})

const group = [{ title: categories.value.find(c => c.id === selectedCategoryId.value)!.name, projects: filteredProjects.value }]
</script>

<template>
  <ProjectGrid :projects="group" />
</template>
