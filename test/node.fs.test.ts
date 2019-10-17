import * as path from 'path'
import nodeFs, { FSTreeType } from '../src/node.fs'

const LICENSE_NAME = 'LICENSE'
const LICENSE_SIZE = 1085

test('LICENSE size is ' + LICENSE_SIZE, () => {
  nodeFs.stat(path.resolve(__dirname, '../' + LICENSE_NAME))
    .then(data => {
      expect(data.size).toBe(LICENSE_SIZE)
      expect(data.isFile()).toBe(true)
    })
})

test('first file of tree must be LICENSE', () => {
  nodeFs.tree(path.resolve(__dirname, '..'), {
    ignored: /\/(lib|node_modules|\.git|\..*)/,
    deep: true
  }).then(data => {
    expect(data[0].type).toBe(FSTreeType.file)
    expect(data[0].name).toBe(LICENSE_NAME)
    expect(data[0].size).toBe(LICENSE_SIZE)
  })
})
