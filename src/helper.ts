import * as validator from 'validator'

import type from './type'

/* @ts-ignore */
const whiteSpaceRegx = /^[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]+$/
const toString = Object.prototype.toString

function isBoolean (arg: any): boolean {
  return type(arg) === 'boolean'
}

function isString (arg: any): boolean {
  return type(arg) === 'string'
}

function isNumber (arg: any): boolean {
  return type(arg) === 'number'
}

const isArray = Array.isArray
const isNaN = Number.isNaN

function isSet (arg: any): boolean {
  return type(arg) === 'set'
}

function isMap (arg: any): boolean {
  return type(arg) === 'map'
}

function isSymbol (arg: any): boolean {
  return type(arg) === 'symbol'
}

function isObject (arg: any): boolean {
  return type(arg) === 'object'
}

function isDate (arg: any): boolean {
  return type(arg) === 'date'
}

function isRegExp (arg: any): boolean {
  return type(arg) === 'regexp'
}

function isError (arg: any): boolean {
  return type(arg) === 'error'
}

function isFunction (arg: any): boolean {
  return type(arg) === 'function'
}

function isNull (arg: any): boolean {
  return type(arg) === 'null'
}

function isUndefined (arg: any): boolean {
  return type(arg) === 'undefined'
}

function isNil (arg: any): boolean {
  return isNull(arg) || isUndefined(arg)
}

function isPlainObject (arg: any): boolean {
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

function isEmpty (arg: any): boolean {
  if (isNil(arg)) return true

  if (isBoolean(arg)) return false

  if (isNumber(arg)) return false

  if (isString(arg)) {
    return arg.length === 0 || whiteSpaceRegx.test(arg)
  }

  if (isFunction(arg) || isArray(arg)) {
    return arg.length === 0
  }

  if (arg.toString === toString) {
    switch (arg.toString()) {
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return arg.size === 0
      }

      case '[object Object]': {
        for (const key in arg) {
          if (Object.hasOwnProperty.call(arg, key)) return false
        }
        return true
      }

      default:
        break
    }
  }

  return false
}

function isValid (arg: any): boolean {
  return !isEmpty(arg)
}

function isEqual (arg1: any, arg2: any): boolean {
  return String(arg1) === String(arg2)
}

function isTrue (arg1: any): boolean {
  return arg1 === true || arg1 === 'true' || isEqual(arg1, '1')
}

function isFalse (arg1: any): boolean {
  return arg1 === false || arg1 === 'false' || isEqual(arg1, '0')
}

function isBool (arg: any): boolean {
  return isTrue(arg) || isFalse(arg)
}

export default {
  ...validator,
  isArray,
  isNaN,
  isBoolean,
  isDate,
  isEmpty,
  isError,
  isFunction,
  isMap,
  isNull,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isValid,
  isEqual,
  isTrue,
  isFalse,
  isBool
}
