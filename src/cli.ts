import { Args, Config, Context, TplArgument } from "./types";
import * as Chalk from 'chalk';

import { processTemplatesDir } from './generate';
import * as yargs from 'yargs';


// const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')

const readline = require("readline");


export const getArgs = <ARGS = Args>(): ARGS => {
  const argv: any = yargs(hideBin(process.argv)).argv;
  return argv as ARGS;
}

export async function exec(config: Config, context: Context) {
  processTemplatesDir(config, context);
}

export function askFor<ARGUMENT_TYPE = TplArgument>(description: string, defaultValue?: ARGUMENT_TYPE): Promise<ARGUMENT_TYPE> {
  // eslint-disable-next-line promise/param-names
  return new Promise((ok, err) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const questionText = Chalk.green(description) + (defaultValue ? ` (${defaultValue})` : Chalk.red(' (required!)')) + ': ';
    rl.question(questionText, function (value: ARGUMENT_TYPE) {
      if (!defaultValue && !value) {
        err(new Error(Chalk`Requred value!`));
      } else if (!value && defaultValue) {
        ok(defaultValue);
      } else {
        ok(value)
      }
      rl.close()
    })
  })
}
