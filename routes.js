var router = require("express").Router();
var connection = require("../db/connection");
var path = require("path");

router.get("/api/tables", function(req, res) {
 connection.query("SELECT * FROM tables WHERE isWaiting = FALSE", function(err, dbTables) {
   res.json(dbTables);
 });
});

router.get("/api/tables", function(req, res) {
 connection.query("SELECT * FROM tables WHERE isWaiting = FALSE", function(err, dbTables) {
   res.json(dbTables);
 });
});

router.post("/api/tables", function(req, res) {
 connection.query("SELECT COUNT(IF(isWaiting = FALSE, 1, NULL)) 'count' FROM tables", function(err, dbSeated) {
   if (err) throw err;

   if (dbSeated[0].count > 4) {
     req.body.isWaiting = true;
   }

   connection.query("INSERT INTO tables SET ?", req.body, function(err, result) {
     if (err) throw err;

     res.json(result);
   });
 });
});