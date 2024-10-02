<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
    appear
  />
  <div
    border="t-1px b-1px white/20"
    w-full
    h-128px
    bg-app-bg-dark_grey
  >
    <div
      relative
      app-container
      h-full
      flex
      items-center
      gap-16px
    >
      <NuxtImg
        h-full
        src="/cube.png"
        mix-blend-screen
      />
      <div
        max-w-794px
        max-h-88px
      >
        <h3
          text-16px
          font-700
          leading-24px
        >
          Privacy has many faces
        </h3>
        <p text="14px white/50">
          There are challenges in finding crucial technical details and comparing various privacy-focused projects.<br> To address this, we created a platform that standardizes and expands the current <NuxtLink
            to="https://web3privacy.info/"
            target="_blank"
            underline
            class="text-white"
          >
            Web3Privacy ecosystem research.
          </NuxtLink>
        </p>
        <NuxtLink
          to="https://github.com/web3privacy/privacy-projects-db"
          hover:underline
          target="_blank"
          text-14px
          flex
          items-center
          gap-4px
        >
          Help us shape privacy scoring
          <UnoIcon
            i-web-arrowright
            text-16px
            w-16px
            h-16px
          />
        </NuxtLink>
      </div>
      <button
        absolute
        top-16px
        right-20px
        @click="model = true"
      >
        <UnoIcon
          i-web-close
          text-16px
          w-16px
          h-16px
        />
      </button>
    </div>
  </div>
</template>
