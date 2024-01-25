<script lang="ts" setup>
const route = useRoute()

const isProjectRoute = computed(() => {
  return route.fullPath.includes('/project/')
})

const showMenu = ref(false)
const { showBar, showText } = storeToRefs(useNavigaiton())
const { width } = useWindowSize()
const { y } = useWindowScroll()

watch(y, (newY, oldY) => {
  if (newY < oldY && newY < 10)
    showText.value = true
  else
    showText.value = false
})
</script>

<template>
  <div v-if="showMenu" w-full flex flex-col items-center>
    <NuxtLink to="https://web3privacy.info/" bg-black hover:bg-white w-full text-center justify-center py-14px cursor-pointer text-app-text-grey class="hover:text-black" hover:underline underline-offset-1 text-16px font-400 uppercase>
      HOME
    </NuxtLink>
    <NuxtLink bg-black hover:bg-white w-full text-center justify-center py-14px cursor-pointer text-white class="hover:text-black" hover:underline underline-offset-1 text-16px font-400 to="/">
      PROJECTS
    </NuxtLink>
    <NuxtLink to="https://web3privacy.info/events/" bg-black hover:bg-white w-full text-center justify-center py-14px cursor-pointer text-app-text-grey class="hover:text-black" hover:underline underline-offset-1 text-16px font-400 uppercase>
      EVENTS
    </NuxtLink>
    <NuxtLink bg-black hover:bg-white w-full justify-center to="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/" flex items-center py-14px cursor-pointer text-app-text-grey class="hover:text-black" hover:underline underline-offset-1 text-16px font-400 uppercase>
      ARTICLES
      <UnoIcon ml-10px i-web-open1 text-11px />
    </NuxtLink>
    <NuxtLink bg-black hover:bg-white w-full justify-center to="https://docs.web3privacy.info/" flex items-center py-14px cursor-pointer text-app-text-grey class="hover:text-black" hover:underline underline-offset-1 text-16px font-400 uppercase>
      DOCS
      <UnoIcon ml-10px i-web-open1 text-11px />
    </NuxtLink>
  </div>
  <div w-full sticky md:relative top-0 z-100 bg-black lg:bg-app-bg-dark_grey>
    <div v-if="!isProjectRoute" relative app-container w-full h-full>
      <img
        absolute w-full h-167px sm:h-207px md:h-303px object-cover src="/web3privacy_eye.webp" z-101
        class="object-pos-custom left--11% top-0 max-w-250px sm:max-w-335px md:max-w-588px"
        :class="[(!showText && width < 768) ? 'opacity-0' : 'opacity-10', (!showText && width < 768) ? 'translate-y--128px' : 'translate-y-0px']" duration-200ms
      >
    </div>
    <div app-container flex items-center justify-between h-80px py-6 gap-24px>
      <div flex gap-16px w-full relative z-105>
        <UnoIcon shrink-0 i-web-hamburger text-24px lg:hidden @click="showMenu ? showMenu = false : showMenu = true" />
        <NuxtImg max-w-160px w-full src="/logo.svg" cursor-pointer @click="navigateTo('/')" />
      </div>
      <div hidden lg:flex items-center justify-center>
        <NuxtLink to="https://web3privacy.info/" py-2 px-4 cursor-pointer text-app-text-grey class="hover:text-[#c2c2c2]" hover:underline underline-offset-1 text-16px font-400 uppercase>
          HOME
        </NuxtLink>
        <NuxtLink py-2 px-4 cursor-pointer text-white class="hover:text-[#c2c2c2]" hover:underline underline-offset-1 text-16px font-400 to="/">
          DASHBOARD
        </NuxtLink>
        <NuxtLink to="https://web3privacy.info/events/" py-2 px-4 cursor-pointer text-app-text-grey class="hover:text-[#c2c2c2]" hover:underline underline-offset-1 text-16px font-400 uppercase>
          EVENTS
        </NuxtLink>
        <NuxtLink to="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/" flex items-center py-2 px-4 cursor-pointer text-app-text-grey class="hover:text-[#c2c2c2]" hover:underline underline-offset-1 text-16px font-400 uppercase>
          ARTICLES
          <UnoIcon ml-10px i-web-open1 text-11px />
        </NuxtLink>
        <NuxtLink to="https://docs.web3privacy.info/" flex items-center py-2 px-4 cursor-pointer text-app-text-grey class="hover:text-[#c2c2c2]" hover:underline underline-offset-1 text-16px font-400 uppercase>
          DOCS
          <UnoIcon ml-10px i-web-open1 text-11px />
        </NuxtLink>
      </div>
      <div w-full h-full flex justify-end items-start lg:grow-0 gap-3 lg:gap-6 pt-1 lg:pt-2.5>
        <NuxtLink to="https://twitter.com/web3privacy">
          <UnoIcon target="_blank" i-web-twitter_x text-18px sm:text-24px opacity-50 hover:opacity-100 />
        </NuxtLink>
        <NuxtLink to="https://t.me/web3privacynow">
          <UnoIcon target="_blank" i-web-telegram1 text-20px sm:text-24px opacity-50 hover:opacity-100 />
        </NuxtLink>
        <NuxtLink to="https://matrix.to/#/#web3privacy:gwei.cz">
          <UnoIcon target="_blank" i-web-matrix text-20px sm:text-24px opacity-50 hover:opacity-100 />
        </NuxtLink>
        <NuxtLink to="https://github.com/web3privacy" target="_blank">
          <UnoIcon i-web-github text-20px sm:text-24px opacity-50 hover:opacity-100 />
        </NuxtLink>
      </div>
    </div>
  </div>
  <div
    v-if="isProjectRoute" top-96px z-99 sticky md:static
    :class="[(!showBar && width < 768) ? 'translate-y--128px' : 'translate-y-0px']" duration-200ms
  >
    <ProjectNavigation md:mt-16px />
  </div>
  <div v-else bg-black lg:bg-app-bg-dark_grey>
    <div
      app-container flex items-center gap-32px pb-16px pt-16px sm:pb-32px
    >
      <div w-full flex flex-col items-center :class="[!showText && width < 768 ? 'opacity-0' : 'opacity-100']" duration-200ms relative z-101>
        <img src="/explorer.webp" max-w-155px sm:max-w-342px>
        <p mt-24px hidden md:block text-14px text-center font-400 leading-24px text-app-text-grey>
          {{ 'There are challenges in finding crucial technical details and comparing various privacy-focused projects.' }}<br>
          {{ 'To address this, we created a platform that standardizes and expands the current ' }}
          <NuxtLink to="https://web3privacy.info/" target="_blank" underline text-white>
            {{ 'Web3Privacy ecosystem research.' }}
          </NuxtLink><br>
          {{ 'Our goal is to make this valuable information accessible to the wider Web3 community.' }}
        </p>
        <NuxtLink
          to="https://github.com/web3privacy/privacy-projects-db"
          target="_blank"
          mt-12px flex text-14px items-center gap-8px sm:text-16px hover:underline
        >
          {{ 'Learn how to contribute' }}
          <UnoIcon i-heroicons-solid-arrow-right text-24px />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.object-pos-custom {
  object-position: top 20% right 0%;
}

@media only screen and (min-width: 768px) {
  .object-pos-custom {
    object-position: top 40% right 0%;
  }
}
</style>
