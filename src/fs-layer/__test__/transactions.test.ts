import Transaction from '../trasactions/transaction';
import { FileAction } from '../types';

describe('Transaction test', () => {

  const FileActions: FileAction[] = [{
    path: 'Dir',
    action: 'MkDir',
    content: '' 
  },
  {
    path: 'File',
    action: 'WriteFile',
    content: 'file content' 
  }];

  const FileActionExtra: FileAction[] = [{
    path: 'Dir2',
    action: 'MkDir',
    content: '' 
  },
  {
    path: 'File2',
    action: 'WriteFile',
    content: 'file content' 
  }];

  it('Test get all', () => {
    const t = new Transaction(FileActions);
    expect(t.getAll()).toMatchObject(FileActions);
  });

  it('Test push', () => {
    const t = new Transaction([...FileActions]);
    expect(t.push(...FileActionExtra).getAll()).toMatchObject([...FileActions, ...FileActionExtra]);
  });

  it('Test slice', () => {
    const t = new Transaction([...FileActions, ...FileActionExtra]);

    expect(t.slice(0)).toMatchObject([...FileActions, ...FileActionExtra]);
    expect(t.slice(2)).toMatchObject([...FileActionExtra]);
    expect(t.slice(0, 2)).toMatchObject([...FileActions]);
  });
});