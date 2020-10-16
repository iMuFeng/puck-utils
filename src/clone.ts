import * as c from 'clone'

export function clone<T>(obj: T): T {
  return c(obj)
}
