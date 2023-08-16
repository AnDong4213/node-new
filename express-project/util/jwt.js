const jwt = require('jsonwebtoken')
// var token = jwt.sign({ foo: 'hello' }, '555')
var token = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTY5MjE4Njc0MX0.x9m0tIx8MB1mrZmRWmw7uUP2UBIDHQZ4SZjrSFoSkhE', '555')
console.log(token)