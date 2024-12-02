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

const isOpen = ref(false)
const route = useRoute()

onMounted(() => {
  if (route.query.status === 'success')
    isOpen.value = true
})
</script>

<template>
  <div>
    <Dialog
      v-model="isOpen"
      heading="Pull Request Submitted for Approval"
      desc="Your pull request has been submitted! It will need to be manually reviewed and approved by a team member before merging. You can track its status on GitHub."
      cta="View on GitHub"
      :to="route.query.pr as string"
    />
    <ProjectGrid :projects="groupedProjectsPerCategory" />
  </div>
</template>
