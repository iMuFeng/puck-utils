import object from '../src/object'

const obj = {
  a: null,
  b: undefined,
  c: 'hello',
  d: [1, 2, 3],
  // tslint:disable-next-line: radix
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

test('pick fileds from object', () => {
  expect(object.pick(obj, ['c', 'd'])).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
})

test('pick fileds with alias from object', () => {
  expect(object.pick(obj, ['c', ['d', 'list']])).toStrictEqual({
    c: 'hello',
    list: [1, 2, 3]
  })
})


test('pick fileds from object with excludes', () => {
  expect(object.pick(obj, [], ['a', 'b', 'nan'])).toStrictEqual({
    c: 'hello',
    d: [1, 2, 3]
  })
})

test('pick fileds from non object', () => {
  expect(object.pick([] as any, ['c'])).toStrictEqual({})
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

test('extend an object', () => {
  expect(object.extend({
    a: [1, 2, 3],
    b: 'hi',
    c: {
      x: 1,
      y: 'hello'
    }
  }, {
    a: [2, 3, 4],
    b: 'hi',
    c: {
      y: 'world',
      z: true
    }
  })).toStrictEqual({
    a: [2, 3, 4],
    b: 'hi',
    c: {
      x: 1,
      y: 'world',
      z: true
    }
  })
})

test('can\'t extend undefined', () => {
  // @ts-ignore
  expect(object.extend(undefined, { x: 1 })).toStrictEqual({})
})

test('can\'t extend null', () => {
  // @ts-ignore
  expect(object.extend(null, [])).toStrictEqual([])
})

test('can\'t extend a nil item to object', () => {
  expect(object.extend({}, null)).toStrictEqual({})
})
