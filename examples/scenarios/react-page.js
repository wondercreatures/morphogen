const path = require('path')
const { exec, askFor, getArgs } = require('../../src/cli')
// Replace to const { exec, askFor, getArgs } = require('morphogen/lib/cli')
const TPL = path.join(__dirname, '../templates/ReactPage')

module.exports = async function (argv) {
  const [OUTPUT_PATH_FROM_CLI] = argv._

  const OUTPUT_PATH = await askFor('Output path', OUTPUT_PATH_FROM_CLI)

  if (!OUTPUT_PATH) {
    throw new Error('Require outputPath')
  }

  const PageName = await askFor('Page name')

  exec({
    TPL_PATH: TPL,
    OUTPUT_PATH: path.join(OUTPUT_PATH)
  }, {
    PageName
  })
}
