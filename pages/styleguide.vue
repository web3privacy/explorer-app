<script lang="ts" setup>
import type { InputOption } from '~/types'

const options: InputOption[] = [
  { label: 'All', value: 'all' }, { label: 'Zk-tech', value: 'zk' },
]

const loremIpsum: string = 'Description just text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus nulla quis enim vulputate semper. Duis varius nibh sed magna tincidunt pellentesque.'

// const cardData = {
//   image: 'https://ctrlv.cz/Epud',
//   title1: 'title1',
//   title2: 'title2',
//   percentage: 84,
//   anonymity: true,
//   decentralized: true,
//   opensource: true,
//   license: 'MIT',
//   datatracking: true,
//   compliance: true,
// }

const selectedOption = ref('all')
</script>

<template>
  <div
    flex
    flex-col
    items-start
    justify-start
    gap-8px
  >
    <Category
      title="All Projects"
      :count="503"
    />
    <Category
      title="All Projects"
      :count="503"
      selected
    />
    <Button mt-16px>
      <template #prefix>
        <UnoIcon i-heroicons-solid-pencil />
      </template>
      Edit Research
    </Button>
    <Button>
      Save Research
    </Button>
    <MenuItem
      title="Dashboard"
      mt-16px
    />
    <MenuItem
      title="Dashboard"
      selected
    />
    <Badge text="84%" />
    <Badge
      text="84%"
      inverted
    />
    <SelectBox
      v-model="selectedOption"
      mt-16px
      :options="options"
    />
    <h1
      custom-link
      mt-16px
    >
      Custom Link
    </h1>
    <Helper :info="loremIpsum" />
    <NavigationButton @click="$router.back()">
      Back
    </NavigationButton>
    <Tabs
      v-model="selectedOption"
      mt-16px
      :options="options"
    />
  <!--   <Card
      v-if="cardData"
      id="test"
      :image="cardData.image" :title1="cardData.title1" :title2="cardData.title2" :percentage="cardData.percentage"
      :opensource="cardData.opensource" :license="cardData.license"
    /> -->
  </div>
</template>
