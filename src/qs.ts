import helper from './helper'

function stringify(arg: Record<string, any>): string {
  const arr: string[] = []

  Object.keys(arg).forEach(key => {
    let value = arg[key]

    if (helper.isEmpty(value)) {
      value = ''
    } else {
      value = String(value)
    }

    arr.push(`${key}=${value}`)
  })

  return arr.join('&')
}

function parse(str: string): Record<string, any> {
  const obj: Record<string, any> = {}

  if (!helper.isString(str)) {
    return obj
  }

  const arr = str.replace(/^([^?]+)?\?/, '').split('&')

  arr.forEach(param => {
    const paramArr = param.split('=')
    const key = paramArr[0]

    if (!helper.isEmpty(key)) {
      const val = paramArr[1]
      const value = helper.isArray(val) ? val.join(',') : val || ''
      obj[key] = value
    }
  })

  return obj
}

export default {
  stringify,
  parse
}
