import * as clone from 'clone'

export default function <T>(obj: T): T {
  return clone(obj)
}
