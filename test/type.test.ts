import type from '../src/type'

test('10 is number', () => {
  expect(type(10)).toBe('number')
})

test('str is string', () => {
  expect(type('str')).toBe('string')
})

test('true is boolean', () => {
  expect(type(true)).toBe('boolean')
})

test('[] is array', () => {
  expect(type([])).toBe('array')
})

test('{} is object', () => {
  expect(type({})).toBe('object')
})

test('new Set() is set', () => {
  expect(type(new Set())).toBe('set')
})

test('new Map() is map', () => {
  expect(type(new Map())).toBe('map')
})

test('Symbol(\'symbol\') is symbol', () => {
  expect(type(Symbol('symbol'))).toBe('symbol')
})

test('() => {} is function', () => {
  expect(type(() => {})).toBe('function')
})

test('new Date() is date', () => {
  expect(type(new Date())).toBe('date')
})

test('/\\./ is regexp', () => {
  expect(type(/\./)).toBe('regexp')
})

test('new Error() is error', () => {
  expect(type(new Error())).toBe('error')
})
