import * as path from 'path'
import * as fs from 'fs'
import { Config, Context, FSItem, Settings, WriteFileResult } from '../types'

export default function renderBlock (file: FSItem, config: Config, context: Context, settings: Settings): WriteFileResult {
  const { TPL_PATH } = config
  const { TemplateRender: renderTpl } = settings
  const tmplPath = path.join(TPL_PATH, file)
  const renderedData = renderTpl(tmplPath, context)

  if (typeof renderedData !== 'string') {
    throw new Error('Render error')
  }

  // Processing blocks
  const groups = /__BLK__(.+)(__)/.exec(file)
  const blockName = groups?.[1]

  if (blockName && context[blockName]) {
    const blockText = fs.readFileSync(context[blockName], 'utf-8')
    const renderedFileWithBlock = blockText.replace(`/*{${blockName}}*/`, renderedData + `/*{${blockName}}*/`)
    // const renderedFileWithBlock = renderTpl(context[blockName], {
    //   [blockName]: renderedData + `/*=~ it.${blockName} */`
    // });

    if (typeof renderedFileWithBlock !== 'string') {
      throw new Error('Render error')
    }

    return {
      outputPath: path.join(context[blockName]),
      content: renderedFileWithBlock
    }
  } else {
    throw new Error(`Block config is not fined (${blockName})`)
  }
}
