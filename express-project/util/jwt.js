const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { uuid } = require("../config/config.default");
const prosign = promisify(jwt.sign);
const proverfiy = promisify(jwt.verify);

module.exports.verifyToken = function (requried = true) {
  return async (req, res, next) => {
    var token = req.headers.authorization;
    token = token ? token.split("Bearer ")[1] : null;
    if (token) {
      try {
        let userinfo = await proverfiy(token, uuid);
        req.user = userinfo;
        next();
      } catch (error) {
        res.status(402).json({ error: "无效的token" });
      }
    } else if (requried) {
      res.status(402).json({ error: "请传入token" });
    } else {
      next();
    }
  };
};

module.exports.createToken = async (userinfo) => {
  const token = await prosign(userinfo, uuid, {
    expiresIn: 60 * 60 * 24
  });

  return token;
};

// var token = jwt.sign({ foo: 'hello' }, '555')
// var token = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTY5MjE4Njc0MX0.x9m0tIx8MB1mrZmRWmw7uUP2UBIDHQZ4SZjrSFoSkhE', '555')
// console.log(token)
