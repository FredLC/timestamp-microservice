var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/api/timestamp/:date?", function (req, res) {
  if (req.params.date) {
    let dateInput = req.params.date;
    if (!isNaN(dateInput)) {
      dateInput = Number(dateInput);
    }
    if (new Date(dateInput).toLocaleDateString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
    if (isNaN(dateInput)) {
      let date = new Date(dateInput);
      let utc = date.toUTCString();
      let unix = date.getTime();
      res.json({ unix: unix, utc: utc });
    } else {
      let date = new Date(dateInput);
      date = date.toUTCString();
      res.json({ unix: dateInput, utc: date });
    }
  } else {
    let date = new Date();
    res.json({ unix: Date.now(), utc: date.toUTCString() });
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(3000, function () {
  console.log("Your app is listening on port 3000");
});
