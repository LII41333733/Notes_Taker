var router = require("express").Router();
var db = require("./db/connection");
var path = require("path");


// API ROUTES
router.get("/api/notes", function(req, res) {
 db.query("SELECT * FROM notes", function(err, dbTables) {
   if (err) throw err;
   res.json(dbTables);
 });
});


// HTML ROUTES
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// router.get("/api/tables", function(req, res) {
//  connection.query("SELECT * FROM tables WHERE isWaiting = FALSE", function(err, dbTables) {
//    res.json(dbTables);
//  });
// });

// router.post("/api/tables", function(req, res) {
//  connection.query("SELECT COUNT(IF(isWaiting = FALSE, 1, NULL)) 'count' FROM tables", function(err, dbSeated) {
//    if (err) throw err;

//    if (dbSeated[0].count > 4) {
//      req.body.isWaiting = true;
//    }

//    connection.query("INSERT INTO tables SET ?", req.body, function(err, result) {
//      if (err) throw err;

//      res.json(result);
//    });
//  });
// });

module.exports = router;