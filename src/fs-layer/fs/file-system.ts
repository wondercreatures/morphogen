import * as fs from 'fs';
import { FSLayer } from '../types';

const FileSystem: FSLayer = {
  MkDir: function (path: string): void {
    fs.mkdirSync(path);
  },
  FileExists: function (path: string): boolean {
    return fs.existsSync(path);
  },
  WriteFile: function (path: string, content: string){
    fs.writeFileSync(path, content)
  }
}

export default FileSystem;