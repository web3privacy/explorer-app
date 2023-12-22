<script lang="ts" setup>
useHead({
  title: 'Dashboard',
})
useSeoMeta({
  ogTitle: 'Dashboard',
  ogDescription: 'There are challenges in finding crucial technical details and comparing various privacy-focused projects.',
  ogImage: '/web3privacy_eye.webp',
})
const { filteredProjects } = storeToRefs(useData())
</script>

<template>
  <ProjectGrid :projects="filteredProjects" />
</template>
