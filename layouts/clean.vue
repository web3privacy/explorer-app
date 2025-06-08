<script lang="ts" setup>
import { ref } from 'vue'

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
    flex
    flex-col
    min-h-100vh
    h-full
    w-full
  >
    <div
      app-container
      relative
    >
      <slot />
    </div>
    <Footer justify-self-end />
  </div>
</template>
