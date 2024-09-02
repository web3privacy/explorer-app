<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="TECHNOLOGY"
    badge-text="3/10"
  >
    <UnoIcon
      i-web-code_v2
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.technology?.type"
        title="Technology type"
        bold
      >
        {{ project.technology?.type }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.encryption"
        title="Encryption"
        bold
      >
        {{ project.blockchain_features?.encryption }}
      </ProjectInfoItem>
      <ProjectInfoItem
        title="License"
        bold
        :check-undefined="project.licences"
      >
        {{ project.licences }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.links?.whitepaper"
        title="Whitepaper"
        bold
        :link="project.links?.whitepaper"
      >
        {{ project.links?.whitepaper ? 'YES' : 'NO' }}
      </ProjectInfoItem>
    </div>
    <div
      grid
      grid-cols-1
      items-start
      mt-16px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.project_status"
        title="Version"
        bold
      >
        <div
          v-if="project.project_status?.live_status"
          flex
          items-center
          gap-12px
        >
          <UnoIcon
            i-web-live
            text-10px
            class="color-#B5E26B"
          />
          <span>{{ `Live on ${project.project_status.version}` }}</span>
        </div>
        <div
          v-else
          flex
          items-center
          gap-12px
        >
          <UnoIcon
            i-web-live
            text-10px
            class="color-#e26b6b"
          />
          <span>{{ 'Offline' }}</span>
        </div>
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.technology?.features"
        title="Features"
        bold
      >
        {{ project.technology?.features.join(', ') }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.client_diversability"
        title="Client diversability"
        bold
      >
        <template
          v-for="item in project.client_diversability"
          :key="item.name"
        >
          <NuxtLink :to="item.link">
            {{ item.name }}
          </NuxtLink><br>
        </template>
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
