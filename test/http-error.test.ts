import {
  BadRequestError,
  HttpError,
  InternalServerError,
  NotAcceptableError,
  NotFoundError,
  PayloadTooLargeError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  UnsupportedMediaTypeError
} from '../src/http-error'

const json = {
  code: 'code',
  message: 'message',
  errors: undefined
}

test('http error status', () => {
  expect(new HttpError('message').getStatus()).toBe(500)
})

test('bad request error', () => {
  expect(
    new BadRequestError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 400,
    ...json
  })
})

test('internal server error', () => {
  expect(
    new InternalServerError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 500,
    ...json
  })
})

test('not acceptable error', () => {
  expect(
    new NotAcceptableError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 406,
    ...json
  })
})

test('not found error', () => {
  expect(
    new NotFoundError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 404,
    ...json
  })
})

test('payload too large error', () => {
  expect(
    new PayloadTooLargeError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 413,
    ...json
  })
})

test('service unavailable error', () => {
  expect(
    new ServiceUnavailableError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 503,
    ...json
  })
})

test('unauthorized error', () => {
  expect(
    new UnauthorizedError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 401,
    ...json
  })
})

test('too many requests error', () => {
  expect(
    new TooManyRequestsError({
      code: 'code',
      message: 'message'
    }).toJSON()
  ).toStrictEqual({
    status: 429,
    ...json
  })
})

test('unsupported media type error', () => {
  expect(new UnsupportedMediaTypeError('message', 'code').toJSON().code).toBe(
    'code'
  )
})
