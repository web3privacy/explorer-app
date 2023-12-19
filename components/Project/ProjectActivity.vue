<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider title="ACTIVITY" badge-text="3/10">
    <UnoIcon i-web-code_v2 text-24px />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div lg:flex lg:justify-between>
      <div mt-32px>
        <ProjectActivityLaunch
          v-if="project.history"
          :network="project.history?.title"
          :date="project.history?.time"
          :launch-type="project.history?.description"
          :to="project.history?.link"
        />
      </div>
      <div flex flex-col gap-24px mt-16px>
        <ProjectActivityGithub :active-devs="13" last-commit="26/11/2022" :stars="45" />
        <ProjectActivityTwitter :followers="13" posts="26/11/202" :retweets="1654" />
      </div>
    </div>
  </ProjectDetailContainer>
</template>
