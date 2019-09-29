import shortid from '../src/shortid'

test('shortid with default length', () => {
  expect(shortid()).toHaveLength(16)
})

test('shortid with 32 characters', () => {
  expect(shortid(32)).toHaveLength(32)
})
