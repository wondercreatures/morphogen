// import FileSystem from '../fs/file-system'
import { FileAction } from '../types'
import commit from '../fs/commit'
import Transaction from '../trasactions/transaction'

// const FsMock: FSLayer = {
//   MkDir: () => ({
//     type: 'MkDir',
//     commit: jest.fn(),
//     decline: jest.fn(),
//   }),
//   FileExists: jest.fn(),
//   WriteFile: () => ({
//     type: 'WriteFile',
//     commit: jest.fn(),
//     decline: jest.fn(),
//   }),
//   PathFile: () => ({
//     type: 'PathFile',
//     commit: jest.fn(),
//     decline: jest.fn(),
//   }),
//   RemoveFile: function (path: string): void {
//     throw new Error('Function not implemented.');
//   },
//   RemoveDir: function (path: string): void {
//     throw new Error('Function not implemented.');
//   }
// }

export const FileActions: FileAction[] = [{
  type: 'MkDir',
  commit: jest.fn(),
  decline: jest.fn()
},
{
  type: 'WriteFile',
  commit: jest.fn(),
  decline: jest.fn()
}]

describe('Commit fs', () => {
  test('Commit', () => {
    const transaction = new Transaction(FileActions)
    const commitedTransactions = commit(transaction)

    expect(FileActions[0].commit).toHaveBeenCalledTimes(1)
    expect(FileActions[1].commit).toHaveBeenCalledTimes(1)

    expect(FileActions[0].decline).toHaveBeenCalledTimes(0)
    expect(FileActions[1].decline).toHaveBeenCalledTimes(0)

    expect(commitedTransactions).toMatchObject(FileActions)

    // expect(FsMock.MkDir).toHaveBeenCalledWith('Dir');
    // expect(FsMock.WriteFile).toHaveBeenCalledWith('File', 'file content');
  })
})
