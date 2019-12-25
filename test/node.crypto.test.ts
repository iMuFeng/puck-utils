import crypto from '../src/node.crypto'

test('md5', () => {
  expect(crypto.md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
})

test('sha1', () => {
  expect(crypto.hash('hello')).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')
})

test('sha256', () => {
  expect(crypto.hash('hello', 'sha256')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
})

test('sha512', () => {
  expect(crypto.hash('hello', 'sha512')).toBe('9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043')
})

test('hamc-md5', () => {
  expect(crypto.hmac('hello', 'secret', 'md5')).toBe('ut5jhjxh7QsxZYBuzWrO/A==')
})

test('hamc-sha1', () => {
  expect(crypto.hmac('hello', 'secret', 'sha1')).toBe('URIFXAX5RPhXVe/FzYlw4ZTp9Fs=')
})

test('hamc-sha512', () => {
  expect(crypto.hmac('hello', 'secret')).toBe('2xWVroimL9FR7By6gbmMOd+C2q57TLmCD0RtW/AvHc/KZoPYjKs+Jz9ZY6uOxGmnRrWxkIY3Ejn2fR5fmaeUQA==')
})

test('b64Encode', () => {
  expect(crypto.b64Encode('hello')).toBe('aGVsbG8=')
})

test('b64Decode', () => {
  expect(crypto.b64Decode('aGVsbG8=')).toBe('hello')
})

const key = 'ce502198aca7d46f3bf3e502197d468b'
const iv = '0123456789abcdef'
const output = 'tB+o62AbjpsjIsv/bHLadQ=='

test('aes encrypt', () => {
  expect(crypto.encrypt('hello', key, iv)).toBe(output)
})

test('aes decrypt string', () => {
  expect(crypto.decrypt(output, key, iv)).toBe('hello')
})

test('aes decrypt buffer', () => {
  expect(crypto.decrypt(Buffer.from(output, 'base64'), key, iv)).toBe('hello')
})
