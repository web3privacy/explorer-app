<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

const web = ref<string>(props.project?.links?.web || '')
const blog = ref<string>(props.project?.links?.blog || '')
const github = ref<string>(props.project?.links?.github || '')
const forum = ref<string>(props.project?.links?.forum || '')
const docs = ref<string>(props.project?.links?.docs || '')
const whitepaper = ref<string>(props.project?.links?.whitepaper || '')
const block_explorer = ref<string>(props.project?.links?.block_explorer || '')
const governance = ref<string>(props.project?.links?.governance || '')
const twitter = ref<string>(props.project?.links?.twitter || '')
const discord = ref<string>(props.project?.links?.discord || '')
const telegram = ref<string>(props.project?.links?.telegram || '')
const lens = ref<string>(props.project?.links?.lens || '')
const farcaster = ref<string>(props.project?.links?.farcaster || '')

const { useProject } = useData()
const { saveProject } = useProject()

function save() {
  saveProject({
    links: {
      web: web.value,
      blog: blog.value,
      github: github.value,
      forum: forum.value,
      docs: docs.value,
      whitepaper: whitepaper.value,
      block_explorer: block_explorer.value,
      governance: governance.value,
      twitter: twitter.value,
      discord: discord.value,
      telegram: telegram.value,
      lens: lens.value,
      farcaster: farcaster.value,
    },
  })
}

defineExpose({
  save,
})
</script>

<template>
  <div mt-24px>
    <div
      flex
      flex-col
      gap-16px
      lg="grid grid-cols-2 gap-24px"
    >
      <ProjectCreateComponentsInput
        v-model="web"
        w-full
        label="Website"
        placeholder="ex. https://www.yourproject.com"
      />
      <ProjectCreateComponentsInput
        v-model="blog"
        w-full
        label="Blog"
        placeholder="https://blog,yourproject.com"
      />
      <ProjectCreateComponentsInput
        v-model="github"
        w-full
        label="Github repository"
        placeholder="Github.com/Yourproject"
      />
      <ProjectCreateComponentsInput
        v-model="forum"
        w-full
        label="Forum"
        placeholder="https://forum,yourproject.com"
      />
    </div>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="TECHNOGY DETAILS"
    />
    <div
      flex
      flex-col
      gap-16px
      lg="grid grid-cols-2 gap-24px"
    >
      <ProjectCreateComponentsInput
        v-model="docs"
        w-full
        label="Documentation"
        placeholder="https://docs.yourproject.com"
      />
      <ProjectCreateComponentsInput
        v-model="whitepaper"
        w-full
        label="Whitepaper"
        placeholder="https://www.yourproject.com/whitepaper.pdf"
      />
      <ProjectCreateComponentsInput
        v-model="block_explorer"
        w-full
        label="Explorer"
        placeholder="https://explorer.yourproject.com"
      />
      <ProjectCreateComponentsInput
        v-model="governance"
        w-full
        label="Governance"
        placeholder="https://governance.yourproject.com"
      />
    </div>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="SOCIAL NETWORKS"
    />
    <div
      flex
      flex-col
      gap-16px
      lg="grid grid-cols-2 gap-24px"
    >
      <ProjectCreateComponentsInput
        v-model="twitter"
        w-full
        label="Twitter"
        placeholder="Twitter profile URL"
      />
      <ProjectCreateComponentsInput
        v-model="discord"
        w-full
        label="Discord"
        placeholder="Discord invite link"
      />
      <ProjectCreateComponentsInput
        v-model="telegram"
        w-full
        label="Telegram"
        placeholder="Telegram channel URL"
      />
      <ProjectCreateComponentsInput
        v-model="lens"
        w-full
        label="Lens"
        placeholder="Lens profile URL"
      />
      <ProjectCreateComponentsInput
        v-model="farcaster"
        w-full
        label="Farcaster"
        placeholder="Farcaster profile URL"
      />
    </div>
  </div>
</template>
