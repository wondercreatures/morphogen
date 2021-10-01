import * as path from 'path';
import { renderTpl } from "../generate";
import { Config, Context, FSItem, WriteFileResult } from "../types";

export default function renderFileTpl(file: FSItem, config: Config, context: Context): WriteFileResult {
  const { OUTPUT_PATH, TPL_PATH } = config;
  const tmplPath = path.join(TPL_PATH, file);
  const renderedData = renderTpl(tmplPath, context);
  if (typeof renderedData !== 'string') {
    throw new Error('Render error');
  }
  const processedFileName = Object.keys(context).reduce((res, prop) => {
    return res.replace(`__RNM__${prop}__`, context[prop]);
  }, file);

  const resultPath = path.join(process.cwd(), OUTPUT_PATH, processedFileName);

  return {
    outputPath: resultPath,
    content: renderedData,
  }
}