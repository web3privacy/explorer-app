import { describe, expect, it } from 'vitest'
import { calculateScore } from './score'

describe('calculateScore', () => {
  it('returns 100 when all criteria are met', () => {
    const project: any = {
      links: { github: 'a', docs: 'b' },
      team: { members: ['Alice'] },
      audits: [{}],
    }
    expect(calculateScore(project)).toBe(100)
  })

  it('uses weights for partial data', () => {
    const project: any = {
      links: { github: 'a' },
      audits: [{}],
    }
    // github 30%, audits 20% => 50
    expect(calculateScore(project)).toBe(50)
  })
})
