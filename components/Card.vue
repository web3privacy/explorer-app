<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

const props = defineProps<{
  project: ProjectShallow
}>()
const { switcher } = storeToRefs(useData())

const projectItems = ['Swap,Mixer', { label: 'Openess', rating: props.project.ratings.openess, type: 'openess' }, { label: 'Technology', rating: props.project.ratings.technology, type: 'technology' }, { label: 'Privacy', rating: props.project.ratings.privacy, type: 'privacy' }, 'Ecosystem', 'Links']
</script>

<template>
  <NuxtLink
    :to="`/project/${project.id}`"
    :class="switcher ? 'flex-row' : 'lg:flex-col'"
    flex
    w-full
    gap-16px
    hover:bg="#121212"
    transition-all
  >
    <div
      grid
      grid-cols="2 lg:10"
      w-full
    >

      <div
        col-span="1 lg:3"
        flex
        items-center
        gap="12px lg:16px"
        relative
        w-full
        h-full
        h="48px lg:64px"
        :class="switcher ? '' : 'lg:max-w-full! lg:w-full '"
      >
        <NuxtImg
          :src="project?.image || '/no-image-1-1.svg'"
          class="w-full h-auto"
          max-h="md:64px 48px"
          max-w="md:64px 48px"
          self-center
          z-10
          object-fit
          bg="#121212"
        />
        <div
          flex
          flex-col
          gap-y-4px
          lg:flex-row
          justify-center
        >
          <div
            w-fit
            flex
            items-center
            gap-8px
            @click.prevent="navigateTo(project.website, { external: true, open: { target: '_blank' } })"
          >
            <h1
              text="14px app-white"
              font-700
              line-clamp-1
              hover:underline
              underline-offset-3
              leading="20px lg:32px"
            >
              {{ project.title1 }}
            </h1>
          </div>
          <p
            text-12px
            leading-16px
            lg:hidden
          >
            Usecases
          </p>
        </div>
      </div>
      <div
        v-for="(projectItem, index) of projectItems"
        :key="projectItem.toString()"
        hidden
        lg:flex
        items-center
        justify-start
        text-14px
        leading-24px
      >
        <p
          v-if="typeof projectItem === 'string'"
          text-app-text-grey
        >
          {{ projectItem }}
        </p>
        <ProjectRating
          v-else
          :score="index"
          :rating="projectItem.rating"
          :type="projectItem.type"
        />
      </div>
      <div
        flex
        items-center
        justify-end
        w-full
        gap-16px
      >
        <UnoIcon
          block
          lg:hidden
          i-iconoir-internet
          text="24px"
        />
        <div
          flex
          items-center
          justify-center
          border="2px app-white"
          text="14px md:18px"
          leading="24px md:32px"
          max-h-="28px md:32px"
          max-w="48px md:56px"
          w-full
          font-700
          whitespace-nowrap
        >
          {{ project.percentage }} %
        </div>
      </div>
    </div>

  </NuxtLink>
</template>
