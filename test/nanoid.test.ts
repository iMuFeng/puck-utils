import { nanoid, nanoidCustomAlphabet } from '../src'

test('nanoid length', () => {
  expect(nanoid().length).toBe(21)
})

test('nanoid with custom length', () => {
  expect(nanoid(10).length).toBe(10)
})

test('nanoid custom alphabet', () => {
  expect(nanoidCustomAlphabet('a', 6)).toBe('a'.repeat(6))
})

test('nanoid custom alphabet without custom length', () => {
  expect(nanoidCustomAlphabet('a')).toBe('a'.repeat(21))
})
