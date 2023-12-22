<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Web3-Privacy`
      : 'Web3-Privacy'
  },
})
const { fetchData } = useData()

await fetchData()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  overscroll-behavior: none;
}
body {
  background-color: #000;
  color: white;
}
#__nuxt {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  font-family: 'Archivo';
}
</style>
