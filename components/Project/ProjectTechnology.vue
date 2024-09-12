<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="TECHNOLOGY"
    badge-text="3/10"
  >
    <UnoIcon
      i-material-symbols-deployed-code-outline
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div
      grid
      grid-cols-2
      items-start
      mt-24px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.opensource"
        title="Opensource"
        bold
        :color="project.blockchain_features?.opensource ? '#18FF2F' : '#FF0000'"
      >
        {{ project.blockchain_features?.opensource ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.asset_custody_type"
        title="Asset custody"
        :color="project.blockchain_features?.asset_custody_type === 'non-custody' ? '#18FF2F' : project.blockchain_features?.asset_custody_type === 'multisig' ? '#FFB800' : '#FF0000'"
        bold
      >
        {{ project.blockchain_features?.asset_custody_type.toUpperCase() }}
      </ProjectInfoItem>
      <ProjectInfoItem
        title="Upgradability"
        bold
        :check-undefined="project.blockchain_features?.upgradability"
        :color="project.blockchain_features?.upgradability ? '#FF0000' : '#18FF2F' "
      >
        {{ project.blockchain_features?.upgradability ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.technology?.type"
        title="Technology type"
        bold
      >
        {{ project.technology.type.toUpperCase() }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.p2p"
        title="Peer to Peer (P2P)"
        bold
      >
        {{ project.blockchain_features?.p2p ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.storage?.decentralized"
        title="Decentralized storage"
        bold
      >
        {{ project.storage?.decentralized ? 'YES' : 'NO' }}
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
