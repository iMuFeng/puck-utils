import nanoid from 'nanoid'

export default (len = 16): string => {
  return nanoid(len)
}
