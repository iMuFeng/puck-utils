import dayjs from 'dayjs'
import helper from './helper'

export function timestamp (): number {
  return Date.now()
}

export function unixTimestamp (): number {
  return Math.floor(timestamp() / 1e3)
}

export default function (arg?: string | number): dayjs.Dayjs {
  if (helper.isNumber(arg)) {
    const unixts = Number(arg) > 0 ? Number(arg) : unixTimestamp()
    return dayjs.unix(unixts)
  }
  return dayjs(arg)
}
