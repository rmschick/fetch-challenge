const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 3000;

const transactions = [
  { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
  { payer: "DANNON", points: -200, timestamp: "2020-10-31T15:00:00Z" },
  { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
  { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
];

function sortTransactions() {
  transactions.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  let sortedByTimeTrans = JSON.parse(JSON.stringify(transactions));
  return sortedByTimeTrans;
}

function getBalance() {
  let sortByNameTrans = JSON.parse(JSON.stringify(transactions)); //copy the transaction object into a new object list
  sortByNameTrans.sort((a, b) => a.payer.localeCompare(b.payer));

  let balance = null;
  balance = [sortByNameTrans[0]];
  delete balance[0].timestamp;

  let addNewBalance = 1;

  for (let i = 1; i < Object.keys(sortByNameTrans).length; i++) {
    if (
      sortByNameTrans[i].payer.localeCompare(
        balance[addNewBalance - 1].payer
      ) === 0
    ) {
      balance[addNewBalance - 1].points =
        balance[addNewBalance - 1].points + sortByNameTrans[i].points;
    } else {
      balance[addNewBalance] = sortByNameTrans[i];
      delete balance[addNewBalance++].timestamp;
    }
  }
  return balance;
}

function spendPoints(points) {
  let sortByDateTrans = sortTransactions(); //get an array of object sorted by date
  let balanceList = getBalance(); //get an array of objects having the total balance of each payer
  let pointsSpentPerPayer = balanceList; //copy that array over to not alter data
  let totalPointsFromPayers = 0; //variable to check if the total points of the payers can pay for the points

  //add up the total points
  for (let i = 0; i < Object.keys(balanceList).length; i++) {
    totalPointsFromPayers += balanceList[i].points;
  }
  //if the total points are less than the points trying to be spent, let the user know
  if (totalPointsFromPayers < points) {
    let insufficientFunds = `Insufficient funds. Cannot redeem ${points} points. Only a total of ${totalPoints} points from all payers.`;
    return insufficientFunds;
  } else {
    /*Else, start moving through the trasaction list from oldest points to most recent and update objects accordingly*/
    //zero out all the points that were copied over for a fresh start in the list
    for (i = 0; i < Object.keys(pointsSpentPerPayer).length; i++) {
      pointsSpentPerPayer[i].points = 0;
    }
    let j = 0;
    /*we're going to loop through the balanceList to find a match payer to the oldest transaction date. substract the points, store the value, and delete the entry from the transaction list*/
    do {
      for (i = 0; i < Object.keys(balanceList).length; i++) {
        if (sortByDateTrans[j].payer === balanceList[i].payer) {
          //if the most recent transaction matches the payer in the balance list,
          if (points - sortByDateTrans[j].points > 0) {
            //and if there are points still left over that need to be spent
            pointsSpentPerPayer[i].points = //substract the from the proper payer
              pointsSpentPerPayer[i].points - sortByDateTrans[j].points;
            points -= sortByDateTrans[j].points;
            delete sortByDateTrans[j]; //delete the most recent transaction
            break;
          } else {
            pointsSpentPerPayer[i].points -= points; //if the payer balance is more than the remaining points to be spent, just substract the spent points and set it to zero
            points = 0;
            break;
          }
        }
      }
      j++;
    } while (points > 0);
  }
}

app.use(express.json()); //allows us to parse json from incoming requests

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/transaction", (req, res) => {
  res.send(sortTransactions());
});

app.post("/spend", (req, res) => {
  const { points } = req.body;
  let pointsList = spendPoints(points);
  res.send(pointsList);
});

app.get("/balance", (req, res) => {
  let balance = getBalance();
  res.send(balance);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
