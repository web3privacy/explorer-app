<template>
  <div
    lg:flex
    gap-32px
  >
    <div
      hidden
      w-full
      max-w-320px
      lg:block
    />
    <div w-full>
      <slot />
    </div>
  </div>
</template>
