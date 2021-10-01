import * as fs from 'fs';
import { FilesList, FSItem, FSItemType, FSPath } from './types';
import * as path from 'path';

export function fileWalker(templatesPath: FSPath, subdir: FSPath = '') {
  const elements = fs.readdirSync(path.join(templatesPath, subdir));

  let filesList: FilesList = [];
  return elements.reduce((acc, file: FSItem) => {
    const tmplPath = path.join(templatesPath, subdir, file);
    const relativePath = path.join(subdir, file);
    const type = fs.statSync(tmplPath).isDirectory() ? FSItemType.DIR : FSItemType.FILE;
    acc.push({
      type,
      path: relativePath
    })

    if (type === FSItemType.DIR) {
      const subdirItems = fileWalker(path.join(templatesPath), path.join(subdir, file));
      acc.push(...subdirItems)
    }

    return acc;
  }, filesList);
}