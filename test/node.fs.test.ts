import http from 'http'
import * as path from 'path'
import nodeFs from '../src/node.fs'

const LOGOURL = 'http://instantlogosearch.ils.netdna-cdn.com/png?id=instantlogosearch-twitter'

function download () {
  return new Promise((resolve) => {
    http.get(LOGOURL, (res) => {
      resolve(res)
    })
  })
}

test('file of tree must be LICENSE', async () => {
  const data = await nodeFs.tree(path.resolve(__dirname, '..'), {
    ignored: /(^|\/)(coverage|lib|node_modules|\.git|\..*)/,
    deep: true
  })
  expect(data[2].name).toBe('LICENSE')
})

test('should save stream to file', async () => {
  const logoPath = path.resolve(__dirname, '../twitter.jpg')
  const res = await download()
  await nodeFs.writeStream(res as any, logoPath)
  const data = await nodeFs.stat(logoPath)
  expect(data.isFile()).toBe(true)
})
