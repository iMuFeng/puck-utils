import object from '../src/object'

const obj = {
  a: null,
  b: undefined,
  c: 'hello',
  d: [1, 2, 3],
  nan: parseInt('nan')
}

const diff = {
  a: undefined,
  b: undefined,
  nan: undefined
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


test('peak fileds from object with excludes', () => {
  expect(object.peak(obj, [], ['a', 'b', 'nan'])).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
})

test('peak fileds from non object', () => {
  expect(object.peak([] as any, ['c'])).toStrictEqual({})
})

test('diff shoud strict equal diff', () => {
  expect(object.diff(obj, object.removeNil(obj))).toStrictEqual(diff)
})

test('deletedDiff shoud strict equal diff', () => {
  expect(object.deletedDiff(obj, object.removeNil(obj))).toStrictEqual(diff)
})

test('addedDiff shoud strict equal {}', () => {
  expect(object.addedDiff(obj, object.removeNil(obj))).toStrictEqual({})
})

test('updatedDiff shoud strict equal {}', () => {
  expect(object.updatedDiff(obj, object.removeNil(obj))).toStrictEqual({})
})
