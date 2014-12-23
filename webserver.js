// A little webserver to serve these test files over HTTP (and not file://)
//
// Start it with `node webserver.js`

var express = require('express');
var app = express();

PORT = 3000

app.use("/", express.static(__dirname));
app.listen(PORT);
console.log("Go to http://localhost:"+PORT+"/test.html to run the unit tests.");
