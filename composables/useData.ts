import type { Category, Project, ProjectShallow } from '~/types'
import type { Asset } from '~/types/asset'
import type { Ecosystem } from '~/types/ecosystem'
import type { Feature } from '~/types/feature'
import type { Usecase } from '~/types/usecase'

export const useData = defineStore('data', () => {
  const categories = useState<Category[]>('categories')
  const usecases = useState<Usecase[]>('usecases')
  const features = useState<Feature[]>('features')
  const assets = useState<Asset[]>('assets')
  const ecosystems = useState<Ecosystem[]>('ecosystems')
  const projects = useState<Project[]>('projects')
  const selectedCategoryId = useState(() => 'all')
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
        usecases: Usecase[]
        ecosystems: Ecosystem[]
        assets: Asset[]
        features: Feature[]
      }>('/api/data')
      projects.value = data.projects.map(project => ({
        ...project,
        ratings: {
          openess: {
            documentation: 'Link',
            funding: 0,
            github: 'Link',
            socials: '',
            team: 1,
            whitepaper: '',
          },
          technology: {
            mainnet: true,
            opensource: true,
            assets: false,
            audits: 0,
            no_pgradability: true,
          },
          privacy: {
            no_kyc: true,
            no_compliance: true,
            default_privacy: false,
            policy: 'Link',
          },
        },
      })).filter(p => p.name)
      categories.value = data.categories.map((c) => {
        c.projectsCount = projects.value.filter(p =>
          p.categories?.includes(c.id),
        ).length
        return c
      }).filter(c => c.projectsCount > 0)
      usecases.value = data.usecases
      ecosystems.value = data.ecosystems
      assets.value = data.assets
      features.value = data.features
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
      if (project.links === null || project.links === undefined)
        return 0

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
      categories: project.categories,
      ratings: {
        openess: {
          documentation: 'Link',
          funding: 0,
          github: 'Link',
          socials: '',
          team: 1,
          whitepaper: '',
        },
        technology: {
          mainnet: true,
          opensource: true,
          assets: false,
          audits: 0,
          no_pgradability: true,
        },
        privacy: {
          no_kyc: true,
          no_compliance: true,
          default_privacy: false,
          policy: 'Link',
        },
      },
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

  const groupedProjectsPerCategory = computed(() => {
    const groupedProjects = categories.value.map((category) => {
      // Find all projects that include this category
      const projectsInCategory = filteredProjects.value.filter(project =>
        project.categories.includes(category.id),
      )

      return {
        title: category.name,
        projects: projectsInCategory,
      }
    }).sort((a, b) => b.projects.length - a.projects.length)

    return groupedProjects
  })

  const filteredProjectsCount = computed(() => filteredProjects.value.length)

  return {
    selectedCategoryId,
    filter,
    switcher,
    categories,
    usecases,
    features,
    ecosystems,
    assets,
    projects,
    shallowProjects,
    groupedProjectsPerCategory,
    filteredProjectsCount,
    fetchData,
    getProjectById,
    getProjectsByCategory,
    filteredProjects,
    projectToShallow,
  }
})
