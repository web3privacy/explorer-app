<template>
  <div text-white>
    <!-- Hamburger and Menu -->
    <div class="relative w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg">
      <img
        src="/public/logo.svg"
        alt="Logo"
        class="h-10"
      >
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
        <div
          bg-black-50
          rounded-lg
          p-6
          border="1 gray-700"
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

        <!-- Second Card -->
        <div
          bg-black-50
          rounded-lg
          p-6
          border="1 gray-700"
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

        <!-- Third Card -->
        <div
          bg-black-50
          rounded-lg
          p-6
          border="1 gray-700"
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'clean',
})
const menuOpen = ref(false)
</script>

<style>
.bg-app-dark {
  background-color: rgba(18, 18, 18, 0.7);
}
</style>
