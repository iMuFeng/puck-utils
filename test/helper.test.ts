import helper from '../src/helper'

test('18888888888 is phone number', () => {
  expect(helper.isMobilePhone('18888888888')).toBe(true)
})

test('http://js.org is url', () => {
  expect(helper.isURL('http://js.org')).toBe(true)
})

test('\' \' is empty', () => {
  expect(helper.isEmpty(' ')).toBe(true)
})

test('[] is empty', () => {
  expect(helper.isEmpty([])).toBe(true)
})

test('{} is empty', () => {
  expect(helper.isEmpty({})).toBe(true)
})

test('str is valid', () => {
  expect(helper.isValid('str')).toBe(true)
})

test('[1] is valid', () => {
  expect(helper.isValid([1])).toBe(true)
})

test('{ x: 1 } is valid', () => {
  expect(helper.isValid({ x: 1 })).toBe(true)
})

test('null is nil', () => {
  expect(helper.isNil(null)).toBe(true)
})

test('undefined is nil', () => {
  expect(helper.isNil(undefined)).toBe(true)
})

test('abc is equal abc', () => {
  expect(helper.isEqual('abc', 'abc')).toBe(true)
})

test('10 is equal \'10\'', () => {
  expect(helper.isEqual(10, '10')).toBe(true)
})

test('true is bool', () => {
  expect(helper.isBool('true')).toBe(true)
})
