
import * as fs from 'fs'
import * as Mustache from 'mustache'

import { Context, FSPath } from '../types'
import { RenderTpl } from './types'

export const mustacheRenderTpl: RenderTpl = (path: FSPath, context: Context) => {
  const tmplContent = fs.readFileSync(path, 'utf8')

  const contextWithBlocks = {
    ...context,
    BlockName: () => (text: string, render: any) => {
      return '{{' + text + '}}'
    }
  }

  return Mustache.render(
    tmplContent,
    contextWithBlocks
  ) as string
}
