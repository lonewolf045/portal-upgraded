const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
// simple route
// app.get("/", (req, res) => {
//   res.json({"hello": "Hi"});
// });

require("./app/routes/customer.routes.js")(app);
require("./app/routes/student.routes")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});