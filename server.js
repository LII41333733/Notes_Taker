var express = require("express");
var routes = require("./routes");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});