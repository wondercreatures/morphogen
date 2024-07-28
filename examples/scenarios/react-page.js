const path = require('path')
const { exec, getUserArg } = require('../../src/cli')
// Replace to const { exec, getUserArg } = require('morphogen/lib/cli')

module.exports.prepareArgs = async () => {
  const OUTPUT_PATH = await getUserArg('path', 'Output path', 'src/pages')
  const PageName = await getUserArg('pageName', 'Page name')

  return {
    OUTPUT_PATH,
    PageName
  }
}

module.exports.run = async function ({ OUTPUT_PATH, PageName }, config) {
  exec({
    ...config,
    TPL_PATH: path.join(__dirname, '../templates/ReactPage'),
    OUTPUT_PATH
  }, {
    PageName
  })
}
