import helper from './helper'

const second = 1
// tslint:disable-next-line: no-magic-numbers
const minute = second * 60
// tslint:disable-next-line: no-magic-numbers
const hour = minute * 60
// tslint:disable-next-line: no-magic-numbers
const day = hour * 24
const week = day * 7
// tslint:disable-next-line: no-magic-numbers
const year = day * 365
const regx = /^(-?(?:\d+)?\.?\d+)(s|m|h|d|w|y)$/i

function parse(arg: string): number | undefined {
  if (helper.isEmpty(arg)) {
    return
  }

  const str = String(arg)
  const matches = str.match(regx)

  if (!matches) {
    return
  }

  const num = parseFloat(matches[1])
  const type = matches[2].toLowerCase()

  switch (type) {
    case 'y':
      return num * year

    case 'w':
      return num * week

    case 'd':
      return num * day

    case 'h':
      return num * hour

    case 'm':
      return num * minute

    case 's':
      return num * second
  }
}

export default function humanizeSeconds(arg: string): number | undefined {
  const value = parse(arg)

  if (value) {
    return Math.round(value)
  }
}
