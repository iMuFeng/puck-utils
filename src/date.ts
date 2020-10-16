import { OpUnitType, QUnitType } from 'dayjs'
import * as dayjs from 'dayjs'
import { hs } from './hs'

export type DayJS = dayjs.Dayjs

export function timestamp(): number {
  return Math.floor(Date.now() / 1e3)
}

export function date(str?: string, format?: string): DayJS {
  return dayjs(str, format)
}

export function unixDate(t: number): DayJS {
  return dayjs.unix(t)
}

export function isDateExpired(
  start: number,
  end: number,
  expire: string
): boolean {
  return end - start > hs(expire)!
}

export function unixDiff(
  start: number,
  end: number,
  unit: QUnitType | OpUnitType = 'day'
): number {
  if (start > end || start < 0 || end < 0) {
    return 0
  }
  return unixDate(end).diff(unixDate(start), unit)
}

export function datePeriod(
  start: number,
  value = 1,
  unit: OpUnitType = 'month'
): number {
  return unixDate(start).add(value, unit).unix()
}
