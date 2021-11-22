function spendHandlingErrorChecking(points) {
  let errorChecking = "passes all tests";
  //if it is not named points or the data sent over wasn't a number then send error
  if (!points || typeof points != "number") {
    errorChecking =
      "ERROR: Please use {'points': INTEGER } as the format to send data";
    return errorChecking;
  } else if (points < 0) {
    //if the points sent over is negative, send error
    errorChecking =
      "ERROR: Cannot spend negative points. Please provide an integer greater than 0";
    return errorChecking;
  } else {
    return errorChecking;
  }
}
module.exports = spendHandlingErrorChecking;
