import { FileAction } from '../types'
import discard from '../fs/discard'
import Transaction from '../trasactions/transaction'

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
    discard(transaction)

    expect(FileActions[0].commit).toHaveBeenCalledTimes(0)
    expect(FileActions[1].commit).toHaveBeenCalledTimes(0)

    expect(FileActions[0].decline).toHaveBeenCalledTimes(1)
    expect(FileActions[1].decline).toHaveBeenCalledTimes(1)
  })
})
