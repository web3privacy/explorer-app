<script lang="ts" setup>
import type { InputOption } from '~/types'

const { categories, filteredProjectsCount, selectedCategoryId } = storeToRefs(useData())

const selectedUsecaseId = ref('usecase')
const selectedEcosystemId = ref('ecosystem')
const selectedAssetsUsedId = ref('assetsUsed')
const selectedFeaturesId = ref('features')

const categoriesOptions = ref(categories.value ? categories.value.map(c => ({ label: c.name, value: c.id, count: c.projectsCount })) : [])
const extendedOptions: InputOption[] = [
  { label: 'Category', value: 'all' },
  ...categoriesOptions.value,
]

const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === selectedCategoryId.value)
})

const sortedFilteredCategories = computed(() => ([
  categories.value.find(c => c.id === 'defi')!,
  ...[...categories.value].sort((a, b) => a.name.localeCompare(b.name)).filter(c => c.id !== 'defi'),
]))

const { showBar } = storeToRefs(useNavigaiton())
const swipeEl = ref()
const { y } = useWindowScroll()
const scrollEl = ref()
const { y: scrollY } = useScroll(scrollEl)
const { top } = useElementBounding(scrollEl)

watch(y, (newY, oldY) => {
  if (newY > oldY && newY > 32)
    showBar.value = false
  else
    showBar.value = true
})

watch([scrollY, top, y], (newValues, oldValues) => {
  if (top.value <= 32)
    scrollY.value += newValues[2] - oldValues[2]
})
</script>

<template>
  <div
    ref="swipeEl"
    flex
    flex-col
    min-h-100vh
    h-full
    w-full
  >
    <Navigation />
    <div
      app-container
      mt-32px
    >
      <div
        flex
        w-full
        xl:gap-32px
      >
        <div
          flex
          flex-col
          w-full
        >
          <div
            flex
            flex-col
            md:flex-row
            md:justify-between
            md:items-center
            gap-16px
            mb="16px md:32px"
          >
            <SearchBox
              flex-1
              :placeholder="`Search in ${filteredProjectsCount} Projects`"
            />
            <div
              md:flex-2
              flex
              items-center
              gap-16px
              overflow-x-auto
            >
              <CategorySelectBox
                v-model="selectedCategoryId"
                :options="extendedOptions"
                w-full
                @selected="selectedCategoryId === 'all' ? navigateTo(`/`) : navigateTo(`/category/${selectedCategoryId}`)"
              />
              <CategorySelectBox
                v-model="selectedUsecaseId"
                :options="[{ label: 'Usecase', value: 'usecase' }]"
                w-full
              />
              <CategorySelectBox
                v-model="selectedEcosystemId"
                :options="[{ label: 'Ecosystem', value: 'ecosystem' }]"
                w-full
              />
              <CategorySelectBox
                v-model="selectedAssetsUsedId"
                :options="[{ label: 'Assets used', value: 'assetsUsed' }]"
                w-full
              />
              <CategorySelectBox
                v-model="selectedFeaturesId"
                :options="[{ label: 'Features', value: 'features' }]"
                w-full
              />
            </div>
          </div>
          <slot />
        </div>
      </div>
    </div>
    <Footer justify-self-end />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
