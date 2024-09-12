<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

type Token = {
  name: string
  symbol: string
  contract_address: string
  token_link: string
}

function useTokens(project?: Partial<Project>) {
  const tokens = ref<Token[]>(project?.tokens as Token[] || [])
  const newToken = reactive<Token>({
    symbol: '',
    name: '',
    contract_address: '',
    token_link: '',
  })

  function addToken() {
    tokens.value.push({ ...newToken })
    newToken.symbol = ''
    newToken.name = ''
    newToken.contract_address = ''
    newToken.token_link = ''
  }

  function removeToken(index: number) {
    tokens.value.splice(index, 1)
  }

  return {
    tokens,
    newToken,
    addToken,
    removeToken,
  }
}

const { tokens, newToken, addToken, removeToken } = useTokens(props.project)
const assetsUsed = ref<string[]>(Array.isArray(props.project?.assets_used) ? props.project?.assets_used.map(a => a.toLowerCase()) : [])

const { useProject, assetsData } = useData()
const { saveProject } = useProject()

function save() {
  saveProject({
    assets_used: assetsUsed.value,
    have_token: tokens.value.length > 0 && tokens.value.some(token => token.contract_address),
    tokens: tokens.value,
  })
}

defineExpose({
  save,
})
</script>

<template>
  <div mt-24px>
    <ClientOnly>
      <ProjectCreateComponentsSelectChips
        v-model="assetsUsed"
        label="Assets used"
        :options="assetsData?.map(asset => ({ label: asset.name, value: asset.id }))"
        placeholder="Add assets"
        hint="Most used assets user can use to interact with your project"
        can-add-new
      />
    </ClientOnly>
    <ProjectCreateComponentsCategoryDivider
      w-full
      title="NATIVE TOKENS"
    />
    <ProjectCreateComponentsItem
      v-for="token in tokens"
      :key="token.name"
      @remove="() => removeToken(tokens.indexOf(token))"
    >
      <template #label>
        <div
          flex
          gap-2px
        >
          <span
            class="text-app-black text-14px font-700"
            lg="text-16px"
          > {{ token.symbol }}
          </span>
          <span
            v-if="token.name"
            class="text-app-black text-14px font-400"
            lg="text-16px"
          > {{ `(${token.name})` }}
          </span>
        </div>
      </template>
      <template #desc>
        <NuxtLink
          target="_blank"
          :to="token.token_link"
          hover:text-app-black
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >Etherscan
        </NuxtLink>
      </template>
    </ProjectCreateComponentsItem>
    <ProjectCreateComponentsItemAdd
      button-label="ADD TOKEN"
      @add="addToken()"
    >
      <template #content>
        <div
          flex
          flex-col
          gap-16px
          lg="gap-24px"
        >
          <div
            flex
            flex-col
            gap-8px
            lg="flex-row gap-24px"
          >
            <div
              class="w-100%"
              flex
              flex-col
              gap-16px
              lg="flex-row gap-24px"
            >
              <ProjectCreateComponentsInput
                v-model="newToken.symbol"
                w-full
                label="Token symbol"
                placeholder="Token symbol"
              />
              <ProjectCreateComponentsInput
                v-model="newToken.name"
                w-full
                label="Token name"
                placeholder="Token name"
              />
            </div>
            <span
              class="w-100%"
              lg="mt-32px left-1/2 self-center"
              font-400
              italic
              lg:text-14px
              text-12px
              text-app-white
              opacity-50
            >
              {{ 'Does your project have native token? Enter Symbol, name and address' }}
            </span>
          </div>
          <ProjectCreateComponentsInput
            v-model="newToken.contract_address"
            lg="w-1/2"
            label="Token contract address"
            placeholder="Contract address"
            hint="Enter token contract address"
          />
          <ProjectCreateComponentsInput
            v-model="newToken.token_link"
            lg="w-1/2"
            label="URL for explorer"
            placeholder="Token explorer URL"
            hint="Link to any explorer showing data about your native token"
          />
        </div>
      </template>
    </ProjectCreateComponentsItemAdd>
  </div>
</template>
