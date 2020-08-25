import helper from '../src/helper'

test("' ' is empty", () => {
  expect(helper.isEmpty(' ')).toBe(true)
})

test('[] is empty', () => {
  expect(helper.isEmpty([])).toBe(true)
})

test('{} is empty', () => {
  expect(helper.isEmpty({})).toBe(true)
})

test('new Set() is empty', () => {
  expect(helper.isEmpty(new Set())).toBe(true)
})

test('new Map() is empty', () => {
  expect(helper.isEmpty(new Map())).toBe(true)
})

test('null is empty', () => {
  expect(helper.isEmpty(null)).toBe(true)
})

test('boolean is not empty', () => {
  expect(helper.isEmpty(false)).toBe(false)
})

test('number is not empty', () => {
  expect(helper.isEmpty(0)).toBe(false)
})

test('file is empty', () => {
  const file = new File([], 'test.kit')
  expect(helper.isEmpty(file)).toBe(true)
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

test('Symbol() is valid', () => {
  expect(helper.isValid(Symbol())).toBe(true)
})

test('null is nil', () => {
  expect(helper.isNil(null)).toBe(true)
})

test('undefined is nil', () => {
  expect(helper.isNil(undefined)).toBe(true)
})

test('false is not nil', () => {
  expect(helper.isNil(false)).toBe(false)
})

test('abc is equal abc', () => {
  expect(helper.isEqual('abc', 'abc')).toBe(true)
})

test("10 is equal '10'", () => {
  expect(helper.isEqual(10, '10')).toBe(true)
})

test('true is bool', () => {
  expect(helper.isBool('true')).toBe(true)
})

test('1 is bool', () => {
  expect(helper.isBool(1)).toBe(true)
})

test('false is bool', () => {
  expect(helper.isBool('false')).toBe(true)
})

test('0 is bool', () => {
  expect(helper.isBool(0)).toBe(true)
})

test('new Set() is Set', () => {
  expect(helper.isSet(new Set())).toBe(true)
})

test('new Map() is Map', () => {
  expect(helper.isMap(new Map())).toBe(true)
})

test("Symbol('hello') is Symbol", () => {
  expect(helper.isSymbol(Symbol('hello'))).toBe(true)
})

test('new Date() is Date', () => {
  expect(helper.isDate(new Date())).toBe(true)
})

test('new Error() is Error', () => {
  expect(helper.isError(new Error())).toBe(true)
})

test('/./ is RegExp', () => {
  expect(helper.isRegExp(/\./)).toBe(true)
})

test('{} is PlainObject', () => {
  expect(helper.isPlainObject({})).toBe(true)
})

test('null is not PlainObject', () => {
  expect(helper.isPlainObject(null)).toBe(false)
})

test('override constructor is not PlainObject', () => {
  const obj = {
    constructor: undefined
  }
  expect(helper.isPlainObject(obj)).toBe(false)
})

test('override constructor prototype is not PlainObject', () => {
  const Cls = function () {
    // @ts-ignore
  }
  // @ts-ignore
  Cls.prototype = undefined

  const obj = {
    constructor: Cls
  }

  expect(helper.isPlainObject(obj)).toBe(false)
})

test('function is not PlainObject', () => {
  const Person = function () {
    // @ts-ignore
  }
  const person = new (Person as any)()
  expect(helper.isPlainObject(person)).toBe(false)
})

test("parseInt('abc') is not number", () => {
  expect(helper.isNaN(parseInt('abc'))).toBe(true)
})
