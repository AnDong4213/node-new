// const ora = require("ora");
// const chalk = require("chalk");
const download = require("./git");

download("https://gitee.com/beiyaoyaoyao/express-template.git", "express")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
