<script lang="ts" setup>
import type { InputOption } from '~/types'

const { categories, usecases, ecosystems, assets, features, filteredProjectsCount, selectedCategoryId, selectedUsecaseId, selectedEcosystemId, selectedAssetsUsedId, selectedFeaturesId } = storeToRefs(useData())

const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === selectedCategoryId.value)
})
const availableUsecases = computed(() => {
  if (selectedCategoryId.value === 'all')
    return usecases.value
  return usecases.value.filter(u => selectedCategory.value?.usecases?.includes(u.id))
})

const categoryOptions = ref<InputOption[]>(categories.value ? [{ label: 'Category', value: 'all' }, ...categories.value.map(c => ({ label: c.name, value: c.id, count: c.projectsCount }))] : [])
const usecaseOptions = computed<InputOption[]>(() => availableUsecases.value.length ? [{ label: 'Usecase', value: 'all' }, ...availableUsecases.value.map(u => ({ label: u.name, value: u.id }))] : [])
const ecosystemOptions = ref<InputOption[]>(ecosystems.value ? [{ label: 'Ecosystem', value: 'all' }, ...ecosystems.value.map(e => ({ label: e.name, value: e.id }))] : [])
const assetOptions = ref<InputOption[]>(assets.value ? [{ label: 'Asset used', value: 'all' }, ...assets.value.map(a => ({ label: `${a.id.toUpperCase()} (${a.name})`, value: a.id }))] : [])
const featureOptions = ref<InputOption[]>(features.value ? [{ label: 'Feature', value: 'all' }, ...features.value.map(f => ({ label: f.name, value: f.id }))] : [])

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
              placeholder:text-app-text-grey
              :placeholder="`Search in ${filteredProjectsCount} Projects`"
            />
            <div
              md:flex-2
              flex
              items-center
              gap-16px
            >
              <CategorySelectBox
                v-model="selectedCategoryId"
                :options="categoryOptions"
                name="categorySelect"
                w-full
                @selected="selectedCategoryId === 'all' ? navigateTo(`/`) : navigateTo(`/category/${selectedCategoryId}`)"
              />
              <CategorySelectBox
                v-if="usecases?.length"
                v-model="selectedUsecaseId"
                name="usecaseSelect"
                :options="usecaseOptions"
                w-full
              />
              <CategorySelectBox
                v-if="ecosystems?.length"
                v-model="selectedEcosystemId"
                name="ecosystemSelect"
                :options="ecosystemOptions"
                w-full
              />
              <CategorySelectBox
                v-if="assets?.length"
                v-model="selectedAssetsUsedId"
                name="assetsUsedSelect"
                :options="assetOptions"
                w-full
              />
              <CategorySelectBox
                v-if="features?.length"
                v-model="selectedFeaturesId"
                name="featuresSelect"
                :options="featureOptions"
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
