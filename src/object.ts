import { clone } from './clone'
import { isArray, isNan, isNil, isObject, isValid } from './helper'

export function pickObject(
  arg: Record<string, any>,
  fields: Array<string | string[]>,
  excludes: Array<string> = []
): Record<string, any> {
  if (!isObject(arg)) {
    return {}
  }

  const copied = clone<Record<string, any>>(arg)
  const argKeys = Object.keys(copied)

  const fieldAlias: Record<string, any> = {}
  let picked: string[] = []

  if (fields.length > 0) {
    fields.forEach(item => {
      if (isArray(item)) {
        if (item.length > 0) {
          const filed = item[0]
          picked.push(filed)

          if (item.length > 1) {
            fieldAlias[filed] = item[1]
          }
        }
      } else {
        picked.push(item)
      }
    })
  } else {
    picked = argKeys
  }

  const newObj: Record<string, any> = {}

  argKeys
    .filter(item => !excludes.includes(item) && picked.includes(item))
    .forEach(item => {
      const alias = fieldAlias[item]

      if (alias) {
        newObj[alias] = copied[item]
      } else {
        newObj[item] = copied[item]
      }
    })

  return newObj
}

export function pickValidValues<T = string | number | boolean>(
  arg: Record<string, T>,
  fields: Array<string | string[]>
): Record<string, T> {
  const valid: Record<string, T> = {}

  fields.forEach(field => {
    let key = String(field)
    let alias: string | undefined

    if (isArray(field)) {
      key = field[0]

      if (field.length > 1) {
        alias = field[1]
      }
    }

    const value = arg[key]

    if (isValid(value)) {
      valid[alias || key] = value
    }
  })

  return valid
}

export function removeObjectNil(arg: Record<string, any>): Record<string, any> {
  if (!isObject(arg)) {
    return {}
  }

  const copied = clone<Record<string, any>>(arg)
  const newObj: Record<string, any> = {}

  for (const field of Object.keys(copied)) {
    const value = copied[field]

    if (isNil(value) || isNan(value)) {
      continue
    }

    newObj[field] = value
  }

  return newObj
}
