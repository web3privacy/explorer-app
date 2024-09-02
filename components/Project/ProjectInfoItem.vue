<script lang="ts" setup>
defineProps<{
  header?: string
  title?: string
  link?: string
  textSize?: string
  bold?: boolean
  color?: string
  opacity?: number
  tooltip?: string
  tooltipLink?: string
  checkUndefined?: any | undefined | null
}>()

const heading = ref()
const tooltipDiv = ref()
const tooltipLeftOffset = computed(() => (tooltipDiv.value?.offsetWidth / 2) - (heading.value?.offsetWidth / 2))
const mouseOverTooltip = ref(false)
const showTooltip = ref(false)

function headingMouseOut() {
  setTimeout(() => mouseOverTooltip.value ? showTooltip.value = true : showTooltip.value = false, 500)
}
function tooltipMouseOver() {
  mouseOverTooltip.value = true
  showTooltip.value = true
}

function tooltipMouseOut() {
  mouseOverTooltip.value = false
  showTooltip.value = false
}
</script>

<template>
  <div
    flex
    items-start
    relative
  >
    <div
      h-full
      flex
      items-center
      text-32px
      gap-12px
    >
      <slot name="prefix" />
      <div />
    </div>
    <div
      class="peer"
      flex
      flex-col
      justify-center
      w-full
    >
      <h3
        v-if="title"
        ref="heading"
        w-fit
        text="14px sm:16px app-text-grey"
        leading-24px
        :class="[tooltip ? 'cursor-pointer underline underline-offset-5 decoration-dotted  hover:decoration-solid hover:text-app-white' : '']"
        @mouseover="showTooltip = true"
        @mouseout="headingMouseOut()"
      >
        {{ title }}
      </h3>
      <template v-if="checkUndefined === undefined || checkUndefined === null">
        <span
          opacity-50
          leading-24px
          font-700
          text-14px
          :class="`sm:text-${textSize ?? '16px'}`"
        >{{ 'N/A' }}</span>
      </template>
      <template v-else>
        <template v-if="link">
          <div

            flex
            gap-6px
            items-center
            justify-start
            hover:underline
            hover:text-white
            text-14px
            :color="color ?? '#FFF'"
            class="hoverEl"
            :class="`sm:text-${textSize ?? '16px'} font-${bold ? '700' : '400'} opacity-${opacity}`"
            leading-24px
            @click.prevent="navigateTo(link, { external: true, open: { target: '_blank' } })"
          >
            <slot />
            <UnoIcon
              i-web-openinnew
              text-16px
              text-app-text-grey
              class="customHover"
            />
          </div>
        </template>
        <div
          v-else
          :color="color ?? '#FFF'"
          text-14px
          :class="`sm:text-${textSize ?? '16px'} font-${bold ? '700' : '400'} opacity-${opacity}`"
          leading-24px
        >
          <slot />
        </div>
      </template>
    </div>
    <div
      v-if="tooltip"
      ref="tooltipDiv"
      :style="{ left: `-${tooltipLeftOffset}px` }"
      :class="[showTooltip ? 'visible' : 'invisible']"
      class="flex flex-col max-w-232px top-40px absolute z-100 inline-block px-3 py-2 text-14px font-400 text-app-black bg-app-white"
      @mouseover="tooltipMouseOver()"
      @mouseout="tooltipMouseOut()"
    >
      {{ tooltip }}
      <NuxtLink
        v-if="tooltipLink"
        mt-12px
        text-14px
        font-400
        leading-20px
        underline
        underline-offset-2
        :to="tooltipLink"
      >
        {{ 'Learn More' }}
      </NuxtLink>
      <div
        w-16px
        h-16px
        absolute
        bg-white
        class="top--8px left-50% translate-x--50% rotate-45 z-99"
      />
    </div>
  </div>
</template>

<style scoped>
.hoverEl:hover .customHover {
  color: #FFF;
}
</style>
