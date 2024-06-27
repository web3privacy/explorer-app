import type { Category, Project, ProjectShallow } from '~/types'

export const useData = defineStore('data', () => {
  const categories = useState<Category[]>('categories')
  const projects = useState<Project[]>('projects')
  const selectedCategoryId = useState(() => 'defi')
  const filter = reactive({
    query: '',
    sortby: 'atoz',
  })
  const switcher = ref(true)

  watch(selectedCategoryId, () => {
    if (selectedCategoryId.value !== 'all')
      filter.query = ''
  })

  watch(filter, () => {
    if (filter.query !== '')
      selectedCategoryId.value = 'all'
  })

  const fetchData = async () => {
    try {
      const data = await $fetch<{
        categories: Category[]
        projects: Project[]
      }>('/api/data')
      projects.value = data.projects.filter(p => p.name)
      categories.value = data.categories.map((c) => {
        c.projectsCount = projects.value.filter(p =>
          p.categories?.includes(c.id),
        ).length
        return c
      }).filter(c => c.projectsCount > 0)
    }
    catch (e) {
      console.error(e)
      return false
    }

    return true
  }

  const projectToShallow = (project: Project): ProjectShallow => {
    const availableSupport = () => {
      const filteredKeys = ['forum', 'discord', 'twitter', 'lens', 'farcaster', 'telegram']
      // if (typeof project.links === 'object' && (project.links !== null || project.links !== undefined))
      if (project.links == null || project.links == undefined) return 0;

      if (typeof project.links === 'object' && Object.keys(project.links).length > 0)
        return Object.keys(project.links).filter(key => filteredKeys.includes(key)).length
    }

    return {
      id: project.id,
      title1: project.name,
      description: project.description ?? 'N/A',
      percentage: Math.floor(Math.random() * 91),
      forum: project.links?.forum,
      explorer: project.links?.block_explorer,
      twitter: project.links?.twitter,
      coingecko: project.links?.coingecko,
      newsletter: project.links?.rss_feed,
      github: project.links?.github,
      website: project.links?.web,
      readyness: project.project_status?.version,
      team: project.team,
      docs: project.links?.docs,
      audits: project.audits,
      support: availableSupport(),
      image: project.logos?.[0]?.url ?? '',
      anonymity: true,
    }
  }
  const shallowProjects = computed(() => projects.value.map(project => projectToShallow(project)))

  const getProjectsByCategory = <T extends ProjectShallow>(id: string, options?: { shallow: boolean }): T[] => {
    if (id === 'all')
      return projects.value.map(project => projectToShallow(project)) as T[]
    else
      return projects.value.filter(project => project.categories?.includes(id)).map(project => options?.shallow ? projectToShallow(project) : project) as T[]
  }

  const getProjectById = <T extends Project | ProjectShallow>(id: string, options?: { shallow: boolean }): T => {
    const project = projects.value.find(project => project.id === id)
    return (options?.shallow && project ? projectToShallow(project) : project) as T
  }

  const filteredProjects = computed(() => {
    if (!projects.value)
      return []

    const query = filter.query.toLowerCase()

    const filteredShallowProjects = getProjectsByCategory(selectedCategoryId.value, { shallow: true })
      .filter((project) => {
        return (
          project
          && project.title1
          && project.title1.toLowerCase().includes(query)
        )
      }).filter((project) => {
        if (filter.sortby === 'anonymity')
          return project.anonymity === true
        else
          return true
      }).sort((a, b) => {
        if (filter.sortby === 'score')
          return b.percentage - a.percentage
        if (filter.sortby === 'atoz')
          return a.title1.localeCompare(b.title1)
        else
          return 0
      })

    return filteredShallowProjects
  })

  const filteredProjectsCount = computed(() => filteredProjects.value.length)

  return {
    selectedCategoryId,
    filter,
    switcher,
    categories,
    projects,
    shallowProjects,
    filteredProjectsCount,
    fetchData,
    getProjectById,
    getProjectsByCategory,
    filteredProjects,
    projectToShallow,
  }
})
