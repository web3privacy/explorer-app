<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

const privacyPolicyUrl = ref(props.project?.privacy_policy?.link || '')
const compliance = ref(props.project?.compliance || '')
const kyc = ref(props.project?.tracebility?.kyc || false)
const defaultPrivacy = ref(props.project?.default_privacy || false)
const signRequirements = ref(Array.isArray(props.project?.tracebility?.sign_in_type_requirments) ? props.project?.tracebility?.sign_in_type_requirments?.map(s => s.toLowerCase()) : [])
const trackedData = ref(props.project?.tracebility?.tracked_data || '')
const dataUsage = ref(props.project?.privacy_policy?.data_usage || '')

const { signInRequirments: signInRequirmentsData } = useData()
const { saveProject } = useProject()

function save() {
  saveProject({
    privacy_policy: {
      defined: privacyPolicyUrl.value ? true : false,
      link: privacyPolicyUrl.value,
      data_usage: dataUsage.value,
    },
    compliance: compliance.value,
    tracebility: {
      kyc: kyc.value,
      tracked_data: trackedData.value,
    },
    default_privacy: defaultPrivacy.value,
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
      gap-24px
    >
      <ProjectCreateComponentsInput
        v-model="privacyPolicyUrl"
        lg="w-50%"
        label="Link to project’s Privacy Policy"
        placeholder="https://policy.yourproject.com"
        hint="URL of document defining you privacy policy and data usage"
      />
      <ProjectCreateComponentsInput
        v-model="compliance"
        lg="w-50%"
        label="Compliance"
        placeholder="Enter compliance that project follow"
        hint="Is project Compliant with regulations? (ex. OFAC, Privacy Act)"
      />
      <ProjectCreateComponentsToggle
        v-model="kyc"
        label="KYC (Know your customer)"
        hint="Is project requiering KYC for its users?"
      />
      <ProjectCreateComponentsToggle
        v-model="defaultPrivacy"
        label="Defult privacy"
        hint="Is maximum privacy turned on by default,"
      />
    </div>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="ADDITIONAL INFO"
    />
    <div
      flex
      flex-col
      gap-24px
    >
      <ProjectCreateComponentsSelectChips
        v-model="signRequirements"
        label="Sign-in requirements"
        :options="signInRequirmentsData?.map(s => ({ label: s.name, value: s.id }))"
        placeholder="Add requirement"
        hint="What do you need to provide to use your project?"
      />
      <ProjectCreateComponentsInput
        v-model="trackedData"
        lg="w-50%"
        label="Tracked data"
        placeholder="Enter tracked data"
        hint="What data does project collect? (ex. IP, Location, E-mail, Wallet,...)"
      />
      <ProjectCreateComponentsInput
        v-model="dataUsage"
        lg="w-50%"
        label="Data usage"
        placeholder="What are you using data for?"
        hint="How does project use user info (resseling, information gathering, none,...)"
      />
    </div>
  </div>
</template>
