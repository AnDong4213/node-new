#! /usr/bin/env node

/* if (process.argv[2] === "--help") {
  console.log("获取命令参数");
} */
// console.log(require("minimist")(process.argv.slice(2)));
// console.log(process.argv);

const { program } = require("commander");

const myhelp = require("../lib/help");
const mycommander = require("../lib/mycommander");

myhelp(program);

mycommander(program);

program.parse(process.argv);
