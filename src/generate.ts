import { Config, Context, FSItem, FSItemType, FSPath, Settings, WriteFileResult } from "./types";
import * as Eta from 'eta';
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import { fileWalker } from "./storage";
import renderBlock from "./generators/renderBlock";
import renderFileTpl from "./generators/renderFileTpl";
import FileSystem from "./fs-layer/fs/file-system";
import Transaction from "./fs-layer/trasactions/transaction";
import { FSTransaction } from "./fs-layer/types";

/* eslint-disable no-shadow */
export function renderTpl(path: FSPath, context: Context) {
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

export function processTemplatesDir(config: Config, context: Context, userSettings: Partial<Settings> = {}) {
  let transaction: FSTransaction = new Transaction([]);

  const setttings: Settings = {
    FsLayer: FileSystem,
    ...userSettings,
  }

  const { FsLayer } = setttings;

  const { TPL_PATH, OUTPUT_PATH } = config;

  if (!FsLayer.FileExists(OUTPUT_PATH)) {
    transaction = transaction.push(FsLayer.MkDir(OUTPUT_PATH));
  };

  const elements = fileWalker(TPL_PATH);

  elements.forEach((item) => {
    const { path: file, type } = item;
    const processedFileName = Object.keys(context).reduce((res, prop) => {
      return res.split(`__RNM__${prop}__`).join(context[prop]);
      //return res.replace(`__RNM__${prop}__`, context[prop]);
    }, file);

    if (type === FSItemType.DIR) {
      const resultPath = path.join(process.cwd(), OUTPUT_PATH, processedFileName);
      if (!FsLayer.FileExists(resultPath)) {
        console.log(chalk.cyanBright('📁 Creating dir:'), chalk.greenBright(resultPath));
        transaction = transaction.push(FsLayer.MkDir(resultPath));
      }
    } else if (type === FSItemType.FILE) {
      if (/__BLK__/.test(file)) {
        const { outputPath, content } = renderBlock(file, config, context);
        console.log(chalk.cyanBright('📄 Appending to:'), chalk.greenBright(outputPath));
        transaction = transaction.push(FsLayer.PathFile(outputPath, content));
        //fs.writeFileSync(outputPath, content);
      } else {
        const { outputPath, content } = renderFileTpl(file, config, context);
        console.log(chalk.cyanBright('📄 Writing to:'), chalk.greenBright(outputPath));
        transaction = transaction.push(FsLayer.WriteFile(outputPath, content));
        //fs.writeFileSync(outputPath, content);
      }

    }
  });

  return transaction;
}
