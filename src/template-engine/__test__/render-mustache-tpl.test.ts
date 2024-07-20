import { mustacheRenderTpl } from '../mustache'
jest.mock('fs')

describe('renderTpl test', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': '<html>{{PageName}}</html>',
    '/path/to/fileWithBlock.js': '<html>{{#BlockName}}BLOCK_NAME{{/BlockName}}</html>'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  test('Test render basic template', () => {
    const expectedResult = '<html>SomeName</html>'
    const expectedResultWithBlock = '<html>{{BLOCK_NAME}}</html>'

    expect(mustacheRenderTpl('/path/to/file1.js', { PageName: 'SomeName' })).toEqual(expectedResult)
    expect(mustacheRenderTpl('/path/to/fileWithBlock.js', { })).toEqual(expectedResultWithBlock)
  })
})
