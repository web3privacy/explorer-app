<script lang="ts" setup>
import type { ProjectRating, ProjectShallow } from '~/types'

const props = defineProps<{
  project: ProjectShallow
}>()
const { switcher, ecosystems } = storeToRefs(useData())

const ratings: { label: string, type: string, rating: ProjectRating }[] = (props.project.ratings || []).map(rating => ({ label: rating.name, type: 'rating', rating: rating }))
const ecosystem: { label: string[], type: string } = { label: ecosystems.value.filter(e => (props.project.ecosystem || []).includes(e.id)).map(e => e.icon!), type: 'ecosystem' }
const projectItems: { label: string | string[], type: string, rating?: ProjectRating }[] = [{ label: props.project.usecases || [], type: 'array' }, ...ratings, ecosystem, { label: [props.project.website || '', props.project.github || '', props.project.twitter || ''], type: 'links' }]
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
        col-span="1 lg:2"
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
            {{ project.usecases?.join(', ') }}
          </p>
        </div>
      </div>
      <ClientOnly>
        <div
          v-for="(projectItem, index) of projectItems"
          :key="projectItem.label.toString()"
          hidden
          lg:flex
          items-center
          text-14px
          leading-24px
          :class="{ 'col-span-1 lg:col-span-2': index === 0 }"
        >
          <p
            v-if="projectItem.type === 'array'"
            text-app-text-grey
          >
            {{ (projectItem.label as string[] || []).join(', ') }}
          </p>
          <div
            v-if="projectItem.type === 'links'"
            flex
            items-center
            justify-start
            gap-16px
          >
            <NuxtLink
              v-if="projectItem.label[1]"
              :to="projectItem.label[1]"
              external
              target="_blank"
            >
              <UnoIcon
                i-ic-baseline-language
                text="24px app-text-grey"
              />
            </NuxtLink>
            <NuxtLink
              v-if="projectItem.label[2]"
              :to="projectItem.label[2]"
              external
              target="_blank"
            >
              <UnoIcon
                i-mdi-github
                text="24px app-text-grey"
                text-27px
              />
            </NuxtLink>
            <NuxtLink
              v-if="projectItem.label[0]"
              :to="projectItem.label[0]"
              external
              target="_blank"
            >
              <UnoIcon
                i-bi-twitter-x
                text="24px app-text-grey"
              />
            </NuxtLink>
          </div>
          <div
            v-if="projectItem.type === 'ecosystem'"
            flex
            items-center
            justify-start
            gap-2px
          >
            <NuxtImg
              v-for="ecosystem of projectItem.label"
              :key="ecosystem"
              :src="ecosystem"
              w-24px
              h-24px
              rounded-full
            />
          </div>
          <ProjectRating
            v-if="projectItem.type! === 'rating' && projectItem.rating"
            :percentage="projectItem.rating.points"
            :rating="projectItem.rating"
            :type="projectItem.rating.type"
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
      </ClientOnly>
    </div>

  </NuxtLink>
</template>
