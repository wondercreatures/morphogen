import { Args, Config, Context, TplArgument } from './types'
import * as Chalk from 'chalk'

import { processTemplatesDir } from './generate'
import * as yargs from 'yargs'
import commit from './fs-layer/fs/commit'
import discard from './fs-layer/fs/discard'
import { FSTransaction } from './fs-layer/types'

// const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')

const readline = require('readline')

export const getArgs = <ARGS = Args>(): ARGS => {
  const argv: any = yargs(hideBin(process.argv)).argv
  return argv as ARGS
}

export async function exec (config: Config, context: Context) {
  let isCompleate = 'N'
  let transaction: FSTransaction | undefined
  while (isCompleate !== 'y') {
    if (isCompleate === 'd' && transaction) {
      discard(transaction)
    }
    transaction = processTemplatesDir(config, context)
    commit(transaction)
    isCompleate = await askFor('Compleate work? y/d/N', 'N')
    if (isCompleate !== 'y') {
      discard(transaction)
    }
  }
}

export function askFor<ARGUMENT_TYPE = TplArgument> (description: string, defaultValue?: ARGUMENT_TYPE): Promise<ARGUMENT_TYPE> {
  // eslint-disable-next-line promise/param-names
  return new Promise((ok, err) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const questionText = Chalk.green(description) + (defaultValue ? ` (${defaultValue})` : Chalk.red(' (required!)')) + ': '
    rl.question(questionText, function (value: ARGUMENT_TYPE) {
      if (!defaultValue && !value) {
        err(new Error(Chalk`Requred value!`))
      } else if (!value && defaultValue) {
        ok(defaultValue)
      } else {
        ok(value)
      }
      rl.close()
    })
  })
}

export async function getUserArg<ARGUMENT_TYPE = TplArgument> (name: string, description: string, defaultValue?: ARGUMENT_TYPE) {
  const args = getArgs<Record<string, ARGUMENT_TYPE | undefined>>()
  const valueFromCli = args[name]
  if (valueFromCli) {
    return valueFromCli
  }

  return askFor<ARGUMENT_TYPE>(description, defaultValue)
}
