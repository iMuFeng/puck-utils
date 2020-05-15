import * as dayjs from 'dayjs'
// @ts-ignore
import * as mslib from 'ms'
import helper from './helper'

export function timestamp (): number {
  return Date.now()
}

export function unixTimestamp (): number {
  return Math.floor(timestamp() / 1e3)
}

export function ms(str: string): number {
  return mslib(str)
}

export default function (arg?: string | number): dayjs.Dayjs {
  if (helper.isNumber(arg)) {
    const unixts = Number(arg) > 0 ? Number(arg) : unixTimestamp()
    return dayjs.unix(unixts)
  }
  return dayjs(arg)
}
