import { isPlainObject } from './helper'
import { HttpStatus } from './http-status'

interface HttpResponse {
  code?: string | number
  message: string
  errors?: Record<string, any> | Record<string, any>[]
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
        : objectOrError.toString()
    }

    if (isObject) {
      response.code = (objectOrError as any).code || code
      response.errors = (objectOrError as any).errors
    }

    return response
  }
}

export class BadRequestError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'BAD_REQUEST'),
      HttpStatus.BAD_REQUEST
    )
  }
}

export class InternalServerError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'INTERNAL_SERVER_ERROR'),
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export class NotAcceptableError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'NOT_ACCEPTABLE'),
      HttpStatus.NOT_ACCEPTABLE
    )
  }
}

export class NotFoundError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'NOT_FOUND'),
      HttpStatus.NOT_FOUND
    )
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'PAYLOAD_TOO_LARGE'),
      HttpStatus.PAYLOAD_TOO_LARGE
    )
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'SERVICE_UNAVAILABLE'),
      HttpStatus.SERVICE_UNAVAILABLE
    )
  }
}

export class UnauthorizedError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'UNAUTHORIZED'),
      HttpStatus.UNAUTHORIZED
    )
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'TOO_MANY_REQUESTS'),
      HttpStatus.TOO_MANY_REQUESTS
    )
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor(objectOrError: string | HttpResponse) {
    super(
      HttpError.createBody(objectOrError, 'UNSUPPORTED_MEDIA_TYPE'),
      HttpStatus.UNSUPPORTED_MEDIA_TYPE
    )
  }
}
