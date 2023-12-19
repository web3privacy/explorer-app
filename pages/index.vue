<script lang="ts" setup>
const { filteredProjects } = storeToRefs(useData())
</script>

<template>
  <ProjectGrid :projects="filteredProjects" />
</template>
