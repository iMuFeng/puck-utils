import * as diff from 'deep-object-diff'
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

  for (const field of Object.keys(argCopy)) {
    const value = argCopy[field]

    if (helper.isNil(value) || helper.isNaN(value)) {
      continue
    }

    newObj[field] = value
  }

  return newObj
}

function extend (target: AnyMap = {}, ...args: any[]): AnyMap {
  if (!target) {
    return helper.isArray(args[0]) ? [] : {}
  }

  let src: any
  let curr: any

  for (const arg of args) {
    if (!arg) {
      continue
    }

    // tslint:disable-next-line: forin
    for (const key in arg) {
      src = target[key]
      curr = arg[key]

      if (src && src === curr) {
        continue
      }

      if (helper.isArray(curr)) {
        target[key] = extend([], curr)
      } else if (helper.isObject(curr)) {
        target[key] = extend(src && helper.isObject(src) ? src : {}, curr)
      } else {
        target[key] = curr
      }
    }
  }

  return target
}

export default {
  ...diff,
  peak,
  removeNil,
  extend
}
