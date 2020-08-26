import type from './type'

/* @ts-ignore */
const whiteSpaceRegx = /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/

export function isBoolean(arg: any): boolean {
  return type(arg) === 'boolean'
}

export function isString(arg: any): boolean {
  return type(arg) === 'string'
}

export function isNumber(arg: any): boolean {
  return type(arg) === 'number'
}

export const isArray = Array.isArray
export const isNaN = Number.isNaN

export function isSet(arg: any): boolean {
  return type(arg) === 'set'
}

export function isMap(arg: any): boolean {
  return type(arg) === 'map'
}

export function isSymbol(arg: any): boolean {
  return type(arg) === 'symbol'
}

export function isObject(arg: any): boolean {
  return type(arg) === 'object'
}

export function isDate(arg: any): boolean {
  return type(arg) === 'date'
}

export function isRegExp(arg: any): boolean {
  return type(arg) === 'regexp'
}

export function isError(arg: any): boolean {
  return type(arg) === 'error'
}

export function isFunction(arg: any): boolean {
  return type(arg) === 'function'
}

export function isNull(arg: any): boolean {
  return type(arg) === 'null'
}

export function isUndefined(arg: any): boolean {
  return type(arg) === 'undefined'
}

export function isNil(arg: any): boolean {
  return isNull(arg) || isUndefined(arg)
}

export function isPlainObject(arg: any): boolean {
  if (isObject(arg) === false) return false

  const ctor = arg.constructor
  if (typeof ctor !== 'function') return false

  const prot = ctor.prototype
  if (isObject(prot) === false) return false

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false
  }

  return true
}

export function isEmpty(arg: any): boolean {
  if (isNil(arg)) return true

  if (isBoolean(arg)) return false

  if (isNumber(arg)) return false

  if (isString(arg)) {
    return arg.length === 0 || whiteSpaceRegx.test(arg)
  }

  if (isFunction(arg) || isArray(arg)) {
    return arg.length === 0
  }

  switch (type(arg)) {
    case 'file':
    case 'map':
    case 'set': {
      return arg.size === 0
    }

    case 'object': {
      for (const key in arg) {
        if (Object.hasOwnProperty.call(arg, key)) return false
      }
      return true
    }

    default:
      break
  }

  return false
}

export function isValid(arg: any): boolean {
  return !isEmpty(arg)
}

export function isEqual(arg1: any, arg2: any): boolean {
  return String(arg1) === String(arg2)
}

export function isTrue(arg1: any): boolean {
  return arg1 === true || arg1 === 'true' || isEqual(arg1, '1')
}

export function isFalse(arg1: any): boolean {
  return arg1 === false || arg1 === 'false' || isEqual(arg1, '0')
}

export function isBool(arg: any): boolean {
  return isTrue(arg) || isFalse(arg)
}
