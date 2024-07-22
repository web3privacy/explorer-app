<script lang="ts" setup>
import type { Project } from '~/types'

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
const calculateScore: number = computed(() => {
  const criterias: { value: string; key?: string }[] = [
    { value: 'product_readiness' },
    { value: 'github', key: 'links' },
    { value: 'docs', key: 'links' },
    { value: 'team' },
    { value: 'audits' },
  ]

  let matched = 0
  for (let i = 0; i < criterias.length; i++) {
    let value
    if (criterias[i].key) {
      if (props.project[criterias[i].key] === null || props.project[criterias[i].key] === undefined)
        continue
      value = props.project[criterias[i].key][criterias[i].value]
    }
    else {
      if (props.project[criterias[i].value] === null || props.project[criterias[i].value] === undefined)
        continue
      value = props.project[criterias[i].value]
    }
    // console.log(value);
    // console.log(Object.keys(props.project["team"]).length);

    if (fulfilled(value))
      matched++
      // console.log('matched', matched);
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
      if (Object.keys(value).length > 0)
        return true
      break

    default:
      return false
  }
}

const logo = props.project?.logos?.at(0)?.url
</script>

<template>
  <div lg:flex lg:gap-32px>
    <NuxtImg
      lg:max-w-320px lg:max-h-320px shrink :src="logo ?? '/no-image-1-1.svg'"
      class="bg-app-bg-grey object-cover max-w-full h-full vertical-align[middle] block border-0 w-full h-[300px]"
    />
    <div grow>
      <div flex flex-col justify-between gap-32px lg:flex-row lg:items-center>
        <div mt-24px>
          <NuxtLink
            :to="project.links?.web" target="_blank" flex items-center gap-12px hover:underline
            underline-offset-3
          >
            <h1 text="24px sm:32px app-white" leading-32px font-700>
              {{ project.name }}
            </h1>
            <UnoIcon i-web-openinnew text-16px />
          </NuxtLink>
          <h2 text="16px app-text-grey" leading-24px mt-8px>
            {{ project.project_type ?? '---' }}
          </h2>
        </div>
        <div
          border-2px class="border-app-black bg-app-white text-app-black" flex items-center justify-center px-32px
          py-16px text-32px font-700 leading-40px cursor-pointer
        >
          {{ calculateScore }}
        </div>
      </div>
      <div grid grid-cols-2 gap-16px my-32px lg:grid-cols-4>
        <ProjectInfoItem :check-undefined="project.links?.github" title="Github" bold text-size="18px">
          <template #prefix>
            <UnoIcon i-web-code />
          </template>
          {{ project.links?.github ? 'YES' : 'NO' }}
        </ProjectInfoItem>
        <ProjectInfoItem
          :check-undefined="project.project_status?.version" title="Product readyness" bold
          text-size="18px"
        >
          <template #prefix>
            <UnoIcon i-web-cube />
          </template>
          {{ project.project_status?.version }}
        </ProjectInfoItem>
        <ProjectInfoItem :check-undefined="project.team?.length" title="Team" bold text-size="18px">
          <template #prefix>
            <UnoIcon i-web-team />
          </template>
          {{ `${project.team?.length} members` }}
        </ProjectInfoItem>
        <ProjectInfoItem :check-undefined="project.links?.docs" title="Docs" bold text-size="18px">
          <template #prefix>
            <UnoIcon i-web-docs text-28px />
          </template>
          {{ project.links?.docs ? 'YES' : 'NO' }}
        </ProjectInfoItem>
        <ProjectInfoItem :check-undefined="project.audits" title="Audit" bold text-size="18px">
          <template #prefix>
            <UnoIcon i-web-audit text-28px />
          </template>
          {{ project.audits ? 'YES' : 'NO' }}
        </ProjectInfoItem>
        <ProjectInfoItem :check-undefined="project.links" title="Available support" bold text-size="18px">
          <template #prefix>
            <UnoIcon i-web-support text-28px />
          </template>
          {{ `${availableSupport} channels` }}
        </ProjectInfoItem>
      </div>
      <div grid grid-cols-2 gap-16px my-32px lg:grid-cols-4>
        <ProjectInfoItem
          :check-undefined="project.blockchain_features?.network" tooltip-link="/" title="Ecosystem"
          bold
        >
          {{ project.blockchain_features?.network }}
        </ProjectInfoItem>
        <ProjectInfoItem invisible title="Last update" bold>
          17/11/2023 – 23:22
        </ProjectInfoItem>
      </div>
    </div>
  </div>
</template>
