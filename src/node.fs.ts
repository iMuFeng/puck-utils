import * as fs from 'fs'
import * as path from 'path'

export interface FSTreeOption {
  ignored?: RegExp
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
  lastModified: number
  children?: FSTree[]
}

function stat (filePath: string) {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

function readdir (dir: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

function sortBy (list: FSTree[]): FSTree[] {
  return list.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type > b.type ? 1 : -1
    }

    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  })
}

async function tree (dir: string, option: FSTreeOption = {}, root?: string): Promise<FSTree[]> {
  const list: FSTree[] = []
  const files = await readdir(dir)

  for (const file of files) {
    const rootPath = root || dir
    const absolutePath = path.resolve(dir, file)
    const relativePath = absolutePath.replace(rootPath, '').replace(/^\//, '')

    if (option.ignored && option.ignored.test(relativePath)) {
      continue
    }

    const stats = await stat(absolutePath)

    const type = stats.isDirectory() ? FSTreeType.directory : FSTreeType.file
    const basename = path.basename(file)
    const extname = path.extname(file).replace(/^\./, '')

    const treeItem: FSTree = {
      type,
      path: option.abspath ? absolutePath : relativePath,
      name: basename,
      extname,
      size: stats.size,
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

function writeStream (input: fs.ReadStream, filePath: string) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(filePath)

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
  stat,
  readdir,
  tree,
  writeStream
}
