import object from '../src/object'

const obj = {
  a: null,
  b: undefined,
  c: 'hello',
  d: [1, 2, 3]
}

test('remove object\'s nil fields', () => {
  expect(object.removeNil(obj)).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
})

test('remove nil fields from non object', () => {
  expect(object.removeNil([] as any)).toStrictEqual({})
})

test('peak fileds from object', () => {
  expect(object.peak(obj, ['c', 'd'])).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
})

test('peak fileds with alias from object', () => {
  expect(object.peak(obj, ['c', ['d', 'list']])).toStrictEqual({
    c: 'hello',
    list: [1, 2, 3]
  })
})

test('peak fileds from non object', () => {
  expect(object.peak([] as any, ['c'])).toStrictEqual({})
})
