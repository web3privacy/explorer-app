<script lang="ts" setup>
import type { Project, ProjectRating } from '~/types'

const props = defineProps<{
  project: Project
}>()

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const selectedMobileRating = ref<ProjectRating>()

function onSelectMobileRating(rating: ProjectRating) {
  selectedMobileRating.value = selectedMobileRating.value?.type === rating.type ? undefined : rating
}

const logo = props.project?.logos?.at(0)?.url
</script>

<template>
  <div
    flex
    flex-col
    gap-y-16px
    lg:flex-row
    items-center
    lg:gap-32px
  >
    <ClientOnly>
      <div
        max-w-200px
        max-h-200px
        shrink
        relative
      >
        <NuxtImg
          border="1px app-text-grey"
          :src="logo ?? '/no-image-1-1.svg'"
          class="bg-app-bg-grey object-cover h-full vertical-align[middle] block w-full h-[300px] "
        />
        <div flex items-center gap-4px absolute top-12px right-12px bg-app-danger text-12px leading-16px font-bold px-8px py-4px rounded-full v-if="project.sunset">
          <UnoIcon i-material-symbols-dangerous text-16px />
          SUNSET
          <p></p>
        </div>
      </div>
    </ClientOnly>
    <div
      grow
      w-full
    >
      <div
        flex
        flex-col
        items-center
        lg:items-start
        justify-between
        gap-y="lg:12px 24px"
        text-app-text-grey
        w-full
      >
        <div mt-4px>
          <NuxtLink
            :to="project.links?.web"
            target="_blank"
            flex
            items-center
            gap-12px
            hover:underline
            underline-offset-3
          >
            <h1
              text="24px sm:32px app-white"
              leading-32px
              font-700
            >
              {{ project.name }}
            </h1>
            <UnoIcon
              i-ic-twotone-open-in-new
              text="22px app-white"
            />
          </NuxtLink>
        </div>
        <div
          flex
          justify-center
          lg:grid
          grid-cols-10
          w-full
          items-center
          mt-4px
        >
          <h2
            hidden
            lg:block
          >
            Usecases:
          </h2>
          <p
            text-app-white
            col-span-9
          >
            Swap, Mixer
          </p>
        </div>
        <div
          grid
          grid-cols-2
          gap-y-12px
          lg:flex
          lg:flex-col
          order-3
          lg:order-2
          w-full
        >
          <div
            flex
            flex-col
            gap-4px
            lg:grid
            lg:grid-cols-10
            lg:items-center
            w-full
          >
            <h2>
              Categories:
            </h2>
            <p
              text-app-white
              col-span-9
            >
              Dapp, Network
            </p>
          </div>
          <div
            flex
            flex-col
            gap-4px
            lg:grid
            lg:grid-cols-10
            lg:items-center
            w-full
          >
            <h2>
              Ecosystems:
            </h2>
            <p
              text-app-white
              col-span-9
            >
              Ethereum, Secret Network
            </p>
          </div>
        </div>
        <div
          grid
          grid-cols-4
          w-full
          items-center
          order-2
          lg:order-3
        >
          <div
            flex
            items-center
            justify-between
            lg:justify-start
            lg:gap-24px
            col-span-3
          >
            <div
              v-for="rating of project.ratings"
              :key="rating.name"
              flex
              flex-col
              lg:flex-row
              gap-y-4px
              items-center
            >
              <p
                text="12px lg:16px"
                leading="16px lg:24px"
              >
                {{ rating.name }}:
              </p>
              <ProjectRating
                :rating="rating"
                :percentage="rating.points"
                :disable-popover="!isLargeScreen"
                compact
                :selected="rating.type === selectedMobileRating?.type && !isLargeScreen"
                @selected="onSelectMobileRating(rating)"
              />
            </div>
          </div>
          <div
            flex
            items-center
            justify-end
            w-full
            gap-16px
            mt--8px
            lg:mt-0
          >
            <h2
              hidden
              lg:block
            >
              Total Score:
            </h2>
            <div
              flex
              items-center
              justify-center
              border="2px app-white"
              text="16px lg:24px app-white"
              leading="24px md:32px"
              max-h-="32px md:40px"
              max-w="84px"
              w-full
              h-full
              font-700
              whitespace-nowrap
              py="2px lg:8px"
              lg:py-4px
            >
              {{ project.percentage }} %
            </div>
          </div>
          <div
            v-if="selectedMobileRating && !isLargeScreen"
            col-span-4
            flex
            items-center
            justify-center
            w-full
          >
            <ProjectRating
              :rating="selectedMobileRating"
              :percentage="selectedMobileRating.points"
              :disable-popover="!isLargeScreen"
              compact
              show-only-popover
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
