import http from 'http'
import * as path from 'path'
import helper from '../src/helper'
import nodeFs from '../src/node.fs'

const ROOT_PATH = path.resolve(__dirname, '..')
const TMP_PATH = path.resolve(ROOT_PATH, '.unittest')
const LOGO_PATH = path.resolve(TMP_PATH, '0.jpg')

const LOGOURL = 'http://instantlogosearch.ils.netdna-cdn.com/png?id=instantlogosearch-twitter'

function download () {
  return new Promise((resolve) => {
    http.get(LOGOURL, (res) => {
      resolve(res)
    })
  })
}

test(`should create ${TMP_PATH}`, async () => {
  await nodeFs.ensureDir(TMP_PATH)
  expect(await nodeFs.pathExists(TMP_PATH)).toBe(true)
})

test('file name must be LICENSE', async () => {
  const data = await nodeFs.tree(ROOT_PATH, {
    ignored: /(^|\/)(coverage|lib|node_modules|\.git|\..*)/,
    deep: true
  })
  expect(data[2].name).toBe('LICENSE')
})

test('should save stream to file', async () => {
  const res = await download()
  await nodeFs.writeStream(res as any, LOGO_PATH)
  const isExist = await nodeFs.pathExists(LOGO_PATH)
  expect(isExist).toBe(true)
})

test('invalid.json is not exist', async () => {
  expect(await nodeFs.pathExists('./invalid.json')).toBe(false)
})

test('can\'t get invalid.json\'s stat', async () => {
  try {
    const data = await nodeFs.stat('./invalid.json')
    expect(data.isFile()).toBe(false)
  } catch (err) {
    expect(helper.isError(err)).toBe(true)
  }
})

test(`should remove ${TMP_PATH}`, async () => {
  await nodeFs.remove(TMP_PATH)
  const isExist = await nodeFs.pathExists(TMP_PATH)
  expect(isExist).toBe(false)
})
