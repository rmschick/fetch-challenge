const express = require("express");
const app = express();
const port = 3000;
var routes = require("./routes/routes").default;

app.use(express.json()); //allows us to parse json from incoming requests
app.use(express.static(__dirname));

//home page
app.use("/", require("./routes/routes"));

app.listen(port, () => {
  console.log(`Starting app... listening at http://localhost:${port}`);
});

module.exports = app;
