<script lang="ts" setup>
import type { ProjectShallow } from '~/types'

defineProps<{
  project: ProjectShallow
}>()
const { switcher } = storeToRefs(useData())
</script>

<template>
  <NuxtLink
    :to="`/project/${project.id}`"
    :class="switcher ? 'flex-row' : 'lg:flex-col'"
    flex
    w-full
    gap-16px
    hover:bg="#121212"
    transition-all
  >
    <div
      relative
      max-w="96px lg:200px"
      w-full
      h="96px lg:200px"
      :class="switcher ? '' : 'lg:max-w-full! lg:w-full '"
    >
      <div
        flex
        items-center
        justify-center
        w-full
        my-auto
        h-full
      >
        <NuxtImg
          :src="project?.image || '/no-image-1-1.svg'"
          class="w-full h-auto"
          max-h="md:196px 96px"
          self-center
          z-10
          object-fit
          bg="#121212"
        />
      </div>
      <ClientOnly>
        <Badge
          v-if="project.percentage"
          absolute
          bottom-0.5
          lg:bottom-0
          right-0.5
          lg:right-0
          mr-2px
          mb-2px
          :text="`${project.percentage}%`"
          class="leading-12px! text-12px! lg:text-18px! border-0!"
          px="4px! lg:16px!"
          py="4px! lg:8px!"
        />
      </ClientOnly>
    </div>
    <div
      h="96px lg:200px"
      lg:py-24px
      lg:pr-24px
      flex
      flex-col
      justify-center
      lg:justify-between
      lg:gap-24px
      w-full
      text-white
      :class="switcher ? '' : 'lg:p-16px! lg:py-16px!'"
    >
      <div
        w-full
        h-fit
        flex
        flex-col
        gap-8px
      >
        <div
          w-fit
          flex
          items-center
          gap-8px
          @click.prevent="navigateTo(project.website, { external: true, open: { target: '_blank' } })"
        >
          <h1
            text="18px lg:24px app-white"
            font-700
            line-clamp-1
            hover:underline
            underline-offset-3
          >
            {{ project.title1 }}
          </h1>
          <UnoIcon
            i-web-open
            text-16px
          />
        </div>
        <h2
          text="14px app-text-grey"
          overflow-hidden
          text-ellipsis
          line-clamp-2
          lg:line-clamp-2
        >
          {{ project.description }}
        </h2>
      </div>
      <div
        w-full
        flex
        justify-between
      >
        <div
          w-full
          max-w-692px
          grid
          whitespace-nowrap
          :class="switcher ? 'grid-cols-5' : 'grid-cols-3'"
          gap-24px
          lg:grid
          hidden
        >
          <ProjectInfoItem
            :check-undefined="project?.github"
            :link="project?.github"
            title="Github"
            bold
            text-size="18px"
          >
            <div
              flex
              items-center
              gap-8px
            >
              <UnoIcon
                i-web-github
                text-16px
              />
              <span>{{ project?.github ? 'YES' : 'NO' }}</span>
            </div>
          </ProjectInfoItem>
          <ProjectInfoItem
            :check-undefined="project.readyness"
            title="Readyness"
            text-size="18px"
          >
            <div
              flex
              items-center
              gap-12px
            >
              <UnoIcon
                i-web-live
                text-10px
                :class="(project.readyness === 'Mainnet') ? 'color-#18FF2F' : (project.readyness === 'Testnet') ? 'color-#FFA800' : (project.readyness === 'Alpha') ? 'color-#FF0000' : ''"
              />
              <span :class="(project.readyness === 'Alpha') ? 'color-#FFA800' : 'color-white'">{{ project.readyness }}</span>
            </div>
          </ProjectInfoItem>
          <ProjectInfoItem
            :check-undefined="true"
            title="Team"
            text-size="18px"
          >
            <span v-if="project.team?.length">{{ `${project.team?.length} members` }}</span>
            <span
              v-else
              color="#FF0000"
            >{{ 'Anonymous' }}</span>
          </ProjectInfoItem>
          <ProjectInfoItem
            :check-undefined="project?.docs"
            :link="project?.docs"
            :color="project?.docs ? '#18FF2F' : '#FF0000'"
            title="Docs"
            bold
            text-size="18px"
          >
            {{ project?.docs ? 'YES' : 'NO' }}
          </ProjectInfoItem>
          <ProjectInfoItem
            :check-undefined="project.audits"
            :link="project?.audits?.[0]?.link ?? undefined"
            :color="project?.audits ? '#18FF2F' : '#FF0000'"
            title="Audit"
            bold
            text-size="18px"
          >
            {{ project.audits ? 'YES' : 'NO' }}
          </ProjectInfoItem>
        </div>
        <div
          hidden
          lg:flex
          items-center
          gap-16px
        >
          <UnoIcon
            v-if="project.forum"
            i-web-forum
            text-28px
            opacity-50
            hover:opacity-100
            @click.prevent="navigateTo(project.forum, { external: true, open: { target: '_blank' } })"
          />
          <UnoIcon
            v-if="project.explorer"
            i-web-explorer
            text-32px
            opacity-50
            hover:opacity-100
            @click.prevent="navigateTo(project.explorer, { external: true, open: { target: '_blank' } })"
          />
          <UnoIcon
            v-if="project.twitter"
            i-web-twitter_x
            text-22px
            opacity-50
            hover:opacity-100
            @click.prevent="navigateTo(project.twitter, { external: true, open: { target: '_blank' } })"
          />
          <UnoIcon
            v-if="project.coingecko"
            i-web-coingecko
            text-24px
            opacity-50
            hover:opacity-100
            @click.prevent="navigateTo(project.coingecko, { external: true, open: { target: '_blank' } })"
          />
          <UnoIcon
            v-if="project.newsletter"
            i-web-news
            text-28px
            opacity-50
            hover:opacity-100
            @click.prevent="navigateTo(project.newsletter, { external: true, open: { target: '_blank' } })"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
