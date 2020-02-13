import generate from 'nanoid/generate'

const alphabet = 'ModuleSymbhasOwnPr0123456789ABCDEFGHNRVfgctiUvzKqYTJkLxpZXIjQW'

export default (len = 16): string => {
  return generate(alphabet, len)
}
