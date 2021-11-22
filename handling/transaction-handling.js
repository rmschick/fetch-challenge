function transactionHandlingErrorChecking(req) {
  const { payer, points, timestamp } = req.body;
  let pass = "passes all tests";

  //if the sent json doesn't have the name of the fields correctly send an error message
  if (!payer || !points || !timestamp) {
    pass = "ERROR: Please enter payer, points, and timestamp as parameters";
    return pass;
  } else if (
    typeof payer != "string" ||
    typeof points != "number" ||
    typeof timestamp != "string"
  ) {
    pass = {
      errorMessage:
        "ERROR: Please make sure the type of each field is correct.",
      expectedTypes:
        "'payer' : 'STRING', 'points': NUMBER, 'timestamp': 'YYYY-MM-DDTHH:MM:SSZ'",
    };
    return pass;
  } else if (Object.keys(req.body).length > 3) {
    pass = {
      errorMessage: "ERROR: Please make sure there are only three fields sent.",
      expectedTypes:
        "'payer' : 'STRING', 'points': NUMBER, 'timestamp': 'YYYY-MM-DDTHH:MM:SSZ'",
    };
    return pass;
  } else {
    const transactionAdded = {
      payer,
      points: parseInt(points),
      timestamp,
    };
    return transactionAdded;
  }
}

module.exports = transactionHandlingErrorChecking;
