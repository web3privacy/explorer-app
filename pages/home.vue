<template>
  <div text-white>
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
            Explore the Web3 Privacy Landscape
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
          border="1 gray-800"
        >
          <div
            flex
            items-center
            gap-4
            mb-4
          >
            <img
              src="/public/cube.png"
              alt="01 Labs Logo"
              w-12
              h-12
            >
            <div>
              <h4 font-bold>
                01 Labs
              </h4>
              <p text-gray-400>
                applications
              </p>
            </div>
          </div>
          <p
            text-sm
            text-gray-400
          >
            Catalyzing a new generation of applications powered by zero-knowledge cryptography.
          </p>
        </div>

        <!-- Second Card -->
        <div
          bg-black-50
          rounded-lg
          p-6
          border="1 gray-800"
        >
          <div
            flex
            items-center
            gap-4
            mb-4
          >
            <img
              src="/public/cube.png"
              alt="Aztec Logo"
              w-12
              h-12
            >
            <div>
              <h4 font-bold>
                Aztec
              </h4>
              <p text-gray-400>
                infrastructure
              </p>
            </div>
          </div>
          <p
            text-sm
            text-gray-400
          >
            Private smart contract infrastructure enabling secure and private DeFi transactions.
          </p>
        </div>

        <!-- Third Card -->
        <div
          bg-black-50
          rounded-lg
          p-6
          border="1 gray-800"
        >
          <div
            flex
            items-center
            gap-4
            mb-4
          >
            <img
              src="/public/cube.png"
              alt="Railgun Logo"
              w-12
              h-12
            >
            <div>
              <h4 font-bold>
                Railgun
              </h4>
              <p text-gray-400>
                privacy solution
              </p>
            </div>
          </div>
          <p
            text-sm
            text-gray-400
          >
            Zero-knowledge privacy system for smart contract interactions and cryptocurrency transactions.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'clean',
})
</script>

<style scoped>
.bg-app-dark {
  background-color: rgba(18, 18, 18, 0.7);
}
</style>
