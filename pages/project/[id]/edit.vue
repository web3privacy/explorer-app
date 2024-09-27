<script setup lang="ts">
import * as yup from 'yup'
import ProjectCreateCategoriesBasicInfo from '~/components/Project/Create/Categories/BasicInfo.vue'
import ProjectCreateCategoriesAssets from '~/components/Project/Create/Categories/Assets.vue'
import ProjectCreateCategoriesLinks from '~/components/Project/Create/Categories/Links.vue'
import ProjectCreateCategoriesTechnology from '~/components/Project/Create/Categories/Technology.vue'
import ProjectCreateCategoriesPrivacy from '~/components/Project/Create/Categories/Privacy.vue'
import ProjectCreateCategoriesSecurity from '~/components/Project/Create/Categories/Security.vue'
import ProjectCreateCategoriesTeam from '~/components/Project/Create/Categories/Team.vue'
import ProjectCreateCategoriesFunding from '~/components/Project/Create/Categories/Funding.vue'
import ProjectCreateCategoriesHistory from '~/components/Project/Create/Categories/History.vue'

definePageMeta({
  layout: 'create',
})

const { projects } = useData()
const { saveProject, setProject, publishProject, saveProjectImage } = useProject()
const { project, isPublishing } = storeToRefs(useProject())

const route = useRoute()
await until(projects).toMatch(p => p?.length > 0)
setProject(route.params.id as string)

if (!project.value) {
  throw createError({
    statusCode: 404,
    message: 'Project not found',
    fatal: true,
  })
}

const tabs = reactive([
  { label: 'Basic Info', value: 'basic_info', component: markRaw(ProjectCreateCategoriesBasicInfo) },
  { label: 'Assets', value: 'assets', component: markRaw(ProjectCreateCategoriesAssets) },
  { label: 'Links', value: 'links', component: markRaw(ProjectCreateCategoriesLinks) },
  { label: 'Technology', value: 'technology', component: markRaw(ProjectCreateCategoriesTechnology) },
  { label: 'Privacy', value: 'privacy', component: markRaw(ProjectCreateCategoriesPrivacy) },
  { label: 'Security', value: 'security', component: markRaw(ProjectCreateCategoriesSecurity) },
  { label: 'Team', value: 'team', component: markRaw(ProjectCreateCategoriesTeam) },
  { label: 'Funding', value: 'funding', component: markRaw(ProjectCreateCategoriesFunding) },
  { label: 'History', value: 'history', component: markRaw(ProjectCreateCategoriesHistory) },
])

const selectedTab = ref(tabs[0].value)

function getCurrentComponent() {
  const tab = tabs.find(t => t.value === selectedTab.value) || tabs[0]
  return tab.component || null
}

const currentComponent = ref()

const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
})

const logoSrc = ref(project.value?.logos?.[0].url || '/no-image-1-1.svg')

onChange((files) => {
  if (!files?.[0]) return
  const file = files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    logoSrc.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  saveProjectImage(file)
})

const projectNameInput = ref<HTMLInputElement | null>(null)
function useProjectName() {
  const isEditing = ref(false)
  // const name = ref('Untitled')
  const { value: name, errorMessage: nameError } = useField<string>('name', yup.string().required().notOneOf(['Untitled', 'Undefined', 'Create', 'create']))
  name.value = project.value?.name || 'Untitled'

  function toggleEdit() {
    isEditing.value = !isEditing.value
    if (isEditing.value) {
      setTimeout(() => {
        projectNameInput.value?.focus()
      }, 0)
    }
  }

  return {
    isEditing,
    name,
    nameError,
    toggleEdit,
  }
}

const { isEditing, name, nameError, toggleEdit } = useProjectName()
name.value = project.value?.name || 'Untitled'

function save() {
  saveProject({
    ...project.value,
    name: name.value,
  })
}

async function next() {
  if (nameError.value)
    return

  if (selectedTab.value === 'basic_info') {
    if (!currentComponent.value.isFormValid())
      return
    else save()
  }

  currentComponent.value.save()

  const currentIndex = tabs.findIndex(tab => tab.value === selectedTab.value)
  const nextTab = tabs[currentIndex + 1] || tabs[0]
  selectedTab.value = nextTab.value
}

async function publish() {
  if (selectedTab.value === 'basic_info') {
    if (!currentComponent.value.isFormValid())
      return
    else save()
  }
  else if (isPublishing) {
    return
  }

  currentComponent.value.save()

  await publishProject()
  navigateTo(`/project/${project.value?.id || project.value?.name?.toLowerCase().replace(/\s+/g, '-')}`)
}

function jumpTo(tab: string) {
  if (selectedTab.value === 'basic_info') {
    if (!currentComponent.value.isFormValid())
      return
    else save()
  }

  currentComponent.value.save()

  selectedTab.value = tab
}
const transitionDone = ref(false)
</script>

