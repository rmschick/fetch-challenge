addTransaction = require("../functions/transactions");
spendPoints = require("../functions/spend");
getBalances = require("../functions/balances");

const url = require("url");
const path = require("path");
const absolutePath = path.resolve("./public/index.html");
var express = require("express");
var router = express.Router();

const transactions = []; // initialize transaction list

router.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

//transaction route
router.post("/transaction", (req, res) => {
  const { payer, points, timestamp } = req.body;
  if (!payer || !points || !timestamp) {
    let errorMessage =
      "ERROR: Please enter payer, points, and timestamp as parameters";
    res.send(errorMessage);
  } else {
    const data = {
      payer,
      points: parseInt(points),
      timestamp,
    };
    addTransaction(data, transactions);
    res.send(transactions);
  }
});
//spend route
router.post("/spend", (req, res) => {
  const { points } = req.body;
  if (!points) {
    let errorNoPointsEnter =
      "ERROR: Please use {'points': INTEGER } as the format to send data";
    res.send(errorNoPointsEnter);
  } else if (points < 0) {
    let errorNegativePoints =
      "ERROR: Cannot spend negative points. Please provide an integer greater than 0";
    res.send(errorNegativePoints);
  } else {
    let pointsList = spendPoints(points, transactions);
    res.send(pointsList);
  }
});
//balance route
router.get("/balances", (req, res) => {
  let balance = getBalances(transactions);
  res.send(balance);
});

module.exports = router;
