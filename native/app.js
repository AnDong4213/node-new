const express = require("express");
// const router = require("./router");
// const routerVideo = require("./router/video");
// var http = require("http");
// console.log("666http.METHODS", http.METHODS);

const app = express();

/* app.use("/user", router);
app.use("/video", routerVideo);

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("serve Error");
}); */

/* app.all("/xx", (req, res) => {
  res.send("XXXx");
}); */

/* app.get("/us?er", (req, res) => {
  res.send(`${req.method}---${req.url}`);
}); */

app.get("/user/:id/video/:vid", (req, res) => {
  console.log(req.params);
  res.send(`${req.method}---${req.url}`);
});

const PORT = process.env.PORT || 3000;

/* app.use((req, res, next) => {
  console.log(`${req.method},${req.url},${Date.now()}`);
  next();
}); */
/* app.get("/", (req, res) => {
  res.send("/index");
});
app.get("/register", (req, res) => {
  res.send("/register");
});
app.get(
  "/login",
  (req, res, next) => {
    console.log(`${req.method},${req.url},${Date.now()}`);
    next();
  },
  (req, res) => {
    console.log("666");
    res.send("/login");
  }
); */

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
