import { fileWalker } from '../storage'

jest.mock('fs')

describe('Walk structure', () => {
  const MOCK_FILE_INFO = {
    '/path/file1.js': '<html>/*=~ it.PageName */</html>',
    '/path/file2.js': '<html>/*=~ it.PageName */</html>',
    '/path/file3.js': '<html>/*=~ it.PageName */</html>',
    '/path/dir/file3.js': '<html>/*=~ it.PageName */</html>'
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  test('Test render basic template', () => {
    const files = fileWalker('/path')

    expect(files).toMatchObject([
      { type: 'FILE', path: 'file1.js' },
      { type: 'FILE', path: 'file2.js' },
      { type: 'FILE', path: 'file3.js' },
      { type: 'DIR', path: '/dir' },
      { type: 'FILE', path: '/dir/file3.js' }
    ])
  })
})
