const path = require('path');

const fs: any = jest.createMockFromModule('fs');


let mockFiles: Record<string, Record<string, string>> = {};
function __setMockFiles(newMockFiles: Record<string, string>) {
  mockFiles = {};
  Object.keys(newMockFiles).forEach(file => {
    const dir = path.dirname(file);
    if (!mockFiles[dir]) {
      mockFiles[dir] = {};
    }
    mockFiles[dir][path.basename(file)] = newMockFiles[file]
  });
}

function __updateMockFile(file: string, content: string) {
  const dir = path.dirname(file);
  if (!mockFiles[dir]) {
    mockFiles[dir] = {};
  }
  mockFiles[dir][path.basename(file)] = content
}

function __getMockFileSystem() {
  return mockFiles;
}

function readdirSync(directoryPath: string) {
  return mockFiles[directoryPath] ? Object.keys(mockFiles[directoryPath]) : [];
}

function readFileSync(file: string, content: 'utf-8') {
  const dir = path.dirname(file);
  const fileName = path.basename(file);
  return mockFiles?.[dir]?.[fileName];
}

function existsSync(file: string) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);
  return !!mockFiles?.[dir]?.[fileName];
}

function statSync(file: string) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);

  return {
    isDirectory: () => !fileName
  }
}

function writeFileSync(path: string, content: string) {
  // HACK cwd to remove prefix
  __updateMockFile(path.replace(process.cwd(), ''), content);
}

fs.__setMockFiles = __setMockFiles;
fs.__getMockFileSystem = __getMockFileSystem;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;
fs.existsSync = existsSync;
fs.writeFileSync = writeFileSync;
fs.statSync = statSync;


module.exports = fs;