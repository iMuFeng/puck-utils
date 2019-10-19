import helper from './helper'
import object, { AnyMap } from './object'

function flatten (array: AnyMap[], parentIndex = '0', field = 'children'): AnyMap[] {
  let newObjs: AnyMap[] = []

  if (array.length < 1) {
    return newObjs
  }

  array.forEach((item, index) => {
    const _index = `${parentIndex}.${index}`

    newObjs.push({
      ...object.peak(item, [], [field]),
      _index
    })

    if (helper.isValid(item.children) && helper.isArray(item.children)) {
      newObjs = newObjs.concat(flatten(item.children, _index))
    }
  })

  return newObjs
}

function ancestors (array: AnyMap[], index: string): any[] {
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

function brothers (array: AnyMap[], index: string): AnyMap[] {
  const indexRegx = index
    .replace(/^0/, '^0')
    .replace(/\.\d+$/, '\.\\d+$')
    .replace(/\./g, '\\.')
  return array.filter(item => new RegExp(indexRegx).test(item._index))
}

export default {
  flatten,
  ancestors,
  brothers
}
