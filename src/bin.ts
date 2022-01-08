#! /usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import { getArgs, askFor } from './cli';
import { ScenarioFunction } from './types';

async function run() {
  const args = getArgs();

  const scenariosDir = args.d || '__morphogen/scenarios';

  const elements: Array<string> = fs.readdirSync(scenariosDir);

  elements.forEach((s, n) => {
    console.log(`${chalk.grey(`[${n}]`)} ${chalk.green(s)}`)
  });

  const scenarioN = await askFor<keyof typeof elements>('Select scenario');
  if (!elements?.[scenarioN]) {
    throw new Error('Wrong scenario number');
  }

  const scenarioFunction = require(path.join(process.cwd(), scenariosDir, elements[scenarioN as number])) as ScenarioFunction;

  if (typeof scenarioFunction !== 'function') {
    throw new Error('Wrong scenario function')
  }

  scenarioFunction(args);
}

run();