<script lang="ts" setup>
import type { InputOption } from '~/types'

const { categories, filteredProjectsCount, selectedCategoryId } = storeToRefs(useData())

const categoriesOptions = ref(categories.value ? categories.value.map(c => ({ label: c.name, value: c.id, count: c.projectsCount })) : [])
const extendedOptions: InputOption[] = [
  ...categoriesOptions.value,
]

const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === selectedCategoryId.value)
})

const sortedFilteredCategories = computed(() => ([
  categories.value.find(c => c.id === 'defi')!,
  ...categories.value.sort((a, b) => a.name.localeCompare(b.name)).filter(c => c.id !== 'defi'),
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
  <div ref="swipeEl" flex flex-col min-h-100vh h-full w-full>
    <Navigation />
    <div app-container mt-32px>
      <div flex w-full xl:gap-32px>
        <div w-fit>
          <div
            ref="scrollEl"
            class="no-scrollbar"
            h-100vh overflow-y-auto sticky top-32px hidden xl:block min-w-234px pb-48px
          >
            <Category
              v-for="category in sortedFilteredCategories"
              :key="category.id" :title="category.name"
              :count="category.projectsCount" :selected="selectedCategoryId === category.id"
              @click="[navigateTo(`/category/${category.id}`), selectedCategoryId = category.id]"
            />
          </div>
        </div>
        <div w-full>
          <div flex flex-col gap-16px w-full>
            <div xl:hidden block>
              <h2 text-14px font-700>
                Choose category
              </h2>
              <CategorySelectBox v-model="selectedCategoryId" :options="extendedOptions" w-full @selected="selectedCategoryId === 'all' ? navigateTo(`/`) : navigateTo(`/category/${selectedCategoryId}`)" />
            </div>
            <SearchBox />
          </div>
          <div flex gap-28px items-center my-24px mt-28px>
            <h2 v-if="selectedCategoryId" w-max font-700 text-18px sm:text-28px whitespace-nowrap>
              {{ selectedCategoryId === 'all' ? `${filteredProjectsCount} All Projects` : `${filteredProjectsCount ?? 0} ${selectedCategory?.name}` }}
            </h2>
            <div h-2px w="full" bg-white />
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
