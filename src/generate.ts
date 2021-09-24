import { Config, Context, FSItem, FSPath } from "./types";
import * as Eta from 'eta';
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

/* eslint-disable no-shadow */
function renderTpl(path: FSPath, context: Context) {
  const tmplContent = fs.readFileSync(path, 'utf8');
  return Eta.render(
    tmplContent,
    // '<%~ it.name %> /*=~ it.name */ 123',
    context,
    {
      tags: ['/*=', '*/'],
    },
  );
}

export function processTemplatesDir(config: Config, context: Context) {
  // tplPath: FSPath, outputPath: FSPath
  const { TPL_PATH, OUTPUT_PATH } = config;

  const elements = fs.readdirSync(TPL_PATH);
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH);
  }

  elements.forEach((file: FSItem) => {
    const tmplPath = path.join(TPL_PATH, file);
    console.log(chalk.bold(chalk.cyan('Processing:')), chalk.green(tmplPath));
    //const fileNameProcessed = file.
    const processedFileName = Object.keys(context).reduce((res, prop) => {
      return res.replace(`__${prop}__`, context[prop]);
    }, file);

    if (fs.statSync(tmplPath).isDirectory()) {
      processTemplatesDir({ 
        TPL_PATH: tmplPath,
        OUTPUT_PATH: path.join(OUTPUT_PATH, processedFileName) 
      }, context);
    } else {
      const resultPath = path.join(process.cwd(), OUTPUT_PATH, processedFileName);

      console.log(chalk.cyanBright('Writing to:'), chalk.greenBright(resultPath));

      const renderedData = renderTpl(tmplPath, context);
      //console.log(renderedData);
      if (typeof renderedData === 'string') {
        fs.writeFileSync(path.join(process.cwd(), OUTPUT_PATH, processedFileName), renderedData);
      } else {
        throw new Error('Wrong type of template render data');
      }
    } 
  });
}
