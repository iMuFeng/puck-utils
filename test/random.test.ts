import random, { Type } from '../src/random'

const len = 6

test('alphanumeric', () => {
  const str = random.generate(len)
  expect(str).toHaveLength(len)
})

test('upper string', () => {
  const str = random.generate(len, Type.upper)
  expect(/^[A-Z]{6}$/.test(str)).toBe(true)
})

test('lower string', () => {
  const str = random.generate(len, Type.lower)
  expect(/^[a-z]{6}$/.test(str)).toBe(true)
})

test('lowernumeric string', () => {
  const str = random.generate(len, Type.lowernumeric)
  expect(/^[0-9a-z]{6}$/.test(str)).toBe(true)
})

test('uppernumeric string', () => {
  const str = random.generate(len, Type.uppernumeric)
  expect(/^[0-9A-Z]{6}$/.test(str)).toBe(true)
})

test('number', () => {
  const str = random.number(len)
  expect(/^[0-9]{6}$/.test(str)).toBe(true)
})

test('number without length', () => {
  const str = random.number()
  expect(/^[0-9]{6}$/.test(str)).toBe(true)
})

test('hex string', () => {
  const str = random.hex(len)
  expect(/^[0-9a-f]{6}$/.test(str)).toBe(true)
})

test('hex string without length', () => {
  const str = random.hex()
  expect(/^[0-9a-f]{12}$/.test(str)).toBe(true)
})
