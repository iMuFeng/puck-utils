import { qs } from '../src'

const obj = {
  a: [1, 2, 3],
  b: 'hello',
  c: true,
  d: undefined,
  e: 'https://example.com'
}

const str = 'a=1,2,3&b=hello&c=true&d=&e=https://example.com'
const str2 = 'a=1%2C2%2C3&b=hello&c=true&d=&e=https%3A%2F%2Fexample.com'

test('stringify object', () => {
  expect(qs.stringify(obj)).toBe(str)
})

test('stringify object with encode', () => {
  expect(
    qs.stringify(obj, {
      encode: true
    })
  ).toBe(str2)
})

test('parse string', () => {
  expect(qs.parse(str)).toStrictEqual({
    a: '1,2,3',
    b: 'hello',
    c: 'true',
    d: '',
    e: 'https://example.com'
  })
})

test('parse string with decode', () => {
  expect(
    qs.parse(str2, {
      decode: true,
      separator: ','
    })
  ).toStrictEqual({
    a: ['1', '2', '3'],
    b: 'hello',
    c: 'true',
    d: '',
    e: 'https://example.com'
  })
})

test('parse array', () => {
  expect(qs.parse([] as any)).toStrictEqual({})
})

test('parse empty string', () => {
  expect(qs.parse('')).toStrictEqual({})
})
