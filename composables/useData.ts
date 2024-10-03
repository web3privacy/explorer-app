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
        phases: { id: string, name: string }[]
        custodys: { id: string, name: string }[]
        requirements: { id: string, name: string }[]
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
      const projectCategories = projects.value.map(p => p.categories).flat()
      categories.value = data.categories.filter(c => projectCategories.includes(c.id))
      usecases.value = data.usecases
      ecosystems.value = data.ecosystems
      assets.value = data.assets
      features.value = data.features
      ranks.value = data.ranks
      projectPhase.value = data.phases?.map(p => ({ id: p.id.toLowerCase(), name: p.name }))
      assetCustody.value = data.custodys.map(a => ({ id: a.id.toLowerCase(), name: a.name }))
      signInRequirments.value = data.requirements.map(s => ({ id: s.id.toLowerCase(), name: s.name }))
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
    const selectedCategory = selectedCategoryId.value !== 'all' ? selectedCategoryId.value : undefined
    const selectedUsecase = selectedUsecaseId.value !== 'all' ? selectedUsecaseId.value.toLowerCase() : undefined
    const selectedEcosystem = selectedEcosystemId.value !== 'all' ? selectedEcosystemId.value.toLowerCase() : undefined
    const selectedAssetsUsed = selectedAssetsUsedId.value !== 'all' ? selectedAssetsUsedId.value.toLowerCase() : undefined
    const selectedFeature = selectedFeaturesId.value !== 'all' ? selectedFeaturesId.value.toLowerCase() : undefined

    return (projects.value.filter((project) => {
      if (selectedCategory && !project.categories.includes(selectedCategory))
        return false

      if (selectedUsecase) {
        if (selectedUsecase === 'sunset') {
          if (!project.sunset)
            return false
        }
        else {
          const usecases = project.usecases?.map(u => u.toLowerCase()) || []
          if (!usecases.includes(selectedUsecase))
            return false
        }
      }

      if (selectedEcosystem) {
        const ecosystems = project.ecosystem?.map(e => e.toLowerCase()) || []
        if (!ecosystems.includes(selectedEcosystem))
          return false
      }

      if (selectedAssetsUsed) {
        const assetsUsed = project.assets_used?.map(a => a.toLowerCase()) || []
        if (!assetsUsed.includes(selectedAssetsUsed))
          return false
      }

      if (selectedFeature) {
        switch (selectedFeature) {
          case 'no-compliance':
            return project.compliance ? false : true
          case 'non-kyc':
            return project.tracebility?.kyc ? false : true
          case 'private-by-default':
            return project.default_privacy
          case 'non-custodial':
            return project.blockchain_features?.asset_custody_type === 'non-custody'
          case 'opensource':
            return project.blockchain_features?.opensource
          case 'live-on-mainnet':
            return project.project_phase === 'mainnet'
        }
      }

      return true
    }).map(project => (options?.shallow ? projectToShallow(project) : project)) as T[])
  }

  const getProjectById = <T extends Project | ProjectShallow>(id: string, options?: { shallow: boolean }): T => {
    const project = projects.value.find(project => project.id === id)
    return (options?.shallow && project ? projectToShallow(project) : project) as T
  }

  const filteredProjects = computed(() => {
    if (!projects.value) return []

    const query = filter.query.toLowerCase()
    const sortDirection = filter.sortDirection === 'desc' ? 1 : -1
    const sortBy = filter.sortby

    const filteredShallowProjects = getProjectsByFilters({ shallow: true })
      .filter((project) => {
        return project?.title1?.toLowerCase().includes(query)
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return sortDirection * (b.percentage - a.percentage)
        }

        if (sortBy === 'title') {
          // sortDirection is reversed because the default sort is descending
          return sortDirection * a.title1.toLowerCase().localeCompare(b.title1.toLowerCase())
        }

        if (sortBy === 'openess' || sortBy === 'technology' || sortBy === 'privacy') {
          const scoreA = a.ratings?.find(r => r.type === sortBy)?.points || 0
          const scoreB = b.ratings?.find(r => r.type === sortBy)?.points || 0
          return sortDirection * (scoreB - scoreA)
        }

        return 0
      })

    return filteredShallowProjects
  })

  const groupedProjectsPerCategory = computed(() => {
    const groupedProjects = categories.value.map((category) => {
      const projectsInCategory = filteredProjects.value.filter(project =>
        project.categories.includes(category.id),
      )

      return {
        title: category.name,
        projects: projectsInCategory,
      }
    }).sort((a, b) => b.projects.length - a.projects.length)

    return groupedProjects.filter(group => group.projects.length > 0)
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
      let maxPoints = 0
      const ratingStats: ProjectRatingItem[] = []

      rank.references?.forEach((ref) => {
        let isValid = false
        const field = ref.field.includes('.') ? getNestedField(project, ref.field) : project[ref.field]

        // adds only one valid social link
        if (ref.label.positive === 'Link' && ref.label.name !== 'Documentation')
          if (ratingStats.some(r => r.positive === 'Link' && r.label !== 'Documentation' && r.value) || !field)
            return

        let value
        let positive
        let negative

        if (ref.condition.minLength !== undefined) {
          value = (field as any[])?.length
          if (value) {
            isValid = value >= ref.condition.minLength
            positive = `${value} ${ref.label.positive}${value > 1 ? 's' : ''}`
          }
        }
        if (ref.condition.equals !== undefined) {
          value = field
          if (value !== undefined)
            isValid = value === ref.condition.equals
        }

        if (ref.condition.exists !== undefined) {
          value = field

          if (ref.condition.exists === false)
            isValid = !value ? true : false
          else
            isValid = value ? true : false
        }
        if (ref.field === 'compliance') {
          positive = value
        }

        rankPoints += isValid ? ref.points : 0
        maxPoints += ref.points

        ratingStats.push({
          isValid,
          label: ref.label.name,
          positive: positive ? positive : ref.label.positive,
          negative: negative ? negative : ref.label.negative,
          value,
        } as ProjectRatingItem)
      })

      return {
        type: rank.id,
        name: rank.name,
        items: ratingStats,
        points: rankPoints,
        percentagePoints: rankPoints / maxPoints * 100,
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
