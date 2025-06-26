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

const { showBar } = storeToRefs(useNavigation())
const swipeEl = ref()
const { y } = useWindowScroll()
const scrollEl = ref()
const { y: scrollY } = useScroll(scrollEl)
const { top } = useElementBounding(scrollEl)
const menuOpen = ref(false)

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

const handleCategorySelection = async (value: string) => {
  // Store current scroll position
  const currentScrollY = window.scrollY

  try {
    if (value === 'all') {
      await navigateTo('/')
    }
    else {
      await navigateTo(`/category/${value}`)
    }

    // Restore scroll position after navigation
    setTimeout(() => {
      window.scrollTo(0, currentScrollY)
    }, 100)
  }
  catch (error) {
    console.error('Navigation error:', error)
  }
}
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
    <!-- Hamburger and Menu -->
    <div class="relative w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg">
      <a href="https://web3privacy.info/">
        <img
          src="/public/logo.svg"
          alt="Logo"
          class="h-10"
        >
      </a>

      <div class="flex items-center gap-2">
        <button
          class="p-2"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <svg
            width="32"
            height="32"
            fill="currentColor"
          ><rect
            y="6"
            width="32"
            height="4"
          /><rect
            y="14"
            width="32"
            height="4"
          /><rect
            y="22"
            width="32"
            height="4"
          /></svg>
        </button>

        <nav>
          <ul
            :class="[
              menuOpen ? 'block' : 'hidden',
              'absolute right-0 top-16 bg-gray-700 rounded shadow-lg p-4 z-50 min-w-[180px] text-center',
            ]"
          >
            <!-- <li class="mb-2">
              <NuxtLink to="https://explorer.web3privacy.info/">
                Explorer
              </NuxtLink>
            </li> -->
            <li class="mb-2">
              <NuxtLink to="/about">
                About
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/s9flkE6tMaJ4f2tzWu-FmDy7Zx_TRPe3jdXr2iYmYH0">
                Scoring
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="https://github.com/web3privacy/explorer-data">
                Contribute
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/project/create">
                Add Project
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <section
      relative
      h="[500px]"
      w-full
      bg-black
    >
      <img
        src="/public/explorer-hero.png"
        absolute
        inset-0
        w-full
        h-full
        object-cover
        opacity-50
      >
      <div
        absolute
        inset-0
        bg="gradient-to-b from-transparent to-black/90"
      >
        <div
          container
          mx-auto
          px-4
          py-20
        >
          <h1
            text="5xl md:6xl"
            font-bold
            max-w-3xl
            mb-6
          >
            Dashboard for the privacy ecosystem in web3
          </h1>
          <h2
            text="3xl md:4xl"
            font-medium
            mb-8
          >
            Discover 600+ Projects
          </h2>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section
      container
      mx-auto
      px-4
      py-16
    >
      <h3
        text-3xl
        font-bold
        mb-8
        bg-white
        text-black
        px-4
        py-2
        rounded-lg
      >
        Highlights
      </h3>
      <div
        grid="~ cols-1 md:cols-3"
        gap-6
      >
        <!-- First Card -->
        <NuxtLink
          to="https://explorer.web3privacy.info/project/railgun"
          class="no-underline"
        >
          <div
            bg-black-50
            rounded-lg
            p-6
            border="1 gray-700"
            hover:bg-gray-800
            transition-colors
            cursor-pointer
          >
            <div
              flex
              items-center
              gap-4
              mb-4
            >
              <img
                src="/public/logo-railgun.png"
                alt="Railgun Logo"
                w-12
                h-12
              >
              <div>
                <h4 font-bold>
                  Railgun
                </h4>
                <p text-gray-400>
                  Applications
                </p>
              </div>
            </div>
            <p
              text-sm
              text-gray-400
            >
              A privacy-focused smart contract platform that enables private transactions on Ethereum and other blockchains.
            </p>
          </div>
        </NuxtLink>

        <!-- Second Card -->
        <NuxtLink
          to="https://explorer.web3privacy.info/project/aztec"
          class="no-underline"
        >
          <div
            bg-black-50
            rounded-lg
            p-6
            border="1 gray-700"
            hover:bg-gray-800
            transition-colors
            cursor-pointer
          >
            <div
              flex
              items-center
              gap-4
              mb-4
            >
              <img
                src="/public/logo-aztec.png"
                alt="Aztec Logo"
                w-12
                h-12
              >
              <div>
                <h4 font-bold>
                  Aztec
                </h4>
                <p text-gray-400>
                  Infrastructure
                </p>
              </div>
            </div>
            <p
              text-sm
              text-gray-400
            >
              A privacy-first L2 on Ethereum that has a hybrid privacy model.
            </p>
          </div>
        </NuxtLink>

        <!-- Third Card -->
        <NuxtLink
          to="https://explorer.web3privacy.info/project/cake-wallet"
          class="no-underline"
        >
          <div
            bg-black-50
            rounded-lg
            p-6
            border="1 gray-700"
            hover:bg-gray-800
            transition-colors
            cursor-pointer
          >
            <div
              flex
              items-center
              gap-4
              mb-4
            >
              <img
                src="/public/logo-cake.png"
                alt="Cake Wallet Logo"
                w-12
                h-12
              >
              <div>
                <h4 font-bold>
                  Cake Wallet
                </h4>
                <p text-gray-400>
                  Applications
                </p>
              </div>
            </div>
            <p
              text-sm
              text-gray-400
            >
              A secure and private wallet for Monero and other cryptocurrencies, focusing on user privacy.
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Search and Filters -->
    <div
      app-container
      mt-32px
      relative
    >
      <divMore
        actions
        md:hidden
        block
        absolute
        z-5
        class="bg-gradient-to-r from-transparent to-app-black "
        w-50px
        h-35px
        top-14
        right-0
      />
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
          >
            <SearchBox
              flex-1
              class="w-full lg:max-w-1/3"
              placeholder:text-app-text-grey
              :placeholder="`Search in ${filteredProjectsCount} Projects`"
            />
            <div
              md:flex-2
              flex
              items-center
              gap-16px
              relative
              overflow-x-auto
              pb-274px
              mb--250px
              md="overflow-x-visible pb-0 mb-0"
              class="no-scrollbar lg:w-full lg:max-w-2/3"
            >
              <CategorySelectBox
                v-model="selectedCategoryId"
                :options="categoryOptions"
                name="categorySelect"
                w-full
                @selected="handleCategorySelection"
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
