<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider title="OPENESS" badge-text="3/10">
    <UnoIcon i-web-code_v2 text-24px />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div mt-32px text="14px sm:16px" leading-24px font-400>
      <h3 text-app-text-grey>
        {{ 'Project Description' }}
      </h3>
      <span text="14px sm:16px" leading-20px>{{ project.description ?? '---' }}</span>
    </div>
    <div mt-24px>
      <h3 text="14px sm:16px app-text-grey" leading-20px>
        {{ 'Infrastructure links' }}
      </h3>
      <div grid grid-cols-2 gap-16px mt-8px lg:grid-cols-4>
        <ProjectOpenessLink v-if="project.links?.web" :to="project.links?.web">
          <template #prefix>
            <UnoIcon i-web-website />
          </template>
          {{ 'Website' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.blog" :to="project.links.blog">
          <template #prefix>
            <UnoIcon i-web-website />
          </template>
          {{ 'Blog' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.github" :to="project.links?.github">
          <template #prefix>
            <UnoIcon i-web-github opacity-30 text-27px />
          </template>
          {{ 'Github' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.docs" :to="project.links?.docs">
          <template #prefix>
            <UnoIcon i-web-documents text-24px />
          </template>
          {{ 'Docs' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.block_explorer" :to="project.links.block_explorer">
          <template #prefix>
            <UnoIcon i-web-explorer opacity-30 />
          </template>
          {{ 'Explorer' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.snapshot" :to="project.links.snapshot">
          <template #prefix>
            <UnoIcon i-web-snapshot text-32px />
          </template>
          {{ 'Snapshot' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.token" :to="project.links.token">
          <template #prefix>
            <UnoIcon i-web-token text-28px />
          </template>
          {{ 'Token' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.coingecko" :to="project.links.coingecko">
          <template #prefix>
            <UnoIcon i-web-coingecko opacity-30 text-24px />
          </template>
          {{ 'Coingecko' }}
        </ProjectOpenessLink>
      </div>
    </div>
    <div mt-24px>
      <h3 text="14px sm:16px app-text-grey" leading-20px>
        {{ 'Socials' }}
      </h3>
      <div grid grid-cols-2 gap-16px mt-8px lg:grid-cols-4>
        <ProjectOpenessLink v-if="project.links?.forum" :to="project.links.forum">
          <template #prefix>
            <UnoIcon i-web-forum opacity-30 text-28px />
          </template>
          {{ 'Forum' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.discord" :to="project.links.discord">
          <template #prefix>
            <UnoIcon i-web-discord text-27px />
          </template>
          {{ 'Discord' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.twitter" :to="project.links.twitter">
          <template #prefix>
            <UnoIcon i-web-twitter_x opacity-30 text-22px />
          </template>
          {{ 'Twitter' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.lens" :to="project.links.lens">
          <template #prefix>
            <UnoIcon i-web-lens text-32px />
          </template>
          {{ 'Lens' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.farcaster" :to="project.links.farcaster">
          <template #prefix>
            <UnoIcon i-web-farcaster text-26px />
          </template>
          {{ 'Farcaster' }}
        </ProjectOpenessLink>
        <ProjectOpenessLink v-if="project.links?.telegram" :to="project.links.telegram">
          <template #prefix>
            <UnoIcon i-web-telegram opacity-30 text-22px />
          </template>
          {{ 'Telegram' }}
        </ProjectOpenessLink>
      </div>
    </div>
    <div mt-24px>
      <ProjectOpenessTeamMembers :members="project.team" />
    </div>
    <div grid grid-cols-2 items-start mt-32px gap-y-26px lg:grid-cols-4>
      <ProjectInfoItem :check-undefined="project.product_launch_day" title="Product launch day">
        {{ project.product_launch_day }}
      </ProjectInfoItem>
      <ProjectInfoItem
        title="Opensource" bold
        :check-undefined="project.blockchain_features?.opensource"
        :color=" project.blockchain_features?.opensource ? '#A8FF18' : '#FF0000'"
      >
        {{ project.blockchain_features?.opensource ? 'Yes' : 'No' }}
      </ProjectInfoItem>
    </div>
    <div mt-32px w-full>
      <ProjectInfoItem
        :check-undefined="project.funding"
        title="Funding" bold
        w-full
      >
        <template v-for="fund in project.funding" :key="fund.name">
          <div mt-16px grid grid-cols-2 sm:grid-cols-4>
            <span v-if="fund.name">{{ fund.name }}</span>
            <span v-if="fund.time" font-400>{{ fund.time }}</span>
            <span v-if="fund.time" font-400 text-app-text-grey>{{ fund.type }}</span>
            <span v-if="fund.time" font-400>{{ fund.value }}</span>
          </div>
        </template>
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
