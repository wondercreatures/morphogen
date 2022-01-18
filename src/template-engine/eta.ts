
import * as fs from 'fs'
import * as Eta from 'eta'
import { Context, FSPath } from '../types'
import { RenderTpl } from './types'

export const etaRenderTpl: RenderTpl = (path: FSPath, context: Context) => {
  const tmplContent = fs.readFileSync(path, 'utf8')
  return Eta.render(
    tmplContent,
    // '<%~ it.name %> /*=~ it.name */ 123',
    context,
    {
      tags: ['/*=', '*/']
    }
  ) as string
}
