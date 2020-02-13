import shortid from '../src/shortid'

const len = 16

test('shortid with default length', () => {
  expect(shortid()).toHaveLength(len)
})

test('shortid with 32 characters', () => {
  expect(shortid(len * 2)).toHaveLength(len * 2)
})
