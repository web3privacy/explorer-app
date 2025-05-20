<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// const githubProjectUrl = computed(() => {
//   return `https://github.com/web3privacy/explorer-data/blob/main/src/projects/${route.params.id}/index.yaml`
// })
</script>

<template>
  <div
    app-container
    w-full
    flex
    items-center
    justify-between
    md:bg-transparent
    px-8px
  >
    <NavigationButton
      w-230px
      @click="$router.push('/')"
    >
      <span
        block
        md:hidden
      >{{ "BACK" }}</span>
      <span
        hidden
        whitespace-nowrap
        md:block
      >{{ "BACK TO LIST" }}</span>
    </NavigationButton>
    <div
      flex
      gap-16px
    >
      <EditButton
        px-16px
        py-8px
        hover="cursor-pointer bg-white text-black"
        @click="$router.push('/project/' + route.params.id + '/edit')"
      >
        <span
          text-20px
          whitespace-nowrap
          font-700
          leading-24px
          hidden
          md:block
        >{{ "EDIT RESEARCH" }}</span>
        <span
          text-20px
          whitespace-nowrap
          font-700
          leading-24px
          block
          md:hidden
        >{{ "EDIT" }}</span>
      </EditButton>
      <!-- <ShareButton>
        <span text-16px font-400 hidden md:block>{{ 'SHARE' }}</span>
      </ShareButton> -->
    </div>
  </div>
</template>
