<script lang="ts" setup>
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="SECURITY"
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
        :check-undefined="project.blockchain_features?.asset_custody_type"
        bold
        title="Asset custody"
      >
        {{ project.blockchain_features?.asset_custody_type }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.upgradability"
        title="Upgradability"
      >
        <b :color="project.blockchain_features?.upgradability?.enabled ? '#FF0000' : '#18FF2F'">
          {{ project.blockchain_features?.upgradability?.enabled ? 'YES' : 'NO' }}
        </b>
        {{ ` – ${project.blockchain_features?.upgradability?.type}` }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.social_trust"
        title="Social dependency"
      >
        {{ project.social_trust }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.third_party_dependency"
        bold
        :color="project.third_party_dependency ? '#FF0000' : '#18FF2F'"
        title="Third-party dependency"
      >
        {{ project.third_party_dependency ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.technical_spof"
        :color="project.technical_spof ? '#FF0000' : '#18FF2F'"
        title="Technical dependency"
      >
        {{ project.technical_spof }}
      </ProjectInfoItem>
    </div>
    <div my-24px>
      <hr
        border-t-2px
        border-white
        opacity-20
        w-80px
      >
    </div>
    <div v-if="project.audits">
      <h2
        text-18px
        text-app-text-grey
        my-24px
      >
        Audits
      </h2>
      <template
        v-for="audit in project.audits"
        :key="audit.name"
      >
        <ProjectSecurityAudit
          :audit-name="audit.name"
          :audit-url="audit.link"
          :date="audit.time"
        >
          <NuxtImg
            :src="audit.logo ?? '/no-image-1-1.svg'"
            w-64px
            h-64px
            object-cover
          />
        </ProjectSecurityAudit>
      </template>
    </div>
  </ProjectDetailContainer>
</template>
