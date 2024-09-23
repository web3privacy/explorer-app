<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="OPENESS"
    badge-text="3/10"
  >
    <UnoIcon
      i-bi-code-square
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div
      mt-32px
      text="14px sm:16px"
      leading-24px
      font-400
    >
      <h3
        text-app-text-grey
        mb-8px
      >
        Project Description
      </h3>
      <p
        text="14px sm:16px"
        leading-20px
      >
        {{ project.description ?? '---' }}
      </p>
    </div>
    <div
      grid
      grid-cols="2 lg:4"
      mt="24px lg:32px"
      text="14px lg:16px"
      gap-y-16px
    >
      <div>
        <h3
          text-app-text-grey
          leading-20px
          mb="4px lg:8px"
        >
          Project Phase
        </h3>
        <div
          flex
          items-center
          gap-8px
        >
          <div
            h-10px
            w-10px
            rounded-full
            bg-green
          /><p leading="20px lg:24px">
            Mainnet
          </p>
        </div>
      </div>
      <div>
        <h3
          text-app-text-grey
          leading-20px
          mb="4px lg:8px"
        >
          Assets used
        </h3>
        <p leading="20px lg:24px">
          {{ project.assets_used?.map((a) => a.toUpperCase()).join(', ') }}
        </p>
      </div>
      <div>
        <h3
          text-app-text-grey
          leading-20px
          mb="4px lg:8px"
        >
          Native token
        </h3>
        <p leading="20px lg:24px">
          {{ project.tokens?.length ? project.tokens[0]?.name : 'N/A' }}
        </p>
      </div>
      <div>
        <h3
          text-app-text-grey
          leading-20px
          mb="4px lg:8px"
        >
          Project launch day
        </h3>
        <p leading="20px lg:24px">
          {{ project.product_launch_day || 'N/A'}}
        </p>
      </div>
    </div>
    <div mt-24px>
      <h3
        text="14px sm:16px app-text-grey"
        leading-20px
      >
        Infrastructure links:
      </h3>
      <div
        grid
        grid-cols-2
        gap-x-16px
        gap-y-12px
        mt-8px
        lg:grid-cols-4
      >
        <ProjectOpenessLink
          v-if="project.links?.web"
          :to="project.links?.web"
        >
          <template #prefix>
            <UnoIcon
              i-ic-baseline-language
              text="24px app-text-grey"
            />
          </template>
          Website
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.github"
          :to="project.links?.github"
        >
          <template #prefix>
            <UnoIcon
              i-mdi-github
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Github
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.whitepaper"
          :to="project.links?.whitepaper"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-description
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Whitepaper
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.docs"
          :to="project.links?.docs"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-contract
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Docs
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.blog"
          :to="project.links.blog"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-newsmode
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Blog
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.forum"
          :to="project.links.forum"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-forum-outline
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Forum
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.block_explorer"
          :to="project.links.block_explorer"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-explore-outline
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Explorer
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.governance"
          :to="project.links.governance"
        >
          <template #prefix>
            <UnoIcon
              i-material-symbols-how-to-vote-outline
              text="24px app-text-grey"
              text-27px
            />
          </template>
          Governance
        </ProjectOpenessLink>
      </div>
    </div>
    <div mt-24px>
      <h3
        text="14px sm:16px app-text-grey"
        leading-20px
      >
        {{ 'Socials' }}
      </h3>
      <div
        grid
        grid-cols-2
        gap-x-16px
        gap-y-12px
        mt-8px
        lg:grid-cols-4
      >
        <ProjectOpenessLink
          v-if="project.links?.twitter"
          :to="project.links.twitter"
        >
          <template #prefix>
            <UnoIcon
              i-bi-twitter-x
              text="24px app-text-grey"
            />
          </template>
          Twitter
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.discord"
          :to="project.links.discord"
        >
          <template #prefix>
            <UnoIcon
              i-ic-baseline-discord
              text="24px app-text-grey"
            />
          </template>
          Discord
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.telegram"
          :to="project.links.telegram"
        >
          <template #prefix>
            <UnoIcon
              i-mdi-telegram
              text="24px app-text-grey"
            />
          </template>
          Telegram
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.lens"
          :to="project.links.lens"
        >
          <template #prefix>
            <UnoIcon
              i-web-lens
              text="24px app-text-grey"
            />
          </template>
          Lens
        </ProjectOpenessLink>
        <ProjectOpenessLink
          v-if="project.links?.farcaster"
          :to="project.links.farcaster"
        >
          <template #prefix>
            <UnoIcon
              i-web-farcaster
              text="24px app-text-grey"
            />
          </template>
          Farcaster
        </ProjectOpenessLink>
      </div>
    </div>
    <ProjectOpenessTeamMembers
      v-if="project?.team?.teammembers"
      :members="project.team?.teammembers"
      mt-24px
    />
    <div mt-32px>
      <h3
        text="app-text-grey 14px lg:16px"
        leading-24px
      >
        Funding
      </h3>
      <div
        v-for="funding of project.funding"
        :key="funding.name"
        flex
        items-center
        justify-between
        rounded-full
        w-full
        bg-app-bg-funding-card
        px-24px
        py-12px
        mt-12px
      >
        <h3
          text="14px lg:16px"
          leading="20px lg:24px"
          font-700
        >
          {{ funding.name }}
        </h3>
        <NuxtLink
          :to="funding.link"
          external
          target="_blank"
        >
          <UnoIcon
            i-ic-twotone-open-in-new
            text="22px app-text-grey"
          />
        </NuxtLink>
      </div>
      <h3
        v-if="!project.funding?.length"
        text="app-text-grey 14px lg:16px"
        leading-24px
      >
        N/A
      </h3>
    </div>
  </ProjectDetailContainer>
</template>
