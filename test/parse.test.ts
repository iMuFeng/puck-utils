import parse from '../src/parse'

test('json', () => {
  const value = parse.json('{"a": 1}')
  expect(value).toStrictEqual({
    a: 1
  })
})

test('empty json string', () => {
  const value = parse.json('')
  expect(value).toBe(undefined)
})

test('invalid json string', () => {
  const defaultValue = {
    b: 2
  }
  const value = parse.json('{"a":', defaultValue)
  expect(value).toStrictEqual(defaultValue)
})

test('bool', () => {
  const value = parse.bool(true)
  expect(value).toBe(true)
})

test('bool with nil', () => {
  const value = parse.bool(null, true)
  expect(value).toBe(true)
})

test('bool with true string', () => {
  const value = parse.bool('true')
  expect(value).toBe(true)
})

test('bool with number', () => {
  const value = parse.bool(1)
  expect(value).toBe(true)
})

test('bool with string', () => {
  const value = parse.bool('test')
  expect(value).toBe(false)
})

test('init', () => {
  const value = parse.int('10')
  expect(value).toBe(10)
})

test('init with default value', () => {
  const value = parse.int(1, 10)
  expect(value).toBe(1)
})

test('init with default value and max value', () => {
  const value = parse.int('a', 10, 30)
  expect(value).toBe(10)
})

test('init with max value', () => {
  const value = parse.int('50', 10, 30)
  expect(value).toBe(30)
})

test('init with max value', () => {
  const value = parse.int(100, 10, 30)
  expect(value).toBe(30)
})

test('html to text', () => {
  expect(parse.htmlToText('<a href="#">hello</a>')).toBe('hello')
})
