import * as crypto from 'crypto'

function md5 (text: string): string {
  return crypto.createHash('md5').update(text).digest('hex')
}

function hash (text: string, algorithm = 'sha1'): string {
  return crypto.createHash(algorithm).update(text).digest('hex')
}

function hmac (text: string, key: string, algorithm = 'sha512'): string {
  return crypto.createHmac(algorithm, key).update(text).digest().toString('base64')
}

function b64Encode (input: string | Buffer): string {
  if (Buffer.isBuffer(input)) {
    return input.toString('base64')
  }
  return Buffer.from(input).toString('base64')
}

function b64Decode (text: string): string {
  return Buffer.from(text, 'base64').toString('utf8')
}

function encrypt (input: crypto.BinaryLike, key: string, iv: string, algorithm = 'aes-256-cbc'): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  const encrypted = cipher.update(input)
  const pad = cipher.final()
  return b64Encode(Buffer.concat([encrypted, pad]))
}

function decrypt (input: string | Buffer, key: string, iv: string, algorithm = 'aes-256-cbc'): string {
  try {
    let buffer: Buffer

    if (Buffer.isBuffer(input)) {
      buffer = input
    } else {
      buffer = Buffer.from(input, 'base64')
    }

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    const decrypted = decipher.update(buffer)
    const pad = decipher.final()
    return Buffer.concat([decrypted, pad]).toString('utf8')
  } catch (err) {
    throw err
  }
}

export default {
  md5,
  hash,
  hmac,
  b64Encode,
  b64Decode,
  encrypt,
  decrypt
}
