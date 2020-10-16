import { bytes } from '../src'

test('parse 5b', () => {
  expect(bytes('5b')).toBe(5)
})

test('parse 32kb', () => {
  expect(bytes('32kb')).toBe(32000)
})

test('parse 1.5mb', () => {
  expect(bytes('1.5mb')).toBe(1500000)
})

test('parse 5gb', () => {
  expect(bytes('5gb')).toBe(5 * 1e3 * 1e3 * 1e3)
})

test('parse 5tb', () => {
  expect(bytes('5tb')).toBe(5 * 1e3 * 1e3 * 1e3 * 1e3)
})

test('parse 5pb', () => {
  expect(bytes('5pb')).toBe(5 * 1e3 * 1e3 * 1e3 * 1e3 * 1e3)
})

test('parse invalid value', () => {
  expect(bytes('    ')).toBe(undefined)
})

test('parse invalid value', () => {
  expect(bytes('5y')).toBe(undefined)
})

test('parse invalid value', () => {
  expect(bytes('five_days')).toBe(undefined)
})
