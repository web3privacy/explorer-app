<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

const version = ref(props.project?.project_phase?.toLowerCase() || undefined)
const openSource = ref(props.project?.blockchain_features?.opensource || false)
const upgradability = ref(props.project?.blockchain_features?.upgradability?.enabled || false)
const assetType = ref(props.project?.blockchain_features?.asset_custody_type?.toLowerCase() || '')
const encryption = ref(props.project?.blockchain_features?.encryption || '')
const peerToPeer = ref(props.project?.blockchain_features?.p2p)
const decentralizedStorage = ref(props.project?.storage?.decentralized)

const { useProject, projectPhaseData, assetCustodyData } = useData()
const { saveProject } = useProject()

function save() {
  saveProject({
    project_phase: version.value,
    blockchain_features: {
      opensource: openSource.value,
      upgradability: {
        enabled: upgradability.value,
      },
      asset_custody_type: assetType.value,
      encryption: encryption.value,
      p2p: peerToPeer.value,
    },
    storage: {
      decentralized: decentralizedStorage.value,
    },
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
      title="VERSION"
    />
    <ProjectCreateComponentsRadio
      v-model="version"
      :options="projectPhaseData.map(p => ({ label: p.name, value: p.id }))"
    />
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="FEATURES"
    />
    <div
      flex
      flex-col
      gap-24px
    >
      <ProjectCreateComponentsToggle
        v-model="openSource"
        label="Open source"
        hint="Check when projects source code is openly available and editable"
      />
      <ProjectCreateComponentsToggle
        v-model="upgradability"
        label="Upgradability"
        hint="Are developers able to upgrade and change deployed contract?"
      />
    </div>
    <ProjectCreateComponentsSelect
      v-model="assetType"
      :options="assetCustodyData.map(c => ({ label: c.name, value: c.id }))"
      label="Asset custody type"
      placeholder="Select custody type"
      hint="How are user’s fund handled? (non-custody, multisig, pool,...)"
    />
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="ADDITIONAL INFO"
    />
    <div
      flex
      flex-col
      gap-24px
    >
      <ProjectCreateComponentsInput
        v-model="encryption"
        lg="w-1/2"
        label="Technology type / Encryption"
        hint="Define technologies your project uses for privacy ex. Zero-Knowledge (ZK), SHA256,"
        placeholder="Technology name"
      />
      <ProjectCreateComponentsToggle
        v-model="peerToPeer"
        label="Peer to Peer (P2P)"
        hint="Check when you transfer / communicate withou intermediaries"
      />
      <ProjectCreateComponentsToggle
        v-model="decentralizedStorage"
        label="Decentralized storage"
        hint="Is your data hosted on IPFS, Filecoin or other decentralized storage?"
      />
    </div>
  </div>
</template>
