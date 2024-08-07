import { etaRenderTpl } from '../eta'
jest.mock('fs')

describe('renderTpl test', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': '<html>/*=~ it.PageName */</html>'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  test('Test render basic template', () => {
    const expectedResult = '<html>SomeName</html>'

    expect(etaRenderTpl('/path/to/file1.js', { PageName: 'SomeName' })).toEqual(expectedResult)
  })
})
