<script lang="ts" setup>
const dataStore = useData()
const { selectedCategoryId, filteredProjects } = storeToRefs(dataStore)

const route = useRoute()

onMounted(() => {
  if (route.params.id)
    selectedCategoryId.value = route.params.id as string
})
</script>

<template>
  <ProjectGrid :projects="filteredProjects" />
</template>
