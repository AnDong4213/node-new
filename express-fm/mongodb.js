const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "eduline1";

const clientFun = async (collection) => {
  await client.connect();
  const db = client.db(dbName);
  return db.collection(collection);
};

exports.mongoDb = async () => {
  const col = await clientFun("col");
  // const dt = await col.find();
  /* const dt = await col.insertOne({
    title: "MongoDB 教程",
    description: "MongoDB 是一个 Nosql 数据库",
    by: "菜鸟教程",
    url: "http://www.runoob.com",
    tags: ["mongodb"],
    likes: 100
  }); */
  // const dt = await col.findOne({ likes: { $gt: 100 } });
  const dt = await col.updateOne(
    { _id: "64ccc9b882e6c4d6df05fb94" },
    {
      $set: {
        title: "TypeScript"
      }
    }
  );

  // console.log("mongodb--", await dt.toArray());
  console.log("mongodb--", dt);
};

exports.client = client;
