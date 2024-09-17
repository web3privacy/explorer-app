<script lang="ts" setup>
import type { ProjectRating } from '~/types'

// Define props for score
const props = defineProps<{
  rating: ProjectRating
  percentage: number
  compact?: boolean
}>()

const colors = [
  '#ff0000', // 0-10%
  '#ff4500', // 11-20%
  '#ff8c00', // 21-30%
  '#ffd700', // 31-40%
  '#adff2f', // 41-50%
  '#7fff00', // 51-60%
  '#00ff00', // 61-70%
  '#32cd32', // 71-80%
  '#00fa9a', // 81-90%
  '#00ffff', // 91-100%
]

const backgroundColorByScore = computed(() => {
  const normalizedPercentage = Math.min(Math.max(props.percentage, 0), 100)
  const colorIndex = Math.floor(normalizedPercentage / 10)
  return colors[colorIndex]
})

const isPopoverVisible = ref(false)

let hideTimeout: ReturnType<typeof setTimeout> | null = null
const showPopover = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  isPopoverVisible.value = true
}

const hidePopover = () => {
  hideTimeout = setTimeout(() => {
    isPopoverVisible.value = false
  }, 100) // Delay of 200ms before hiding
}
</script>

<template>
  <div class="relative">
    <!-- Main div that shows rating and triggers the popover on hover -->
    <div
      flex
      items-center
      p-12px
      gap-4px
      hover:bg-app-bg-rating-hover
      hover:rounded-8px
      @mouseenter="showPopover"
      @mouseleave="hidePopover"
    >
      <div
        v-for="point of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="point"
        :style="`background-color: ${percentage >= point * 10 ? backgroundColorByScore : '#494949'}`"
        :class="[compact ? 'h-8px lg:h-10px w-4px lg:w-5px' : 'w-5px lg:w-6px h-10px lg:h-12px', point % 2 === 0 ? 'rounded-l-2px' : 'rounded-r-2px ml--4px', 'bg-app-bg-rating-default']"
      />
    </div>

    <!-- Popover panel that appears on hover -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isPopoverVisible"
        class="absolute mt-2 p-2 bg-app-bg-rating-hover w-240px shadow-lg rounded"
        z-100
        style="left: 50%; transform: translateX(-50%);"
        flex
        flex-col
        gap-14px
        px-16px
        py-10px
        @mouseenter="showPopover"
        @mouseleave="hidePopover"
      >
        <div
          v-for="item in rating.items"
          :key="item.label"
          flex
          justify-between
          items-center
          text-12px
          font-700
          leading-20px
          :class="{ 'text-app-text-rating-negative': !item.isValid }"
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
            v-if="item.positive === 'Link'"
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
    </transition>
  </div>
</template>
