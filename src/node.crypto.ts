import * as crypto from 'crypto'

function md5 (text: string): string {
  return crypto.createHash('md5').update(text).digest('hex')
}

function hash (text: string, algorithm = 'sha1'): string {
  return crypto.createHash(algorithm).update(text).digest('hex')
}

function shamac (text: string, secret: string, algorithm = 'sha512'): string {
  return crypto.createHmac(algorithm, secret).update(text).digest().toString('base64')
}

function b64Encode (text: string): string {
  return new Buffer(text).toString('base64')
}

function b64Decode (text: string): string {
  return new Buffer(text, 'base64').toString('utf8')
}

export default {
  md5,
  hash,
  shamac,
  b64Encode,
  b64Decode
}
