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
  const criterias: { value: keyof ProjectIndexable, key: keyof ProjectIndexable | '' }[] = [
    { value: 'product_readiness', key: '' },
    { value: 'github', key: 'links' },
    { value: 'docs', key: 'links' },
    { value: 'team', key: '' },
    { value: 'audits', key: '' },
  ]

  let matched = 0
  for (let i = 0; i < criterias.length; i++) {
    let value
    // value = ((criterias[i].key ?? props.project[criterias[i].value as keyof typeof props.project]) ?? null === null) ? null : (props.project as ProjectIndexable)[criterias[i].key][criterias[i].value]

    const indexableProject = project as ProjectIndexable
    if (criterias[i].key !== '')
      value = (indexableProject[criterias[i].key] as any)?.[criterias[i].value]
    else
      value = indexableProject?.[criterias[i].value]

    // console.log(props.project?.links?.github);
    // console.log(Object.keys(props.indexableProject["team"]).length);
    if (value === null || value === undefined)
      continue

    if (fulfilled(value))
      matched++
  }

  return 100 / criterias.length * matched
}
