import { isArray, isEmpty, isString } from './helper'

export function stringify(arg: Record<string, any>): string {
  const arr: string[] = []

  Object.keys(arg).forEach(key => {
    let value = arg[key]

    if (isEmpty(value)) {
      value = ''
    } else {
      value = String(value)
    }

    arr.push(`${key}=${value}`)
  })

  return arr.join('&')
}

export function parse(str: string): Record<string, any> {
  const obj: Record<string, any> = {}

  if (!isString(str)) {
    return obj
  }

  const arr = str.replace(/^([^?]+)?\?/, '').split('&')

  arr.forEach(param => {
    const paramArr = param.split('=')
    const key = paramArr[0]

    if (!isEmpty(key)) {
      const val = paramArr[1]
      obj[key] = isArray(val) ? val.join(',') : val || ''
    }
  })

  return obj
}
