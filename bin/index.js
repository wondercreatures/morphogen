#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { getArgs, askFor } = require('../dist/cli.js')

async function run() {
  const args = getArgs();

  const scenariosDir = args.morf_dir || '__morphogen/scenarios';

  const elements = fs.readdirSync(scenariosDir);

  elements.forEach((s, n) => {
    console.log(`${chalk.grey(`[${n}]`)} ${chalk.green(s)}`)
  });

  const scenarioN = await askFor('Select scenario');
  if (!elements[scenarioN]) {
    throw new Error('Wrong scenario number');
  }

  require(path.join(process.cwd(), scenariosDir, elements[scenarioN]));
}

run();