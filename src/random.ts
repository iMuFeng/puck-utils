const numeric = '0123456789'
const hexic = '0123456789abcdef'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const length = 6

export enum Type {
  lower,
  upper,
  numeric,
  hexic,
  lowernumeric,
  uppernumeric,
  alphanumeric
}

function generate(len = length * 2, type = Type.alphanumeric): string {
  let alphabet: string = numeric + lower + upper

  switch (type) {
    case Type.lower:
      alphabet = lower
      break
    case Type.upper:
      alphabet = upper
      break
    case Type.numeric:
      alphabet = numeric
      break
    case Type.lowernumeric:
      alphabet = lower + numeric
      break
    case Type.uppernumeric:
      alphabet = upper + numeric
      break
    case Type.hexic:
      alphabet = hexic
      break
    default:
      break
  }

  let str = ''
  const alphabetLength = alphabet.length

  for (let i = 0; i < len; i++) {
    str += alphabet.charAt(Math.floor(Math.random() * alphabetLength))
  }

  return str
}

function number(len = length): string {
  return generate(len, Type.numeric)
}

function hex(len = length * 2): string {
  return generate(len, Type.hexic)
}

export default {
  generate,
  number,
  hex
}
