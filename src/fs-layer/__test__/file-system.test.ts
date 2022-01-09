import FileSystem from '../fs/file-system';

jest.mock('fs');

describe('File system', () => {
  afterAll(() => {
    require('fs').__cleanFs();
  });

  test('Test mkdir and file', () => {
    const { commit: commitDir, decline: declineDir } = FileSystem.MkDir('/path/dir-name');
    const { commit: commitFile, decline: declineFile } = FileSystem.WriteFile('/path/dir-name/file.txt', 'content');

    const FS_OUTPUT = require('fs').__getMockFileSystem();

    commitDir();
    expect(FileSystem.FileExists('/path/dir-name')).toEqual(true);
    commitFile();
    expect(FS_OUTPUT['/path/dir-name']['file.txt']).toEqual('content');
    expect(FileSystem.FileExists('/path/dir-name/file.txt')).toEqual(true);
    expect(FileSystem.FileExists('/path/dir-name/file1.txt')).toEqual(false);

    declineFile();
    expect(FileSystem.FileExists('/path/dir-name/file.txt')).toEqual(false);
    declineDir();
    expect(FileSystem.FileExists('/path/dir-name')).toEqual(false);
  });

  test('Path file', () => {
    FileSystem.MkDir('/path/dir-name').commit();
    FileSystem.WriteFile('/path/dir-name/file.txt', 'content').commit();
    const { commit, decline } = FileSystem.PathFile('/path/dir-name/file.txt', 'new content');

    const FS_OUTPUT = require('fs').__getMockFileSystem();
    expect(FS_OUTPUT['/path/dir-name']['file.txt']).toEqual('content');
    commit();
    expect(FS_OUTPUT['/path/dir-name']['file.txt']).toEqual('new content');
    decline();
    expect(FS_OUTPUT['/path/dir-name']['file.txt']).toEqual('content');
  });
});