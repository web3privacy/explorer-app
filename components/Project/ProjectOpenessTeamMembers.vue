<script setup lang="ts">
const props = defineProps<{
  members: {
    name?: string
    role?: string
    link?: string
  }[] | undefined
  anonymous?: boolean
}>()
</script>

<template>
  <div>
    <h3
      text="14px sm:16px app-text-grey"
      leading-24px
    >
      {{ 'Team members' }}
    </h3>
    <div
      grid
      grid-cols-1
      gap-16px
      mt-12px
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
    >
      <template v-if="props.anonymous">
        <span
          text-14px
          opacity-50
        >{{ 'Anonymous team' }}</span>
      </template>
      <template v-else-if="props.members?.length">
        <template
          v-for="member in members"
          :key="member.name"
        >
          <NuxtLink
            :to="member.link"
            target="_blank"
            flex
            items-center
            gap-12px
          >
            <div
              flex
              items-center
              justify-center
              text-black
              w="40px lg:48px"
              h="40px lg:48px"
              rounded-full
              bg-app-bg-team-grey
            >
              <div
                i-heroicons-solid-user
                text-24px
              />
            </div>
            <div
              flex
              flex-col
            >
              <span
                text="14px sm:16px"
                font-700
              >{{ member.name }}</span>
            </div>
          </NuxtLink>
        </template>
      </template>
      <template v-else>
        <span
          text-14px
          opacity-50
        >{{ 'N/A' }}</span>
      </template>
    </div>
  </div>
</template>
