import helper from './helper'

function json (str: string, defaultValue?: any): any {
  let value: any

  try {
    value = JSON.parse(str)
  } catch (e) {
    // eslint-disable-line
  }

  if (defaultValue && !value) {
    value = defaultValue
  }

  return value
}

function bool (arg: any, defaultValue?: boolean): boolean {
  if (helper.isEmpty(arg)) {
    return defaultValue || false
  }

  if (helper.isBoolean(arg)) {
    return arg
  }

  if (helper.isTrue(arg)) {
    return true
  }

  return false
}

function int (arg: any, defaultValue?: number, maxValue?: number): number | undefined {
  if (helper.isNumber(arg)) {
    if (maxValue && maxValue < Number(arg)) {
      return maxValue
    }
    return Number(arg)
  }

  const num = parseInt(arg, 10)

  if (isNaN(num)) {
    return defaultValue
  }

  if (maxValue && maxValue < num) {
    return maxValue
  }

  return num
}

export default {
  json,
  bool,
  int
}
