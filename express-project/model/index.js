const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/eduline1");
}

main()
  .then((res) => {
    console.log("mongo链接成功");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongo链接失败");
  });

const user = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
});

const userModel = mongoose.model("User2", user);
const u = new userModel({ username: "lisi", age: 8 });
u.save();
