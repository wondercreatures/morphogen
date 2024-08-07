import { Arguments } from 'yargs'
import { FSLayer } from './fs-layer/types'
import { RenderTpl } from './template-engine/types'

export type FSPath = string;
export type FSItem = string;

export interface Args extends Arguments {
  d: FSPath,
}

export interface Config {
  TPL_PATH: FSPath,
  OUTPUT_PATH: FSPath,
}

export type TplArgument = string;

export type Context = Record<string, TplArgument>

export enum FSItemType {
  DIR = 'DIR',
  FILE = 'FILE'
}

export type FilesList = Array<{
  type: FSItemType
  path: FSPath
}>

export interface WriteFileResult {
  outputPath: FSPath,
  content: string
}

export type ScenarioFunction = (args: Arguments) => void;

export type Settings = {
  FsLayer: FSLayer,
  TemplateRender: RenderTpl,
};
