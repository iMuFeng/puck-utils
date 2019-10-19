import clone from './clone'
import helper from './helper'

export interface AnyMap {
  [key: string]: any
}

function peak (arg: AnyMap, fields: Array<string | string[]>, excludes: Array<string> = []): AnyMap {
  if (!helper.isObject(arg)) {
    return {}
  }

  const argCopy = clone<AnyMap>(arg)
  const argKeys = Object.keys(argCopy)

  const fieldAlias: AnyMap = {}
  let peakFields: string[] = []

  if (fields.length > 0) {
    fields.forEach(item => {
      if (helper.isArray(item)) {
        if (item.length > 0) {
          const filed = item[0]
          peakFields.push(filed)

          if (item.length > 1) {
            fieldAlias[filed] = item[1]
          }
        }
      } else {
        peakFields.push(item)
      }
    })
  } else {
    peakFields = argKeys
  }

  const newObj: AnyMap = {}

  argKeys
    .filter(item => !excludes.includes(item) && peakFields.includes(item))
    .forEach(item => {
      const alias = fieldAlias[item]

      if (alias) {
        newObj[alias] = argCopy[item]
      } else {
        newObj[item] = argCopy[item]
      }
    })

  return newObj
}

function removeNil (arg: AnyMap): AnyMap {
  if (!helper.isObject(arg)) {
    return {}
  }

  const argCopy = clone<AnyMap>(arg)
  const newObj: AnyMap = {}

  Object.keys(argCopy)
    .forEach(field => {
      const value = argCopy[field]

      if (!helper.isNil(value)) {
        newObj[field] = value
      }
    })

  return newObj
}

export default {
  peak,
  removeNil
}
