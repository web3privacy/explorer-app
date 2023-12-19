<script setup lang="ts">
defineProps<{
  followers: number
  posts: string
  retweets: number
}>()
</script>

<template>
  <div relative grid grid-cols-2 border-2px gap-y-8px gap-x-32px p-24px lg-grid-cols-3>
    <h1 px-8px text-14px font-700 bg-black absolute top--10px left-16px>
      {{ 'TWITTER ACTIVITY' }}
    </h1>
    <div flex flex-col>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Followers #' }}</span>
      <span text-14px font-700 leading-24px>{{ followers }}</span>
    </div>
    <div flex flex-col>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Posts' }}</span>
      <span text-14px font-700 leading-24px>{{ posts }}</span>
    </div>
    <div flex gap-6px lg:flex-col lg:gap-0>
      <span text-14px font-400 text-app-text-grey leading-24px>{{ 'Retweets' }}</span>
      <div flex items-center gap-4px>
        <span text-14px font-400 leading-24px>{{ retweets }}x</span>
      </div>
    </div>
  </div>
</template>
