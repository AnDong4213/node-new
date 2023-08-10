const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router
  .get("/list", userController.list)
  .post("/register", userController.register);

module.exports = router;
