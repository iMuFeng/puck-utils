import nested from '../src/nested'

const nestedArray = [
  {
    title: 'a'
  },
  {
    title: 'b',
    children: [
      {
        title: 'b.0',
        children: [
          {
            title: 'b.0.A'
          },
          {
            title: 'b.0.B'
          }
        ]
      }
    ]
  },
  {
    title: 'c'
  }
]
const flattenNestedArray = [
  { _index: '0.0', title: 'a' },
  { _index: '0.1', title: 'b' },
  { _index: '0.1.0', title: 'b.0' },
  { _index: '0.1.0.0', title: 'b.0.A' },
  { _index: '0.1.0.1', title: 'b.0.B' },
  { _index: '0.2', title: 'c' }
]
const ancestors = [
  { _index: '0.1', title: 'b' },
  { _index: '0.1.0', title: 'b.0' }
]
const brothers = [
  { _index: '0.1.0.0', title: 'b.0.A' },
  { _index: '0.1.0.1', title: 'b.0.B' }
]

test('flatten nested array', () => {
  expect(nested.flatten(nestedArray)).toStrictEqual(flattenNestedArray)
})

test('search flattened nested array\'s ancestors', () => {
  expect(nested.ancestors(flattenNestedArray, '0.1.0.1')).toStrictEqual(ancestors)
})

test('search flattened nested array\'s brothers', () => {
  expect(nested.brothers(flattenNestedArray, '0.1.0.1')).toStrictEqual(brothers)
})
