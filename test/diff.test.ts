import { diff } from '../src'

test('diff', () => {
  expect(diff({ x: 1 }, { x: 1, y: 2 })).toStrictEqual({ y: 2 })
})

test('diff', () => {
  expect(diff({ x: 1, y: 2 }, { x: 1 })).toStrictEqual({ y: undefined })
})
