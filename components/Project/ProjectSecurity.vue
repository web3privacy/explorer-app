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
      i-material-symbols-lock-outline
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div v-if="project.audits">
      <h2
        text-18px
        text-app-text-grey
        my-24px
      >
        Audits
      </h2>
      <div
        flex
        flex-col
        gap="12px lg:16px"
      >
        <template
          v-for="audit in project.audits"
          :key="audit.name"
        >
          <ProjectSecurityAudit
            :audit-name="audit.name"
            :audit-url="audit.link"
            :date="audit.time"
          />
        </template>
      </div>
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.technical_spof"
        :color="project.technical_spof ? '#FF0000' : '#18FF2F'"
        title="Technical dependency"
      >
        {{ project.technical_spof }}
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
    </div>
  </ProjectDetailContainer>
</template>
