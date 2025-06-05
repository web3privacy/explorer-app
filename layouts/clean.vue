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
  <div
    ref="swipeEl"
    flex
    flex-col
    min-h-100vh
    h-full
    w-full
  >
    <Navigation />
    <div
      app-container
      mt-32px
      relative
    >
      <slot />
    </div>
    <Footer justify-self-end />
  </div>
</template>
