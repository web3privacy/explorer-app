<script setup lang="ts">
defineProps<{
  auditName: string
  auditUrl?: string
  date?: string
}>()
</script>

<template>
  <div
    flex
    justify-between
    lg:grid
    lg:grid-cols-2
    rounded-full
    py-12px
    px-16px
    bg-app-bg-audits-card
    hover="brightness-120%"
  >
    <div
      grid
      grid-cols-3
      w-full
    >
      <h2
        text="14px lg:16px"
        leading-20px
        font-700
        col-span="3 lg:2"
      >
        {{ auditName }}
      </h2>
      <h2
        text-14px
        leading-20px
        hidden
        lg:block
      >
        Overview of smart contracts
      </h2>
    </div>
    <div
      flex
      items-center
      justify-end
      gap="16px lg:80px"
      whitespace-nowrap
    >
      <h2
        text-14px
        leading-20px
      >
        {{ date ? formatDate(date) : 'N/A' }}
      </h2>
      <NuxtLink
        flex
        items-center
        gap-4px
        :to="auditUrl"
        external
        target="_blank"
        text-14px
        text-app-text-grey
        leading-20px
        hover:underline
      ><p
        hidden
        lg:block
      >
        More info
      </p> <UnoIcon
        i-ic-twotone-open-in-new
        text-22px
      /></NuxtLink>
    </div>
  </div>
</template>
