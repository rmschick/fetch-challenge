///function first checks to see if the total amount of points the payers have is enough to cover the points trying to be spent
//the function will then go through the transaction list and spend the point accordingly
function spendPoints(points, transactions) {
  if (Object.keys(transactions).length === 0) {
    let noPayerBalances = `No transactions have been added. Please use '/transaction/' route to add payer, points, and timestamp.`;
    //console.log(noPayerBalances);
    return noPayerBalances;
  }
  let transactionSortByDate = transactions.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  ); //get an array of object sorted by date

  let totalPointsFromPayers = 0; //variable to check if the total points of the payers can pay for the points
  let balanceList = getBalances(transactions); //get an array of objects having the total balance of each payer
  //add up the total points
  for (let i = 0; i < Object.keys(balanceList).length; i++) {
    totalPointsFromPayers += balanceList[i].points;
  }
  if (totalPointsFromPayers === 0) {
    let noPointsFromPayers = `No points left to spend from payers. Cannot redeem ${points} points because there are ${totalPointsFromPayers} points from all payers.`;
    //console.log(noPointsFromPayers);
    return noPointsFromPayers;
    //if the total points are less than the points trying to be spent, let the user know
  } else if (totalPointsFromPayers < points) {
    let insufficientFunds = `Insufficient funds. Cannot redeem points because there is not enough points from payers to cover.`;
    //console.log(insufficientFunds);
    return insufficientFunds;
  } else {
    /*Else, start moving through the trasaction list from oldest points to most recent and update objects accordingly*/
    let pointsSpentPerPayer = balanceList; //copy that array over to not alter data
    //zero out all the points that were copied over for a fresh start in the list
    for (i = 0; i < Object.keys(pointsSpentPerPayer).length; i++) {
      pointsSpentPerPayer[i].points = 0;
    }
    let j = 0;
    /*we're going to loop through the balanceList to find a match payer to the oldest transaction date. substract the points, store the value, and delete the entry from the transaction list*/
    do {
      for (i = 0; i < Object.keys(balanceList).length; i++) {
        if (transactionSortByDate[j].payer === balanceList[i].payer) {
          //if the most recent transaction matches the payer in the balance list,
          if (points - transactionSortByDate[j].points > 0) {
            //and if there are points still left over that need to be spent
            pointsSpentPerPayer[i].points -= transactionSortByDate[j].points; //substract the from the proper payer
            points -= transactionSortByDate[j].points;
            transactionSortByDate[j].points = 0; //delete the most recent transaction
            break;
          } else {
            pointsSpentPerPayer[i].points -= points; //if the payer balance is more than the remaining points to be spent, just substract the spent points and set it to zero
            transactionSortByDate[j].points -= points; //substract the points from the transaction list since we can still have points left over
            points = 0;
            break;
          }
        }
      }
      j++;
    } while (points > 0); //continue until we've spent all the points
    return pointsSpentPerPayer; //return list of payers and the points deducted
  }
}
module.exports = spendPoints;
