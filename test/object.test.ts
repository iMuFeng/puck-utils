import object from '../src/object'

const obj = {
  a: null,
  b: undefined,
  c: 'hello',
  d: [1, 2, 3]
}

test('remove object nil field', () => {
  expect(object.removeNil(obj)).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
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
