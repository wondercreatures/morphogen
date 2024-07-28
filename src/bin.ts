#! /usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import { getArgs, askFor } from './cli'
import { ScenarioFunction } from './types'

async function run () {
  const args = getArgs()

  const argv = require('yargs/yargs')(process.argv.slice(2))
    .usage(`${chalk.greenBright('morphogen')} codegeneratrion tool`)
    .help('help').alias('help', 'h')
    .options({
      scenariosDir: {
        alias: 'd',
        description: 'scenarios directory',
        requiresArg: true,
        required: true,
        default: '__morphogen/scenarios'
      },
      scenarioName: {
        alias: 's',
        description: 'scenario name to run',
        requiresArg: true,
        required: false
      }
    })
    .parse()

  if (fs.existsSync(argv.scenariosDir) === false) {
    throw new Error(chalk.red(`Scenarios dir "${chalk.bold(argv.scenariosDir)}" not found`))
  }

  const elements: Array<string> = fs.readdirSync(argv.scenariosDir)

  console.log(`${chalk.bgGray('Available scenarios:')} ${chalk.greenBright('$command')} ${chalk.gray('$full-path')}`)
  if (!argv.scenarioName) {
    elements.forEach((s) => {
      console.log(`${chalk.greenBright(`npx morphogen -s ${chalk.bold(s.split('.').slice(0, -1).join('.'))}`)} ${chalk.gray(path.join(argv.scenariosDir, s))}`)
    })
    return
  }

  const scenarioPath = elements.find((s) => s.split('.').slice(0, -1).join('.') === argv.scenarioName)

  if (!scenarioPath) {
    throw new Error(`Scenario "${argv.scenarioName}" not found`)
  }

  const pathOfScenario = path.join(process.cwd(), argv.scenariosDir, scenarioPath)

  if (fs.existsSync(pathOfScenario) === false) {
    throw new Error(chalk.red(`Scenario file "${chalk.bold(pathOfScenario)}" not found`))
  }

  const scenarioFunction = require(pathOfScenario) as ScenarioFunction

  if (typeof scenarioFunction !== 'function') {
    throw new Error('Wrong scenario function')
  }

  scenarioFunction(args)
}

run()
