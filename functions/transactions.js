//add queryObject to the transaction list
function addTransaction(queryObject, transactions) {
  transactions[Object.keys(transactions).length] = queryObject;
}

module.exports = addTransaction;
