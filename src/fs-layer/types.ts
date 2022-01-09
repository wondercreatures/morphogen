import { FSPath } from "../types"

export type TransactionAction = {
  type: FSLayerCommands,
  commit: () => void,
  decline: () => void
}

type MkDir = (path: FSPath) => TransactionAction;
type FileExists = (path: FSPath) => boolean;
type WriteFile = (path: FSPath, content: string) => TransactionAction;
type PathFile = (path: FSPath, content: string) => TransactionAction;
type RemoveFile = (path: FSPath) => void
type RemoveDir = (path: FSPath) => void

export type FSLayer = {
  MkDir: MkDir,
  FileExists: FileExists,
  WriteFile: WriteFile,
  PathFile: PathFile,
  RemoveFile: RemoveFile,
  RemoveDir: RemoveDir
}

export type FSLayerCommands = keyof FSLayer;

export type FileAction = {
  type: FSLayerCommands,
  commit: () => void,
  decline: () => void
}

export interface FSTransaction {
  push(...fsPaths: FileAction[]): FSTransaction,
  slice(beginIndex: number, endIndex?: number): FileAction[]
  getAll(): FileAction[],
}

export type Commit = (transaction: FSTransaction) => FileAction[];
export type Discard = (fsLayer: FSLayer, transaction: FSTransaction) => void