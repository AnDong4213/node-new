const express = require("express");
const app = express();
var fs = require("fs");
var { promisify, callbackify } = require("util");
const readFile = promisify(fs.readFile);

// app.use(express.urlencoded()); // 'content-type': 'application/x-www-form-urlencoded'
app.use(express.json()); // 'content-type': 'application/json'

/* app.get("/", function (req, res) {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      var back = JSON.parse(data);
      res.send(back.users);
    } else {
      app.status(500).json({ err });
    }
  });
}); */
async function fn() {
  return "hello world";
}
const callbackFunction = callbackify(fn);

app.get("/", async function (req, res) {
  try {
    callbackFunction((err, ret) => {
      if (err) throw err;
      console.log(ret);
    });
    const data = await readFile("./db.json", "utf-8");
    var back = JSON.parse(data);
    res.send(back.users);
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.post("/", async (req, res) => {
  console.log("req.headers-", req.headers);
  console.log("req.body-", req.body);
});

app.listen(3000, () => {
  console.log("Run http://127.0.0.1:3000");
});
