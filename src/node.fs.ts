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

async function tree (dir: string, option: FSTreeOption = {}, root?: string): Promise<FSTree[]> {
  const list: FSTree[] = []

  // if dir not existed or not directory
  try {
    const stats = await stat(dir)

    if (!stats.isDirectory()) {
      return list
    }
  } catch (_) {
    return list
  }

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
    }

    list.push(treeItem)
  }

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
