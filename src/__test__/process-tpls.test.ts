import commit from '../fs-layer/fs/commit'
import { processTemplatesDir } from '../generate'
import { Config, Context } from '../types'

jest.mock('fs')

describe('processTpl test', () => {
  const MOCK_FILE_INFO = {
    '/dir/tpls/file1.html': '<html>{{PageName}}</html>',
    '/dir/tpls/file2.html': '<html>{{Title}}</html>',
    '/dir/tpls/file3.html': '<b>{{#BlockName}}BLOCK_NAME{{/BlockName}}</b>',
    '/dir/tpls/dir/file3.html': '<b>{{Content}}</b>',
    '/dir/tpls/__RNM__DIR_NAME__/file4.html': 'data',
    '/dir/tpls/__BLK__BLOCK_NAME__.html': 'vallll',
    '/dir/output/append-here.html': 'text before /*{BLOCK_NAME}*/text after',
    '/dir/tpls/__RNM__DIR_NAME__/__RNM__PageName__.html': 'data'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  afterAll(() => {
    require('fs').__cleanFs(MOCK_FILE_INFO)
  })

  test('Test render basic template', () => {
    const expectedResult1 = '<html>SomeName</html>'
    const expectedResult2 = '<html>Title</html>'
    const expectedResult3 = '<b>{{BLOCK_NAME}}</b>'
    const expectedResult4 = '<b>Content text</b>'
    const expectedResult5 = 'data'
    const expectedResult6 = 'text before vallll/*{BLOCK_NAME}*/text after'

    const config: Config = {
      TPL_PATH: '/dir/tpls',
      OUTPUT_PATH: '/dir/output'
    }

    const context: Context = {
      PageName: 'SomeName',
      Title: 'Title',
      Content: 'Content text',
      DIR_NAME: 'somename',
      BLOCK_NAME: '/dir/output/append-here.html'
    }

    const transaction = processTemplatesDir(config, context)
    commit(transaction)

    const FS_OUTPUT = require('fs').__getMockFileSystem()

    expect(FS_OUTPUT[config.OUTPUT_PATH]['file1.html']).toEqual(expectedResult1)
    expect(FS_OUTPUT[config.OUTPUT_PATH]['file2.html']).toEqual(expectedResult2)
    expect(FS_OUTPUT[config.OUTPUT_PATH]['file3.html']).toEqual(expectedResult3)
    expect(FS_OUTPUT[config.OUTPUT_PATH + '/dir']['file3.html']).toEqual(expectedResult4)
    expect(FS_OUTPUT[config.OUTPUT_PATH + '/somename']['file4.html']).toEqual(expectedResult5)
    expect(FS_OUTPUT[config.OUTPUT_PATH]['append-here.html']).toEqual(expectedResult6)
  })
})
