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
  const { project, isPublishing } = storeToRefs(useProject())

  const isEditingName = ref(false)
  const { value: name, errorMessage: nameError } = useField<string>('name', yup.string().required().notOneOf(['Untitled', 'Undefined', 'Create', 'create']))
  name.value = project.value?.name || 'Untitled'

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
    if (selectedTab.value === 0) {
      if (!(await currentComponent.value.isFormValid()) || nameError.value)
        return
    }

    saveName()
    currentComponent.value.save()

    if (selectedTab.value === tabsArray.value.length - 1)
      return
    selectedTab.value = selectedTab.value + 1
  }

  async function jumpTo(index: number) {
    if (selectedTab.value === 0) {
      if (!(await currentComponent.value.isFormValid()) || nameError.value)
        return
      if (nameError.value)
        return
      else saveName()
    }

    saveName()
    currentComponent.value.save()

    selectedTab.value = index
  }

  async function publish(isNew?: boolean) {
    if (selectedTab.value === 0) {
      if (!(await currentComponent.value.isFormValid()) || nameError.value)
        return
    }
    else if (isPublishing) {
      return
    }

    saveName()
    currentComponent.value?.save()

    await publishProject()
    if (isNew)
      navigateTo('/')
    else
      navigateTo(`/project/${project.value?.id || project.value?.name?.toLowerCase().replace(/\s+/g, '-')}`)
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
  }
})
