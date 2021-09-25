import { processTemplatesDir, renderTpl } from "../generate";
import { Config, Context } from "../types";

jest.mock('fs');

describe('processTpl test', () => {
  const MOCK_FILE_INFO = {
    '/dir/tpls/file1.html': `<html>/*=~ it.PageName */</html>`,
    '/dir/tpls/file2.html': `<html>/*=~ it.Title */</html>`,
    '/dir/tpls/file3.html': `<b>123</b>`
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('Test render basic template', () => {
    const expectedResult1 = `<html>SomeName</html>`;
    const expectedResult2 = `<html>Title</html>`;
    const expectedResult3 = `<b>123</b>`;

    const config: Config = {
      TPL_PATH: '/dir/tpls',
      OUTPUT_PATH: '/dir/output'
    }

    const context: Context = {
      PageName: 'SomeName',
      Title: 'Title'
    }

    processTemplatesDir(config, context);
    const FS_OUTPUT = require('fs').__getMockFileSystem();

    expect(FS_OUTPUT[config.OUTPUT_PATH]['file1.html']).toEqual(expectedResult1);
    expect(FS_OUTPUT[config.OUTPUT_PATH]['file2.html']).toEqual(expectedResult2);
    expect(FS_OUTPUT[config.OUTPUT_PATH]['file3.html']).toEqual(expectedResult3);
  });
});