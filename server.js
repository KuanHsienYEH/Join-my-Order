const express = require("express");
const https = require("https");
const { getData, updateData } = require("./googleSheet.js");
const bodyParse = require("body-parser");
const { urlencoded } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParse.json({ extended: true }));

// app.listen(3000, function (err) {
//   console.log("server is on 3000");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sheet.html");
});

// goole sheet url : https://docs.google.com/spreadsheets/d/1O-8kkGOSlCnAwoMWh9M8zP2CQT9nff3KqT6vuVB-kNQ/edit#gid=0
app.get("/getSheetData", function (req, res) {
  (async () => {
    const resp = await getData();
    res.send(resp);
  })();
});

app.post("/updateSheetData", function (req, res) {
  const obj = req.body;
  (async () => {
    const resp = await updateData(obj);
    res.send(resp);
  })();
});
