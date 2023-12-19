<script lang="ts" setup>
const { showBar } = storeToRefs(useNavigaiton())
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
  <div ref="swipeEl" h-full w-full>
    <Navigation />
    <slot />
  </div>
</template>
