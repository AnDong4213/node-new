const express = require("express");
const app = express();
const db = require("./db");
const mongo = require("./mongodb");

app.use(express.json()); // 'content-type': 'application/json'
mongo.mongoDb().finally(() => mongo.client.close());

app.get("/", async function (req, res) {
  try {
    const data = await db.getDb();
    res.send(data.users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/", async (req, res) => {
  try {
    const userInfo = req.body;
    if (!userInfo.username) {
      res.status(403).json({
        error: "缺少用户名"
      });
    }
    const userList = await db.getDb();
    userInfo.id = userList.users[userList.users.length - 1].id + 1;
    userList.users.push(userInfo);
    const r = await db.serveDb(userList);
    if (!r) {
      res.send({ msg: "用户添加成功" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    /* res.send({
      id
    }); */
    res.status(200).json({
      msg: "修改成功",
      id
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
});

app.listen(3000, () => {
  console.log("Run http://127.0.0.1:3000");
});
