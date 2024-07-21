import { Discard, FSTransaction } from '../types'

const discard: Discard = (transaction: FSTransaction) => {
  const actions = transaction.getAll().reverse()
  for (let n = 0; n < actions.length; n++) {
    const action = actions.slice(n, n + 1)[0]
    action.decline()
  }
}

export default discard
