const path = require('path')
const { exec, getUserArg } = require('../../src/cli')
// Replace to const { exec, getUserArg } = require('morphogen/lib/cli')

module.exports = async function () {
  const OUTPUT_PATH = await getUserArg('path', 'Output path', 'src/pages')
  const PageName = await getUserArg('pageName', 'Page name')

  exec({
    TPL_PATH: path.join(__dirname, '../templates/ReactPage'),
    OUTPUT_PATH
  }, {
    PageName
  })
}
