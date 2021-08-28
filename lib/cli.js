const chalk = require('chalk');
const { processTemplatesDir } = require('./generate');


const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')

const readline = require("readline");


const getArgs = () => {
  const argv = yargs(hideBin(process.argv)).argv;
  return argv;
}

async function exec(config) {
  processTemplatesDir(config.TPL_PATH, config.OUTPUT_PATH, config);
}

function askFor (description, defaultValue) {
  // eslint-disable-next-line promise/param-names
  return new Promise((ok, err) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const questionText = chalk.green(description) + (defaultValue ? ` (${defaultValue})` : chalk.red(' (required!)')) + ': ';
    rl.question(questionText, function (value) {
      if (!defaultValue && !value) {
        err(new Error(chalk`Requred value!`));
      } else {
        ok(value || defaultValue)
      }
      rl.close()
    })
  })
}

module.exports = {
  exec,
  askFor,
  getArgs
}

