//function returns the balance list of each payer
function getBalances(transactions) {
  if (Object.keys(transactions).length === 0) {
    let noPayerBalances = `No transactions have been added. Please use '/transaction/' route to add payer, points, and timestamp.`;
    //console.log(noPayerBalances);
    return noPayerBalances;
  }
  let transactionSortByName = JSON.parse(JSON.stringify(transactions)); //copy the transaction object into a new object list
  transactionSortByName.sort((a, b) => a.payer.localeCompare(b.payer)); //we're sorting the list by names of payers so that it's easier to compare the current payer with the previous

  let balance = null; //zero out the balance
  balance = [transactionSortByName[0]]; //set the first balance
  delete balance[0].timestamp; //delete the time stamp as we no longer need it

  let addNewBalance = 1; //the position we will be adding the next balance into

  //for as long as there's more transactions
  for (let i = 1; i < Object.keys(transactionSortByName).length; i++) {
    if (
      //compare whether the current payer matches with the previous payer in the list
      transactionSortByName[i].payer.localeCompare(
        balance[addNewBalance - 1].payer
      ) === 0
    ) {
      //if so, add the points to the balance list
      balance[addNewBalance - 1].points += transactionSortByName[i].points;
    } else {
      //else add the new payer and points to the balance list
      balance[addNewBalance] = transactionSortByName[i];
      delete balance[addNewBalance++].timestamp;
    }
  }
  return balance; //return balance list
}

module.exports = getBalances;
