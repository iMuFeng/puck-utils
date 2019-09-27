import clone from './clone'
import helper from './helper'

export interface AnyMap {
  [key: string]: any
}

function peak (arg: AnyMap, fields: string[]): AnyMap {
  if (!helper.isObject(arg)) {
    return {}
  }

  const argCopy = clone<AnyMap>(arg)
  const newObj: AnyMap = {}

  Object.keys(argCopy)
    .filter(field => fields.includes(field))
    .forEach(field => {
      newObj[field] = argCopy[field]
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
