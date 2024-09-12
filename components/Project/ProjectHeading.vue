<script lang="ts" setup>
import type { Project, ProjectIndexable } from '~/types'

const props = defineProps<{
  project: Project
}>()

const availableSupport = computed(() => {
  const filteredKeys = ['forum', 'discord', 'twitter', 'lens', 'farcaster', 'telegram']
  if (typeof props.project.links === 'object' && (props.project.links !== null || props.project.links !== undefined))
    return Object.keys(props.project.links).filter(key => filteredKeys.includes(key)).length

  return 0
})

/**
 * From data points
  - product readiness
  - docs (yes/no)
  - github (yes/no)
  - team: anon / public
  - audit: yes / no
 */
const calculateScore = computed(() => {
  const criterias: { value: keyof ProjectIndexable, key: keyof ProjectIndexable | '' }[] = [
    { value: 'product_readiness', key: '' },
    { value: 'github', key: 'links' },
    { value: 'docs', key: 'links' },
    { value: 'team', key: '' },
    { value: 'audits', key: '' },
  ]

  let matched = 0
  for (let i = 0; i < criterias.length; i++) {
    let value
    // value = ((criterias[i].key ?? props.project[criterias[i].value as keyof typeof props.project]) ?? null === null) ? null : (props.project as ProjectIndexable)[criterias[i].key][criterias[i].value]

    const indexableProject = props.project as ProjectIndexable
    if (criterias[i].key !== '')
      value = (indexableProject[criterias[i].key] as any)?.[criterias[i].value]
    else
      value = indexableProject?.[criterias[i].value]

    // console.log(props.project?.links?.github);
    // console.log(Object.keys(props.indexableProject["team"]).length);
    if (value === null || value === undefined)
      continue

    if (fulfilled(value))
      matched++
  }

  return 100 / criterias.length * matched
})

function fulfilled(value: any): boolean {
  const type = typeof value
  switch (type) {
    case 'string':
      if (value !== '')
        return true
      break
    case 'object':
      if (Object.keys(value!).length > 0)
        return true
      break
    default:
      return false
  }
  return false
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
    <NuxtImg
      max-w-200px
      max-h-200px
      shrink
      border="1px app-text-grey"
      :src="logo ?? '/no-image-1-1.svg'"
      class="bg-app-bg-grey object-cover h-full vertical-align[middle] block w-full h-[300px]"
    />
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
              flex
              flex-col
              lg:flex-row
              items-center
            >
              <p text="12px lg:16px" leading="16px lg:24px">Openess:</p>
              <ProjectRating
                :rating="project.ratings.openess"
                type="openess"
                :score="1"
                compact
              />
            </div>
            <div
              flex
              flex-col
              lg:flex-row
              items-center
            >
              <p text="12px lg:16px" leading="16px lg:24px">Technology:</p>
              <ProjectRating
                :rating="project.ratings.technology"
                type="technology"
                :score="2"
                compact
              />
            </div>
            <div
              flex
              flex-col
              lg:flex-row
              items-center
            >
              <p text="12px lg:16px" leading="16px lg:24px">Privacy:</p>
              <ProjectRating
                :rating="project.ratings.privacy"
                type="privacy"
                :score="3"
                compact
              />
            </div>
          </div>
          <div
            flex
            items-center
            justify-end
            w-full
            gap-16px
            mt--8px lg:mt-0
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
              {{ calculateScore }} %
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
