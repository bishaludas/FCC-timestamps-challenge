// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  // An empty date parameter should return the current time
  try {
    let date = new Date();

    let timestamp = date.toUTCString();
    let unix = date.getTime();

    res.json({ unix: unix, utc: timestamp });
  } catch (error) {
    // Handle if the input date string is invalid
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/:date", function (req, res) {
  try {
    let param = req.params.date;
    let date;
    // Handle unix time
    if (!param.includes("-")) {
      console.log("unix given");
      let unixDate = parseInt(param);
      if (isNaN(unixDate)) {
        throw "Invalid Date";
      }
      date = new Date(unixDate);
    } else {
      date = new Date(param);
      if (date == "Invalid Date") {
        throw "Invalid Date";
      }
    }

    let timestamp = date.toUTCString();
    let unix = date.getTime();

    res.json({ unix: unix, utc: timestamp });
  } catch (error) {
    // Handle if the input date string is invalid
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
