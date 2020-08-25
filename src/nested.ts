import helper from './helper'
import object from './object'

function flatten(
  array: Record<string, any>[],
  parentIndex = '0',
  field = 'children'
): Record<string, any>[] {
  let newObjs: Record<string, any>[] = []

  if (array.length < 1) {
    return newObjs
  }

  array.forEach((item, index) => {
    const _index = `${parentIndex}.${index}`

    newObjs.push({
      ...object.pick(item, [], [field]),
      _index
    })

    if (helper.isValid(item.children) && helper.isArray(item.children)) {
      newObjs = newObjs.concat(flatten(item.children, _index))
    }
  })

  return newObjs
}

function ancestors(array: Record<string, any>[], index: string): any[] {
  const searches: any[] = []
  const indexList = index.split('.')

  if (indexList.length > 2) {
    for (let i = 1; i < indexList.length - 1; i++) {
      const _index = indexList.slice(0, i + 1).join('.')
      const item = array.find(item => item._index === _index)
      searches.push(item)
    }
  }

  return searches
}

function brothers(
  array: Record<string, any>[],
  index: string
): Record<string, any>[] {
  const indexRegx = index
    .replace(/^0/, '^0')
    .replace(/\.\d+$/, '.\\d+$')
    .replace(/\./g, '\\.')
  return array.filter(item => new RegExp(indexRegx).test(item._index))
}

export default {
  flatten,
  ancestors,
  brothers
}
