import * as path from 'path';
import { renderTpl } from "../generate";
import { Config, Context, FSItem, WriteFileResult } from "../types";

export default function renderBlock(file: FSItem, config: Config, context: Context): WriteFileResult {
  const { TPL_PATH } = config;
  const tmplPath = path.join(TPL_PATH, file);
  const renderedData = renderTpl(tmplPath, context);

  if (typeof renderedData !== 'string') {
    throw new Error('Render error');
  }

  // Processing blocks
  const groups = /__BLK__(.+)(__)/.exec(file);
  const blockName = groups?.[1]

  if (blockName && context[blockName]) {
    const renderedFileWithBlock = renderTpl(context[blockName], {
      [blockName]: renderedData
    });

    if (typeof renderedFileWithBlock !== 'string') {
      throw new Error('Render error')
    }
    
    return {
      outputPath: path.join(context[blockName]),
      content: renderedFileWithBlock
    }

  } else {
    throw new Error('Block config is not fined');
  }
}