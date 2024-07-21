import * as fs from 'fs'
import { FSLayer, TransactionAction } from '../types'

const FileSystem: FSLayer = {
  MkDir: function (path: string): TransactionAction {
    return {
      type: 'MkDir',
      commit: () => fs.mkdirSync(path),
      decline: () => fs.rmdirSync(path)
    }
  },
  FileExists: function (path: string): boolean {
    return fs.existsSync(path)
  },
  WriteFile: function (path: string, content: string) {
    return {
      type: 'MkDir',
      commit: () => fs.writeFileSync(path, content),
      decline: () => fs.rmSync(path)
    }
  },
  PathFile: function (path: string, content: string) {
    const contentBefore = fs.readFileSync(path)

    return {
      type: 'PathFile',
      commit: () => fs.writeFileSync(path, content),
      decline: () => fs.writeFileSync(path, contentBefore)
    }
  },
  RemoveFile: function (path: string) {
    fs.rmSync(path)
  },
  RemoveDir: function (path: string) {
    fs.rmdirSync(path)
  }
}

export default FileSystem
