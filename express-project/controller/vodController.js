var RPCClient = require("@alicloud/pop-core").RPCClient;

function initVodClient(accessKeyId, accessKeySecret) {
  var regionId = "cn-shanghai"; // 点播服务接入地域
  var client = new RPCClient({
    //填入AccessKey信息
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: "http://vod." + regionId + ".aliyuncs.com",
    apiVersion: "2017-03-21"
  });

  return client;
}

exports.getvod = async (req, res) => {
  var client = initVodClient(
    "LTAI5t7n2sGYEJi51fnhkcd2",
    "t4mukClzxwQxdwlf69E3G9N9qgAHzZ"
  );

  const vodback = await client.request(
    "CreateUploadVideo",
    {
      Title: "宝宝专属",
      FileName: "filename.mp4"
    },
    {}
  );

  res.status(200).json({ vod: vodback });
};
