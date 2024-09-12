<script lang="ts" setup>
import type { OpenessRating, TechnologyRating, PrivacyRating } from '~/types'

// Define props for score
const props = defineProps<{
  rating: TechnologyRating | OpenessRating | PrivacyRating
  type: string
  score: number
  compact?: boolean
}>()

// Determine the color by score
const colorByScore = props.score <= 1
  ? 'bg-app-bg-rating-red'
  : props.score === 2
    ? 'bg-app-bg-rating-orange'
    : props.score === 3
      ? 'bg-app-bg-rating-yellow'
      : 'bg-app-bg-rating-green'

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

function currentRating<T>(): T {
  if (props.type === 'privacy')
    return props.rating as T
  if (props.type === 'technology')
    return props.rating as T
  return props.rating as T
}

function items(): { label: string, condition: boolean, positive: string, negative: string, link?: string }[] {
  if (props.type === 'privacy')
    return [
      { label: 'KYC', condition: !!currentRating<PrivacyRating>().no_kyc, positive: 'No', negative: 'Yes' },
      { label: 'Compliance', condition: !!currentRating<PrivacyRating>().no_compliance, positive: 'No', negative: 'OFAC' },
      { label: 'Privacy policy', condition: !!currentRating<PrivacyRating>().policy, positive: 'Link', negative: 'Not available', link: currentRating<PrivacyRating>().policy },
      { label: 'Default privacy', condition: !!currentRating<PrivacyRating>().default_privacy, positive: 'Yes', negative: 'No' },
    ]
  if (props.type === 'technology')
    return [
      { label: 'Mainnet', condition: !!currentRating<TechnologyRating>().mainnet, positive: 'Yes', negative: 'No' },
      { label: 'Opensource', condition: !!currentRating<TechnologyRating>().opensource, positive: 'Yes', negative: 'No' },
      { label: 'Asset custody', condition: !!currentRating<TechnologyRating>().assets, positive: 'None', negative: 'Custodial' },
      { label: 'Upgradability', condition: !!currentRating<TechnologyRating>().no_pgradability, positive: 'Disabled', negative: 'Enabled' },
      { label: 'Audits', condition: currentRating<TechnologyRating>().audits >= 1, positive: `${currentRating<TechnologyRating>().audits} ${currentRating<TechnologyRating>().audits > 1 ? 'Audits' : 'Audit'}`, negative: 'None' },
    ]
  return [
    { label: 'Documentation', condition: !!currentRating<OpenessRating>().documentation, positive: 'Link', negative: 'Not available', link: currentRating<OpenessRating>().documentation },
    { label: 'Github', condition: !!currentRating<OpenessRating>().github, positive: 'Link', negative: 'Not available', link: currentRating<OpenessRating>().github },
    { label: 'Socials', condition: !!currentRating<OpenessRating>().socials, positive: 'Link', negative: 'Not available', link: currentRating<OpenessRating>().socials },
    { label: 'Whitepaper', condition: !!currentRating<OpenessRating>().whitepaper, positive: 'Link', negative: 'Not available', link: currentRating<OpenessRating>().whitepaper },
    { label: 'Team', condition: currentRating<OpenessRating>().team >= 1, positive: `${currentRating<OpenessRating>().team} ${currentRating<OpenessRating>().team > 1 ? 'Members' : 'Member'}`, negative: 'Anonymous' },
    { label: 'Funding', condition: currentRating<OpenessRating>().funding >= 1, positive: `${currentRating<OpenessRating>().funding} ${currentRating<OpenessRating>().team > 1 ? 'Investments' : 'Investment'}`, negative: 'Not available' },
  ]
}
</script>

<template>
  <div class="relative">
    <!-- Main div that shows rating and triggers the popover on hover -->
    <div
      flex
      items-center
      gap-4px
      p-12px
      hover:bg-app-bg-rating-hover
      hover:rounded-8px
      @mouseenter="showPopover"
      @mouseleave="hidePopover"
    >
      <!-- Render the score points -->
      <div
        v-for="point of 5"
        :key="point"
        w="10px lg:12px"
        h="10px lg:12px"
        rounded-2px
        :class="[point <= score ? colorByScore : 'bg-app-bg-rating-default', compact ? 'h-8px lg:h-10px w-8px lg:w-10px' : 'w-10px lg:w-12px h-10px lg:h-12px']"
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
          v-for="item in items()"
          :key="item.label"
          flex
          justify-between
          items-center
          text-12px
          font-700
          leading-20px
          :class="{ 'text-app-text-rating-negative': !item.condition }"
        >
          <div
            flex
            items-center
            gap-6px
          >
            <div
              :class="[item.condition ? 'i-ic-sharp-thumb-up' : 'i-ic-sharp-thumb-down']"
              text-20px
              mt--4px
            />
            {{ item.label }}
          </div>
          <NuxtLink
            v-if="item.link"
            :to="item.link"
            target="_blank"
            external
            underline
            @click.stop
          >
            Link
          </NuxtLink>
          <div v-else>
            {{ item.condition ? item.positive : item.negative }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
