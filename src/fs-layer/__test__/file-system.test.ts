import FileSystem from '../fs/file-system';

jest.mock('fs');

describe('processTpl test', () => {
  afterAll(() => {
    require('fs').__cleanFs();
  });

  test('Test render basic template', () => {
    FileSystem.MkDir('/path/dir-name');
    FileSystem.WriteFile('/path/dir-name/file.txt', 'content');

    const FS_OUTPUT = require('fs').__getMockFileSystem();

    expect(FS_OUTPUT['/path/dir-name']['file.txt']).toEqual('content');
    expect(FileSystem.FileExists('/path/dir-name/file.txt')).toEqual(true);
    expect(FileSystem.FileExists('/path/dir-name/file1.txt')).toEqual(false);
  });
});