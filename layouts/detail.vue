<script lang="ts" setup>
const { showBar } = storeToRefs(useNavigation())
const swipeEl = ref()
const { y } = useWindowScroll()

watch(y, (newY, oldY) => {
  if (newY > oldY && newY > 32)
    showBar.value = false
  else
    showBar.value = true
})
</script>

<template>
  <div
    ref="swipeEl"
    h-full
    w-full
  >
    <Navigation />
    <div
      max-w-1160px
      w-full
      mx-auto
    >
      <slot />
    </div>
  </div>
</template>
