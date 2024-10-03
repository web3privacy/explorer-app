<script lang="ts" setup>
import type { ProjectRating } from '~/types'

// Define props for score
const props = defineProps<{
  rating: ProjectRating
  percentage: number
  compact?: boolean
  disablePopover?: boolean
  showOnlyPopover?: boolean
  selected?: boolean
}>()

const emits = defineEmits(['selected'])

const colors = [
  '#EA171D', // 1-10%
  '#FB2D00', // 11-20%
  '#FD6515', // 21-30%
  '#FD941A', // 31-40%
  '#FECD0A', // 41-50%
  '#FFD806', // 51-60%
  '#D2EF1F', // 61-70%
  '#95DF1C', // 71-80%
  '#42FF00', // 81-90%
  '#42FF00', // 91-100%
]

const backgroundColorByScore = computed(() => {
  if (props.percentage === 100)
    return '#42FF00'
  if (props.percentage === 0)
    return '#494949'
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
  <div
    class="relative"
    :class="{ 'w-full': showOnlyPopover }"
  >
    <!-- Main div that shows rating and triggers the popover on hover -->
    <div
      v-if="!showOnlyPopover"
      flex
      items-center
      p-12px
      gap-4px
      hover:bg-app-bg-rating-hover
      :class="{ 'bg-app-bg-rating-hover rounded-8px': selected }"
      hover:rounded-8px
      cursor-pointer
      @mouseenter="showPopover"
      @mouseleave="hidePopover"
      @click.prevent=" emits('selected')"
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
      v-if="!showOnlyPopover"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="(isPopoverVisible && !disablePopover)"
        class="absolute mt-2 p-2 bg-app-bg-rating-hover w-240px shadow-lg rounded"
        z-100
        left="-250% lg:50%"
        flex
        flex-col
        gap-14px
        px-16px
        py-10px
        @mouseenter="showPopover"
        @mouseleave="hidePopover"
      >
        <ProjectRatingInfo :items="rating.items" />
      </div>
    </transition>
    <ProjectRatingInfo
      v-if="showOnlyPopover"
      :items="rating.items"
      :compact="false"
    />
  </div>
</template>
