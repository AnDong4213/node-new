const ora = require("ora");
const chalk = require("chalk");
const download = require("./git");

const downloadFun = function (url, project) {
  const spinner = ora().start();
  spinner.text = "代码正在下载……";
  spinner.color = "red";

  download(url, project)
    .then((res) => {
      if (res == "0") {
        spinner.succeed("代码下载成功");
        console.log(chalk.blue.bold("Done!"), chalk.bold("you run:"));
        console.log("cd " + project);
        console.log("npm install ");
        console.log("npm run dev ");
      }
    })
    .catch((err) => {
      // console.log(err);
      spinner.fail(err);
    });
};

module.exports = downloadFun;
