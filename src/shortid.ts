import { customAlphabet } from 'nanoid'

const alphabet = 'ModuleSymbhasOwnPr0123456789ABCDEFGHNRVfgctiUvzKqYTJkLxpZXIjQW'

export default (len = 16): string => {
  const nanoid = customAlphabet(alphabet, len)
  return nanoid()
}
