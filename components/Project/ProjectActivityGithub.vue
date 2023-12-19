<script setup lang="ts">
defineProps<{
  activeDevs: number
  lastCommit: string
  stars: number
}>()
</script>

<template>
  <div relative grid grid-cols-2 border-2px gap-y-8px gap-x-32px p-24px lg:grid-cols-3>
    <h1 px-8px text-14px font-700 bg-black absolute top--10px left-16px>
      {{ 'GITHUB ACTIVITY' }}
    </h1>
    <div flex flex-col>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Active Developers' }}</span>
      <span text-14px font-700 leading-24px>{{ activeDevs }}</span>
    </div>
    <div flex flex-col>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Last commit' }}</span>
      <span text-14px font-700 leading-24px>{{ lastCommit }}</span>
    </div>
    <div flex gap-6px lg:flex-col lg:gap-0>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Github stars' }}</span>
      <div flex items-center gap-4px>
        <UnoIcon i-web-star text-16px />
        <span text-14px font-400 leading-24px>{{ stars }}</span>
      </div>
    </div>
  </div>
</template>
