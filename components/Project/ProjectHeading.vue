<script lang="ts" setup>
import type { Project, ProjectRating } from '~/types'

const props = defineProps<{
  project: Project
}>()

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const { usecases, ecosystems, categories } = storeToRefs(useData())
const selectedMobileRating = ref<ProjectRating>()

function onSelectMobileRating(rating: ProjectRating) {
  selectedMobileRating.value = selectedMobileRating.value?.type === rating.type ? undefined : rating
}

const projectCategories = computed(() => {
  return categories.value.filter(cat => props.project.categories.includes(cat.id)).map(cat => cat.name).join(', ')
})
const projectUsecases = computed(() => {
  return usecases.value.filter(u => props.project.usecases?.includes(u.id)).map(u => u.name).join(', ')
})
const projectEcosystems = computed(() => {
  return ecosystems.value.filter(e => props.project.ecosystem?.includes(e.id)).map(e => e.name).join(', ')
})

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
        w-full
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
        <div
          v-if="project.sunset"
          flex
          items-center
          gap-4px
          absolute
          top-12px
          right-12px
          bg-app-danger
          text-12px
          leading-16px
          font-bold
          px-8px
          py-4px
          rounded-full
        >
          <UnoIcon
            i-material-symbols-dangerous
            text-16px
          />
          SUNSET
          <p />
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
            {{ projectUsecases }}
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
              {{ projectCategories }}
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
              {{ projectEcosystems }}
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
                :percentage="rating.percentagePoints"
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
              :percentage="selectedMobileRating.percentagePoints"
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
