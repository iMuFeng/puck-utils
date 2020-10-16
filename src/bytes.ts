import { isEmpty } from './helper'

const BYTE = 1
const KB = BYTE * 1e3
const MB = KB * 1e3
const GB = MB * 1e3
const TB = GB * 1e3
const PB = TB * 1e3
const regx = /^(-?(?:\d+)?\.?\d+)(b|kb|mb|gb|tb|pb)$/i

function parse(arg: string): number | undefined {
  if (isEmpty(arg)) {
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
    case 'pb':
      return num * PB

    case 'tb':
      return num * TB

    case 'gb':
      return num * GB

    case 'mb':
      return num * MB

    case 'kb':
      return num * KB

    case 'b':
      return num * BYTE
  }
}

export function bytes(size: string): number | undefined {
  return parse(size)
}
