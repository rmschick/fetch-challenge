addTransaction = require("../functions/transactions");
spendPoints = require("../functions/spend");
getBalances = require("../functions/balances");

transactionHandlingErrorChecking = require("../handling/transaction-handling");
spendHandlingErrorChecking = require("../handling/spend-handling");

const url = require("url");
const path = require("path");
const absolutePath = path.resolve("./public/index.html");
var express = require("express");

var router = express.Router();

const transactions = []; // initialize transaction list
//homepage
router.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

//transaction route
router.post("/transaction", (req, res) => {
  const errorHandling = transactionHandlingErrorChecking(req);
  //if there are errors in the sent data then send the appropiate message, else add the trasaction to the list
  if (typeof errorHandling === "string") {
    res.json({
      errorMessage: errorHandling,
    });
  } else if (Object.keys(errorHandling).length < 3) {
    res.json({ errorHandling });
  } else {
    const transactionAdded = errorHandling;
    addTransaction(transactionAdded, transactions);
    res.json({ message: "Added transaction successfully!", transactionAdded });
  }
});
//spend route
router.post("/spend", (req, res) => {
  const { points } = req.body;
  const errorHandling = spendHandlingErrorChecking(points);
  //if there was an error then send the error message, otherwise call spend points and check if there was another error while computing pointsSpentList
  //if there was an error then send the error message, otherwise send the pointsSpentList
  if (errorHandling != "passes all tests") {
    res.json({
      errorMessage: errorHandling,
    });
  } else {
    let pointsSpentList = spendPoints(points, transactions);
    if (typeof pointsSpentList === "string") {
      res.json({
        errorMessage: pointsSpentList,
      });
    } else {
      res.json({ pointsSpentList });
    }
  }
});
//balance route
router.get("/balances", (req, res) => {
  let balance = getBalances(transactions);
  //if we got an error message back then send the error message
  if (typeof balance === "string") {
    res.json({
      errorMessage: balance,
    });
  } else {
    res.json(balance);
  }
});

module.exports = router;
