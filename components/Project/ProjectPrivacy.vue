<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <ProjectDetailCategoryDivider
    title="PRIVACY"
    badge-text="3/10"
  >
    <UnoIcon
      i-web-code_v2
      text-24px
    />
  </ProjectDetailCategoryDivider>
  <ProjectDetailContainer>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.p2p"
        bold
        title="Peer to Peer (P2P)"
      >
        {{ project.blockchain_features?.p2p ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.tracebility?.kyc"
        bold
        :color="project.tracebility?.kyc ? '#FF0000' : '#18FF2F'"
        title="Know Your Customer (KYC)"
      >
        {{ project.tracebility?.kyc ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.storage"
        bold
        title="Decentralized storage"
        :color="project.storage?.decentralized ? '#18FF2F' : '#FF0000'"
      >
        {{ project.storage?.decentralized ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.default_privacy"
        title="Default privacy"
        :color="project.default_privacy ? '#18FF2F' : '#FF0000'"
      >
        {{ project.default_privacy ? 'YES' : 'NO' }}
      </ProjectInfoItem>
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.revealed_recipient"
        :color="project.blockchain_features?.revealed_recipient ? '#FF0000' : '#18FF2F'"
        bold
        title="Revealed recipient"
      >
        {{ project.blockchain_features?.revealed_recipient ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.revealed_sender"
        :color="project.blockchain_features?.revealed_sender ? '#FF0000' : '#18FF2F'"
        bold
        title="Revealed sender"
      >
        {{ project.blockchain_features?.revealed_sender ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.revealed_ammount"
        :color="project.blockchain_features?.revealed_ammount ? '#FF0000' : '#18FF2F'"
        bold
        title="Revealed amount"
      >
        {{ project.blockchain_features?.revealed_ammount ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.reversability_condition"
        bold
        title="Reversability"
      >
        {{ project.blockchain_features?.reversability_condition }}
      </ProjectInfoItem>
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.connected_tx"
        :color="project.blockchain_features?.connected_tx ? '#FF0000' : '#18FF2F'"
        bold
        title="Connected Txs"
      >
        {{ project.blockchain_features?.connected_tx ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.data_masking"
        bold
        title="Data masking"
      >
        {{ project.blockchain_features?.data_masking }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.tx_history"
        bold
        title="Tx history"
      >
        {{ project.blockchain_features?.tx_history ? 'YES' : 'NO' }}
      </ProjectInfoItem>
    </div>
    <div my-24px>
      <hr
        border-t-2px
        border-white
        opacity-20
        w-80px
      >
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
      lg:grid-cols-4
    >
      <ProjectInfoItem
        :check-undefined="project.privacy_policy"
        :color="project.privacy_policy?.defined ? '#18FF2F' : '#FF0000'"
        bold
        title="Privacy Policy"
      >
        {{ project.privacy_policy?.defined ? 'YES' : 'NO' }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.tracebility?.tracked_data"
        title="Collected data"
      >
        {{ project.tracebility?.tracked_data }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.privacy_policy?.data_usage"
        title="Data usage"
      >
        {{ project.privacy_policy?.data_usage }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.frontend_anonymity"
        bold
        title="Frontend anonymity"
      >
        {{ project.blockchain_features?.frontend_anonymity }}
      </ProjectInfoItem>
    </div>
    <div my-24px>
      <hr
        border-t-2px
        border-white
        opacity-20
        w-80px
      >
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
    >
      <ProjectInfoItem
        :check-undefined="project.compliance"
        :color="project.compliance ? '#FF0000' : '#18FF2F'"
        bold
        title="Compliance"
      >
        {{ project.compliance ? 'YES' : 'NO' }}
      </ProjectInfoItem>
    </div>
    <div
      grid
      grid-cols-2
      items-start
      mt-32px
      gap-y-16px
    >
      <ProjectInfoItem
        :check-undefined="project.tracebility?.sign_in_type_requirments"
        bold
        title="Sign-in requirements"
      >
        {{ project.tracebility?.sign_in_type_requirments }}
      </ProjectInfoItem>
      <ProjectInfoItem
        :check-undefined="project.blockchain_features?.identity_integration"
        title="Identity integrations"
      >
        {{ project.blockchain_features?.identity_integration }}
      </ProjectInfoItem>
    </div>
  </ProjectDetailContainer>
</template>
