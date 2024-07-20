import { FileAction, FSTransaction } from '../types'

export default class Transaction implements FSTransaction {
  private readonly fileActions: Array<FileAction> = [];

  constructor (fileActions: FileAction[]) {
    this.fileActions = fileActions
  }

  push (...fsActions: FileAction[]): FSTransaction {
    // const ds = this.fileActions
    return new Transaction([...this.fileActions, ...fsActions])
  }

  slice (beginIndex: number, endIndex?: number): FileAction[] {
    return this.fileActions.slice(beginIndex, endIndex)
  }

  getAll (): FileAction[] {
    return [...this.fileActions]
  }
}
