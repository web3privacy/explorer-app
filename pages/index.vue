<script lang="ts" setup>
useHead({
  title: 'Dashboard',
})
useSeoMeta({
  ogTitle: 'Dashboard',
  ogDescription: 'There are challenges in finding crucial technical details and comparing various privacy-focused projects.',
  ogImage: '/web3privacy_eye.webp',
})
const { groupedProjectsPerCategory } = storeToRefs(useData())
</script>

<template>
  <div>
    <ProjectGrid :projects="groupedProjectsPerCategory" />
  </div>
</template>
