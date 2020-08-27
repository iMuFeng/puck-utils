import { isPlainObject } from './helper'
import { HttpStatus } from './http-status'

interface HttpResponse {
  code?: string | number
  message: string
  errors?: Record<string, any> | Record<string, any>[]
}

interface GraphqlError extends HttpResponse {
  status?: HttpStatus
  locations?: any[]
  path?: any[]
}

export class HttpError extends Error {
  status: HttpStatus
  code?: string | number
  message: string
  errors?: Record<string, any> | Record<string, any>[]

  public constructor(
    objectOrError: string | HttpResponse,
    status = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super()
    const { code, message, errors } = HttpError.createBody(objectOrError)
    this.status = status
    this.code = code
    this.message = message
    this.errors = errors
  }

  public getStatus() {
    return this.status
  }

  public toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      errors: this.errors
    }
  }

  public static createBody(
    objectOrError: string | HttpResponse,
    code = 'INTERNAL_SERVER_ERROR'
  ): HttpResponse {
    const isObject = isPlainObject(objectOrError)
    const response: HttpResponse = {
      message: isObject
        ? (objectOrError as any).message
        : objectOrError.toString(),
      code: isObject ? (objectOrError as any).code : code
    }

    if ((objectOrError as any)?.errors) {
      response.errors = (objectOrError as any).errors
    }

    return response
  }
}

export class BadRequestError extends HttpError {
  constructor(objectOrError: string | HttpResponse, code = 'BAD_REQUEST') {
    super(HttpError.createBody(objectOrError, code), HttpStatus.BAD_REQUEST)
  }
}

export class InternalServerError extends HttpError {
  constructor(
    objectOrError: string | HttpResponse,
    code = 'INTERNAL_SERVER_ERROR'
  ) {
    super(
      HttpError.createBody(objectOrError, code),
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export class NotAcceptableError extends HttpError {
  constructor(objectOrError: string | HttpResponse, code = 'NOT_ACCEPTABLE') {
    super(HttpError.createBody(objectOrError, code), HttpStatus.NOT_ACCEPTABLE)
  }
}

export class NotFoundError extends HttpError {
  constructor(objectOrError: string | HttpResponse, code = 'NOT_FOUND') {
    super(HttpError.createBody(objectOrError, code), HttpStatus.NOT_FOUND)
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor(
    objectOrError: string | HttpResponse,
    code = 'PAYLOAD_TOO_LARGE'
  ) {
    super(
      HttpError.createBody(objectOrError, code),
      HttpStatus.PAYLOAD_TOO_LARGE
    )
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(
    objectOrError: string | HttpResponse,
    code = 'SERVICE_UNAVAILABLE'
  ) {
    super(
      HttpError.createBody(objectOrError, code),
      HttpStatus.SERVICE_UNAVAILABLE
    )
  }
}

export class UnauthorizedError extends HttpError {
  constructor(objectOrError: string | HttpResponse, code = 'UNAUTHORIZED') {
    super(HttpError.createBody(objectOrError, code), HttpStatus.UNAUTHORIZED)
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(
    objectOrError: string | HttpResponse,
    code = 'TOO_MANY_REQUESTS'
  ) {
    super(
      HttpError.createBody(objectOrError, code),
      HttpStatus.TOO_MANY_REQUESTS
    )
  }
}

export class AlreadyExistsError extends HttpError {
  constructor(objectOrError: string | HttpResponse, code = 'ALREADY_EXISTS') {
    super(HttpError.createBody(objectOrError, code), HttpStatus.CONFLICT)
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor(
    objectOrError: string | HttpResponse,
    code = 'UNSUPPORTED_MEDIA_TYPE'
  ) {
    super(
      HttpError.createBody(objectOrError, code),
      HttpStatus.UNSUPPORTED_MEDIA_TYPE
    )
  }
}

export function transformGraphqlError(err: any): GraphqlError {
  const exception = err.extensions?.exception

  const graphqlError: GraphqlError = {
    message: exception?.message || err.message,
    code: exception?.code || err.extensions?.code,
    status: exception?.status
  }

  if (exception?.errors) {
    graphqlError.errors = exception?.errors
  }

  graphqlError.locations = err.locations
  graphqlError.path = err.path

  return graphqlError
}
