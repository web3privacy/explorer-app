<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

type Fundings = {
  name: string
  link: string
}

function useFundings(project?: Partial<Project>) {
  const fundings = ref<Fundings[]>(Array.isArray(project?.funding) ? project?.funding as unknown as Fundings[] : [project?.funding as unknown as Fundings])
  const newFunding = reactive<Fundings>({
    name: '',
    link: '',
  })

  function addFunding() {
    fundings.value.push({ ...newFunding })
    newFunding.name = ''
    newFunding.link = ''
  }

  function removeFunding(index: number) {
    fundings.value.splice(index, 1)
  }

  return {
    fundings,
    newFunding,
    addFunding,
    removeFunding,
  }
}

const { fundings, newFunding, addFunding, removeFunding } = useFundings(props.project)

const { saveProject } = useProject()

function save() {
  saveProject({
    funding: fundings.value,
  })
}

defineExpose({
  save,
})
</script>

<template>
  <div>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="FUNDING"
    />
    <ProjectCreateComponentsItem
      v-for="funding in fundings"
      :key="funding.name"
      @remove="() => removeFunding(fundings?.indexOf(funding))"
    >
      <template #label>
        <div
          flex
          gap-2px
        >
          <span
            class="text-app-black text-14px font-700"
            lg="text-16px"
          > {{ funding.name }}
          </span>
        </div>
      </template>
      <template #desc>
        <NuxtLink
          :to="funding.link"
          hover:text-app-black
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >Link
        </NuxtLink>
      </template>
    </ProjectCreateComponentsItem>
    <ProjectCreateComponentsItemAdd
      button-label="ADD FUNDING"
      @add="addFunding()"
    >
      <template #content>
        <div
          flex
          flex-col
          gap-16px
          lg="gap-24px"
        >
          <ProjectCreateComponentsInput
            v-model="newFunding.name"
            lg="w-50%"
            label="Name"
            placeholder="Investor's name"
            hint="Name of entity investing into project"
          />
          <ProjectCreateComponentsInput
            v-model="newFunding.link"
            lg="w-50%"
            label="Link confirming investment"
            placeholder="Add URL"
            hint="Link to Article, PR or other sources confirming funding information"
          />
        </div>
      </template>
    </ProjectCreateComponentsItemAdd>
  </div>
</template>
