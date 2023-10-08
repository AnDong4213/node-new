const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");

const multer = require("multer");
const upload = multer({ dest: "public/" });

router
  .post("/register", validator.register, userController.register)
  .post("/login", validator.login, userController.login)
  .get("/list", verifyToken(), userController.list)
  .put("/", verifyToken(), validator.update, userController.update)
  .post(
    "/headimg",
    verifyToken(),
    upload.single("headimg"),
    userController.headimg
  )
  .get("/subscribe/:userId", verifyToken(), userController.subscribe)
  .get("/unsubscribe/:userId", verifyToken(), userController.unsubscribe)
  .get("/getuser/:userId", verifyToken(false), userController.getuser);

module.exports = router;
