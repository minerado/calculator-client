import { describe, expect, test } from 'vitest'
import { range } from './functional'

describe('range', () => {
  test('it returns a range from 0 to 5', () => {
    expect(range(0, 6)).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('it raises an error when  trying to build an invalid range', () => {
    expect(() => range(0, -1)).toThrowError()
  })
})
