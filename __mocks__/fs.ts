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
  const files = mockFiles[directoryPath] ? Object.keys(mockFiles[directoryPath]) : [];
  const dirs = Object.keys(mockFiles).filter(dir => {
    return path.dirname(dir) === directoryPath;
  }).map(dir => dir.replace(directoryPath, ''))


  return [...files, ...dirs];
}

function readFileSync(file: string, content: 'utf-8') {
  const dir = path.dirname(file);
  const fileName = path.basename(file);
  return mockFiles?.[dir]?.[fileName];
}

function existsSync(file: string) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);
  return (!!mockFiles?.[dir]?.[fileName]) || (!!mockFiles?.[path.join(dir, fileName)]);
}

function statSync(file: string) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);

  return {
    isDirectory: () => mockFiles[file] ? true : false 
  }
}

function mkdirSync(dir: string) {
  if (!mockFiles[dir]) {
    mockFiles[dir] = {};
  }
}

function rmdirSync(dir: string) {
  if (mockFiles[dir]) {
    delete mockFiles[dir];
  }
}

function rmSync(file: string) {
  const dir = path.dirname(file);
  const fileName = path.basename(file);

  if (mockFiles?.[dir]?.[fileName]) {
    delete mockFiles[dir][fileName]
  }
}

function writeFileSync(path: string, content: string) {
  // HACK cwd to remove prefix
  __updateMockFile(path.replace(process.cwd(), ''), content);
}

function __cleanFs() {
  mockFiles = {};
}

fs.__setMockFiles = __setMockFiles;
fs.__getMockFileSystem = __getMockFileSystem;
fs.readdirSync = readdirSync;
fs.readFileSync = readFileSync;
fs.existsSync = existsSync;
fs.writeFileSync = writeFileSync;
fs.statSync = statSync;
fs.__cleanFs = __cleanFs;
fs.rmSync = rmSync;
fs.mkdirSync = mkdirSync;
fs.rmdirSync = rmdirSync;

module.exports = fs;