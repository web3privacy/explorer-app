<script setup lang="ts">
defineProps<{
  border?: boolean
}>()
</script>

<template>
  <div
    flex
    items-center
    gap-12px
    px-12px
    py-6px
    cursor-pointer
    text-app-white
    :class="[border ? 'border-2px border-app-white' : 'border-0']"
    hover:text-app-black
    hover:bg-app-white
  >
    <template v-if="!!$slots.prefix">
      <div text-24px>
        <slot
          v-if="!!$slots.prefix"
          name="prefix"
        />
      </div>
    </template>
    <div
      text="14px"
      leading-32px
      font-700
    >
      <slot />
    </div>
  </div>
</template>
