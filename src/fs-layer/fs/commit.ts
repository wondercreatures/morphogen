import Transaction from "../trasactions/transaction";
import { Commit, FileAction, FSLayer, FSTransaction } from "../types";

const commit: Commit = (transaction: FSTransaction) => {
  const actions = transaction.getAll();
  for(let n = 0; n < actions.length; n++) {
    const action = actions.slice(n, n + 1)[0];
    action.commit();
  }

  return transaction.getAll();
}

export default commit;