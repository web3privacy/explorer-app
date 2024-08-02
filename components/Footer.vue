<script setup lang="ts">
</script>

<template>
  <div app-container>
    <div mt-48px>
      <hr border-t-2px border-white opacity-10 w-full>
    </div>
    <div p-24px flex items-center>
      <div shrink-0 flex gap-32px justify-start>
        <NuxtImg src="/logo.svg" max-w-120px sm:w-160px cursor-pointer @click="navigateTo('/')" />
      </div>
      <div w-full h-fit flex justify-end items-center gap-16px sm:gap-32px mt-0>
        <NuxtLink to="https://twitter.com/web3privacy" target="_blank" flex items-center gap-12px>
          <UnoIcon i-web-twitter_x opacity-50 text-22px />
          <span hover:underline hidden lg:block text-16px>{{ '@web3privacy' }}</span>
        </NuxtLink>
        <NuxtLink to="https://t.me/web3privacynow" target="_blank" flex items-center gap-12px>
          <UnoIcon i-web-telegram1 opacity-50 text-24px />
          <span hover:underline hidden lg:block text-16px>{{ 'Telegram' }}</span>
        </NuxtLink>
        <NuxtLink to="https://matrix.web3privacy.info/" target="_blank" flex items-center gap-12px>
          <UnoIcon i-web-matrix opacity-50 text-24px />
          <span hover:underline hidden lg:block text-16px>{{ 'Matrix' }}</span>
        </NuxtLink>
        <NuxtLink to="https://github.com/web3privacy" target="_blank" flex items-center gap-12px>
          <UnoIcon i-web-github opacity-50 text-24px />
          <span hover:underline hidden lg:block text-16px>{{ 'GitHub' }}</span>
        </NuxtLink>
      </div>
    </div>
    <div text="14px sm:16px" px-24px grid grid-cols-2 sm:grid-cols-3 gap-16px mt-32px mb-16px>
      <NuxtLink to="https://docs.web3privacy.info/manifesto" opacity-50 hover:underline>
        {{ 'Manifesto' }}
      </NuxtLink>
      <NuxtLink to="https://docs.web3privacy.info/get-involved" opacity-50 hover:underline>
        {{ 'How to get involved' }}
      </NuxtLink>
      <NuxtLink to="https://github.com/web3privacy/grants" opacity-50 hover:underline>
        {{ 'Grants /  Support Us' }}
      </NuxtLink>
      <NuxtLink to="https://web3privacy.info/events" opacity-50 hover:underline>
        {{ 'Events' }}
      </NuxtLink>
      <NuxtLink to="https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/" opacity-50 hover:underline>
        {{ 'Articles' }}
      </NuxtLink>
      <NuxtLink to="https://docs.web3privacy.info/events/" opacity-50 hover:underline>
        {{ 'Talks' }}
      </NuxtLink>
      <NuxtLink to="https://docs.web3privacy.info/projects/privacy-explorer/" opacity-50 hover:underline>
        {{ 'Privacy Explorer' }}
      </NuxtLink>
      <NuxtLink to="https://github.com/web3privacy/web3privacy" opacity-50 hover:underline>
        {{ 'Privacy database' }}
      </NuxtLink>
    </div>
    <hr block sm:hidden border-t-2px border-white opacity-10 w-full>
    <div px-24px my-16px sm:mt-32px flex flex-col sm:flex-row w-full items-center justify-between gap-18px>
      <a w-full opacity-50 text-14px leading-24px font-400>{{ 'All rights not reserved,  Creative commons 2024 - Web3Privacy z.s.' }}</a>
      <div w-full sm:w-fit sm:justify-end items-center flex flex-row gap-6px>
        <span text-14px text-app-text-grey whitespace-nowrap>{{ 'Developed by' }}</span>
        <div
          shrink-0
          bg="[url(/develit-logo-white.svg)]" duration-300 bg-no-repeat bg-center
          cursor-pointer w-full max-w-104px h-32px hover:bg="[url(/develit-logo-color.svg)]"
          @click="navigateTo('https://develit.io/', { external: true })"
        />
      </div>
    </div>
  </div>
</template>
