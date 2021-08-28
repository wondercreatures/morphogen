const path = require('path');

const { exec, askFor, getArgs } = require('../../lib/cli')

console.log('000-====');

function capital(word) {
  const wordLower = word.toLowerCase()
  return wordLower[0].toUpperCase() + wordLower.substring(1);
}

const TPL = path.join(__dirname, '../templates/ReactPage');

async function Scenario() {
  const argv = getArgs();
  const [ OUTPUT_PATH_FROM_CLI ] = argv._;

  const OUTPUT_PATH = await askFor('Output path', OUTPUT_PATH_FROM_CLI)

  if (!OUTPUT_PATH) {
    throw new Error('Require outputPath')
  }

  const PageName = await askFor('Page name')

  exec({
    PageName,
    TPL_PATH: TPL,
    OUTPUT_PATH: path.join(OUTPUT_PATH)
  });

  // exec(config);
}

Scenario();
