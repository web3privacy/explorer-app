<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

const isAnonymousTeam = ref<boolean>(props.project?.team?.anonymous || false)

type Member = {
  name: string
  link: string
}

function useMembers(project?: Partial<Project>) {
  const members = ref<Member[]>(project?.team?.teammembers as Member[] || [])
  const newMember = reactive<Member>({
    name: '',
    link: '',
  })

  function addMember() {
    members.value.push({ ...newMember })
    newMember.name = ''
    newMember.link = ''
  }

  function removeMember(index: number) {
    members.value.splice(index, 1)
  }

  return {
    members,
    newMember,
    addMember,
    removeMember,
  }
}

const { members, newMember, addMember, removeMember } = useMembers(props.project)

const { saveProject } = useProject()

function save() {
  saveProject({
    team: {
      anonymous: isAnonymousTeam.value,
      teammembers: members.value,
    },
  })
}

defineExpose({
  save,
})
</script>

<template>
  <div mt-24px>
    <ProjectCreateComponentsToggle
      v-model="isAnonymousTeam"
      label="Anonymous team"
      hint="Are developers able to upgrade and change deployed contract?"
    />
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="TEAM MEMBERS"
    />
    <ProjectCreateComponentsItem
      v-for="member in members"
      :key="member.name"
      @remove="() => removeMember(members.indexOf(member))"
    >
      <template #label>
        <div
          flex
          gap-2px
        >
          <span
            class="text-app-black text-14px font-700"
            lg="text-16px"
          > {{ member.name }}
          </span>
        </div>
      </template>
      <template #desc>
        <NuxtLink
          target="_blank"
          :to="member.link"
          hover:text-app-black
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >Link
        </NuxtLink>
      </template>
    </ProjectCreateComponentsItem>
    <ProjectCreateComponentsItemAdd
      button-label="ADD MEMBER"
      @add="addMember()"
    >
      <template #content>
        <div
          flex
          flex-col
          gap-16px
          lg="gap-24px"
        >
          <ProjectCreateComponentsInput
            v-model="newMember.name"
            lg="w-50%"
            label="Team member name"
            placeholder="Enter member name"
            hint="Full member's name"
          />
          <ProjectCreateComponentsInput
            v-model="newMember.link"
            lg="w-50%"
            label="Profile URL"
            placeholder="Linkedin, Farcaster, Twitter,..."
            hint="Link to member’s social profile (ex. Twitter, Linkedin, Lens,...)"
          />
        </div>
      </template>
    </ProjectCreateComponentsItemAdd>
  </div>
</template>
