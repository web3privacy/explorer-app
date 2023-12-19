<script setup lang="ts">
const props = defineProps<{
  members: {
    name: string
    role?: string
    link?: string
  }[] | undefined
}>()
</script>

<template>
  <div>
    <h3 text="14px sm:16px app-text-grey" leading-24px>
      {{ 'Team members' }}
    </h3>
    <div grid grid-cols-1 gap-16px mt-12px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4>
      <template v-if="props.members?.length">
        <template v-for="member in members" :key="member.name">
          <div flex gap-12px>
            <template v-if="member.link">
              <NuxtImg :src="member.link" width="48" height="48" :alt="member.name" />
            </template>
            <template v-else>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle opacity="0.2" cx="24" cy="24" r="23.5" stroke="white" />
                <g opacity="0.2">
                  <mask id="mask0_2200_7716" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24">
                    <rect x="12" y="12" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_2200_7716)">
                    <path d="M24 24C22.9 24 21.9583 23.6083 21.175 22.825C20.3917 22.0417 20 21.1 20 20C20 18.9 20.3917 17.9583 21.175 17.175C21.9583 16.3917 22.9 16 24 16C25.1 16 26.0417 16.3917 26.825 17.175C27.6083 17.9583 28 18.9 28 20C28 21.1 27.6083 22.0417 26.825 22.825C26.0417 23.6083 25.1 24 24 24ZM16 32V29.2C16 28.6333 16.1458 28.1125 16.4375 27.6375C16.7292 27.1625 17.1167 26.8 17.6 26.55C18.6333 26.0333 19.6833 25.6458 20.75 25.3875C21.8167 25.1292 22.9 25 24 25C25.1 25 26.1833 25.1292 27.25 25.3875C28.3167 25.6458 29.3667 26.0333 30.4 26.55C30.8833 26.8 31.2708 27.1625 31.5625 27.6375C31.8542 28.1125 32 28.6333 32 29.2V32H16Z" fill="white" />
                  </g>
                </g>
              </svg>
            </template>
            <div flex flex-col>
              <span text="14px sm:16px" font-700>{{ member.name }}</span>
              <span text="14px sm:16px app-text-grey" font-400>{{ member.role ?? 'N/A' }}</span>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <span text-14px opacity-50>{{ 'N/A' }}</span>
      </template>
    </div>
  </div>
</template>
