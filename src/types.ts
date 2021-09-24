export type FSPath = string;
export type FSItem = string;

export interface Args {
  morf_dir: FSPath,
}

export interface Config {
  TPL_PATH: FSPath,
  OUTPUT_PATH: FSPath,
}

export type TplArgument = string;

export type Context = Record<string, TplArgument>