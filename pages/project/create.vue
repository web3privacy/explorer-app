<script setup lang="ts">
import ContactDialog from '~/components/Project/Create/Components/ContactDialog.vue'

definePageMeta({
  layout: 'create',
})

const { saveProjectImage, clearProject } = useProject()
const { project } = storeToRefs(useProject())

const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
})

const logoSrc = ref('/no-image-1-1.svg')

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

const { next, jumpTo, publish, toggleEditName, initForm } = useProjectForm()
const { currentComponent, selectedTab, tabsArray, isEditingName, name, nameError, isPublishing } = storeToRefs(useProjectForm())

const projectNameInput = ref<HTMLInputElement | null>(null)
watch(isEditingName, () => {
  if (isEditingName.value) {
    setTimeout(() => {
      projectNameInput.value?.focus()
    }, 0)
  }
})

const transitionDone = ref(false)

const isOpen = ref(false)

const handleDialog = () => {
  isOpen.value = true
}

onBeforeMount(() => {
  clearProject()
  initForm()
})
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
              opacity-30
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
              border-opacity-80
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
                v-if="isEditingName"
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
                @blur="toggleEditName()"
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
                v-if="!isEditingName"
                @click="toggleEditName()"
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
          <ProjectCreateComponentsSelect
            :model-value="selectedTab"
            label="Choose category"
            :options="tabsArray.map((t, index) => ({ label: t.label, value: index }))"
            w-full
            class="lg:hidden! block!"
            mt-16px
            @update:model-value="$event => jumpTo($event)"
          />
          <button
            v-for="(tab, index) in tabsArray"
            :key="tab.value"
            lg:block
            hidden
            pb-8px
            leading-40px
            :class="selectedTab === index ? 'font-bold border-b-4 border-app-white' : ''"
            @click="jumpTo(index)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>
    <div
      border-t-2
      class="border-app-white/30"
      px-16px
      py-24px
    >
      <div
        app-container
        lg="mb-55px"
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
              :is="tabsArray[selectedTab].component"
              ref="currentComponent"
              :project="project"
              w-full
              flex
              flex-col
              gap-24px
            />
          </Transition>
          <component
            :is="tabsArray[selectedTab].component"
            v-else
            ref="currentComponent"
            :project="project"
            w-full
            flex
            flex-col
            gap-24px
          />
          <Button
            v-if="selectedTab !== tabsArray.length - 1"
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
    <ContactDialog v-model="isOpen" />
    <Transition
      name="fade"
      mode="out-in"
      appear
    >
      <div
        v-if="transitionDone"
        flex
        flex-col
        gap-16px
        justify-center
        text-center
        block
        lg:fixed
        bottom-0
        w-full
        bg-app-bg-dark_grey
        class="border-app-white/30"
        lg="bg-app-black w-fit border-l-2 border-t-2 right-0 border-app-white"
        p-12px
      >
        <Button
          v-if="selectedTab !== tabsArray.length - 1"
          flex
          lg="w-fit hidden!"
          border
          @click="next()"
        >
          <span px-24px>NEXT SECTION</span>
        </Button>
        <span
          v-if="selectedTab !== tabsArray.length - 1"
          lg="hidden"
          block
          text="12px italic app-white/50"
        >or you can submit changes by publishing them</span>
        <div flex>
          <Button
            w-full
            lg="w-fit"
            border
            @click="navigateTo('/')"
          >
            <span px-24px>CANCEL</span>
          </Button>
          <Button
            w-full
            lg="w-fit"
            inverted-color
            @click="isPublishing ? null : publish(true)"
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
          <Button
            w-full
            lg="w-fit"
            inverted-color
            @click="handleDialog()"
          >
            TEST DIALOG
          </Button>
        </div>
      </div>
    </Transition>
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
