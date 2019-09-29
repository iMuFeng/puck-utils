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

function b64Encode (text: string | Buffer): string {
  if (Buffer.isBuffer(text)) {
    return text.toString('base64')
  }
  return Buffer.from(text).toString('base64')
}

function b64Decode (text: string): string {
  return Buffer.from(text, 'base64').toString('utf8')
}

function encrypt (text: string, key: string, iv: string, algorithm = 'aes-256-cbc'): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  const encrypted = cipher.update(text)
  const pad = cipher.final()
  return b64Encode(Buffer.concat([encrypted, pad]))
}

function decrypt (text: string, key: string, iv: string, algorithm = 'aes-256-cbc'): string {
  try {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    const decrypted = decipher.update(Buffer.from(text, 'base64'))
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
