<script setup lang="ts">
defineProps<{
  network?: string
  date?: string
  launchType?: string
  to?: string
}>()
</script>

<template>
  <div
    flex
    items-start
    gap-18px
  >
    <svg
      width="30"
      height="153"
      viewBox="0 0 30 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5002 5.01788L12.5012 149.5"
        stroke="white"
        stroke-dasharray="1 4"
      />
      <circle
        cx="13"
        cy="6"
        r="6"
        fill="white"
      />
      <rect
        y="129"
        width="30"
        height="24"
        fill="url(#paint0_linear_558_22)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_558_22"
          x1="15"
          y1="129"
          x2="15"
          y2="150.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-opacity="0" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </svg>
    <div
      flex
      flex-col
      gap-8px
    >
      <div
        flex
        flex-col
      >
        <span
          text-14px
          font-700
        >{{ network }}</span>
        <span
          text-14px
          font-400
        >{{ date }}</span>
      </div>
      <div
        flex
        flex-col
      >
        <span
          text-14px
          font-400
        >{{ 'Launch' }}</span>
        <span
          text-14px
          font-400
          text-app-text-grey
        >{{ launchType }}</span>
      </div>
      <NuxtLink
        underline
        underline-offset-4
        :to="to"
      >
        {{ 'Learn more' }}
      </NuxtLink>
    </div>
  </div>
</template>
