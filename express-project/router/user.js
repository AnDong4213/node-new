const express = require("express");
const userController = require("../controller/userController");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");
const router = express.Router();

router
  .post("/register", validator.register, userController.register)
  .post("/login", validator.login, userController.login)
  .get("/list", verifyToken(), userController.list);

module.exports = router;
