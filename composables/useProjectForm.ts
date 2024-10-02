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

export const useProjectForm = defineStore('useProjectForm', () => {
  const { saveProject, publishProject } = useProject()
  const { project } = storeToRefs(useProject())

  const isEditingName = ref(false)
  const { value: name, errorMessage: nameError } = useField<string>('name', yup.string().required().notOneOf(['Untitled', 'Undefined', 'Create', 'create']))

  function toggleEditName() {
    isEditingName.value = !isEditingName.value
  }

  function saveName() {
    saveProject({
      ...project.value,
      name: name.value,
    })
  }

  const tabs = reactive({
    BASIC_INFO: { label: 'Basic Info', value: 'basic_info', component: markRaw(ProjectCreateCategoriesBasicInfo) },
    ASSETS: { label: 'Assets', value: 'assets', component: markRaw(ProjectCreateCategoriesAssets) },
    LINKS: { label: 'Links', value: 'links', component: markRaw(ProjectCreateCategoriesLinks) },
    TECHNOLOGY: { label: 'Technology', value: 'technology', component: markRaw(ProjectCreateCategoriesTechnology) },
    PRIVACY: { label: 'Privacy', value: 'privacy', component: markRaw(ProjectCreateCategoriesPrivacy) },
    SECURITY: { label: 'Security', value: 'security', component: markRaw(ProjectCreateCategoriesSecurity) },
    TEAM: { label: 'Team', value: 'team', component: markRaw(ProjectCreateCategoriesTeam) },
    FUNDING: { label: 'Funding', value: 'funding', component: markRaw(ProjectCreateCategoriesFunding) },
    HISTORY: { label: 'History', value: 'history', component: markRaw(ProjectCreateCategoriesHistory) },
  })

  const selectedTab = ref(0)
  const tabsArray = computed(() => Object.values(tabs))
  const currentComponent = ref()

  async function next() {
    const isFormValid = selectedTab.value === 0 ? await currentComponent.value.isFormValid() : true
    if (!isFormValid || nameError.value)
      return

    saveName()
    currentComponent.value.save()

    if (selectedTab.value === tabsArray.value.length - 1)
      return
    selectedTab.value = selectedTab.value + 1
  }

  async function jumpTo(index: number) {
    const isFormValid = selectedTab.value === 0 ? await currentComponent.value.isFormValid() : true
    if (!isFormValid || nameError.value) {
      return
    }

    saveName()
    currentComponent.value.save()

    selectedTab.value = index
  }

  const isPublishing = ref(false)
  async function publish(isNew?: boolean) {
    isPublishing.value = true
    const isFormValid = selectedTab.value === 0 ? await currentComponent.value.isFormValid() : true
    if (!isFormValid || nameError.value)
      return

    saveName()
    currentComponent.value?.save()

    await publishProject()
    isPublishing.value = false
    if (isNew)
      navigateTo('/')
    else
      navigateTo(`/project/${project.value?.id || project.value?.name?.toLowerCase().replace(/\s+/g, '-')}`)
  }

  function initForm() {
    selectedTab.value = 0
    name.value = 'Untitled'
  }

  return {
    isEditingName,
    name,
    nameError,
    toggleEditName,
    saveName,
    selectedTab,
    tabsArray,
    currentComponent,
    next,
    publish,
    jumpTo,
    isPublishing,
    initForm,
  }
})
