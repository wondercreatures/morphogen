import Transaction from '../trasactions/transaction';
import { FileAction } from '../types';
import { FileActionExtra, FileActions } from './fixtures';

describe('Transaction test', () => {
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