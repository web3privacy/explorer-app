import type { Category, Project, ProjectRating, ProjectRatingItem, ProjectShallow } from '~/types'
import type { Asset } from '~/types/asset'
import type { Ecosystem } from '~/types/ecosystem'
import type { Feature } from '~/types/feature'
import type { Rank } from '~/types/rank'
import type { Usecase } from '~/types/usecase'

export const useData = defineStore('data', () => {
  const projectPhase = useState<{ id: string, name: string }[]>('projectPhase')
  const assetCustody = useState<{ id: string, name: string }[]>('assetCustody')
  const signInRequirments = useState<{ id: string, name: string }[]>('signInRequirmenets')

  const categories = useState<Category[]>('categories')
  const usecases = useState<Usecase[]>('usecases')
  const features = useState<Feature[]>('features')
  const assets = useState<Asset[]>('assets')
  const ecosystems = useState<Ecosystem[]>('ecosystems')
  const projects = useState<Project[]>('projects')
  const ranks = useState<Rank[]>('ranks')

  const selectedCategoryId = useState(() => 'all')
  const selectedUsecaseId = useState(() => 'all')
  const selectedEcosystemId = useState(() => 'all')
  const selectedAssetsUsedId = useState(() => 'all')
  const selectedFeaturesId = useState(() => 'all')

  const filter = reactive({
    query: '',
    sortby: 'score',
    sortDirection: 'desc',
  })
  const switcher = ref(true)

  watch([selectedCategoryId, selectedUsecaseId, selectedEcosystemId, selectedAssetsUsedId, selectedFeaturesId], () => {
    if (selectedCategoryId.value !== 'all' || selectedUsecaseId.value !== 'all' || selectedEcosystemId.value !== 'all' || selectedAssetsUsedId.value !== 'all' || selectedFeaturesId.value !== 'all')
      filter.query = ''
  })

  watch(filter, () => {
    if (filter.query !== '') {
      selectedCategoryId.value = 'all'
      selectedUsecaseId.value = 'all'
      selectedEcosystemId.value = 'all'
      selectedAssetsUsedId.value = 'all'
      selectedFeaturesId.value = 'all'
    }
  })

  const fetchData = async () => {
    try {
      const data = await $fetch<{
        categories: Category[]
        projects: Project[]
        project_phase: { id: string, name: string }[]
        asset_custody_type: { id: string, name: string }[]
        sign_in_type_requirments: { id: string, name: string }[]
        usecases: Usecase[]
        ecosystems: Ecosystem[]
        assets: Asset[]
        features: Feature[]
        ranks: Rank[]
      }>('/api/data')
      data.projects.forEach(project => project.ratings = generateProjectRating(project))
      projects.value = data.projects.map(project => ({
        ...project,
        percentage: Math.round((project.ratings?.reduce((a, b) => a + b.points, 0) || 0) / 1.5),
      })).filter(p => p.name)

      categories.value = data.categories
      usecases.value = data.usecases
      ecosystems.value = data.ecosystems
      assets.value = data.assets
      features.value = data.features
      ranks.value = data.ranks

      projectPhase.value = data.project_phase?.map(p => ({ id: p.id.toLowerCase(), name: p.name }))
      assetCustody.value = data.asset_custody_type.map(a => ({ id: a.id.toLowerCase(), name: a.name }))
      signInRequirments.value = data.sign_in_type_requirments.map(s => ({ id: s.id.toLowerCase(), name: s.name }))
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
      percentage: project.percentage,
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
      usecases: project.usecases,
      ecosystem: project.ecosystem,
      assets_used: project.assets_used,
      ratings: project.ratings,
    }
  }
  const shallowProjects = computed(() => projects.value.map(project => projectToShallow(project)))

  const getProjectsByFilters = <T extends ProjectShallow>(options?: { shallow: boolean }): T[] => {
    const filteredProjects = projects.value
      .filter(project =>
        selectedCategoryId.value !== 'all' ? project.categories.includes(selectedCategoryId.value) : true,
      )
      .filter(project =>
        selectedUsecaseId.value !== 'all' ? project.usecases?.map(u => u.toLowerCase()).includes(selectedUsecaseId.value.toLowerCase()) : true,
      )
      .filter(project =>
        selectedEcosystemId.value !== 'all' ? project.ecosystem?.map(e => e.toLowerCase()).includes(selectedEcosystemId.value.toLowerCase()) : true,
      )
      .filter(project =>
        selectedAssetsUsedId.value !== 'all' ? project.assets_used?.map(a => a.toLowerCase()).includes(selectedAssetsUsedId.value.toLowerCase()) : true,
      )
      .filter(project =>
        selectedFeaturesId.value !== 'all' ? project.technology?.features?.map(f => f.toLowerCase()).includes(selectedFeaturesId.value.toLowerCase()) : true,
      )
    return (filteredProjects.map(project => options?.shallow ? projectToShallow(project) : project) as T[])
  }

  const getProjectById = <T extends Project | ProjectShallow>(id: string, options?: { shallow: boolean }): T => {
    const project = projects.value.find(project => project.id === id)
    return (options?.shallow && project ? projectToShallow(project) : project) as T
  }

  const filteredProjects = computed(() => {
    if (!projects.value)
      return []

    const query = filter.query.toLowerCase()

    const filteredShallowProjects = getProjectsByFilters({ shallow: true })
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
          if (filter.sortDirection === 'asc')
            return a.percentage - b.percentage
          else
            return b.percentage - a.percentage
        if (filter.sortby === 'title')
          if (filter.sortDirection === 'asc')
            return a.title1.toLowerCase().localeCompare(b.title1.toLowerCase())
          else
            return b.title1.toLowerCase().localeCompare(a.title1.toLowerCase())
        if (filter.sortby === 'openess' || filter.sortby === 'technology' || filter.sortby === 'privacy') {
          const scoreA = a.ratings?.find(r => r.type === filter.sortby)?.points || 0
          const scoreB = b.ratings?.find(r => r.type === filter.sortby)?.points || 0
          if (filter.sortDirection === 'asc')
            return scoreB - scoreA
          else
            return scoreA - scoreB
        }
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

  const getNestedField = (project: Project, field: string) => {
    const fields = field.split('.')

    return fields.reduce((acc: any, curr: string) => {
      return acc && acc[curr as keyof typeof acc]
    }, project)
  }

  const generateProjectRating = (project: Project) => {
    const projectRatings: ProjectRating[] = ranks.value?.map((rank) => {
      let rankPoints = 0

      const ratingStats: ProjectRatingItem[] = rank.references?.map((ref) => {
        let isValid = false
        const field = ref.field.includes('.') ? getNestedField(project, ref.field) : project[ref.field]

        let value
        let positive

        if (ref.condition.minLength) {
          value = (field as any[])?.length
          if (value) {
            isValid = value >= ref.condition.minLength
            positive = `${value} ${ref.label.positive}${value > 1 ? 's' : ''}`
          }
        }
        if (ref.condition.equals) {
          value = field
          if (value)
            isValid = value === ref.condition.equals
        }

        if (ref.condition.exists) {
          value = field
          if (value)
            isValid = !!value
        }
        rankPoints += isValid ? ref.points : 0
        return {
          isValid,
          label: ref.label.name,
          positive: positive ? positive : ref.label.positive,
          negative: ref.label.negative,
          value,
        } as ProjectRatingItem
      })
      return {
        type: rank.id,
        name: rank.name,
        items: ratingStats,
        points: rankPoints,
      }
    })

    return projectRatings
  }

  return {
    selectedCategoryId,
    selectedUsecaseId,
    selectedEcosystemId,
    selectedAssetsUsedId,
    selectedFeaturesId,
    filter,
    switcher,
    categories,
    projectPhase,
    assetCustody,
    signInRequirments,
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
    filteredProjects,
    projectToShallow,
  }
})