<template>
  <div w-full>
    <div
      bg-app-bg-dark_grey
      px-16px
      py-24px
      lg="pb-0px mb--1px"
    >
      <div app-container>
        <div
          flex
          items-center
          gap-16px
        >
          <div
            relative
            class="parent"
          >
            <NuxtImg
              lg="w-100px h-100px"
              w-64px
              h-64px
              bg-app-bg-grey
              object-cover
              border-2
              class="border-app-white/30"
              :src="logoSrc ?? '/no-image-1-1.svg'"
            />
            <button
              h-24px
              hidden
              parent-hover:flex
              absolute
              bottom-0
              w-full
              border-t-0
              border-2
              border-black
              border-opacity-50
              h-fit
              justify-center
              text="12px"
              font-700
              bg-app-white
              text-app-black
              @click="open()"
            >
              Upload Logo
            </button>
          </div>
          <div
            flex
            flex-col
            gap-8px
          >
            <h3
              font-400
              text="14px app-white/50"
              leading-20px
            >
              {{ 'Project Name' }}
            </h3>
            <div
              flex
              items-center
              gap-12px
              relative
            >
              <input
                v-if="isEditing"
                ref="projectNameInput"
                v-model="name"
                w-fit
                onkeydown="this.style.width = 0; this.style.width = this.scrollWidth + 2 + 'px';"
                type="text"
                font-700
                text-20px
                leading-28px
                bg-app-bg-dark_grey
                onfocus="this.style.width = 0; this.style.width = this.scrollWidth + 2 + 'px';"
                @blur="toggleEdit()"
              >
              <h2
                v-else
                font-700
                text-20px
                leading-28px
              >
                {{ name }}
              </h2>
              <button
                v-if="!isEditing"
                @click="toggleEdit()"
              >
                <UnoIcon
                  text-20px
                  class="text-app-white/30"
                  hover:text-app-white
                  i-heroicons-solid-pencil
                />
              </button>
              <span
                v-if="nameError"
                text-nowrap
                text-app-danger
                text-12px
                absolute
                lg:bottom--24px
                bottom--16px
                select-none
              >Invalid project name</span>
            </div>
          </div>
        </div>
        <div
          flex
          w-full
          gap-46px
          lg="mt-24px"
        >
          <SelectBox
            :model-value="selectedTab"
            label="Choose category"
            :options="tabs.map(t => ({ label: t.label, value: t.value }))"
            :border-opacity="100"
            w-full
            lg:hidden
            block
            mt-16px
            @update:model-value="$event => jumpTo($event)"
          />
          <button
            v-for="tab in tabs"
            :key="tab.value"
            lg:block
            hidden
            pb-8px
            leading-40px
            :class="selectedTab === tab.value ? 'font-bold border-b-4 border-app-white' : ''"
            @click="jumpTo(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>
    <div
      border-t-2
      class="border-app-white/30"
      px-8px
      py-8px
      md:py-24px
    >
      <div
        app-container
        mb-55px
      >
        <ClientOnly>
          <Transition
            v-if="!transitionDone"
            name="fade"
            mode="out-in"
            appear
            @after-enter="transitionDone = true"
          >
            <component
              :is="getCurrentComponent()"
              ref="currentComponent"
              :project="project"
              w-full
              flex
              flex-col
              gap-24px
            />
          </Transition>
          <component
            :is="getCurrentComponent()"
            v-else
            ref="currentComponent"
            :project="project"
            w-full
            flex
            flex-col
            gap-8px
          />
          <Button
            v-if="selectedTab !== tabs[tabs.length - 1].value"
            class="hidden!"
            mt-48px
            lg="w-fit flex!"
            border
            @click="next()"
          >
            <span px-24px>NEXT SECTION</span>
          </Button>
        </ClientOnly>
      </div>
    </div>
    <div
      flex
      flex-col
      gap-10px
      justify-center
      text-center
      md:fixed
      bottom-0
      w-full
      bg-app-bg-dark_grey
      class="border-app-white/30"
      lg="bg-app-black w-fit border-l-2 border-t-2 right-0 border-app-white"
      p-12px
    >
      <Button
        v-if="selectedTab !== tabs[tabs.length - 1].value"
        flex
        lg="w-fit hidden!"
        border
        @click="next()"
      >
        <span px-24px>NEXT SECTION</span>
      </Button>
      <span
        v-if="selectedTab !== tabs[tabs.length - 1].value"
        lg="hidden"
        block
        text="12px italic app-white/50"
      >or you can submit changes by publishing them</span>
      <div flex>
        <Button
          w-full
          lg="w-fit"
          border
          @click="navigateTo(`/project/${route.params.id}`)"
        >
          <span px-24px>CANCEL</span>
        </Button>
        <Button
          w-full
          lg="w-fit"
          inverted-color
          @click="publish()"
        >
          <UnoIcon
            v-if="isPublishing"
            w-108px
            i-eos-icons-loading
            text-black
            text-18px
          />
          <span
            v-else
            px-24px
          >PUBLISH</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
