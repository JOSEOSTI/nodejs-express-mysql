const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();
app.use(cors( ))
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/propertie.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
