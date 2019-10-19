import http from 'http'
import * as path from 'path'
import nodeFs from '../src/node.fs'
import helper from '../src/helper'

const LOGOURL = 'http://instantlogosearch.ils.netdna-cdn.com/png?id=instantlogosearch-twitter'

function download () {
  return new Promise((resolve) => {
    http.get(LOGOURL, (res) => {
      resolve(res)
    })
  })
}

test('file name must be LICENSE', async () => {
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

test('should can\'t get invalid file\'s stat', async () => {
  try {
    const data = await nodeFs.stat('./invalid.json')
    expect(data.isFile()).toBe(false)
  } catch (err) {
    expect(helper.isError(err)).toBe(true)
  }
})