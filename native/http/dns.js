//  DNS 模块用于解析域名
var dns = require("dns");

dns.lookup("www.baidu.com", function onLookup(err, address, family) {
  console.log("ip 地址:", address);
  dns.reverse(address, function (err, hostnames) {
    if (err) {
      console.log(err.stack);
    }
    console.log("反向解析 " + address + ": " + JSON.stringify(hostnames));
  });
});
