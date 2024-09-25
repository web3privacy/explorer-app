<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="PRIVACY"
    badge-text="3/10"
  >
    <UnoIcon
      i-heroicons-solid-eye
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
        :check-undefined="project.default_privacy"
        title="Default privacy"
        :color="project.default_privacy ? '#18FF2F' : '#FF0000'"
      >
        {{ project.default_privacy ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.tracebility?.kyc"
        bold
        :color="project.tracebility?.kyc ? '#FF0000' : '#18FF2F'"
        title="Know Your Customer (KYC)"
      >
        {{ project.tracebility?.kyc ? 'YES': 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.privacy_policy"
        :color="project.privacy_policy?.defined ? '#18FF2F' : '#FF0000'"
        bold
        title="Privacy Policy"
      >
        {{ project.privacy_policy?.defined ? 'YES' : 'NO' }}
        <NuxtLink
          :to="project.privacy_policy?.link"
          external
          target="_blank"
        >
          <UnoIcon
            i-ic-twotone-open-in-new
            text="20px app-text-grey"
          />
        </NuxtLink>
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="true"
        color="#FFB800"
        bold
        title="Compliance with"
      >
        {{ project.compliance ? project.compliance : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.tracebility?.sign_in_type_requirments"
        bold
        title="Sign-in requirements"
      >
        {{ project.tracebility?.sign_in_type_requirments }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.tracebility?.tracked_data"
        title="Collected data"
      >
        {{ project.tracebility?.tracked_data }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.privacy_policy?.data_usage"
        title="Data usage"
      >
        {{ project.privacy_policy?.data_usage }}
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
