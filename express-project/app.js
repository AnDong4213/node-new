var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var router = require("./router");

var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
