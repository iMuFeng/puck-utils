import hs from '../src/hs'

test('parse 5 seconds', () => {
  expect(hs('5s')).toBe(5)
})

test('parse 5 minutes', () => {
  expect(hs('5m')).toBe(5 * 60)
})

test('parse 5 hours', () => {
  expect(hs('5h')).toBe(5 * 60 * 60)
})

test('parse 5 days', () => {
  expect(hs('5d')).toBe(5 * 24 * 60 * 60)
})

test('parse 5 weeks', () => {
  expect(hs('5w')).toBe(5 * 7 * 24 * 60 * 60)
})

test('parse 5 years', () => {
  expect(hs('5y')).toBe(5 * 365 * 24 * 60 * 60)
})

test('parse invalid foramt y5', () => {
  expect(hs('y5')).toBe(undefined)
})

test('parse invalid foramt 5-d', () => {
  expect(hs('5-d')).toBe(undefined)
})

test('parse invalid foramt 5dy', () => {
  expect(hs('5dy')).toBe(undefined)
})

test('parse invalid foramt m5d', () => {
  expect(hs('m5d')).toBe(undefined)
})

test('parse invalid foramt 5_000s', () => {
  expect(hs('5_000s')).toBe(undefined)
})

test('parse empty string', () => {
  expect(hs('  ')).toBe(undefined)
})
