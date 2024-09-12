<script setup lang="ts">
defineProps<{
  label?: string
  hint?: string
}>()

const enabled = defineModel<boolean>()
</script>

<template>
  <div
    flex
    flex-col
    gap-8px
    lg="flex flex-row gap-24px"
    relative
  >
    <div
      flex
      items-center
      gap-24px
      lg="w-1/2"
    >
      <HeadlessSwitch
        v-model="enabled"
        :class="enabled ? 'bg-white/10' : 'bg-white/10'"
        class="relative inline-flex h-[28px] w-[68px] shrink-0 cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-9 bg-app-white' : 'translate-x-0 bg-app-black border-2 border-app-white'"
          flex
          items-center
          class="pointer-events-none inline-block h-[28px] w-[32px] transform shadow-lg ring-0 transition duration-200 ease-in-out"
        >
          <UnoIcon
            v-if="enabled"
            transition
            duration-200
            ease-in-out
            i-heroicons-solid-check
            w-full
            text-20px
            text-app-black
          />
          <UnoIcon
            v-else
            transition
            duration-200
            ease-in-out
            i-heroicons-solid-x
            w-full
            text-20px
            text-app-white
          />
        </span>
      </HeadlessSwitch>
      <span
        v-if="label"
        text-14px
        font-400
        lg="text-16px"
        :class="enabled ? 'text-app-white' : 'text-app-white/50'"
      >
        {{ label }}
      </span>
    </div>
    <span
      v-if="hint"
      lg="left-1/2 self-center"
      font-400
      italic
      lg:text-14px
      text-12px
      text-app-white
      opacity-50
    >
      {{ hint }}
    </span>
  </div>
</template>
