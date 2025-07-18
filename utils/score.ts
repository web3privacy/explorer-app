import type { Project, ProjectIndexable, ProjectShallow } from '~/types'

const fulfilled = (value: any): boolean => {
  const type = typeof value
  switch (type) {
    case 'string':
      if (value !== '')
        return true
      break
    case 'object':
      if (Object.keys(value!).length > 0)
        return true
      break
    default:
      return false
  }
  return false
}

export const calculateScore = (project: ProjectIndexable | ProjectShallow | Project) => {
  const criterias: { value: keyof ProjectIndexable, key: keyof ProjectIndexable | '', weight: number }[] = [
    { value: 'github', key: 'links', weight: 0.3 },
    { value: 'docs', key: 'links', weight: 0.3 },
    { value: 'team', key: '', weight: 0.2 },
    { value: 'audits', key: '', weight: 0.2 },
  ]

  let score = 0
  for (const criteria of criterias) {
    let value
    const indexableProject = project as ProjectIndexable
    if (criteria.key !== '')
      value = (indexableProject[criteria.key] as any)?.[criteria.value]
    else
      value = indexableProject?.[criteria.value]

    if (value === null || value === undefined)
      continue

    if (fulfilled(value))
      score += criteria.weight
  }

  return Math.round(score * 100)
}
