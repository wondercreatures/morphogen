import { FSPath } from "../types"

type MkDir = (path: FSPath) => void;
type FileExists = (path: FSPath) => boolean;
type WriteFile = (path: FSPath) => boolean;

type FSLayer = {
  MkDir: MkDir,
  FileExists: FileExists,
  WriteFile: WriteFile
}

export type FSLayerCommands = keyof FSLayer;

export type FileAction = {
  path: FSPath,
  action: FSLayerCommands,
  content: string
}

export interface FSTransaction {
  push(...fsPaths: FileAction[]): FSTransaction,
  slice(beginIndex: number, endIndex?: number): FileAction[]
  getAll(): FileAction[],
}

export type Commit = (transaction: FSTransaction) => void
export type Discard = (transaction: FSTransaction) => void