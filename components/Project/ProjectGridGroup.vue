<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  group: {
    title: string
    projects: ProjectShallow[]
  }
}>()

const { switcher } = storeToRefs(useData())

const groupCollapsed = ref(false)

const shownProjectsCount = ref(10)

const shownProjects = computed(() => props.group.projects.slice(0, shownProjectsCount.value))
</script>

<template>
  <div w-full>
    <div
      flex
      items-center
      gap-x-12px
      w-full
      mb="-8px lg:8px"
    >
      <h2
        text="app-white 16px lg:24px"
        font-700
        leading="24px lg:32px"
        whitespace-nowrap
      >
        {{ group.projects.length }} {{ group.title }}
      </h2>
      <div
        h-2px
        w-full
        bg-app-text-grey
      />
      <button
        type="button"
        :class="[groupCollapsed ? 'i-ic-baseline-arrow-drop-down' : 'i-ic-baseline-arrow-drop-up']"
        text="app-text-grey 24px"
        @click="groupCollapsed = !groupCollapsed"
      />
    </div>
    <ProjectGridGroupSort v-if="!groupCollapsed" />
    <div
      v-if="!groupCollapsed"
      grid
      :class="switcher ? 'grid-cols-1 lg:grid-cols-1' : 'xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'"
      gap-16px
      text-white
      w-full
      mt="-16px lg:0"
      mb-8px
    >
      <ClientOnly>
        <Card
          v-for="project in group.projects.slice(0, shownProjectsCount)"
          :key="project.id"
          :project="project"
        />

        <template #fallback>
          <CardSkeletor
            v-for="i in 6"
            :key="i"
          />
        </template>
      </ClientOnly>
    </div>
    <ClientOnly>
      <button
        v-if="group.projects.length > shownProjects.length && !groupCollapsed"
        type="button"
        text="12px lg:14px"
        leading="24px lg:32px"
        font-bold
        pt-16px
        pb-24px
        text-app-text-grey
        @click="shownProjectsCount += 15"
      >
        LOAD MORE
      </button>
    </ClientOnly>
  </div>
</template>
