import * as fs from 'fs-extra'
import * as npath from 'path'
import helper from './helper'

export interface FSTreeOption {
  ignored?: RegExp
  included?: RegExp
  deep?: boolean
  abspath?: boolean
}

export enum FSTreeType {
  file = 'file',
  directory = 'directory'
}

export interface FSTree {
  type: FSTreeType
  path: string
  name: string
  extname: string
  size: number
  createdAt: number
  lastModified: number
  children?: FSTree[]
}

function stat (path: string) {
  return helper.promisify<fs.Stats>(fs.stat)(path)
}

function readdir (path: string) {
  return helper.promisify<string[]>(fs.readdir)(path)
}

function sortBy (list: FSTree[]): FSTree[] {
  return list.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type > b.type ? 1 : -1
    }

    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  })
}

async function tree (path: string, option: FSTreeOption = {}, root?: string): Promise<FSTree[]> {
  const list: FSTree[] = []
  const files = await readdir(path)

  for (const file of files) {
    const rootPath = root || path
    const absolutePath = npath.resolve(path, file)
    const relativePath = absolutePath.replace(rootPath, '').replace(/^\//, '')

    if (option.included && !option.included.test(relativePath)) {
      continue
    }

    if (option.ignored && option.ignored.test(relativePath)) {
      continue
    }

    const stats = await stat(absolutePath)

    const type = stats.isDirectory() ? FSTreeType.directory : FSTreeType.file
    const basename = npath.basename(file)
    const extname = npath.extname(file).replace(/^\./, '')

    const treeItem: FSTree = {
      type,
      path: option.abspath ? absolutePath : relativePath,
      name: basename,
      extname,
      size: stats.size,
      createdAt: stats.birthtimeMs,
      lastModified: stats.mtimeMs
    }

    if (option.deep && type === FSTreeType.directory) {
      treeItem.children = await tree(absolutePath, option, rootPath)
      sortBy(treeItem.children)
    }

    list.push(treeItem)
  }

  sortBy(list)
  return list
}

function writeStream (input: fs.ReadStream, path: string) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(path)

    input.on('data', chunk => {
      output.write(chunk)
    })

    input.on('end', () => {
      output.end()
      resolve()
    })

    input.on('error', err => {
      reject(err)
    })
  })
}

export default {
  ...fs,
  stat,
  tree,
  writeStream
}
