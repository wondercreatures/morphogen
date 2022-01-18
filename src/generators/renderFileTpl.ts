import * as path from 'path'
import { Config, Context, FSItem, Settings, WriteFileResult } from '../types'

export default function renderFileTpl (file: FSItem, config: Config, context: Context, settings: Settings): WriteFileResult {
  const { TemplateRender: renderTpl } = settings
  const { OUTPUT_PATH, TPL_PATH } = config
  const tmplPath = path.join(TPL_PATH, file)
  const renderedData = renderTpl(tmplPath, context)
  if (typeof renderedData !== 'string') {
    throw new Error('Render error')
  }
  const processedFileName = Object.keys(context).reduce((res, prop) => {
    return res.split(`__RNM__${prop}__`).join(context[prop])
  }, file)

  const resultPath = path.join(process.cwd(), OUTPUT_PATH, processedFileName)

  return {
    outputPath: resultPath,
    content: renderedData
  }
}
