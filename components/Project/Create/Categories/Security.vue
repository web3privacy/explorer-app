<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

type Audit = {
  name: string
  url: string
  time: string
}

function useAudits(project?: Partial<Project>) {
  const audits = ref<Audit[]>(project?.audits as Audit[] || [])
  const newAudit = reactive<Audit>({
    name: '',
    url: '',
    time: '',
  })

  const day = ref<number>()
  const month = ref<number>()
  const year = ref<number>()

  function addAudit() {
    audits.value.push({ ...newAudit })
    newAudit.name = ''
    newAudit.url = ''
    newAudit.time = ''
    day.value = undefined
    month.value = undefined
    year.value = undefined
  }

  function removeAudit(index: number) {
    audits.value.splice(index, 1)
  }

  return {
    audits,
    newAudit,
    day,
    month,
    year,
    addAudit,
    removeAudit,
  }
}

const { audits, newAudit, addAudit, removeAudit, day, month, year } = useAudits(props.project)

watch([day, month, year], () => {
  const yearValue = year.value
  const monthValue = month.value
  const dayValue = day.value

  if (!yearValue || !monthValue || !dayValue) {
    return null
  }
  newAudit.time = new Date(yearValue, monthValue - 1, dayValue).toString()
})

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const thirdPartyDep = ref(props.project?.third_party_dependency || '')
const socialTrust = ref(props.project?.social_trust || '')
const spof = ref(props.project?.technical_spof || '')

const { saveProject } = useProject()

function save() {
  saveProject({
    audits: audits.value,
    third_party_dependency: thirdPartyDep.value,
    social_trust: socialTrust.value,
    technical_spof: spof.value,
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
      title="AUDITS"
    />
    <ProjectCreateComponentsItem
      v-for="audit in audits"
      :key="audit.name"
      @remove="() => removeAudit(audits.indexOf(audit))"
    >
      <template #label>
        <div
          flex
          gap-2px
        >
          <span
            class="text-app-black text-14px font-700"
            lg="text-16px"
          > {{ audit.name }}
          </span>
        </div>
      </template>
      <template #desc>
        <span
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >{{ formatDate(audit.time) }}
        </span>
        <NuxtLink
          target="_blank"
          :to="audit.url"
          hover:text-app-black
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >Link
        </NuxtLink>
      </template>
    </ProjectCreateComponentsItem>
    <ProjectCreateComponentsItemAdd
      button-label="ADD AUDIT"
      @add="addAudit()"
    >
      <template #content>
        <div
          flex
          flex-col
          gap-16px
          lg="gap-24px"
        >
          <ProjectCreateComponentsInput
            v-model="newAudit.name"
            lg="w-50%"
            label="Audit name"
            placeholder="Audit name"
            hint="Title and Name of audit company"
          />
          <ProjectCreateComponentsInput
            v-model="newAudit.url"
            lg="w-50%"
            label="URL of audit"
            placeholder="URL of audit"
            hint="Enter URL of audit"
          />
          <ProjectCreateComponentsDatePicker
            v-model:day="day"
            v-model:month="month"
            v-model:year="year"
            label="Date of audit"
            placeholder="When has been project audited?"
          />
        </div>
      </template>
    </ProjectCreateComponentsItemAdd>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="ADDITIONAL INFO"
    />
    <ProjectCreateComponentsInput
      v-model="thirdPartyDep"
      textarea
      :textarea-rows="3"
      lg="w-50%"
      label="Third party dependency"
      placeholder="Write about dependencies"
      hint="Is your project dependend on third service like Uniswap pools, Network or third party contract, Chainlink oracle,...?"
    />
    <ProjectCreateComponentsInput
      v-model="socialTrust"
      textarea
      :textarea-rows="3"
      lg="w-50%"
      label="Social trust"
      placeholder="Who does project trust with treasury and security?"
      hint="Who is governing project and how? DAO, Multisig wallet of X,"
    />
    <ProjectCreateComponentsInput
      v-model="spof"
      textarea
      :textarea-rows="3"
      lg="w-50%"
      label="Single point of failure"
      placeholder="What is single point of failture for project"
      hint="What have to happen to shutdown, hack project or leak data? ex. Hack of SHA256, Stolen admin keys,..."
    />
  </div>
</template>
