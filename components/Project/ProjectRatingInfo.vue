<script lang="ts" setup>
import type { ProjectRatingItem } from '~/types'

withDefaults(defineProps<{ items: ProjectRatingItem[], compact?: boolean }>(), {
  compact: true,
})
</script>

<template>
  <div
    flex
    flex-col
    gap-8px
    :class="{ 'mt-16px': !compact }"
  >
    <div
      v-for="item in items"
      :key="item.label"
      flex
      justify-between
      items-center
      text-12px
      font-700
      leading-20px
      w-full
      :class="[item.isValid ? 'text-app-white': 'text-app-text-rating-negative']"
    >
      <div
        flex
        items-center
        gap-6px
      >
        <div
          :class="[item.isValid ? 'i-ic-sharp-thumb-up' : 'i-ic-sharp-thumb-down']"
          text-20px
          mt--4px
        />
        {{ item.label }}
      </div>
      <NuxtLink
        v-if="item.isValid && item.positive === 'Link'"
        :to="item.value"
        target="_blank"
        external
        underline
        @click.stop
      >
        {{ item.positive }}
      </NuxtLink>
      <div v-else>
        {{ item.isValid ? item.positive : item.negative }}
      </div>
    </div>
  </div>
</template>
