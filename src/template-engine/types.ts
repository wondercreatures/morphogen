import { Context, FSPath } from '../types'
export type RenderTpl = (path: FSPath, context: Context) => string;
