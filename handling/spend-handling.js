function spendHandlingErrorChecking(points) {
  let errorChecking = "passes all tests";
  if (!points || typeof points != "number") {
    errorChecking =
      "ERROR: Please use {'points': INTEGER } as the format to send data";
    return errorChecking;
  } else if (points < 0) {
    errorChecking =
      "ERROR: Cannot spend negative points. Please provide an integer greater than 0";
    return errorChecking;
  } else {
    return errorChecking;
  }
}
module.exports = spendHandlingErrorChecking;
